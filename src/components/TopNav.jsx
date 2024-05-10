import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleButtonClick = (path) => {
    // Navigate to the specified path
    navigateTo(path);
  };

  const handleLogout = () => {
    // Redirect to the logout page
    navigateTo('/splashpage');
  };

  return (
    <nav className="p-5 bg-gray-900 shadow md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <span className="text-lg cursor-pointer font-Poppins">
          <span className="font-bold text-green-500 font-Poppins">Flexy</span>{' '}
          <span className="font-bold text-white font-Poppins">HRIS</span>
        </span>

        <span className="block mx-2 text-3xl cursor-pointer md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </span>
      </div>

      <ul className={`md:flex md:items-center  md:static absolute bg-gray-900 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${isOpen ? 'top-80px opacity-100' : 'top-[-400px] opacity-0'} justify-center`}>
        <li className="mx-4 my-6 md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/mydashboard")}>
            Home
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/emptask")}>
            Task
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/emppayroll")}>
            Payroll
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/empleave")}>
            Leave
          </button>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/empprofile")}>
            Profile
          </button>
        </li>

        <button onClick={handleLogout} className="px-3 py-2 text-lg font-medium text-gray-900 bg-white rounded-md hover:bg-gray-900 hover:text-white">
          <FaSignOutAlt className="mr-1" />
        </button>
      </ul>
    </nav>
  );
};

export default TopNav;
