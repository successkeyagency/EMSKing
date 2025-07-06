import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const EmployeSB = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { to: "/employee-dashboard", label: "📊 Dashboard" },
    { to: `/employee-dashboard/profile/${user._id}`, label: "🧑‍💼 My Profile" },
    { to: `/employee-dashboard/leaves/${user._id}`, label: "🌴 Leaves" },
    { to: `/employee-dashboard/salary/${user._id}`, label: "💸 Salary" },
    { to: "/employee-dashboard/setting", label: "⚙️ Settings" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-green-900 to-green-700 text-white fixed top-16 left-0 w-full z-30 shadow-lg">
        <ul className="hidden md:flex max-w-screen-sm mx-auto justify-between px-6 h-14 items-center">
          {navItems.map((item, idx) => (
            <li key={idx} className="flex-shrink-0">
              <NavLink
                to={item.to}
                end={item.to === "/employee-dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out text-md font-medium whitespace-nowrap ${
                    isActive
                      ? "bg-green-500 font-semibold shadow-lg drop-shadow-[0_0_6px_rgba(34,197,94,0.9)]"
                      : "text-green-100 hover:bg-green-600 hover:text-white"
                  }`
                }
                title={item.label}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="md:hidden flex items-center justify-between px-4 h-12 max-w-screen-sm mx-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <ul className="md:hidden bg-green-800 max-w-screen-sm mx-auto px-4 pb-4 space-y-2">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.to}
                  end={item.to === "/employee-dashboard"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium whitespace-nowrap ${
                      isActive
                        ? "bg-green-500 font-semibold shadow-lg drop-shadow-[0_0_6px_rgba(34,197,94,0.9)]"
                        : "text-green-100 hover:bg-green-600 hover:text-white"
                    }`
                  }
                  title={item.label}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 border-t border-green-700 text-xs text-green-300 text-center italic">
              Created by SuccessKeyAgency LLC
            </li>
          </ul>
        )}
      </nav>

      <div className="hidden md:block mt-[70px] text-center text-xs  text-green-900 italic">
        Created by{" "}
        <a
          href="https://successkeyagency.com"
          className="underline hover:text-green-700"
        >
          SuccessKeyAgency
        </a>
      </div>
    </>
  );
};

export default EmployeSB;
