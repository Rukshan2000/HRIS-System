import React, { useState } from 'react';

const Payroll = () => {
    const [employees, setEmployees] = useState([
        { id: 1, section: 'Section A', designation: 'Manager', otHours: 5, noPayLeaves: 2, loanDeduction: 100 },
        { id: 2, section: 'Section B', designation: 'Developer', otHours: 3, noPayLeaves: 1, loanDeduction: 50 },
        // Add more employees here
    ]);

    const [formData, setFormData] = useState({
        id: '',
        section: '',
        designation: '',
        otHours: '',
        noPayLeaves: '',
        loanDeduction: ''
    });

    const [filters, setFilters] = useState({
        section: '',
        designation: ''
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
        setFormData({ id: '', section: '', designation: '', otHours: '', noPayLeaves: '', loanDeduction: '' });
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
        <div className="container flex flex-col mx-auto">
            <div className="flex mb-4">
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
                className="self-end px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
            >
                Add New
            </button>
            {showForm && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Add/Edit Employee</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="id" className="block mb-1 text-sm font-semibold">Emp ID:</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="section" className="block mb-1 text-sm font-semibold">Section:</label>
                                <input
                                    type="text"
                                    id="section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="designation" className="block mb-1 text-sm font-semibold">Designation:</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="otHours" className="block mb-1 text-sm font-semibold">OT hours:</label>
                                <input
                                    type="number"
                                    id="otHours"
                                    name="otHours"
                                    value={formData.otHours}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="noPayLeaves" className="block mb-1 text-sm font-semibold">No Pay Leaves:</label>
                                <input
                                    type="number"
                                    id="noPayLeaves"
                                    name="noPayLeaves"
                                    value={formData.noPayLeaves}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="loanDeduction" className="block mb-1 text-sm font-semibold">Loan Deduction:</label>
                                <input
                                    type="number"
                                    id="loanDeduction"
                                    name="loanDeduction"
                                    value={formData.loanDeduction}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                <button type="button" onClick={toggleForm} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="overflow-auto">
                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                            <th className="px-4 py-2 border border-gray-300">Section</th>
                            <th className="px-4 py-2 border border-gray-300">Designation</th>
                            <th className="px-4 py-2 border border-gray-300">OT hours</th>
                            <th className="px-4 py-2 border border-gray-300">No Pay Leaves</th>
                            <th className="px-4 py-2 border border-gray-300">Loan Deduction</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="px-4 py-2 border border-gray-300">{emp.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.section}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.designation}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.otHours}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.noPayLeaves}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.loanDeduction}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button onClick={() => handleEdit(emp.id)} className="px-3 py-1 text-white bg-blue-500 rounded-md">Update</button>
                                    <button onClick={() => handleDelete(emp.id)} className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payroll;
