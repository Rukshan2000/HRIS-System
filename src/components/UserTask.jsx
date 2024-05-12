import React, { useState } from 'react';

const UserTask = () => {
    // Dummy data for user tasks
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [closedTasks, setClosedTasks] = useState([]);

    const userTasks = [
        {
            id: 1,
            employeeName: "John Doe",
            taskTitle: "Annual Report Preparation",
            taskDescription: "Preparing annual report for the company",
            handOnDate: "2024-05-10",
            handoutDate: "2024-05-15"
        },
        {
            id: 2,
            employeeName: "Alice Smith",
            taskTitle: "Project Presentation",
            taskDescription: "Preparing presentation for upcoming project meeting",
            handOnDate: "2024-06-01",
            handoutDate: "2024-06-03"
        },
        // Add more user tasks here
    ];

    // Function to handle task completion
    const handleComplete = (id) => {
        // Logic to mark task as completed
        const completedTask = userTasks.find(task => task.id === id);
        setSelectedTaskId(completedTask.taskTitle);
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                {userTasks.map((task) => (
                    !closedTasks.includes(task.id) && (
                        <div key={task.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                            <div className="p-6 space-y-4">
                                <h2 className="text-lg font-semibold">{task.taskTitle}</h2>
                                <p className="text-sm text-gray-600">Task Description: {task.taskDescription}</p>
                                <p className="text-sm text-gray-600">Hand On Date: {task.handOnDate} - Handout Date: {task.handoutDate}</p>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => handleComplete(task.id)} className="px-4 py-2 text-white bg-gray-800 rounded-md">Complete</button>
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
