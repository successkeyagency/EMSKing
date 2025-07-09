import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TAdd = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        // "http://localhost:4000/api/leave/add",
        "https://emsking-backend-server.vercel.app/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(
          err.response.data.message ||
            "🚫 Demo users are not allowed to submit leave requests.",
        );
      } else {
        setError(err.response?.data?.error || "Something went wrong 😓");
      }
      setTimeout(() => setError(""), 4000); 
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 sm:mt-16 px-4 sm:px-6 md:px-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 drop-shadow">
            ✍️ Submit a Leave Request
          </h1>
          <p className="text-gray-600 mt-2 italic text-sm sm:text-base">
            We’ve got you covered 🧘‍♂️
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center mb-4 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📝 Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="w-full p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow-inner text-sm sm:text-base"
              required
            >
              <option value="">Select Type</option>
              <option value="Sick Leave">🤒 Sick Leave</option>
              <option value="Casual Leave">🌴 Casual Leave</option>
              <option value="Annual Leave">📆 Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                🕓 From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="w-full p-3 border border-indigo-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                🕔 To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="w-full p-3 border border-indigo-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              💬 Reason / Notes
            </label>
            <textarea
              name="reason"
              onChange={handleChange}
              placeholder="Briefly explain your reason..."
              rows={4}
              className="w-full p-3 border border-indigo-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-sm sm:text-base"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition duration-200"
          >
            🚀 Submit Leave Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default TAdd;
