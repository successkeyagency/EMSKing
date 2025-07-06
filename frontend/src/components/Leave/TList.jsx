import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const TList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isAdmin = user?.role === "admin" || user?.email === "BossMan@gmail.com";

  const fetchLeaves = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setLeaves(data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      alert(error.message || "Oops! Something went wrong. 😕");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filteredLeaves = leaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 text-xl font-semibold animate-pulse">
        ⏳ Loading your leaves...
      </div>
    );

  return (
    <div className={isAdmin ? "lg:pl-64" : ""}>
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition-all"
          >
            <span className="text-lg">←</span> Back
          </button>

          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 drop-shadow-sm">
              📋 Manage Your Leaves
            </h1>

            {user?.role === "employee" && (
              <Link
                to="/employee-dashboard/add-leave"
                className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg hover:scale-105 transform transition"
                aria-label="Request Leave"
              >
                + Request Leave ✍️
              </Link>
            )}
          </header>

          {/* Search */}
          <div className="mb-6">
            <input
              type="search"
              placeholder="🔍 Search by Leave Type"
              className="w-full md:w-1/3 p-3 border border-indigo-300 rounded-xl shadow-inner focus:ring-4 focus:ring-teal-400 focus:outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-indigo-200 shadow-md">
            <table className="min-w-[700px] w-full bg-white rounded-xl text-sm sm:text-base">
              <thead className="bg-gradient-to-r from-teal-100 to-cyan-100 text-indigo-700 text-sm uppercase font-semibold">
                <tr>
                  <th className="py-4 px-6 text-left">#️⃣</th>
                  <th className="py-4 px-6 text-left">Leave Type</th>
                  <th className="py-4 px-6 text-left">From</th>
                  <th className="py-4 px-6 text-left">To</th>
                  <th className="py-4 px-6 text-left">Reason</th>
                  <th className="py-4 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100 text-gray-700">
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave, i) => (
                    <tr
                      key={leave._id}
                      className="hover:bg-indigo-50 transition cursor-pointer"
                      title={`Reason: ${leave.reason || "No additional notes"}`}
                    >
                      <td className="py-3 px-6 font-semibold">{i + 1}</td>
                      <td className="py-3 px-6 font-medium">{leave.leaveType}</td>
                      <td className="py-3 px-6">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-gray-600 truncate max-w-xs">
                        {leave.reason || "—"}
                      </td>
                      <td className="py-3 px-6">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full select-none ${
                            leave.status === "approved"
                              ? "bg-green-200 text-green-800"
                              : leave.status === "rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 text-indigo-400 font-medium text-lg"
                    >
                      😔 No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TList;
