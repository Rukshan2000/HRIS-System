import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaUserEdit,
    FaFile,
    FaSignOutAlt, // Add sign-out icon
    FaPaperclip
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';



const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },

        {
            path: "/payroll",
            name: "Payroll",
            icon: <FaUserAlt />
        },
        {
            path: "/employee",
            name: "Employee",
            icon: <FaRegChartBar />
        },
        {
            path: "/leave",
            name: "Leave",
            icon: <FaCommentAlt />
        },
        {
            path: "/designations",
            name: "Designations",
            icon: <FaShoppingBag />
        },
        {
            path: "/tasks",
            name: "Tasks",
            icon: <FaThList />
        },
        {
            path: "/employeeupdate",
            name: "Manage Employee",
            icon: <FaUserEdit />
        },

        {
            path: "/reportpage",
            name: "Data Reports",
            icon: <FaPaperclip />
        },
        {
            path: "/mydashboard",
            name: "My dashboard",
            icon: <FaFile />
        },
   
    ];
    
    const [auth,setAuth] = useState(false);
    const navigate = useNavigate()


    const handleDelete = () => {
       
      };
    

    const handleSignOut = () => {
        localStorage.removeItem('token');  // Remove the JWT in local storage
        navigate('/splashpage');
    };

    return (
        <div className="flex h-screen">
            <div style={{ width: isOpen ? "250px" : "50px", overflowY: "hidden" }} className="flex flex-col text-white bg-gray-800">
                <div className="flex items-center justify-between p-4">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="text-2xl font-bold"> <span className="text-green-500">Flexy</span> <span className="text-white">HRIS</span></h1>
                    <div>
                        <FaBars onClick={toggle} className="text-2xl cursor-pointer" />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className="flex items-center px-4 py-2 hover:bg-gray-700"
                            activeClassName="bg-gray-700"
                        >
                            <div className="mr-4">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="">{item.name}</div>
                        </NavLink>
                    ))
                }
                {/* Sign-out button */}
                <button onClick={handleSignOut} className="flex items-center justify-center px-4 py-2 mt-auto bg-gray-700 hover:bg-gray-600">
                    {isOpen ? (
                        <>
                            <FaSignOutAlt className="mr-2 text-white text-1xl" />
                            <span className="text-white">Sign Out</span>
                        </>
                    ) : (
                        <>
                            <FaSignOutAlt className="mr-1" />
                            <span className="text-white"></span>
                        </>
                    )}
                </button>
            </div>
            <main style={{ overflowY: "auto" }} className="flex-grow">{children}</main>
        </div>
    );
};

export default Sidebar;
