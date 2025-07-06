"use client";
import React, { useEffect, useState } from "react";
import SummaryC from "./SummaryC";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaCloudSun,
  FaListUl,
} from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import { assets } from "../../assets/assets";

const AdminS = () => {
  const [summary, setSummary] = useState(null);
  const [time, setTime] = useState(new Date());
  const [showSplash, setShowSplash] = useState(true);

  const todos = [
    "Prepare payroll reports",
    "Send company newsletter",
    "Schedule team meeting",
    "Update employee records",
    "Plan training session",
    "Clean up database entries",
    "Review leave requests",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://emsking-backend-server.vercel.app/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setSummary(data);
      } catch (err) {
        if (err.response) alert(err.response.data.error);
        console.error(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-black z-50">
        <img
          src={assets.successkeyAgency_logo}
          alt="SuccessKeyAgency Logo"
          className="w-32 h-32 mb-4"
        />
        <p className="text-green-500 text-lg font-semibold">
          <span className="text-white">Created by </span> SuccessKeyAgency LLC
        </p>
        <div className="mt-4 w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!summary)
    return (
      <p className="text-center py-10 text-lg animate-pulse text-gray-600">
        Loading data... ⏳
      </p>
    );

  return (
    <div className="lg:pl-64">
      <main className="max-w-6xl mx-auto p-6 space-y-12 font-sans">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-center flex justify-center items-center gap-2">
            🚀 Company Dashboard
          </h1>
          <p className="text-center text-gray-500">
            Quick glance at your company stats
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-white">
          <div className="flex items-center bg-indigo-600 p-4 rounded-lg shadow">
            <FaCalendarAlt className="text-3xl mr-4" />
            <div>
              <p className="text-sm">Today</p>
              <p className="font-bold text-lg">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-blue-500 p-4 rounded-lg shadow">
            <FaClock className="text-3xl mr-4 text-white" />
            <div className="min-w-0">
              <p className="text-sm text-white">Time</p>
              <p className="font-bold text-lg text-white break-words">
                {format(time, "hh:mm:ss a")}
                <br />
                <span className="text-xs">
                  ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center bg-yellow-500 p-4 rounded-lg shadow">
            <FaCloudSun className="text-3xl mr-4" />
            <div>
              <p className="text-sm">Weather</p>
              <p className="font-bold text-lg">🌤 26°C — Sunny (static)</p>
            </div>
          </div>

          <div className="flex items-center bg-green-500 p-4 rounded-lg shadow">
            <FaListUl className="text-3xl mr-4" />
            <div>
              <p className="text-sm">Tasks</p>
              <p className="font-bold text-lg">{todos.length} Todos</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center py-2">
          <SummaryC
            icon={<FaUsers />}
            iconBg="bg-gradient-to-r from-teal-400 to-teal-600"
            label="Employees"
            value={summary.totalEmployees}
            className="min-w-[200px] flex-1"
          />
          <SummaryC
            icon={<FaBuilding />}
            iconBg="bg-gradient-to-r from-yellow-400 to-yellow-600"
            label="Departments"
            value={summary.totalDepartments}
            className="min-w-[200px] flex-1"
          />
          <SummaryC
            icon={<FaMoneyBillWave />}
            iconBg="bg-gradient-to-r from-red-400 to-red-600"
            label="Monthly Payroll"
            value={`$${summary.totalSalary.toLocaleString()}`}
            className="min-w-[200px] flex-1"
          />
        </div>

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">
            📅 Leave Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
            <SummaryC
              icon={<FaFileAlt />}
              iconBg="bg-gradient-to-r from-cyan-400 to-cyan-600"
              label="Applied"
              value={summary.leaveSummary.appliedFor}
            />
            <SummaryC
              icon={<FaCheckCircle />}
              iconBg="bg-gradient-to-r from-green-400 to-green-600"
              label="Approved"
              value={summary.leaveSummary.approved}
            />
            <SummaryC
              icon={<FaHourglassHalf />}
              iconBg="bg-gradient-to-r from-yellow-400 to-yellow-600"
              label="Pending"
              value={summary.leaveSummary.pending}
            />
            <SummaryC
              icon={<FaTimesCircle />}
              iconBg="bg-gradient-to-r from-red-400 to-red-600"
              label="Rejected"
              value={summary.leaveSummary.rejected}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">🗓 Calendar</h3>
            <div className="border rounded p-4 text-center text-gray-500 min-h-[150px]">
              <p>📅 Calendar UI coming soon...</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">✅ TODO List</h3>
            <ul className="space-y-2 max-h-[200px] overflow-y-auto">
              {todos.map((task, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-500" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminS;
