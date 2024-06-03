import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveApprove = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [closedCards, setClosedCards] = useState([]);

    useEffect(() => {
        // Fetch leave requests from the backend
        axios.get('http://localhost:8081/api/leave')
            .then(response => {
                setLeaveRequests(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the leave requests!", error);
            });
    }, []);

    const updateLeaveStatus = (id, status) => {
       const newData ={status: status}
        axios.patch(`http://localhost:8081/api/leave/${id}`, newData)
            .then(response => {
                // console.log(response.data);
                setLeaveRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.Leave_ID === id ? { ...request, Statuss: status } : request
                    )
                );
                setSelectedRequestId(id);
                setShowSuccessPopup(true);
                setClosedCards([...closedCards, id]);
                // console.log(`Leave request with ID ${id} ${status}.`);
            })
            .catch(error => {
                console.error(`There was an error updating the leave request with ID ${id}!`, error);
            });
    };




    // Function to handle leave approval
    const handleApprove = (id) => {
        updateLeaveStatus(id, 'Approved');
    };

    // Function to handle leave rejection
    const handleReject = (id) => {
        updateLeaveStatus(id, 'Rejected');
    };


    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        setSelectedRequestId(null);
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                {leaveRequests.map((request) => (
                    !closedCards.includes(request.Leave_ID) && (
                        <div key={request.Leave_ID} className="overflow-hidden bg-white rounded-lg shadow-md" style={{ minWidth: '800px' }}>
                            <div className="p-6 space-y-4">
                                <h2 className="text-lg font-semibold">{request.employeeName}</h2>
                                <p className="text-sm text-gray-600">Leave ID: {request.Leave_ID}</p>
                                <p className="text-sm text-gray-600">Leave Type: {request.Leave_Type}</p>
                                <p className="text-sm text-gray-600">Reason: {request.Reason}</p>
                                <p className="text-sm text-gray-600">From: {request.Start_Date} - To: {request.End_Date}</p>
                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => handleApprove(request.Leave_ID)} className="px-4 py-2 text-white bg-gray-800 rounded-md">Approve</button>
                                    <button onClick={() => handleReject(request.Leave_ID)} className="px-4 py-2 text-black bg-gray-300 rounded-md">Reject</button>

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
