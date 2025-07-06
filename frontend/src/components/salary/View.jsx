import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const isAdmin = user?.role === "admin" || user?.email === "BossMan@gmail.com";


  useEffect(() => {
    const getSalaries = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/salary/${id}/${user.role}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (data.success) {
          setSalaries(data.salary);
          setFiltered(data.salary);
          setFadeIn(true);
        }
      } catch (err) {
        if (err.response && !err.response.data.success) {
          alert(err.message);
        }
      }
    };
    getSalaries();
  }, [id, user.role]);

  const searchByEmpId = (query) => {
    const filteredRecords = salaries.filter(({ employeeId }) =>
      employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredRecords);
  };

  return (
    <div className={isAdmin ? "lg:pl-64" : ""}>
    <section
      className={`max-w-6xl mx-auto mt-10 px-4 sm:px-6 md:px-8 py-6 bg-green-50 rounded-lg shadow-lg transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800 drop-shadow-md select-none">
          💰 Salary Ledger 💵
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-transform active:scale-95"
          aria-label="Return to previous page"
        >
          ← Back
        </button>
      </header>

      <div className="mb-6">
        <input
          type="search"
          placeholder="🔎 Search Employee info..."
          className="w-full px-4 py-3 rounded-md border-2 border-green-300 focus:outline-none focus:border-green-600 placeholder:text-green-500"
          onChange={(e) => searchByEmpId(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-green-700 font-semibold text-lg mt-10 select-none">
          No matching records found... 😞
        </p>
      ) : (
        <>
          {/* Desktop / Tablet Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-green-200 shadow-sm">
            <table className="min-w-[640px] w-full text-left text-green-900">
              <thead className="bg-green-200 uppercase tracking-wide font-semibold text-sm select-none">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Employee ID</th>
                  <th className="p-3">Basic Salary</th>
                  <th className="p-3">Allowances</th>
                  <th className="p-3">Deductions</th>
                  <th className="p-3">Net Pay</th>
                  <th className="p-3">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100 text-sm sm:text-base">
                {filtered.map((salary, i) => (
                  <tr
                    key={salary.id}
                    className="bg-green-50 hover:bg-green-100 transition-colors cursor-default"
                  >
                    <td className="p-3 font-mono">{i + 1}</td>
                    <td className="p-3 font-semibold">{salary.employeeId.employeeId}</td>
                    <td className="p-3">${salary.basicSalary.toLocaleString()}</td>
                    <td className="p-3">${salary.allowances.toLocaleString()}</td>
                    <td className="p-3 text-red-600">-${salary.deductions.toLocaleString()}</td>
                    <td className="p-3 font-bold text-green-800">${salary.netSalary.toLocaleString()}</td>
                    <td className="p-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Friendly Cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((salary, i) => (
              <div
                key={salary.id}
                className="bg-green-50 rounded-lg shadow p-4 border border-green-200"
              >
                <p className="font-mono text-green-700 mb-1">Record #{i + 1}</p>
                <p>
                  <span className="font-semibold text-green-900">Employee ID:</span>{" "}
                  {salary.employeeId.employeeId}
                </p>
                <p>
                  <span className="font-semibold text-green-900">Basic Salary:</span>{" "}
                  ${salary.basicSalary.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-green-900">Allowances:</span>{" "}
                  ${salary.allowances.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-red-600">Deductions:</span>{" "}
                  -${salary.deductions.toLocaleString()}
                </p>
                <p className="font-bold text-green-800">
                  Net Pay: ${salary.netSalary.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-green-900">Payment Date:</span>{" "}
                  {new Date(salary.payDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
    </div>
  );
};

export default View;
