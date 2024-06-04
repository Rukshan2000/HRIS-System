import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddLeave = () => {
    // State variables for leave form
    const [leaveType, setLeaveType] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); // State for end date



    // Function to handle form submission
   // Function to handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log to console that data is being sent
    console.log('Sending leave request data:', {
        employeeId: employeeId,
        leaveType: leaveType,
        reason: reason,
        fromDate: startDate,
        toDate: endDate,
        status: 'Pending'
    });

    // Prepare data for POST request
    const data = {
        employeeId: employeeId,
        leaveType: leaveType,
        reason: reason,
        fromDate: startDate,
        toDate: endDate,
        status: 'Pending' // Assuming status is always 'Pending' for a new leave request
    };

    // Make POST request using Axios
    axios.post('http://localhost:8081/api/leave', data)
        .then(response => {
            console.log('Leave request submitted successfully:', response.data);
            // Reset form fields after successful submission
            setLeaveType('');
            setEmployeeId('');
            setReason('');
            setStartDate(new Date());
            setEndDate(new Date());
        })
        .catch(error => {
            console.error('Error submitting leave request:', error);
            // Implement error handling, e.g., show an error message to the user
        });
};

   // Fetch employee data on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get('http://localhost:8081/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log('data', res.data);
                    setEmployeeId(res.data.empId);
                })
                .catch(err => console.log(err));
        };

    }, []);
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
                        <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700">Employee ID</label>
                        <input 
                            type="text" 
                            id="employeeId" 
                            value={employeeId} 
                            onChange={(e) => setEmployeeId(e.target.value)} 
                            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" 
                            disabled />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">Reason</label>
                        <textarea 
                            id="reason" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="fromDate" className="block text-sm font-semibold text-gray-700">Start Date</label>
                        <DatePicker 
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="toDate" className="block text-sm font-semibold text-gray-700">End Date</label>
                        <DatePicker 
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;
