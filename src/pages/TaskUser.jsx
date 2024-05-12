// MyDashboard.jsx
import React from 'react';
import TopNav from '../components/TopNav';
import UserTask  from '../components/UserTask';
import UserTaskHistory  from '../components/UserTaskHistory';


const MyDashboard = () => {
    return (
        <div>
            <TopNav/>
            <UserTask/>
            <UserTaskHistory/>


        </div>
    );
};

export default MyDashboard;
