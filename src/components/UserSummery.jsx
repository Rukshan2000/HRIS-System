import React from 'react';
import { FaTasks, FaUserCheck, FaRegCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const zoomInAnimation = keyframes`${zoomIn}`;

const AnimatedDiv = styled.div`
    animation: 1s ${zoomInAnimation};
`;

const UserSummary = () => {
    // Dummy values
    const taskCompletionPercentage = 75;
    const attendancePercentage = 90;
    const availableLeaves = 15;
    const ongoingTaskCount = 5; // Add the actual ongoing task count here

    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-blue-800 bg-blue-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaTasks className="inline-block mb-2" /> Task Completion (%)</span>
                <span className="text-3xl font-bold">{taskCompletionPercentage}%</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-green-800 bg-green-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaUserCheck className="inline-block mb-2" /> Attendance (%)</span>
                <span className="text-3xl font-bold">{attendancePercentage}%</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-yellow-800 bg-yellow-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaRegCalendarAlt className="inline-block mb-2" /> Available Leaves</span>
                <span className="text-3xl font-bold">{availableLeaves}</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-purple-800 bg-purple-200 rounded-md shadow-md" style={{ height: '200px', width: '300px' }}>
                <span className="text-xl font-bold"><FaCalendarCheck className="inline-block mb-2" /> Ongoing Task Count</span>
                <span className="text-3xl font-bold">{ongoingTaskCount}</span>
            </AnimatedDiv>
        </div>
    );
};

export default UserSummary;
