import React, { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const TTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://emsking-backend-server.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let count = 1;
        const transformed = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: count++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "Unknown",
          leaveType: leave.leaveType || "N/A",
          department: leave.employeeId?.department?.dep_name || "No Department",
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24),
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(transformed);
        setFilteredLeaves(transformed);
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Error fetching leave data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(keyword),
    );
    setFilteredLeaves(filtered);
  };

  return (
    <div className="lg:pl-64">
      <div className="bg-gray-50 px-4 sm:px-6 py-6 min-h-screen">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl text-white shadow-lg mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">🗂️ Leave Dashboard</h2>
          <p className="mt-1 text-sm sm:text-base">
            Monitor and manage employee leaves effortlessly
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search by Employee ID"
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm text-sm"
            onChange={handleSearch}
          />
          <div className="flex gap-2 flex-wrap justify-end w-full md:w-auto">
            {["Pending", "Approved", "Rejected", "all"].map((status) => (
              <button
                key={status}
                onClick={() =>
                  status === "all"
                    ? setFilteredLeaves(leaves)
                    : setFilteredLeaves(
                        leaves.filter(
                          (leave) =>
                            leave.status.toLowerCase() === status.toLowerCase(),
                        ),
                      )
                }
                className="px-3 py-1.5 text-xs sm:text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              >
                {status === "all" ? "🔄 Reset" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Card view for all screen sizes */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredLeaves.length === 0 ? (
            <p className="text-center text-gray-700">No records found.</p>
          ) : (
            filteredLeaves.map((leave) => (
              <div
                key={leave._id}
                className="bg-white rounded-lg shadow-md border p-4"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                  <h3 className="text-base font-semibold text-indigo-700">
                    {leave.employeeId} - {leave.name}
                  </h3>
                  <span
                    className={`text-xs font-medium rounded-full px-3 py-1 ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {leave.department}
                  </p>
                  <p>
                    <span className="font-medium">Leave Type:</span>{" "}
                    {leave.leaveType}
                  </p>
                  <p>
                    <span className="font-medium">Total Days:</span>{" "}
                    {leave.days}
                  </p>
                </div>
                <div className="mt-3">{leave.action}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TTable;
