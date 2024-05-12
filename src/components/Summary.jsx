import React from 'react';
import { FaUsers, FaUserCheck, FaUserTimes, FaCalendarTimes } from 'react-icons/fa';
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const zoomInAnimation = keyframes`${zoomIn}`;

const AnimatedDiv = styled.div`
    animation: 1s ${zoomInAnimation};
`;

const Summary = () => {
    // Dummy values
    const totalEmployees = 100;
    const presentToday = 80;
    const totalAbsent = 20;
    const onLeaveToday = 5;

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
                <span className="text-xl font-bold"><FaUserTimes className="inline-block mb-2" /> Total Absent</span>
                <span className="text-3xl font-bold">{totalAbsent}</span>
            </div>
            <div className="flex flex-col justify-between p-8 text-yellow-800 bg-yellow-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaCalendarTimes className="inline-block mb-2" /> On Leave Today</span>
                <span className="text-3xl font-bold">{onLeaveToday}</span>
            </div>
        </AnimatedDiv>
    );
};

export default Summary;
