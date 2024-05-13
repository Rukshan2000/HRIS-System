import React, { useState } from 'react';

const UserTaskHistory = () => {
    // Dummy data for user task history
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [userTaskHistory, setUserTaskHistory] = useState([
        {
            id: 1,
            taskTitle: "Annual Report Preparation",
            status: "Completed",
            month: "May",
            year: "2024"
        },
        {
            id: 2,
            taskTitle: "Project Presentation",
            status: "Not Completed",
            month: "June",
            year: "2024"
        },
        {
            id: 3,
            taskTitle: "Marketing Campaign Plan",
            status: "In Progress",
            month: "June",
            year: "2024"
        },
        // Add more user task history here
    ]);

    // Function to filter task history by month and year
    const filteredTaskHistory = userTaskHistory.filter(task => {
        if (selectedMonth && selectedYear) {
            return task.month === selectedMonth && task.year === selectedYear;
        } else if (selectedMonth) {
            return task.month === selectedMonth;
        } else if (selectedYear) {
            return task.year === selectedYear;
        }
        return true;
    });

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Task History</h1>
            <div className="flex flex-col mb-4 md:flex-row md:items-center">
                <select
                    className="w-full px-3 py-2 mb-2 mr-0 border border-gray-300 rounded-md md:w-auto md:mb-0 md:mr-2"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All Months</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <input
                    type="text"
                    placeholder="Year"
                    className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md md:w-auto md:mb-0"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <div>
                    {filteredTaskHistory.map((task) => (
                        <div key={task.id} className="p-4 mb-4 rounded-lg">
                            <div className="mb-2 overflow-hidden font-bold overflow-ellipsis">{task.taskTitle}</div>
                            <div className={`text-white py-1 px-2 rounded ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-yellow-500' : task.status === 'Not Completed' ? 'bg-red-500' : ''}`}>{task.status}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTaskHistory;
