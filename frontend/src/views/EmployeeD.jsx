import React from "react";
import { Outlet } from "react-router-dom";
import EmployeSB from "../components/EmployeeDashboard/EmployeSB";
import ENavbar from "../components/EmployeeDashboard/ENavbar";

const EmployeeD = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <ENavbar />
        <EmployeSB />
      </div>

      <main className="flex-1 p-6 mt-32">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeD;
