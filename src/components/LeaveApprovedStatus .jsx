import React from 'react';

const LeaveApprovedStatus = () => {
    // Dummy data for leave approval status
    const leaveStatusData = [
        { date: '2024-05-01', status: 'Approved', approvedBy: 'John Doe' },
        { date: '2024-05-02', status: 'Pending', approvedBy: '' },
        { date: '2024-05-03', status: 'Rejected', approvedBy: 'Jane Smith' },
        // Add more dummy data as needed
    ];

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
                            <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Approved By</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaveStatusData.map((status, index) => (
                            <tr key={index} className="transition duration-300 ease-in-out hover:bg-gray-100">
                                <td className="px-4 py-2 whitespace-nowrap">{status.date}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{status.status}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{status.approvedBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveApprovedStatus;
