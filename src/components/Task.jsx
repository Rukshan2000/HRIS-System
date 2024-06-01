import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [assignedTo, setAssignedTo] = useState([]);
    const [taskData, setTaskData] = useState({
        title: '',
        assignedTo: '',
        description: '',
        startTime: '',
        endTime: '',
    });
    const [showForm, setShowForm] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchTask();
        fetchAssignedTo();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/task');
            const result = response.data;
            if (result.success === 1 && Array.isArray(result.data)) {
                setTasks(result.data.map(task => ({
                    id: task.Task_ID,
                    assignedTo: task.Emp_ID,
                    description: task.Description,
                    startTime: task.Start_Date,
                    endTime: task.End_Date,
                    status: task.Statuss,
                    title: task.Title,
                })));
            } else {
                setTasks([]);
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setTasks([]);
        }
    };

    const fetchAssignedTo = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/employee');
            const result = response.data;
            if (result.success === 1 && Array.isArray(result.data)) {
                setAssignedTo(result.data.map(emp => ({
                    id: emp.Emp_ID,
                    name: emp.Name,
                })));
            } else {
                setAssignedTo([]);
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching assigned to:', error);
            setAssignedTo([]);
        }
    };

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskData.id) {
            updateTask(); // If taskData.id exists, update the task
        } else {
            addTask(); // If taskData.id does not exist, add a new task
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/task', taskData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                fetchTask();
                resetTaskDataAndToggleForm();
            } else {
                console.error('Failed to add task:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/task/${taskData.id}`, taskData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                fetchTask();
                resetTaskDataAndToggleForm();
            } else {
                console.error('Failed to update task:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const resetTaskDataAndToggleForm = () => {
        setTaskData({
            title: '',
            assignedTo: '',
            startTime: '',
            endTime: '',
            description: '',
        });
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setTaskData(taskToEdit);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/task/${id}`);
            fetchTask();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = statusFilter
        ? tasks.filter(task => task.status === statusFilter)
        : tasks;

    return (
        <div className="p-4">
            <div>
                <button
                    onClick={toggleForm}
                    className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
                >
                    Add New
                </button>
                {showForm && (
                    <TaskForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        taskData={taskData}
                        assignedTo={assignedTo}
                        toggleForm={toggleForm}
                    />
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="statusFilter" className="block mb-2">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Task Title</th>
                        <th className="px-4 py-2">Assigned To</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td className="px-4 py-2 border">{task.title}</td>
                            <td className="px-4 py-2 border">
                                {assignedTo.find(emp => emp.id === task.assignedTo)?.name || 'Unknown'}
                            </td>
                            <td className="px-4 py-2 border">{task.status}</td>
                            <td className="px-4 py-2 border">
                                <button onClick={() => handleEdit(task.id)} className="px-3 py-1 text-white bg-blue-500 rounded-md">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(task.id)} className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TaskForm = ({ handleSubmit, handleChange, taskData, assignedTo, toggleForm }) => {
    const formattedStartTime = taskData.startTime ? new Date(taskData.startTime).toISOString().split('T')[0] : '';
    const formattedEndTime = taskData.endTime ? new Date(taskData.endTime).toISOString().split('T')[0] : '';

    return (
        <form onSubmit={handleSubmit} className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
            <div className="p-6 bg-white rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block mb-1">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={taskData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="assignedTo" className="block mb-1">Assigned To</label>
                        <select
                            name="assignedTo"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={taskData.assignedTo}
                            onChange={handleChange}
                        >
                            <option value="">Select Employee</option>
                            {assignedTo.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="description" className="block mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-2 border border-gray-300 rounded-md resize-none"
                            value={taskData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="startTime" className="block mb-1">Start Time</label>
                        <input
                            type="date"
                            id="startTime"
                            name="startTime"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formattedStartTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block mb-1">End Time</label>
                        <input
                            type="date"
                            id="endTime"
                            name="endTime"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formattedEndTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end col-span-2">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={toggleForm}
                            className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Task;
