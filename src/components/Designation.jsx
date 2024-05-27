import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Designation = () => {
    // State for departments
    const [departments, setDepartments] = useState([]);

    // State for designations
    const [designations, setDesignations] = useState([]);

    // Form data state
    const [formData, setFormData] = useState({
        id: 0,
        department: '',
        designation: '',
        basicSalary: '',
    });

    // New department state
    const [newDepartment, setNewDepartment] = useState('');

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
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle new department input change
    const handleNewDepartmentChange = (e) => {
        setNewDepartment(e.target.value);
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
        setFormData({
            id: '',
            department: '',
            designation: '',
            basicSalary: '',
        });
        // Close the form
        setShowForm(false);
    };

    // Function to handle adding a new department
    const handleAddDepartment = () => {
        if (newDepartment && !departments.includes(newDepartment)) {
            setDepartments([...departments, newDepartment]);
            setNewDepartment('');
        }
    };

    // Function to handle edit button click
    const handleEdit = (id) => {
        axios.get(`http://localhost:8081/api/designation/${id}`)
            .then(res => {
                const data = res.data;
                setFormData({
                    id: data.Desig_ID,
                    department: data.Department_ID,
                    designation: data.Name,
                    basicSalary: data.Base_Salary,
                });
                setShowForm(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // Function to handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/designation/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting designation:', error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8081/api/designation')
            .then(res => {
                setDesignations(res.data.data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:8081/api/department')
            .then(res => {
                setDepartments(res.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="container flex flex-col items-start mx-auto">
            <div className="flex mb-4">
                <select
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
                >
                    <option value="">Filter by Department</option>
                    {departments.map((department, index) => (
                        <option key={index} value={department.Dept_ID}>
                            {department.Name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="designation"
                    value={filters.designation}
                    onChange={handleFilterChange}
                    placeholder="Filter by Designation"
                    className="px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button onClick={toggleForm} className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md">Add New Designation</button>
            {showForm && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Add/Edit Designation</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block mb-1 text-sm font-semibold" htmlFor="department">Department:</label>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((department, index) => (
                                            <option key={index} value={department.Dept_ID}>
                                                {department.Name}
                                            </option>
                                        ))}
                                    </select>
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
                            </div>
                            <div>
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                <button type="button" onClick={toggleForm} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mb-4">
                <h2 className="mb-2 text-lg font-semibold">Add New Department</h2>
                <div className="flex">
                    <input
                        type="text"
                        value={newDepartment}
                        onChange={handleNewDepartmentChange}
                        placeholder="New Department"
                        className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
                    />
                    <button onClick={handleAddDepartment} className="px-4 py-2 text-white bg-green-500 rounded-md">Add Department</button>
                </div>
            </div>
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
                    {designations.map((designation) => (
                        <tr key={designation.Desig_ID}>
                            <td className="px-4 py-2 border border-gray-300">{designation.Department_ID}</td>
                            <td className="px-4 py-2 border border-gray-300">{designation.Name}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                <button onClick={() => handleEdit(designation.Desig_ID)} className="px-3 py-1 text-white bg-blue-500 rounded-md">Update</button>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                                <button onClick={() => handleDelete(designation.Desig_ID)} className="px-3 py-1 text-white bg-red-500 rounded-md">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Designation;
