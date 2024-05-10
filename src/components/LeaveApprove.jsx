import React, { useState } from 'react';

const LeaveApprove = () => {
    // Dummy data for leave requests
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [closedCards, setClosedCards] = useState([]);

    const leaveRequests = [
        {
            id: 1,
            employeeName: "John Doe",
            employeeId: "EMP001",
            leaveType: "Annual Leave",
            reason: "Family vacation",
            fromDate: "2024-05-10",
            toDate: "2024-05-15"
        },
        {
            id: 2,
            employeeName: "Alice Smith",
            employeeId: "EMP002",
            leaveType: "Sick Leave",
            reason: "Fever",
            fromDate: "2024-06-01",
            toDate: "2024-06-03"
        },
        // Add more leave requests here
    ];

    // Function to handle leave approval
    const handleApprove = (id) => {
        // Logic to approve leave request
        setSelectedRequestId(id);
        setShowSuccessPopup(true);
        setClosedCards([...closedCards, id]);
        console.log(`Leave request with ID ${id} approved.`);
    };

    // Function to handle leave rejection
    const handleReject = (id) => {
        // Logic to reject leave request
        setSelectedRequestId(id);
        setShowSuccessPopup(true);
        setClosedCards([...closedCards, id]);
        console.log(`Leave request with ID ${id} rejected.`);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        setSelectedRequestId(null);
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                {leaveRequests.map((request) => (
                    !closedCards.includes(request.id) && (
                        <div key={request.id} className="overflow-hidden bg-white rounded-lg shadow-md" style={{ minWidth: '800px' }}>
                            <div className="p-6 space-y-4">
                                <h2 className="text-lg font-semibold">{request.employeeName}</h2>
                                <p className="text-sm text-gray-600">Employee ID: {request.employeeId}</p>
                                <p className="text-sm text-gray-600">Leave Type: {request.leaveType}</p>
                                <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                                <p className="text-sm text-gray-600">From: {request.fromDate} - To: {request.toDate}</p>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => handleApprove(request.id)} className="px-4 py-2 text-white bg-gray-800 rounded-md">Approve</button>
                                    <button onClick={() => handleReject(request.id)} className="px-4 py-2 text-black bg-gray-300 rounded-md">Reject</button>
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
                        <p className="text-center text-gray-700">Leave request with ID {selectedRequestId} processed successfully.</p>
                        <button onClick={handleCloseSuccessPopup} className="px-4 py-2 mt-4 text-white bg-gray-800 rounded-md">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveApprove;
