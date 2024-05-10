import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi'; // Importing the filter icon

const DailyAttendance = () => {
    // State variables for filter dropdowns
    const [department, setDepartment] = useState('');
    const [shift, setShift] = useState('');
    const [date, setDate] = useState('');

    // State variable for filtered data
    const [filteredData, setFilteredData] = useState([]);

    // Dummy data - replace with actual API call or data source
    const dummyData = [
        { id: 1, name: 'John Doe', shift: 'Morning', inTime: '09:00', outTime: '17:00', status: 'Present' },
        { id: 2, name: 'Jane Smith', shift: 'Night', inTime: '19:00', outTime: '03:00', status: 'Absent' },
        // Add more dummy data as needed
    ];

    // Function to filter data based on selected filter options
    const filterData = () => {
        let filtered = dummyData;
        if (department) {
            filtered = filtered.filter((item) => item.department === department);
        }
        if (shift) {
            filtered = filtered.filter((item) => item.shift === shift);
        }
        if (date) {
            // Implement date filtering logic as needed
        }
        setFilteredData(filtered);
    };

    // Fetch dummy data when component mounts
    useEffect(() => {
        // Initially, set filtered data to the entire dummy data
        setFilteredData(dummyData);
    }, []);

    return (
        <div className="p-4">
            {/* Filter dropdowns */}
            <div className="flex items-center mb-4 space-x-4">
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="p-2 bg-gray-100 rounded-md">
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                </select>
                <select value={shift} onChange={(e) => setShift(e.target.value)} className="p-2 bg-gray-100 rounded-md">
                    <option value="">Select Shift</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                </select>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 bg-gray-100 rounded-md" />
                <button onClick={filterData} className="flex items-center p-2 space-x-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
                    <BiFilter /> <span>Filter</span>
                </button>
            </div>

            {/* Scrollable table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-collapse border-gray-200">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-4 py-2">Emp ID</th>
                            <th className="px-4 py-2">Emp Name</th>
                            <th className="px-4 py-2">Shift</th>
                            <th className="px-4 py-2">In Time</th>
                            <th className="px-4 py-2">Out Time</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((attendance) => (
                            <tr key={attendance.id} className="transition duration-300 hover:bg-gray-50">
                                <td className="px-4 py-2 border">{attendance.id}</td>
                                <td className="px-4 py-2 border">{attendance.name}</td>
                                <td className="px-4 py-2 border">{attendance.shift}</td>
                                <td className="px-4 py-2 border">{attendance.inTime}</td>
                                <td className="px-4 py-2 border">{attendance.outTime}</td>
                                <td className="px-4 py-2 border">{attendance.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DailyAttendance;
