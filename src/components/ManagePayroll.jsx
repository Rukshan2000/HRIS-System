import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ManagePayroll = () => {
    const [payrollData, setPayrollData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/payroll');
                setPayrollData(response.data.data);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            }
        };

        fetchPayrollData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];  // YYYY-MM-DD
    };

    const handleCheckboxChange = (payrollId) => {
        const index = selectedRows.indexOf(payrollId);
        if (index === -1) {
            setSelectedRows([...selectedRows, payrollId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== payrollId));
        }
    };

    const handleDeleteSelectedRows = async () => {
        console.log("Selected Rows:", selectedRows); // Check if the selected rows are correct
        try {
            const response = await axios.delete('http://localhost:8081/api/payroll', {
                data: { payrollIds: selectedRows },
                headers: {
                    'Content-Type': 'application/json' // Ensure the server knows the data format
                }
            });

            console.log("Delete Response:", response.data); // Log the response

            // Refresh payroll data after deletion
            const updatedPayrollData = await axios.get('http://localhost:8081/api/payroll');
            setPayrollData(updatedPayrollData.data.data);
            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting payroll data:', error);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === payrollData.length) {
            setSelectedRows([]);
        } else {
            const allIds = payrollData.map(payroll => payroll.Payroll_ID);
            setSelectedRows(allIds);
        }
    };

    const filteredData = selectedDate
        ? payrollData.filter(payroll => formatDate(payroll.Date) === formatDate(selectedDate))
        : payrollData;

    return (
        <div className="container flex flex-col mx-auto">
            <div className="mb-4">
                <label className="mr-2">Filter by Date:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex justify-between">
                <button onClick={() => window.history.back()} className="px-4 py-2 mt-4 mb-2 bg-gray-400 rounded">Back to payroll</button>
                <button onClick={handleDeleteSelectedRows} className="px-4 py-2 mt-4 mb-2 text-white bg-red-500 rounded">Delete Selected Rows</button>
            </div>
            <div className="overflow-auto">
                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === payrollData.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="px-4 py-2 border border-gray-300">Payroll ID</th>
                            <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                            <th className="px-4 py-2 border border-gray-300">Basic Salary</th>
                            <th className="px-4 py-2 border border-gray-300">EPF</th>
                            <th className="px-4 py-2 border border-gray-300">ETF</th>
                            <th className="px-4 py-2 border border-gray-300">OT Hours</th>
                            <th className="px-4 py-2 border border-gray-300">OT Payment</th>
                            <th className="px-4 py-2 border border-gray-300">Allowance</th>
                            <th className="px-4 py-2 border border-gray-300">Tax</th>
                            <th className="px-4 py-2 border border-gray-300">Income</th>
                            <th className="px-4 py-2 border border-gray-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((payroll) => (
                            <tr key={payroll.Payroll_ID}>
                                <td className="px-4 py-2 border border-gray-300">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(payroll.Payroll_ID)}
                                        onChange={() => handleCheckboxChange(payroll.Payroll_ID)}
                                    />
                                </td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Payroll_ID}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Emp_ID}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Basic_Salary}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.EPF}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.ETF}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.OT_Hours}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.OT_Payment}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Allowance}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Tax}</td>
                                <td className="px-4 py-2 border border-gray-300">{payroll.Income}</td>
                                <td className="px-4 py-2 border border-gray-300">{formatDate(payroll.Date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePayroll;
