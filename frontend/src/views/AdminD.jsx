import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSB from "../components/dashboard/AdminSB";
import Navbar from "../components/dashboard/Navbar";

const AdminD = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AdminSB sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1">
        {/* Navbar with hamburger */}
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminD;
