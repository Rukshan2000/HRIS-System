import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation


const LeaveApprovedStatus = () => {

    
    const [leaveStatusData, setLeaveStatusData] = useState([]);

    const fetchLeaveStatus = async (empId) => {
        try {
            const response = await axios.get('http://localhost:8081/api/leave');
            const result = response.data;
            if (result.success === 1 && Array.isArray(result.data)) {
                const filteredData = result.data
                    .filter(leave => leave.Emp_ID === empId) // Filter by employee ID 1
                    .map(leave => ({
                        date: new Date(leave.Start_Date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
                        status: leave.Statuss,
                    }));
                setLeaveStatusData(filteredData);
            } else {
                console.error('Unexpected data format:', result);
                setLeaveStatusData([]);
            }
        } catch (error) {
            console.error('Error fetching leave status:', error);
            setLeaveStatusData([]);
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
                    // console.log('data', res.data);
                    fetchLeaveStatus(res.data.empId);
                })
                .catch(err => console.log(err));
        };
    }, []);

  

    return (
        <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Leave Approval Status</h2>
            {/* Table for leave approval status */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Approval Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaveStatusData.map((status, index) => (
                            <tr key={index} className="transition duration-300 ease-in-out hover:bg-gray-100">
                                <td className="px-4 py-2 whitespace-nowrap">{status.date}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{status.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveApprovedStatus;