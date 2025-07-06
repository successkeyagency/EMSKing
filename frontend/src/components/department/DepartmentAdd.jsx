import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const DepartmentAdd = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  const isDemoUser =
    userEmail === "BossMan@gmail.com" ||
    userEmail === "testerapp2232@gmail.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDemoUser) {
      setErrorMsg("🚫 Demo users are not allowed to create departments.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    try {
      const response = await axios.post(
        "https://emsking-backend-server.vercel.app/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Something went wrong. Try again.";
      alert(message);
    }
  };

  return (
    <div className="lg:pl-64">
      <motion.div
        className="max-w-xl mx-auto mt-16 bg-white shadow-xl rounded-lg p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700">
            Create Department
          </h2>

          <div className="flex justify-start mb-6">
            <motion.button
              type="button"
              onClick={() => navigate("/admin-dashboard/departments")}
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:justify-end"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Departments
            </motion.button>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              id="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              placeholder="e.g. Human Resources"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={department.description}
              onChange={handleChange}
              placeholder="Brief description of the department"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Department
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DepartmentAdd;
