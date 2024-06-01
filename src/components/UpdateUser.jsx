import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';

const UpdateUser = () => {
    // State for form data
    const [formData, setFormData] = useState({
        employeeId: '',
        empName: '',
        salary: '',
        allowance: ''
    });

    // State for success message
    const [successMessage, setSuccessMessage] = useState('');

    // State for showing/hiding the popup form
    const [showPopup, setShowPopup] = useState(false);

    // State for storing employee data
    const [dummyEmployees, setDummyEmployees] = useState([
        { id: 1, employeeId: '1', empName: 'John Doe', designation: 'Manager', salary: '2000', allowance: '500' },
        { id: 2, employeeId: '2', empName: 'Jane Smith', designation: 'Supervisor', salary: '2500', allowance: '600' },
        { id: 3, employeeId: '3', empName: 'Alice Johnson', designation: 'Manager', salary: '1800', allowance: '400' },
        { id: 4, employeeId: '4', empName: 'Bob Brown', designation: 'Supervisor', salary: '2100', allowance: '450' },
        { id: 5, employeeId: '5', empName: 'Emma Wilson', designation: 'Manager', salary: '2200', allowance: '550' },
        { id: 6, employeeId: '6', empName: 'James Davis', designation: 'Supervisor', salary: '1900', allowance: '470' },
        { id: 7, employeeId: '7', empName: 'Sarah Miller', designation: 'Manager', salary: '2400', allowance: '520' },
        { id: 8, employeeId: '8', empName: 'Michael Thompson', designation: 'Supervisor', salary: '2000', allowance: '480' },
        { id: 9, employeeId: '9', empName: 'Olivia Martinez', designation: 'Manager', salary: '2300', allowance: '530' },
        { id: 10, employeeId: '10', empName: 'David Garcia', designation: 'Supervisor', salary: '1950', allowance: '470' }
    ]
    
    );

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // State for employee ID filter
    const [employeeIdFilter, setEmployeeIdFilter] = useState('');

    // Logic to get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredItems = dummyEmployees.filter(employee => employee.employeeId.toLowerCase().includes(employeeIdFilter.toLowerCase()));
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle select changes
    const handleSelectChange = (selectedOption, name) => {
        setFormData({ ...formData, [name]: selectedOption.value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update user data or delete user
        // For demo, just console log the updated data
        console.log('Form submitted with data:', formData);


        const newData ={
            allowance: formData.allowance
        }
        axios.patch(`http://localhost:8081/api/employee/${formData.employeeId}`, newData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(`There was an error updating the leave request with ID ${formData.employeeId}!`, error);
            });


        // Find the index of the employee to be updated
        const index = dummyEmployees.findIndex(emp => emp.employeeId === formData.employeeId);
        // Update the employee data
        const updatedEmployee = { ...dummyEmployees[index], ...formData };
        const updatedEmployees = [...dummyEmployees];
        updatedEmployees[index] = updatedEmployee;
        setDummyEmployees(updatedEmployees);
        setSuccessMessage('User data updated successfully!');
        // Close the popup form
        setShowPopup(false);
    };

    // Function to handle opening the popup form
    const handleOpenPopup = (employeeId) => {
        const employee = dummyEmployees.find(emp => emp.employeeId === employeeId);
        setFormData(employee);
        setShowPopup(true);
    };

    // Function to handle pagination
    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > Math.ceil(filteredItems.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    // Function to handle next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle employee ID filter change
    const handleEmployeeIdFilterChange = (e) => {
        setEmployeeIdFilter(e.target.value);
        setCurrentPage(1); // Reset pagination to first page when filter changes
    };

    // Function to handle canceling the form submission
    const handleCancel = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold">.</h2>
            {/* Employee ID Filter */}
            <div className="mb-4">
                <input
                    type="text"
                    value={employeeIdFilter}
                    onChange={handleEmployeeIdFilterChange}
                    className="px-3 py-2 border border-gray-300 rounded-md "
                    placeholder="Enter Employee ID"
                />
            </div>
            {successMessage && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-gray-900">Success</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{successMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => setSuccessMessage('')} type="button" className="w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm inline-flexjustify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Employee ID</th>
                        <th className="px-4 py-2 border">Employee Name</th>
                        <th className="px-4 py-2 border">Designation</th>
                        <th className="px-4 py-2 border">Salary</th>
                        <th className="px-4 py-2 border">Allowance</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(employee => (
                        <tr key={employee.id}>
                            <td className="px-4 py-2 border">{employee.employeeId}</td>
                            <td className="px-4 py-2 border">{employee.empName}</td>
                            <td className="px-4 py-2 border">{employee.designation}</td>
                            <td className="px-4 py-2 border">{employee.salary}</td>
                            <td className="px-4 py-2 border">{employee.allowance}</td>
                            <td className="px-4 py-2 border">
                                <button onClick={() => handleOpenPopup(employee.employeeId)} className="px-4 py-2 text-white bg-blue-500 rounded-md">Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button onClick={prevPage} className="px-3 py-1 mx-1 text-white bg-blue-500 rounded-md">Prev</button>
                <button onClick={nextPage} className="px-3 py-1 mx-1 text-white bg-blue-500 rounded-md">Next</button>
            </div>
            {/* Popup form for updating user data */}
            {showPopup && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                <h2 className="mb-4 text-lg font-semibold">Update User</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                                        <input
                                            type="text"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            name="salary"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Allowance</label>
                                        <input
                                            type="text"
                                            value={formData.allowance}
                                            onChange={handleChange}
                                            name="allowance"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Update</button>
                                        <button type="button" onClick={handleCancel} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;

