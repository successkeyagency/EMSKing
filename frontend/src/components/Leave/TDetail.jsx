import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadLeaveDetails = async () => {
      try {
        const response = await axios.get(
          `https://emsking-backend-server.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
        if (error.response?.data?.error) alert(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaveDetails();
  }, [id]);

  const handleStatusUpdate = async (leaveId, newStatus) => {
    if (isDemoUser) {
      setErrorMsg(
        "🚫 Demo users are not allowed to approve or reject leave requests.",
      );
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    try {
      const response = await axios.put(
        `https://emsking-backend-server.vercel.app/api/leave/${leaveId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response?.data?.error) alert(error.response.data.error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-xl py-20">
        ⏳ Loading leave details...
      </div>
    );

  if (!leave)
    return (
      <div className="text-center text-red-500 py-20">
        ⚠️ No leave data found!
      </div>
    );

  return (
    <>
      <div className="lg:pl-64">
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <button
            onClick={() => navigate("/admin-dashboard/leaves")}
            className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition shadow-md"
          >
            ⬅️ Return
          </button>
        </div>

        <div className="max-w-4xl mx-auto mt-4 px-4 md:px-8 py-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 animate-fadeIn">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-10 text-teal-600">
            📝 Leave Details
          </h1>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center mb-4">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            <img
              src={`http://localhost:4000/${leave.employeeId.userId.profileImage}`}
              alt={`${leave.employeeId.userId.name} profile`}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-teal-400 object-cover shadow-md"
            />

            <div className="flex-1 w-full space-y-5">
              {[
                ["Name", leave.employeeId?.userId?.name || "N/A"],
                ["Employee ID", leave.employeeId?.employeeId || "N/A"],
                ["Department", leave.employeeId?.department?.dep_name || "N/A"],
                ["Leave Type", leave.leaveType || "N/A"],
                ["Reason", leave.reason || "N/A"],
                ["Start Date", new Date(leave.startDate).toLocaleDateString()],
                ["End Date", new Date(leave.endDate).toLocaleDateString()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2"
                >
                  <span className="font-medium text-gray-600">{label}:</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}

              <div className="pt-4">
                <span className="font-semibold text-lg mr-4">
                  {leave.status.toLowerCase() === "pending"
                    ? "Take Action:"
                    : "Status:"}
                </span>

                {leave.status.toLowerCase() === "pending" ? (
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <button
                      onClick={() => handleStatusUpdate(leave._id, "Approved")}
                      className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                      className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition"
                    >
                      ❌ Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-block mt-2 px-4 py-1 rounded-full font-semibold text-white ${
                      leave.status.toLowerCase() === "approved"
                        ? "bg-green-600"
                        : leave.status.toLowerCase() === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TDetail;
