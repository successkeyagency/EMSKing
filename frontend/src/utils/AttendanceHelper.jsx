// utils/AttendanceHelper.js
import React from "react";
import axios from "axios";

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        "http://localhost:4000/api/attendance/update",
        { employeeId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      statusChange();
    } catch (error) {
      alert(error?.response?.data?.error || error.message);
    }
  };

  const statusStyles = {
    Present: "bg-blue-500",
    Absent: "bg-rose-500",
    Sick: "bg-amber-500",
    Leave: "bg-indigo-500",
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {["Present", "Absent", "Sick", "Leave"].map((item) => (
        <button
          key={item}
          onClick={() => updateStatus(item)}
          className={`text-white px-3 py-1 text-sm rounded-md shadow-sm ${
            status === item ? statusStyles[item] : "bg-gray-200 text-gray-700"
          } transition duration-200`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Department",
    selector: (row) => row.department,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    grow: 2,
  },
];
