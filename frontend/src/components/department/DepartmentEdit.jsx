import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const DepartmentEdit = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [depLoading, setDepLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }

    if (!id) return;

    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const { data } = await axios.get(
          // `http://localhost:4000/api/department/${id}`,
          `https://emsking-backend-server.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data.success) setDepartment(data.department);
      } catch (error) {
        alert(
          error.response?.data?.error || "Failed to fetch department data.",
        );
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

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
      setErrorMsg("🚫 Demo users are not allowed to update departments.");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    setSubmitLoading(true);
    try {
      const { data } = await axios.put(
        // `http://localhost:4000/api/department/${id}`,
        `https://emsking-backend-server.vercel.app/api/department/${id}`,
        department,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (data.success) navigate("/admin-dashboard/departments");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update department.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (depLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-20 text-blue-600 font-semibold"
      >
        Loading...
      </motion.div>
    );

  return (
    <div className="lg:pl-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg w-full"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center sm:text-left flex items-center gap-3">
            🏢 Edit Department ✏️
          </h2>

          <motion.button
            type="button"
            onClick={() => navigate("/admin-dashboard/departments")}
            className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto justify-center sm:justify-start"
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

        {errorMsg && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 text-center rounded-md text-sm mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dep_name"
              className="block text-sm font-medium text-blue-800 mb-1"
            >
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              placeholder="Department Name"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={department.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={submitLoading}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition ${
              submitLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {submitLoading ? "Saving..." : "Edit Department"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DepartmentEdit;
