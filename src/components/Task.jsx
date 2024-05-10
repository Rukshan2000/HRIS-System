import React, { useState } from 'react';
import Select from 'react-select';

const Task = () => {
    const [tasks, setTasks] = useState([
        {
            title: 'Dummy Task 1',
            assignedTo: 'John Doe',
            description: 'This is the description of Dummy Task 1',
            startTime: '2024-05-05T08:00',
            endTime: '2024-05-05T10:00'
        },
        {
            title: 'Dummy Task 2',
            assignedTo: 'Jane Smith',
            description: 'This is the description of Dummy Task 2',
            startTime: '2024-05-06T09:00',
            endTime: '2024-05-06T11:00'
        }
    ]);
    const [showForm, setShowForm] = useState(false);
    const [filterTitle, setFilterTitle] = useState('');
    const [editTaskIndex, setEditTaskIndex] = useState(null);
    const [taskData, setTaskData] = useState({
        title: '',
        assignedTo: '',
        description: '',
        startTime: '',
        endTime: ''
    });

    // Function to handle form submission for adding or updating task
    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { ...taskData };
        if (editTaskIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editTaskIndex] = task;
            setTasks(updatedTasks);
            setEditTaskIndex(null);
        } else {
            setTasks([...tasks, task]);
        }
        setShowForm(false);
        setTaskData({
            title: '',
            assignedTo: '',
            description: '',
            startTime: '',
            endTime: ''
        });
    };

    // Function to handle filter by task title
    const handleFilter = (e) => {
        setFilterTitle(e.target.value);
    };

    // Function to delete task
    const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    // Function to handle edit task
    const handleEdit = (index) => {
        setShowForm(true);
        setEditTaskIndex(index);
        setTaskData(tasks[index]);
    };

    // List of available assignees
    const assignees = [
        { value: 'John Doe', label: 'John Doe' },
        { value: 'Jane Smith', label: 'Jane Smith' },
        { value: 'Alice Johnson', label: 'Alice Johnson' },
        { value: 'Bob Brown', label: 'Bob Brown' },
        { value: 'Charlie Davis', label: 'Charlie Davis' }
    ];

    return (
        <div className="p-4">
            {/* Button to toggle display of form */}
            <button
                className="absolute px-4 py-2 text-white bg-blue-500 rounded-full top-4 right-4"
                onClick={() => {
                    setShowForm(true);
                    setEditTaskIndex(null);
                    setTaskData({
                        title: '',
                        assignedTo: '',
                        description: '',
                        startTime: '',
                        endTime: ''
                    });
                }}
            >
                {editTaskIndex !== null ? 'Update' : 'Add New'}
            </button>

            {/* Filter input */}
            <input
                type="text"
                placeholder="Filter by Task Title"
                className="p-2 my-4 border border-gray-300 rounded-md"
                value={filterTitle}
                onChange={handleFilter}
            />

            {/* Table */}
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
                    {tasks
                        .filter((task) => task.title.toLowerCase().includes(filterTitle.toLowerCase()))
                        .map((task, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{task.title}</td>
                                <td className="px-4 py-2 border">{task.assignedTo}</td>
                                <td className="px-4 py-2 border">{task.status}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="px-2 py-1 text-white bg-red-500 rounded"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
                    <div className="p-6 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-semibold">{editTaskIndex !== null ? 'Update Task' : 'Add New Task'}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="title" className="block mb-1">Task Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={taskData.title}
                                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="assignedTo" className="block mb-1">Assigned To</label>
                                <Select
                                    id="assignedTo"
                                    options={assignees}
                                    value={assignees.find(option => option.value === taskData.assignedTo)}
                                    onChange={(option) => setTaskData({ ...taskData, assignedTo: option.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-1">Description</label>
                                <textarea
                                    id="description"
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                    value={taskData.description}
                                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block mb-1">Start Time</label>
                                <input
                                    type="datetime-local"
                                    id="startTime"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={taskData.startTime}
                                    onChange={(e) => setTaskData({ ...taskData, startTime: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block mb-1">End Time</label>
                                <input
                                    type="datetime-local"
                                    id="endTime"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={taskData.endTime}
                                    onChange={(e) => setTaskData({ ...taskData, endTime: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end col-span-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md"
                                >
                                    {editTaskIndex !== null ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-white bg-red-500 rounded-md"
                                    onClick={() => setShowForm(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Task;
