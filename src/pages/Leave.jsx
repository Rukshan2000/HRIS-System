import React from 'react';
import Summary from '../components/Summary'; // Import the Summary component
import AddLeave from '../components/AddLeave ';
import LeaveApprovedStatus from '../components/LeaveApprovedStatus ';
import LeaveApprove from '../components/LeaveApprove';
import { FaUser } from 'react-icons/fa'; // Import the user icon

const Leave = () => {
    // Function to handle profile icon click
    const handleProfileClick = () => {
        // Navigate to the admin profile page
        window.location.href = '/adminprofile';
    };

    return (
        <div>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
                <h1 className="text-3xl font-bold text-white">Leave</h1>
                <div className="flex items-center">
                    {/* Profile icon with click event */}
                    <FaUser
                        className="mr-4 text-xl text-white"
                        onClick={handleProfileClick} // Attach onClick event handler
                    />
                    {/* Add your profile menu here */}
                </div>
            </div>
            <Summary />
            <LeaveApprove />
        </div>
    );
};

export default Leave;
