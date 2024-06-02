import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTasks, FaUserCheck, FaRegCalendarAlt, FaCalendarCheck } from 'react-icons/fa';
import { zoomIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const zoomInAnimation = keyframes`${zoomIn}`;

const AnimatedDiv = styled.div`
    animation: 1s ${zoomInAnimation};
`;

const UserSummary = () => {
    const [taskCompletionPercentage, setTaskCompletionPercentage] = useState(0);
    const [attendancePercentage, setAttendancePercentage] = useState(0);
    const [availableLeaves, setAvailableLeaves] = useState(0);
    const [ongoingTaskCount, setOngoingTaskCount] = useState(0);

    useEffect(() => {
        const employeeId = 10;

        // Fetch tasks data for employee 2
        axios.get('http://localhost:8081/api/task')
            .then(response => {
                const tasks = response.data.data.filter(task => task.Emp_ID === employeeId);
                const completedTasks = tasks.filter(task => task.Statuss === 'Completed').length;
                const ongoingTasks = tasks.filter(task => task.Statuss === 'In Progress').length;
                const totalTasks = tasks.length;

                setOngoingTaskCount(ongoingTasks);
                setTaskCompletionPercentage(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0);
            })
            .catch(error => {
                console.error("There was an error fetching the tasks data!", error);
            });

        // Fetch attendance data for employee 2
        axios.get('http://localhost:8081/api/attendance')
            .then(response => {
                const attendanceRecords = response.data.data.filter(att => att.Emp_ID === employeeId);
                const presentDays = attendanceRecords.filter(att => att.Statuss === 'Present').length;
                const daysInMonth = 30; // Assuming 30 days in a month for simplicity

                setAttendancePercentage((presentDays / daysInMonth) * 100);
            })
            .catch(error => {
                console.error("There was an error fetching the attendance data!", error);
            });

        // Fetch leave data for employee 2
        axios.get('http://localhost:8081/api/leave')
            .then(response => {
                const approvedLeaves = response.data.data.filter(leave => leave.Emp_ID === employeeId && leave.Status === 'Approved').length;
                const totalLeavesAllowed = 14;

                setAvailableLeaves(totalLeavesAllowed - approvedLeaves);
            })
            .catch(error => {
                console.error("There was an error fetching the leave data!", error);
            });
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-blue-800 bg-blue-200 rounded-md shadow-md" style={{ height: '200px', width: '100%' }}>
                <span className="text-xl font-bold"><FaTasks className="inline-block mb-2" /> Task Completion </span>
                <span className="text-3xl font-bold">{taskCompletionPercentage.toFixed(2)}%</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-green-800 bg-green-200 rounded-md shadow-md" style={{ height: '200px', width: '100%' }}>
                <span className="text-xl font-bold"><FaUserCheck className="inline-block mb-2" /> Attendance (%)</span>
                <span className="text-3xl font-bold">{attendancePercentage.toFixed(2)}%</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-yellow-800 bg-yellow-200 rounded-md shadow-md" style={{ height: '200px', width: '100%' }}>
                <span className="text-xl font-bold"><FaRegCalendarAlt className="inline-block mb-2" /> Available Leaves</span>
                <span className="text-3xl font-bold">{availableLeaves}</span>
            </AnimatedDiv>
            <AnimatedDiv className="flex flex-col justify-between p-4 mb-4 text-purple-800 bg-purple-200 rounded-md shadow-md" style={{ height: '200px', width: '100%' }}>
                <span className="text-xl font-bold"><FaCalendarCheck className="inline-block mb-2" /> Ongoing Task Count</span>
                <span className="text-3xl font-bold">{ongoingTaskCount}</span>
            </AnimatedDiv>
        </div>
    );
};

export default UserSummary;
