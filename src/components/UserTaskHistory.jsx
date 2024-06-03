import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const fetchEmployeeData = async (empId) => {
        try {
            // Fetch employee data
            const response = await axios.get('http://localhost:8081/api/employee');
            const result = response.data;
            if (result.success === 1 && Array.isArray(result.data)) {
                // Find employee with Emp_ID equal to empId
                const filteredEmployee = result.data.find(employee => employee.Emp_ID == empId);
                if (filteredEmployee) {
                    setEmployeeName(filteredEmployee.Name);
                } else {
                    console.error(`Employee with Emp_ID ${empId} not found.`);
                }
            } else {
                console.error('Failed to fetch employee data');
            }

            // Fetch tasks for the employee
            const tasksResponse = await axios.get('http://localhost:8081/api/task');
            if (tasksResponse.data.success === 1) {
                const allTasks = tasksResponse.data.data;
                const employeeTasks = allTasks.filter(task => task.Emp_ID === empId); // Filter tasks for employee with Emp_ID empId
                setTasks(employeeTasks);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get('http://localhost:8081/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    fetchEmployeeData(res.data.empId);
                })
                .catch(err => console.log(err));
        }
    }, []); 

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    // Function to filter tasks by status
    const filteredTasks = tasks.filter(task => {
        if (selectedStatus) {
            return task.Statuss === selectedStatus;
        }
        return true;
    });

    // Function to get card color based on task status
    const getCardColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-200';
            case 'Not Completed':
                return 'bg-red-200';
            case 'In Progress':
                return 'bg-yellow-200';
            default:
                return 'bg-white';
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Task Prograss</h1>
            <div className="flex flex-col mb-4 md:flex-row md:items-center">
                <select
                    className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md md:w-auto md:mb-0"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                {filteredTasks.map((task) => (
                    <div key={task.Task_ID} className="overflow-hidden bg-white">
                    <div className="p-6 space-y-4">
                            <h2 className="font-semibold ">{task.Title}</h2>
                            <p className={`overflow-hidden rounded-lg shadow-md ${getCardColor(task.Statuss)}`}>Status: {task.Statuss}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTask;
