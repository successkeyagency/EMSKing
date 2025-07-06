import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const menuItems = [
  { to: "/admin-dashboard", label: "📊 Dashboard" },
  { to: "/admin-dashboard/employees", label: "👥 Employees" },
  { to: "/admin-dashboard/departments", label: "🏢 Departments" },
  { to: "/admin-dashboard/leaves", label: "🌴 Leave" },
  { to: "/admin-dashboard/salary/add", label: "💵 Salary" },
  { to: "/admin-dashboard/attendance", label: "🗓️ Attendance" },
  { to: "/admin-dashboard/attendance-report", label: "📄 Reports" },
  { to: "/admin-dashboard/setting", label: "⚙️ Settings" },
];

const AdminSB = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 shadow-xl rounded-br-3xl flex flex-col justify-between z-[1]">
        <header className="flex items-center justify-center h-20 bg-white rounded-tr-3xl shadow-lg select-none p-4">
          <img
            src={assets.EMSKing_Logo}
            alt="SuccessKey Agency Logo"
            className="h-14 w-auto sm:h-20"
          />
        </header>

        <nav className="flex-1 overflow-y-auto mt-6 px-6 space-y-4">
          {menuItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3 rounded-xl text-lg font-semibold transition 
                ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "text-cyan-300 hover:bg-cyan-700 hover:text-white hover:shadow-md"
                }`
              }
              onClick={() => {
                if (sidebarOpen) toggleSidebar();
              }}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <footer className="p-4 text-center text-xs text-white select-none">
          © 2025 All rights reserved by{" "}
          <a
            href="https://successkeyagency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-green-500 hover:text-cyan-200 transition-colors duration-200"
          >
            SuccessKeyAgency LLC
          </a>
        </footer>
      </aside>

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 shadow-xl rounded-br-3xl flex flex-col transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <header className="flex items-center justify-between h-16 bg-white rounded-tr-3xl shadow-lg px-4 select-none">
          <img
            src={assets.EMSKing_Logo}
            alt="SuccessKey Agency Logo"
            className="h-12 w-auto sm:h-16"
          />
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="text-blue-900 text-3xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </header>

        <nav className="flex-1 overflow-y-auto mt-6 px-6 space-y-4">
          {menuItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin-dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-3 rounded-xl text-lg font-semibold transition 
                ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "text-cyan-300 hover:bg-cyan-700 hover:text-white hover:shadow-md"
                }`
              }
              onClick={toggleSidebar}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <footer className="p-4 text-center text-xs text-cyan-400 select-none">
          © 2025 All rights reserved by{" "}
          <a
            href="https://successkeyagency.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-cyan-200 transition-colors duration-200"
          >
            SuccessKeyAgency LLC
          </a>
        </footer>
      </aside>
    </>
  );
};

export default AdminSB;
