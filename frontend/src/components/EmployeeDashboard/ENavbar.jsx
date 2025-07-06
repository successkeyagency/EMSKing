import React from 'react';
import { useAuth } from '../../context/authContext';
import { FiLogOut } from 'react-icons/fi';
import { assets } from '../../assets/assets';

const ENavbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-700/70 backdrop-blur-sm text-white h-16 flex items-center justify-between px-6 shadow-md border-b border-green-800">
      <div className="flex items-center gap-2"> 
        <img
            src={assets.successkeyAgency_logo}
            alt="SuccessKey Agency Logo"
            className="h-10 w-auto sm:h-20"
          />
        <div className="bg-white/10 px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-inner flex items-center gap-2">
          💼 Employee Panel 
         
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col text-right leading-tight">
          <span className="text-xs text-white/70">👋 Welcome,</span>
          <span className="text-md font-semibold">{user?.name || "Employee"}</span>
        </div>

        <button
          onClick={logout}
          className="bg-green-600 hover:bg-green-800 transition-all duration-200 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ENavbar;
