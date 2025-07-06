import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.email === "BossMan@gmail.com";

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserEmail(payload.email);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (setting.newPassword !== setting.confirmPassword) {
      setError("🚫 New passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "https://emsking-backend-server.vercel.app/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setError(
          error.response.data.message ||
            "This is a demo account. You can't change the password.",
        );
      } else if (error.response?.data?.error) {
        setError(`❌ ${error.response.data.error}`);
      } else {
        setError("Something went wrong. 🚨");
      }

      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <div className={isAdmin ? "lg:pl-64" : ""}>
      <section className="flex justify-center items-center mt-16 bg-gradient-to-br from-gray-100 p-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              🔒 Update Password
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Stay secure. Keep your credentials safe! 🔐
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🔑 Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Enter your current password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ✨ New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter a new password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ✅ Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat new password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              🔁 Change Password
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Settings;
