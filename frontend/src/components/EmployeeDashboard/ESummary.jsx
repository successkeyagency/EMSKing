import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaCloudSun, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import { format } from 'date-fns';
import { assets } from '../../assets/assets';

const getRandomTodos = () => [
  "Finish onboarding form",
  "Review department updates",
  "Schedule performance review",
  "Check internal emails",
  "Update profile picture",
];

const ESummary = () => {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());
  const [todos, setTodos] = useState(getRandomTodos());
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Splash timeout (set duration here)
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const formattedDate = format(time, 'EEEE, MMMM do yyyy');
  const formattedTime = format(time, 'hh:mm:ss a');
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (showSplash) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4">
      <img
        src={assets.successkeyAgency_logo}
        alt="SuccessKeyAgency Logo"
        className="w-28 sm:w-36 md:w-44 h-auto object-contain mb-6 drop-shadow-md"
      />

      <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-green-500 border-dashed rounded-full animate-spin mb-6" />

      <p className="text-center text-base sm:text-lg font-semibold text-gray-700">
        <span className="text-gray-800">Created by </span>
        <span className="text-green-600">SuccessKeyAgency LLC</span>
      </p>
    </div>
  );
}


  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-100 font-sans text-gray-900">

      <section className="max-w-3xl mx-auto mb-8 md:mb-10 rounded-xl bg-white shadow-neumorph flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="bg-indigo-600 text-white p-4 sm:p-5 rounded-full shadow-inner">
          <FaUser size={28} className="sm:size-[36px]" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-base sm:text-lg text-indigo-700 font-semibold">Hey there,</p>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{user.name}!</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10">
        <div className="bg-white rounded-xl shadow-neumorph p-4 flex flex-col items-center text-center">
          <FaCalendarAlt className="text-indigo-500 mb-2" size={24} />
          <h2 className="text-indigo-700 font-semibold mb-1 text-sm sm:text-base">Today’s Date</h2>
          <p className="text-base sm:text-lg font-medium">{formattedDate}</p>
        </div>

        <div className="bg-white rounded-xl shadow-neumorph p-4 flex flex-col items-center text-center">
          <FaClock className="text-indigo-500 mb-2" size={24} />
          <h2 className="text-indigo-700 font-semibold mb-1 text-sm sm:text-base">Current Time</h2>
          <p className="text-base sm:text-lg font-medium">{formattedTime}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{timeZone}</p>
        </div>

        <div className="bg-white rounded-xl shadow-neumorph p-4 flex flex-col items-center text-center">
          <FaCloudSun className="text-indigo-500 mb-2" size={24} />
          <h2 className="text-indigo-700 font-semibold mb-1 text-sm sm:text-base">Weather</h2>
          <p className="text-base sm:text-lg font-medium">22°C, Sunny</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">St. Louis, MO</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-neumorph p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-indigo-700 flex items-center gap-3">
          <span role="img" aria-label="notes">📝</span> Your TODO List
        </h3>
        <ul className="space-y-3 sm:space-y-4">
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 sm:gap-4 bg-indigo-50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-inner cursor-pointer hover:bg-indigo-100 transition"
              title="Click to mark as done (not functional)"
            >
              <FaCheckCircle className="text-indigo-400" size={18} />
              <span className="font-medium text-indigo-900 text-sm sm:text-base">{todo}</span>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .shadow-neumorph {
          box-shadow:
            8px 8px 15px #bebebe,
            -8px -8px 15px #ffffff;
        }
      `}</style>
    </div>
  );
};

export default ESummary;
