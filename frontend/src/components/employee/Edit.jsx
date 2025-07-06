import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });

  const [departmentList, setDepartmentList] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  useEffect(() => {
    const loadDepartments = async () => {
      const result = await fetchDepartments();
      setDepartmentList(result);
    };
    loadDepartments();
  }, []);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (res.data.success) {
          const data = res.data.employee;
          setEmployeeData({
            name: data.userId.name,
            maritalStatus: data.maritalStatus,
            designation: data.designation,
            salary: data.salary,
            department: data.department,
          });
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          setError(err.response.data.error);
          setTimeout(() => setError(""), 4000);
        }
      }
    };
    loadEmployee();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.put(
        `http://localhost:4000/api/employee/${id}`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError(err.response.data.message); // e.g., "This is a demo account. You can only view data."
      } else {
        setError("Something went wrong while updating. 🚨");
      }
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="lg:pl-64">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl shadow-lg mt-12">
        <button
          onClick={() => navigate("/admin-dashboard/employees")}
          className="mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full sm:w-auto"
        >
          ← Return to List
        </button>

        <h1 className="text-3xl font-semibold text-orange-600 mb-8 text-center">
          Update Employee Info
        </h1>

        {error && (
          <div className="mb-6 bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded font-semibold text-center animate-pulse">
            {error}
          </div>
        )}

        {departmentList.length ? (
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="text-gray-700 font-medium text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleInput}
                className="mt-1 block w-full border border-gray-300 px-3 py-3 rounded-md text-base focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium text-sm">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={employeeData.maritalStatus}
                onChange={handleInput}
                className="mt-1 block w-full border border-gray-300 px-3 py-3 rounded-md text-base focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium text-sm">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={employeeData.designation}
                onChange={handleInput}
                className="mt-1 block w-full border border-gray-300 px-3 py-3 rounded-md text-base focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter job title"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium text-sm">
                Salary ($)
              </label>
              <input
                type="number"
                name="salary"
                value={employeeData.salary}
                onChange={handleInput}
                className="mt-1 block w-full border border-gray-300 px-3 py-3 rounded-md text-base focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter salary"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium text-sm">
                Department
              </label>
              <select
                name="department"
                value={employeeData.department}
                onChange={handleInput}
                className="mt-1 block w-full border border-gray-300 px-3 py-3 rounded-md text-base focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Choose department</option>
                {departmentList.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.dep_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded hover:bg-orange-600 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </section>
    </div>
  );
};

export default Edit;
