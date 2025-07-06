import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.email === "BossMan@gmail.com";

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error?.response?.data?.error || "Failed to fetch employee data.");
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className={isAdmin ? "lg:pl-64" : ""}>
      <div className=" min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        {employee ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl border border-orange-200 p-6 sm:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 mb-8 sm:mb-10">
              👤 {employee.userId.name}'s Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="flex justify-center">
                <img
                  src={`http://localhost:4000/${employee.userId.profileImage}`}
                  alt={`${employee.userId.name} Profile`}
                  className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-cover rounded-full shadow-md ring-4 ring-orange-400"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                    e.target.alt = "Placeholder Image";
                  }}
                />
              </div>

              <div className="space-y-4 text-gray-700 text-base sm:text-lg">
                {[
                  { label: "📝 Name:", value: employee.userId.name },
                  { label: "🆔 Employee ID:", value: employee.employeeId },
                  {
                    label: "🎂 Date of Birth:",
                    value: new Date(employee.dob).toLocaleDateString(),
                  },
                  { label: "⚧ Gender:", value: employee.gender },
                  {
                    label: "🏢 Department:",
                    value: employee.department?.dep_name || "N/A",
                  },
                  {
                    label: "💍 Marital Status:",
                    value: employee.maritalStatus,
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col sm:flex-row sm:items-center"
                  >
                    <p className="sm:w-40 font-semibold text-orange-500">
                      {label}
                    </p>
                    <p className="mt-1 sm:mt-0">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center max-w-3xl mx-auto mt-10 px-4 gap-4">
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin-dashboard/employees")}
                  className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  ← Back to List
                </button>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() =>
                    navigate(`/admin-dashboard/employees/edit/${employee._id}`)
                  }
                  className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 py-20 text-lg">
            Loading employee details...
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
