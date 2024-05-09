import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = ({setToken}) => {

  const handleLogout = () => {
    // Clear token from local storage or perform any other logout action
    localStorage.removeItem("token");
    setToken(null);
    // Redirect to login page if needed
    // window.location.href = "/login";
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Task Manager
          </span>
        </div>

        <button 
          onClick={handleLogout}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
