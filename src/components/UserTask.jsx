import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTask = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [closedTasks, setClosedTasks] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const eid = 5; // Define eid as a constant variable

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                // Fetch employee data
                const response = await axios.get('http://localhost:8081/api/employee');
                const result = response.data;
                if (result.success === 1 && Array.isArray(result.data)) {
                    // Find employee with Emp_ID equal to eid
                    const filteredEmployee = result.data.find(employee => employee.Emp_ID == eid);
                    if (filteredEmployee) {
                        setEmployeeName(filteredEmployee.Name);
                    } else {
                        console.error(`Employee with Emp_ID ${eid} not found.`);
                    }
                } else {
                    console.error('Failed to fetch employee data');
                }

                // Fetch tasks for the employee
                const tasksResponse = await axios.get('http://localhost:8081/api/task');
                if (tasksResponse.data.success === 1) {
                    const allTasks = tasksResponse.data.data;
                    const employeeTasks = allTasks.filter(task => task.Emp_ID === eid); // Filter tasks for employee with Emp_ID eid
                    setTasks(employeeTasks);
                } else {
                    console.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEmployeeData();
    }, [eid]); // Add eid to the dependency array

    const handleComplete = (id) => {
        const completedTask = tasks.find(task => task.Task_ID === id);
        setSelectedTaskId(completedTask.Title);
        setShowSuccessPopup(true);
        setClosedTasks([...closedTasks, id]);
        console.log(`Task with ID ${id} completed.`);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        setSelectedTaskId(null);
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">{employeeName}'s Tasks</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                {tasks.map((task) => (
                    !closedTasks.includes(task.Task_ID) && task.Statuss === "In Progress" && (
                        <div key={task.Task_ID} className="overflow-hidden bg-white rounded-lg shadow-md">
                            <div className="p-6 space-y-4">
                                <h2 className="text-lg font-semibold">{task.Title}</h2>
                                <p className="text-sm text-gray-600">Task Description: {task.Description}</p>
                                <p className="text-sm text-gray-600">Start Date: {task.Start_Date} - End Date: {task.End_Date}</p>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => handleComplete(task.Task_ID)} className="px-4 py-2 text-white bg-gray-800 rounded-md">Complete</button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            {showSuccessPopup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-center">Success!</p>
                        <p className="text-center text-gray-700">{selectedTaskId} submitted successfully.</p>
                        <button onClick={handleCloseSuccessPopup} className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-md">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTask;
