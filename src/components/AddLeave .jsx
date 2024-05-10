import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AddLeave = () => {
    // State variables for leave form
    const [leaveType, setLeaveType] = useState('');
    const [userId, setUserId] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(new Date());

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission logic, such as sending data to the server
        console.log('Leave Type:', leaveType);
        console.log('User ID:', userId);
        console.log('Reason:', reason);
        console.log('Date:', date);
        // Reset form fields after submission
        setLeaveType('');
        setUserId('');
        setReason('');
        setDate(new Date());
    };

    return (
        <div className="flex justify-between p-4">
            {/* Add Leave form */}
            <div className="w-1/2 p-6 mr-4 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Request Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="leaveType" className="block text-sm font-semibold text-gray-700">Leave Type</label>
                        <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            <option value="">Select Leave Type</option>
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-sm font-semibold text-gray-700">Employee ID</label>
                        <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">Reason</label>
                        <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                </form>
            </div>
            {/* Calendar */}
            <div className="w-1/2 p-4 bg-white border rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Select Date</h2>
                <Calendar onChange={setDate} value={date} className="border-none" />
            </div>
        </div>
    );
};

export default AddLeave;
