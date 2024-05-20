import React, { useState } from 'react';

const Payroll = () => {
    const [employees, setEmployees] = useState([
        { id: 1, department: 'department A', otHours: 5, noPayLeaves: 2, taxPercentage: 5, epf: 200, etf: 100, allowance: 100, salary: 2000 },
        { id: 2, department: 'department B', otHours: 3, noPayLeaves: 1, taxPercentage: 3, epf: 150, etf: 80, allowance: 150, salary: 2500 },
        { id: 3, department: 'department C', otHours: 1, noPayLeaves: 1, taxPercentage: 10, epf: 100, etf: 200, allowance: 100, salary: 10000 },
        // Add more employees here
    ]);

    const [formData, setFormData] = useState({
        id: '',
        department: '',
        otHours: '',
        noPayLeaves: '',
        taxPercentage: '',
        epf: '',
        etf: '',
        allowance: '',
        salary: ''
    });

    const [filters, setFilters] = useState({
        department: ''
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
        setFormData({ id: '', department: '', otHours: '', noPayLeaves: '', taxPercentage: '', epf: '', etf: '', allowance: '', salary: '' });
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

    const handleGenerate = (id) => {
        const updatedEmployees = employees.map((emp) => {
            if (emp.id === id) {
                const otHourlyRate = parseInt(emp.salary) / 720;
                const noPayDeduction = parseInt(emp.salary) / 30;
                
                const totalOT = parseInt(emp.otHours) * otHourlyRate;
                const totalNPLeaves = parseInt(emp.noPayLeaves) * noPayDeduction;
                const totalSalary = parseInt(emp.salary) + totalOT - totalNPLeaves;
                const totalAllowance = parseInt(emp.allowance);
                const totalEPF = parseInt(emp.epf);
                const totalETF = parseInt(emp.etf);
                const total = totalSalary + totalAllowance - totalEPF - totalETF;
                const taxPercentage = parseInt(emp.taxPercentage);
                const tax = (total * taxPercentage) / 100;
                const totalIncome = total - tax;
    
                return {
                    ...emp,
                    totalIncome: totalIncome
                };
            }
            return emp;
        });
        setEmployees(updatedEmployees);
    };

    const filteredEmployees = employees.filter((emp) => {
        const { department } = filters;
        return (
            emp.department.toLowerCase().includes(department.toLowerCase())
        );
    });

    return (
        <div className="container flex flex-col mx-auto">
            <div className="flex mb-4">
                <input
                    type="text"
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    placeholder="Filter by Department"
                    className="px-3 py-2 mr-2 border border-gray-300 rounded-md"
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
                                <label htmlFor="department" className="block mb-1 text-sm font-semibold">Department:</label>
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
                                <label htmlFor="allowance" className="block mb-1 text-sm font-semibold">Allowance:</label>
                                <input
                                    type="number"
                                    id="allowance"
                                    name="allowance"
                                    value={formData.allowance}
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
                                <label htmlFor="taxPercentage" className="block mb-1 text-sm font-semibold">Tax Percentage:</label>
                                <input
                                    type="number"
                                    id="taxPercentage"
                                    name="taxPercentage"
                                    value={formData.taxPercentage}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="epf" className="block mb-1 text-sm font-semibold">EPF:</label>
                                <input
                                    type="number"
                                    id="epf"
                                    name="epf"
                                    value={formData.epf}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="etf" className="block mb-1 text-sm font-semibold">ETF:</label>
                                <input
                                    type="number"
                                    id="etf"
                                    name="etf"
                                    value={formData.etf}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between col-span-2">
                                <div>
                                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                    <button type="button" onClick={toggleForm} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Cancel</button>
                                </div>
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
                            <th className="px-4 py-2 border border-gray-300">Department</th>
                            <th className="px-4 py-2 border border-gray-300">OT hours</th>
                            <th className="px-4 py-2 border border-gray-300">No Pay Leaves</th>
                            <th className="px-4 py-2 border border-gray-300">Tax Percentage</th>
                            <th className="px-4 py-2 border border-gray-300">EPF</th>
                            <th className="px-4 py-2 border border-gray-300">ETF</th>
                            <th className="px-4 py-2 border border-gray-300">Allowance</th>
                            <th className="px-4 py-2 border border-gray-300">Salary</th>
                            <th className="px-4 py-2 border border-gray-300">Total Income</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="px-4 py-2 border border-gray-300">{emp.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.department}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.otHours}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.noPayLeaves}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.taxPercentage}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.epf}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.etf}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.allowance}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.salary}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalIncome}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button onClick={() => handleEdit(emp.id)} className="px-3 py-1 text-white bg-blue-500 rounded-md">Update</button>
                                    <button onClick={() => handleDelete(emp.id)} className="px-3 py-1 ml-2 text-white bg-red-500 rounded-md">Delete</button>
                                    <button type="button" onClick={() => handleGenerate(emp.id)} className="px-3 py-1 ml-2 text-white bg-green-500 rounded-md">Generate</button>
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
