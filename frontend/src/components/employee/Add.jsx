import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    image: null,
  });
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const isDemoUser =
    userEmail === "BossMan@gmail.com" ||
    userEmail === "testerapp2232@gmail.com";

  useEffect(() => {
    (async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    })();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (isDemoUser) {
    //   alert("🚫 This is a demo account. Adding employees is disabled.");
    //   return;
    // }

    setSubmitting(true);
    setError("");

    const formPayload = new FormData();
    for (const key in formData) {
      if (formData[key]) formPayload.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "https://emsking-backend-server.vercel.app/api/employee/add",
        formPayload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (res.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong while submitting the form. 🚨");
      }
      setTimeout(() => setError(""), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:pl-64">
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-orange-500 rounded-xl shadow-2xl animate-fadeIn">
        <div className="mb-4">
          <button
            onClick={() => navigate("/admin-dashboard/employees")}
            className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 active:scale-95 transition"
            type="button"
          >
            ← Return
          </button>
        </div>

        <h2 className="text-3xl text-white font-extrabold mb-4 tracking-wide drop-shadow-lg flex items-center gap-2">
          👩‍💼 Add New Employee
        </h2>

        {error && (
          <div className="sm:col-span-2 mb-4 bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded font-semibold text-center animate-pulse">
            {error}
          </div>
        )}

        {/* {isDemoUser && (
          <div className="sm:col-span-2 mb-4 bg-yellow-100 text-yellow-700 border border-yellow-400 px-4 py-3 rounded font-semibold text-center">
            🚫 Demo account: You can't add employees.
          </div>
        )} */}

        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3"
        >
          <InputField
            label="Full Name 🧑‍💼"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email 📧"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
          <InputField
            label="Employee ID 🆔"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="E12345"
            required
          />
          <InputField
            label="Date of Birth 🎂"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <SelectField
            label="Gender 🚻"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { val: "", label: "Select Gender" },
              { val: "male", label: "Male" },
              { val: "female", label: "Female" },
              { val: "other", label: "Other" },
            ]}
            required
          />

          <SelectField
            label="Marital Status 💍"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            options={[
              { val: "", label: "Select Status" },
              { val: "single", label: "Single" },
              { val: "married", label: "Married" },
            ]}
            required
          />

          <InputField
            label="Designation 💼"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Software Engineer"
            required
          />

          <SelectField
            label="Department 🏢"
            name="department"
            value={formData.department}
            onChange={handleChange}
            options={[
              { val: "", label: "Select Department" },
              ...departments.map((d) => ({ val: d._id, label: d.dep_name })),
            ]}
            required
          />

          <InputField
            label="Salary 💰"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="50000"
            required
            min="0"
          />
          <InputField
            label="Password 🔑"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />

          <SelectField
            label="Role 🛡️"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { val: "", label: "Select Role" },
              { val: "admin", label: "Admin" },
              { val: "employee", label: "Employee" },
            ]}
            required
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="block mb-1 font-semibold text-white cursor-pointer select-none"
            >
              Upload Profile Image 📸
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full rounded-md bg-white bg-opacity-90 px-2 py-2 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`sm:col-span-2 py-3 mt-4 text-white font-semibold rounded-xl shadow-lg transition-transform ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-green-600 active:scale-95"
            }`}
          >
            {submitting ? "Submitting..." : "Add Employee 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  min,
}) => (
  <div className="relative group">
    <label
      htmlFor={name}
      className="block mb-1 text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      className="w-full rounded-md px-3 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white bg-opacity-90 placeholder-gray-400 transition duration-300 ease-in-out transform group-hover:scale-105 text-sm sm:text-base"
      style={{ fontSize: "1rem" }}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required }) => (
  <div className="relative group">
    <label
      htmlFor={name}
      className="block mb-1 text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-md px-3 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white bg-opacity-90 transition duration-300 ease-in-out transform group-hover:scale-105 text-sm sm:text-base"
      style={{ fontSize: "1rem" }}
    >
      {options.map(({ val, label }) => (
        <option key={val} value={val}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default Add;
