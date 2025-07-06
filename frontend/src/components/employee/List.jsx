import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        const res = await axios.get("https://emsking-backend-server.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          let count = 1;
          const formatted = res.data.employees.map((emp) => ({
            _id: emp._id,
            sno: count++,
            name: emp.userId?.name || "Unknown",
            dep_name: emp.department?.dep_name || "No Department",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            profileImageUrl: emp.userId?.profileImage
              ? `https://emsking-backend-server.vercel.app/${emp.userId.profileImage}`
              : "/default-profile.png", 
          }));

          setEmployees(formatted);
        }
      } catch (err) {
        console.error(err.message);
        toast.error("❌ Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployeeData();
  }, []);

  const handleFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm),
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
  };

  return (
    <div className="lg:pl-64 min-h-screen bg-gray-50 dark:bg-gray-900 text-sm">
      <section className="px-3 sm:px-5 md:px-6 py-6 max-w-[1600px] w-full mx-auto text-gray-800 dark:text-gray-100">
        <ToastContainer />

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-semibold text-orange-600 dark:text-orange-400">
            👥 Manage Employees
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            View and manage your team
          </p>
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search..."
            onChange={handleFilter}
            className="w-full sm:w-1/2 px-3 py-2 text-xs border border-orange-300 dark:border-orange-500 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Link
              to="/admin-dashboard/add-employee"
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 text-xs rounded-md font-medium text-center"
            >
              ➕ Add
            </Link>
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1.5 text-xs rounded-md"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm col-span-full">
              Loading employees...
            </p>
          )}
          {!loading && filteredEmployees.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm col-span-full">
              No employees found.
            </p>
          )}
          {!loading &&
            filteredEmployees.map((emp) => (
              <div
                key={emp._id}
                className="bg-orange-50 dark:bg-gray-800 rounded-md shadow-md p-4 flex flex-col gap-3 transition hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={emp.profileImageUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div className="truncate">
                    <h2 className="font-semibold text-sm text-orange-600 dark:text-orange-400 truncate">
                      {emp.name}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {emp.dep_name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      DOB: {emp.dob}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-orange-200 dark:border-orange-700 flex justify-end">
                  <EmployeeButtons Id={emp._id} />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default List;
