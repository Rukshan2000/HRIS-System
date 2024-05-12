import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddLeave = () => {
    // State variables for leave form
    const [leaveType, setLeaveType] = useState('');
    const [userId, setUserId] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState(new Date());
    const [numOfDates, setNumOfDates] = useState(1); // State for number of dates

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission logic, such as sending data to the server
        console.log('Leave Type:', leaveType);
        console.log('User ID:', userId);
        console.log('Reason:', reason);
        console.log('Date:', date);
        console.log('Number of Dates:', numOfDates);
        // Reset form fields after submission
        setLeaveType('');
        setUserId('');
        setReason('');
        setDate(new Date());
        setNumOfDates(1);
    };

    return (
        <div className="flex flex-col justify-between p-4 md:flex-row">
            {/* Add Leave form */}
            <div className="p-6 mb-4 bg-white rounded-lg shadow-md md:w-1/2 md:mr-4">
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Request Leave</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-semibold text-gray-700">Leave Type</label>
                        <select id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            <option value="">Select Leave Type</option>
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="userId" className="block text-sm font-semibold text-gray-700">Employee ID</label>
                        <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">Reason</label>
                        <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700">Select Date</label>
                        <DatePicker id="date" selected={date} onChange={date => setDate(date)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="numOfDates" className="block text-sm font-semibold text-gray-700">Number of Dates</label>
                        <input type="number" id="numOfDates" value={numOfDates} onChange={(e) => setNumOfDates(e.target.value)} className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;
