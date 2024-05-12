import React, { useState } from 'react';

const Designation = () => {
    // Dummy data for designations
    const [designations, setDesignations] = useState([
        { id: 1, department: 'Department A', designation: 'Manager', basicSalary: 5000 },
        { id: 2, department: 'Department B', designation: 'Developer', basicSalary: 4000 },
        // Add more designations here
    ]);

    // Form data state
    const [formData, setFormData] = useState({
        id: '',
        department: '',
        designation: '',
        basicSalary: '',
        overtimePayRate: '',
        fuelAllowance: '',
        medicalAllowance: '',
        noPayLeaveDeductionRate: '',
        epfDeduction: '',
        welfareDeduction: '',
        taxDeduction: ''
    });

    // Filter state
    const [filters, setFilters] = useState({
        department: '',
        designation: ''
    });

    // Toggle add/edit form visibility
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => setShowForm(!showForm);

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing designation
            const updatedDesignations = designations.map((item) =>
                item.id === formData.id ? formData : item
            );
            setDesignations(updatedDesignations);
        } else {
            // Add new designation
            setDesignations([...designations, { ...formData, id: Date.now() }]);
        }
        // Reset form data
        setFormData({ id: '', department: '', designation: '', basicSalary: '', overtimePayRate: '', fuelAllowance: '', medicalAllowance: '', noPayLeaveDeductionRate: '', epfDeduction: '', welfareDeduction: '', taxDeduction: '' });
        // Close the form
        setShowForm(false);
    };

    // Function to handle edit button click
    const handleEdit = (id) => {
        const designationToEdit = designations.find((item) => item.id === id);
        setFormData(designationToEdit);
        setShowForm(true);
    };

    // Function to handle delete button click
    const handleDelete = (id) => {
        const updatedDesignations = designations.filter((item) => item.id !== id);
        setDesignations(updatedDesignations);
    };

    // Function to filter designations based on filters
    const filteredDesignations = designations.filter((designation) => {
        const { department, designation: desig } = filters;
        return (
            designation.department.toLowerCase().includes(department.toLowerCase()) &&
            designation.designation.toLowerCase().includes(desig.toLowerCase())
        );
    });

    return (
        <div className="container flex flex-col items-start mx-auto">
            <div className="flex mb-4">
                <input
                    type="text"
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    placeholder="Filter by Department"
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
            <button onClick={toggleForm} className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md">Add New</button>
            {showForm && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Add/Edit Designation</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-semibold" htmlFor="department">Department:</label>
                                    <input
                                        type="text"
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-semibold" htmlFor="designation">Designation:</label>
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
                                    <label className="block mb-1 text-sm font-semibold" htmlFor="basicSalary">Basic Salary:</label>
                                    <input
                                        type="number"
                                        id="basicSalary"
                                        name="basicSalary"
                                        value={formData.basicSalary}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                {/* Add more input fields for other details */}
                            </div>
                            <div>
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                <button type="button" onClick={toggleForm} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <table className="w-full border border-collapse border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">Department</th>
                        <th className="px-4 py-2 border border-gray-300">Designation</th>
                        <th className="px-4 py-2 border border-gray-300">Update</th>
                        <th className="px-4 py-2 border border-gray-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDesignations.map((designation) => (
                        <tr key={designation.id}>
                            <td className="px-4 py-2 border border-gray-300">{designation.department}</td>
                            <td className="px-4 py-2 border border-gray-300">{designation.designation}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                <button onClick={() => handleEdit(designation.id)} className="px-3 py-1 text-white bg-blue-500 rounded-md">Update</button>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                <button onClick={() => handleDelete(designation.id)} className="px-3 py-1 text-white bg-red-500 rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Designation;
