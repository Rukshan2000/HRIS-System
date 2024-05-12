import React from 'react';
import { FaUser } from 'react-icons/fa'; // Import the FaUser icon
import AddEmployee from '../components/AddEmployee';
import UpdateUser from '../components/UpdateUser';
import SubNav from '../components/SubNav';

const AddEmployees = () => {
    // Function to handle profile icon click
    const handleProfileClick = () => {
        // Navigate to the admin profile page
        window.location.href = '/adminprofile';
    };

    return (
        <div>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
                <h1 className="text-3xl font-bold text-white">Employee Update</h1>
                <div className="flex items-center">
                    {/* Profile icon with click event */}
                    <FaUser
                        className="mr-4 text-xl text-white"
                        onClick={handleProfileClick} // Attach onClick event handler
                    />
                    {/* Add your profile menu here */}
                </div>
            </div>
            <SubNav />
            <UpdateUser />
        </div>
    );
};

export default AddEmployees;
