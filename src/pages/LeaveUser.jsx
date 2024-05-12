// MyDashboard.jsx
import React from 'react';
import TopNav from '../components/TopNav';
import LeaveApprovedStatus from '../components/LeaveApprovedStatus ';
import AddLeave from '../components/AddLeave ';



const MyDashboard = () => {
    return (
        <div>
            <TopNav/>
            <AddLeave/>
            <LeaveApprovedStatus/>
        </div>
    );
};

export default MyDashboard;
