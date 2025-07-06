import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps);
      } finally {
        setLoadingDeps(false);
      }
    })();
  }, []);

  const isDemoUser =
    userEmail === "BossMan@gmail.com" || userEmail === "testerapp2232@gmail.com";

  const onDepartmentChange = async (event) => {
    const depId = event.target.value;
    if (!depId) {
      setEmployees([]);
      setFormData((prev) => ({ ...prev, employeeId: "" }));
      return;
    }
    const emps = await getEmployees(depId);
    setEmployees(emps);
    setFormData((prev) => ({ ...prev, employeeId: "" }));
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/salary/add",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError(err.response.data.message || "🚫 Demo accounts can't add salary data.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }

      setTimeout(() => setError(""), 4000); // auto-clear error after 4s
    }
  };

  return (
    <div className="lg:pl-64">
      <section className="max-w-3xl mx-auto mt-12 p-6 sm:p-8 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-xl shadow-lg animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-green-900 mb-8 flex items-center gap-3">
          💰 Add Salary Details
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center mb-4 animate-pulse">
            {error}
          </div>
        )}

        {loadingDeps ? (
          <p className="text-green-700 text-center font-semibold animate-pulse">
            Loading departments... 🌿
          </p>
        ) : (
          <form
            onSubmit={submitForm}
            className="space-y-6 text-green-900 font-semibold"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="department" className="mb-2">🏢 Department</label>
                <select
                  id="department"
                  name="department"
                  onChange={onDepartmentChange}
                  defaultValue=""
                  required
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 hover:bg-green-100 transition w-full"
                >
                  <option value="" disabled>-- Choose Department --</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="employeeId" className="mb-2">👩‍💼 Employee</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={onInputChange}
                  required
                  disabled={!employees.length}
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 disabled:bg-green-200 transition w-full"
                >
                  <option value="" disabled>-- Select Employee --</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId} - {emp.name || "No Name"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="basicSalary" className="mb-2">💵 Basic Salary</label>
                <input
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={onInputChange}
                  placeholder="Enter basic salary"
                  required
                  min="0"
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 transition w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="allowances" className="mb-2">🪙 Allowances</label>
                <input
                  type="number"
                  id="allowances"
                  name="allowances"
                  value={formData.allowances}
                  onChange={onInputChange}
                  placeholder="Enter allowances"
                  required
                  min="0"
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 transition w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="deductions" className="mb-2">➖ Deductions</label>
                <input
                  type="number"
                  id="deductions"
                  name="deductions"
                  value={formData.deductions}
                  onChange={onInputChange}
                  placeholder="Enter deductions"
                  required
                  min="0"
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 transition w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="payDate" className="mb-2">📅 Pay Date</label>
                <input
                  type="date"
                  id="payDate"
                  name="payDate"
                  value={formData.payDate}
                  onChange={onInputChange}
                  required
                  className="rounded-md p-3 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50 transition w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-extrabold py-3 rounded-lg shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-3"
            >
              🤑 Add Salary
            </button>
          </form>
        )}

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(15px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fadeIn {
              animation: fadeIn 0.8s ease forwards;
            }
          `}
        </style>
      </section>
    </div>
  );
};

export default AddSalary;
