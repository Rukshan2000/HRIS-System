import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaCalendarTimes, FaTasks } from 'react-icons/fa';
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const zoomInAnimation = keyframes`${zoomIn}`;

const AnimatedDiv = styled.div`
    animation: 1s ${zoomInAnimation};
`;

const Summary = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [presentToday, setPresentToday] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);
    const [onLeaveToday, setOnLeaveToday] = useState(0);

    useEffect(() => {
        // Fetch total employees
        axios.get('http://localhost:8081/api/employee')
            .then(response => {
                setTotalEmployees(response.data.data.length);
            })
            .catch(error => {
                console.error("There was an error fetching the employees!", error);
            });

        // Fetch attendance data
        axios.get('http://localhost:8081/api/attendance')
            .then(response => {
                const presentCount = response.data.data.filter(att => att.Statuss === 'Present').length;
                setPresentToday(presentCount);
                setOnLeaveToday(totalEmployees - presentCount);
            })
            .catch(error => {
                console.error("There was an error fetching the attendance data!", error);
            });

        // Fetch tasks data
        axios.get('http://localhost:8081/api/task')
            .then(response => {
                const pendingCount = response.data.data.filter(task => task.Statuss === 'In Progress').length;
                setPendingTasks(pendingCount);
            })
            .catch(error => {
                console.error("There was an error fetching the tasks data!", error);
            });
    }, [totalEmployees]);

    return (
        <AnimatedDiv className="flex justify-between p-9">
            <div className="flex flex-col justify-between p-8 text-blue-800 bg-blue-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaUsers className="inline-block mb-2" /> Total Employees</span>
                <span className="text-3xl font-bold">{totalEmployees}</span>
            </div>
            <div className="flex flex-col justify-between p-8 text-green-800 bg-green-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaUserCheck className="inline-block mb-2" /> Present Today</span>
                <span className="text-3xl font-bold">{presentToday}</span>
            </div>
            <div className="flex flex-col justify-between p-6 text-red-800 bg-red-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaTasks className="inline-block mb-2" /> Total Pending tasks</span>
                <span className="text-3xl font-bold">{pendingTasks}</span>
            </div>
            <div className="flex flex-col justify-between p-8 text-yellow-800 bg-yellow-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaCalendarTimes className="inline-block mb-2" /> On Leave Today</span>
                <span className="text-3xl font-bold">{onLeaveToday}</span>
            </div>
        </AnimatedDiv>
    );
};

export default Summary;
