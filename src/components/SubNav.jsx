import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const SubNav = () => {
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
    <nav className="sticky top-0 z-10 p-5 bg-gray-900 shadow md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between">
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

      <ul className={`md:flex md:items-center justify-center md:static absolute bg-gray-900 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${isOpen ? 'top-80px opacity-100' : 'top-[-400px] opacity-0'}`}>
      <li className="mx-4 my-6 text-center md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/employeeupdate")}>
            Employee Update
          </button>
        </li>
        <li className="mx-4 my-6 text-center md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/SecureLayer")}>
            Add Employee
          </button>
        </li>

        <li className="mx-4 my-6 text-center md:my-0">
          <button className="text-base font-bold text-white duration-500 hover:text-green-500 font-Poppins" onClick={() => handleButtonClick("/announcement")}>
            Announcement
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default SubNav;
