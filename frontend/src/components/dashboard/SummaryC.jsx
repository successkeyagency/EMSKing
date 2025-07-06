import React from "react";

const SummaryC = ({ icon, iconBg, label, value }) => {
  return (
    <div className="min-w-[180px] bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-gray-100">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl flex-shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-500 font-semibold text-sm">{label}</p>
        <p className="text-xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
export default SummaryC;
