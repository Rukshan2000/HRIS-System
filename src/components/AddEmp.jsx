import React, { useState } from 'react';

const Employee = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            fullName: 'John Doe',
            section: 'Section A',
            designation: 'Manager',
            employmentStartDate: '2024-05-01',
            emergencyContactName: 'Jane Doe',
            bloodCategory: 'A+',
            permanentAddress: '123 Main Street, City, Country',
        },
        // Add more employees here
    ]);

    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        section: '',
        designation: '',
        employmentStartDate: '',
        emergencyContactName: '',
        bloodCategory: '',
        permanentAddress: '',
        dateOfBirth: '',
        gender: '',
        nicNumber: '',
        primaryContactNumber: '',
        secondaryContactNumber: '',
        emailAddress: '',
    });

    const [filters, setFilters] = useState({
        section: '',
        designation: '',
    });

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            const updatedEmployees = employees.map((emp) =>
                emp.id === formData.id ? formData : emp
            );
            setEmployees(updatedEmployees);
        } else {
            setEmployees([...employees, { ...formData, id: Date.now() }]);
        }
        setFormData({
            id: '',
            fullName: '',
            section: '',
            designation: '',
            employmentStartDate: '',
            emergencyContactName: '',
            bloodCategory: '',
            permanentAddress: '',
            dateOfBirth: '',
            gender: '',
            nicNumber: '',
            primaryContactNumber: '',
            secondaryContactNumber: '',
            emailAddress: '',
        });
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const employeeToEdit = employees.find((emp) => emp.id === id);
        setFormData(employeeToEdit);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const updatedEmployees = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEmployees);
    };

    const filteredEmployees = employees.filter((emp) => {
        const { section, designation } = filters;
        return (
            emp.section.toLowerCase().includes(section.toLowerCase()) &&
            emp.designation.toLowerCase().includes(designation.toLowerCase())
        );
    });

    return (
        <div className="container flex flex-col items-center mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Employee</h1>
            <div className="mb-4">
                <input
                    type="text"
                    name="section"
                    value={filters.section}
                    onChange={handleFilterChange}
                    placeholder="Filter by Section"
                    className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    name="designation"
                    value={filters.designation}
                    onChange={handleFilterChange}
                    placeholder="Filter by Designation"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                onClick={toggleForm}
                className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
            >
                Add New
            </button>
            {showForm && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Add/Edit Employee</h2>
                        <div style={{ maxHeight: '500px', overflowY: 'scroll' }}>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 mb-4">
                                <label htmlFor="fullName" className="block mb-1 text-sm font-semibold">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="permanentAddress" className="block mb-1 text-sm font-semibold">
                                    Permanent Address:
                                </label>
                                <textarea
                                    id="permanentAddress"
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="employmentStartDate" className="block mb-1 text-sm font-semibold">
                                    Employment Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="employmentStartDate"
                                    name="employmentStartDate"
                                    value={formData.employmentStartDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emergencyContactName" className="block mb-1 text-sm font-semibold">
                                    Emergency Contact Name:
                                </label>
                                <input
                                    type="text"
                                    id="emergencyContactName"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bloodCategory" className="block mb-1 text-sm font-semibold">
                                    Blood Category:
                                </label>
                                <select
                                    id="bloodCategory"
                                    name="bloodCategory"
                                    value={formData.bloodCategory}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Blood Category</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dateOfBirth" className="block mb-1 text-sm font-semibold">
                                    Date of Birth:
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block mb-1 text-sm font-semibold">
                                    Gender:
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nicNumber" className="block mb-1 text-sm font-semibold">
                                    NIC Number:
                                </label>
                                <input
                                    type="text"
                                    id="nicNumber"
                                    name="nicNumber"
                                    value={formData.nicNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="primaryContactNumber" className="block mb-1 text-sm font-semibold">
                                    Primary Contact Number:
                                </label>
                                <input
                                    type="text"
                                    id="primaryContactNumber"
                                    name="primaryContactNumber"
                                    value={formData.primaryContactNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="secondaryContactNumber" className="block mb-1 text-sm font-semibold">
                                    Secondary Contact Number (Optional):
                                </label>
                                <input
                                    type="text"
                                    id="secondaryContactNumber"
                                    name="secondaryContactNumber"
                                    value={formData.secondaryContactNumber}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emailAddress" className="block mb-1 text-sm font-semibold">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            {/* Add Dropdowns for Department or team and Designation */}
                            <div className="mb-4">
                                <label htmlFor="departmentOrTeam" className="block mb-1 text-sm font-semibold">
                                    Department or Team:
                                </label>
                                <select
                                    id="departmentOrTeam"
                                    name="section" // Assuming the department or team corresponds to the section
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Department or Team</option>
                                    {/* Add options dynamically here */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="designation" className="block mb-1 text-sm font-semibold">
                                    Designation:
                                </label>
                                <select
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Designation</option>
                                    {/* Add options dynamically here */}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full">
                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                            <th className="px-4 py-2 border border-gray-300">Full Name</th>
                            <th className="px-4 py-2 border border-gray-300">Section</th>
                            <th className="px-4 py-2 border border-gray-300">Designation</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="px-4 py-2 border border-gray-300">{emp.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.fullName}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.section}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.designation}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button onClick={() => handleEdit(emp.id)} className="px-3 py-1 text-white bg-blue-500 rounded-md">
                                        Update
                                    </button>
                                    <button onClick={() => handleDelete(emp.id)} className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
