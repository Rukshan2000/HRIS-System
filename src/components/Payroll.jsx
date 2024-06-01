import React, { useState } from 'react';

const Payroll = () => {
    const [employees, setEmployees] = useState([
        { id: 1, department: 'department A', otHours: 5, allowance: 100, salary: 200000 },
        { id: 2, department: 'department B', otHours: 3, allowance: 150, salary: 250000 },
        { id: 3, department: 'department C', otHours: 1, allowance: 100, salary: 100000 },
        // Add more employees here
    ]);

    const [formData, setFormData] = useState({
        id: '',
        department: '',
        otHours: '',
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
        setFormData({ id: '', department: '', otHours: '', allowance: '', salary: '' });
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
                const otHourlyRate = parseFloat(emp.salary) / 176;

                const totalOT = parseFloat(emp.otHours) * otHourlyRate;
                const totalSalary = parseFloat(emp.salary) + totalOT;
                const totalAllowance = parseFloat(emp.allowance);

                // Tax calculation
                const annualSalary = parseFloat(emp.salary) * 12;
                let tax = 0;

                if (annualSalary <= 1200000) {
                    tax = 0;
                } else if (annualSalary <= 2000000) {
                    tax = 2500;
                } else if (annualSalary <= 2500000) {
                    tax = 5000;
                } else if (annualSalary <= 3000000) {
                    tax = 7500;
                } else if (annualSalary <= 3500000) {
                    tax = 10000;
                } else if (annualSalary <= 4000000) {
                    tax = 12500;
                } else {
                    tax = 69000 + (annualSalary - 4200000) * 0.36;
                }

                // EPF and ETF calculation
                const employeeEPFContribution = parseFloat(emp.salary) * 0.08;
                const employerEPFContribution = parseFloat(emp.salary) * 0.12;
                const employerETFContribution = parseFloat(emp.salary) * 0.03;
                const totalEmployerContribution = employerEPFContribution + employerETFContribution;
                const totalEPFs = employeeEPFContribution + employerEPFContribution;
                const totalETF = employerETFContribution;

                // Deduct EPF, ETF, tax, and allowance contributions from total income
                const totalIncome = (totalSalary + totalAllowance - tax - totalEPFs - totalETF).toFixed(2);

                return {
                    ...emp,
                    totalIncome: totalIncome,
                    totalETF: totalETF.toFixed(2),
                    totalEPF: totalEPFs.toFixed(2),
                    totalTax: tax.toFixed(2),
                    totalOT: totalOT.toFixed(2),

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
                            <th className="px-4 py-2 border border-gray-300">Total OT</th>
                            <th className="px-4 py-2 border border-gray-300">Allowance</th>
                            <th className="px-4 py-2 border border-gray-300">Total ETF</th>
                            <th className="px-4 py-2 border border-gray-300">Total EPF</th>
                            <th className="px-4 py-2 border border-gray-300">Total Tax</th>
                            <th className="px-4 py-2 border border-gray-300">Total Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="px-4 py-2 border border-gray-300">{emp.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.department}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalOT}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.allowance}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalETF}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalEPF}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalTax}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.totalIncome}</td>
                                <td className="px-4 py-2 border border-gray-300">
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
