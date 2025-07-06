import axios from "axios";
import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const res = await axios.get(
        `http://localhost:4000/api/attendance/report?${query.toString()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (res.data.success) {
        if (skip === 0) {
          setReport(res.data.groupData);
        } else {
          setReport((prev) => ({ ...prev, ...res.data.groupData }));
        }
      }
    } catch (error) {
      alert(error.message || "Error fetching report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadmore = () => setSkip((prev) => prev + limit);

  return (
    <div className="lg:pl-64 min-h-screen p-8 bg-gray-50 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-teal-700 mb-6">
        📊 Attendance Report
      </h2>

      <div className="mb-6">
        <label className="block text-md font-semibold text-gray-700 mb-2">
          🗓️ Filter by Date
        </label>
        <input
          type="date"
          className="border rounded px-4 py-2 bg-white w-full max-w-xs"
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0);
          }}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block">
            {Object.entries(report).map(([date, records]) => (
              <div key={date} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  📅 {date}
                </h3>
                <div className="overflow-auto border rounded shadow-sm">
                  <table className="min-w-full text-sm bg-white text-left border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">🆔 Employee ID</th>
                        <th className="px-4 py-2 border">👤 Name</th>
                        <th className="px-4 py-2 border">🏢 Department</th>
                        <th className="px-4 py-2 border">📌 Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((rec, i) => (
                        <tr
                          key={rec.employeeId || i}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-2 border">{i + 1}</td>
                          <td className="px-4 py-2 border">
                            {rec.employeeId || "N/A"}
                          </td>
                          <td className="px-4 py-2 border">
                            {rec.employeeName || "Unnamed"}
                          </td>
                          <td className="px-4 py-2 border">
                            {rec.departmentName || "Unknown"}
                          </td>
                          <td className="px-4 py-2 border font-medium">
                            {(rec.status || "Unknown").toUpperCase()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile List */}
          <div className="block sm:hidden">
            {Object.entries(report).map(([date, records]) => (
              <div key={date} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  📅 {date}
                </h3>
                {records.map((rec, i) => (
                  <div
                    key={rec.employeeId || i}
                    className="mb-4 p-4 border rounded shadow-sm bg-white"
                  >
                    <p className="font-semibold">
                      #{i + 1} -{" "}
                      <span className="text-teal-600">
                        {rec.employeeName || "Unnamed"}
                      </span>
                    </p>
                    <p>
                      <strong>ID:</strong> {rec.employeeId || "N/A"}
                    </p>
                    <p>
                      <strong>Department:</strong>{" "}
                      {rec.departmentName || "Unknown"}
                    </p>
                    <p className="font-medium text-indigo-600">
                      Status: {(rec.status || "Unknown").toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleLoadmore}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded shadow font-semibold"
        >
          ⬇️ Load More
        </button>
      </div>
    </div>
  );
};

export default AttendanceReport;
