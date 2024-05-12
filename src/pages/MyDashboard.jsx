// MyDashboard.jsx
import React from 'react';
import TopNav from '../components/TopNav';
import UserSummery from '../components/UserSummery';
import DisplayAnn from '../components/DisplayAnn';


const MyDashboard = () => {
    return (
        <div>
            <TopNav/>            
            <UserSummery/>
            <DisplayAnn/>

        </div>
    );
};

export default MyDashboard;
