import React from 'react';
import { useAuth } from '../../context/authContext';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { assets } from '../../assets/assets';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md h-16 flex justify-between items-center px-6 w-full mx-auto">
      
      <button
        onClick={toggleSidebar}
        className="lg:hidden mr-4 text-white text-2xl focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <FiMenu />
      </button>

   
<div className="flex items-center flex-1">
  <img
    src={assets.EMSKing_Logo}
    alt="SuccessKey Agency Logo"
    className="h-10 w-auto sm:h-14 md:h-16 mr-4"
  />
</div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-light text-white/80">Welcome back,</p>
          <p className="font-bold">{user.name}</p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex gap-2 items-center bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
          aria-label="Logout"
          title="Logout"
        >
          <FiLogOut className="text-base" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
