import React from 'react';
import AddEmp from '../components/AddEmp';

import { FaUser } from 'react-icons/fa'; // Import the user icon

const Employee = () => {
    // Function to handle profile icon click
    const handleProfileClick = () => {
        // Navigate to the admin profile page
        window.location.href = '/adminprofile';
    };

    return (
        <div>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <h1 className="text-3xl font-bold">Employee</h1>
                <div className="flex items-center">
                    {/* Profile icon with click event */}
                    <FaUser
                        className="mr-4 text-xl text-gray-600 cursor-pointer"
                        onClick={handleProfileClick} // Attach onClick event handler
                    />
                    {/* Add your profile menu here */}
                </div>
            </div>
            <AddEmp />
        </div>
    );
};

export default Employee;
