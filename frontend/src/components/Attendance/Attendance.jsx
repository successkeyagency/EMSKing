import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState(null);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let count = 1;
        const formatted = res.data.attendance.map((entry) => ({
          sno: count++,
          employeeId: entry.employeeId?.employeeId || "N/A",
          name: entry.employeeId?.userId?.name || "Unknown",
          department: entry.employeeId?.department?.dep_name || "No Department",
          action: (
            <AttendanceHelper
              status={entry.status}
              employeeId={entry.employeeId?.employeeId || ""}
              statusChange={fetchAttendance}
            />
          ),
        }));

        setAttendance(formatted);
        setFilteredAttendance(formatted);
      }
    } catch (error) {
      alert(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = attendance.filter((emp) =>
      emp.department.toLowerCase().includes(value),
    );
    setFilteredAttendance(filtered);
  };

  if (!filteredAttendance)
    return <div className="p-8 text-center text-lg">Loading...</div>;

  return (
    <div className="lg:pl-64 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 rounded-xl text-white shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-center">
          📅 Attendance Dashboard
        </h2>
        <p className="text-center mt-2 text-lg">
          Easily manage and track employee attendance
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="🔍 Filter by Department"
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3 shadow-sm"
          onChange={handleFilter}
        />
        <p className="text-md font-medium text-gray-700">
          Today:{" "}
          <span className="text-black font-bold underline">
            {new Date().toISOString().split("T")[0]}
          </span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-md transition duration-300"
        >
          📊 View Report
        </Link>
      </div>

      {/* Desktop DataTable - visible md and up */}
      <div className="hidden md:block bg-white border rounded-xl shadow-lg p-4 max-w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredAttendance}
          progressPending={loading}
          pagination
          highlightOnHover
          dense
          customStyles={{
            rows: {
              style: {
                minHeight: "56px",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#f3f4f6",
                fontWeight: "bold",
              },
            },
            tableWrapper: {
              style: {
                // Ensure table can scroll horizontally if needed
                display: "block",
                overflowX: "auto",
                whiteSpace: "nowrap",
              },
            },
          }}
        />
      </div>

      {/* Mobile List View - visible below md */}
      <div className="md:hidden">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredAttendance.length === 0 ? (
          <p className="text-center text-gray-700">No records found.</p>
        ) : (
          filteredAttendance.map((entry) => (
            <div
              key={entry.employeeId}
              className="mb-4 p-4 border rounded-lg shadow-sm bg-gradient-to-br from-teal-50 to-cyan-50"
            >
              <p className="font-semibold text-lg mb-1">
                {entry.employeeId} - {entry.name}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Department: {entry.department}
              </p>
              <div>{entry.action}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Attendance;
