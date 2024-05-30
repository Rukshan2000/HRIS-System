import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');

    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        department: '',
        designation: '',
        employmentStartDate: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        bloodCategory: '',
        permanentAddress: '',
        dateOfBirth: '',
        gender: '',
        nicNumber: '',
        primaryContactNumber: '',
        secondaryContactNumber: '',
        shift: '',
        emailAddress: '',
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
        fetchDesignations();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/department');
            const result = await response.json();
            if (result.success === 1 && Array.isArray(result.data)) {
                setDepartments(result.data.map(dep => ({
                    id: dep.Dept_ID,
                    name: dep.Name,
                })));
            } else {
                setDepartments([]);
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            setDepartments([]);
        }
    };

    const fetchDesignations = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/designation');
            const result = await response.json();
            if (result.success === 1 && Array.isArray(result.data)) {
                setDesignations(result.data.map(desig => ({
                    id: desig.Desig_ID,
                    name: desig.Name,
                })));
            } else {
                setDesignations([]);
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching designations:', error);
            setDesignations([]);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/employee');
            const result = await response.json();
            if (result.success === 1 && Array.isArray(result.data)) {
                setEmployees(result.data.map(employee => ({
                    id: employee.Emp_ID,
                    fullName: employee.Name,
                    shift: employee.Shift,
                    department: employee.Department_ID,
                    designation: employee.Designation_ID,
                    employmentStartDate: employee.Start_Date,
                    emergencyContactName: employee.Emergency_Name,
                    emergencyContactNumber: employee.Emergency_Contact,
                    bloodCategory: employee.Blood_Type,
                    permanentAddress: employee.Address,
                    dateOfBirth: employee.DOB,
                    gender: employee.Gender,
                    nicNumber: employee.NIC,
                    primaryContactNumber: employee.Primary_Contact_No,
                    secondaryContactNumber: employee.Secondary_Contact_No,
                    emailAddress: employee.Email,
                })));
            } else {
                setEmployees([]);
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        }
    };

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = formData.id
                ? `http://localhost:8081/api/employee/${formData.id}`
                : 'http://localhost:8081/api/employee';

            const method = formData.id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchEmployees();
                resetFormDataAndToggleForm();
            } else {
                console.error('Failed to save employee data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    const resetFormDataAndToggleForm = () => {
        setFormData({
            id: '',
            fullName: '',
            department: '',
            designation: '',
            shift: '',
            employmentStartDate: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
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

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8081/api/employee/${id}`, {
                method: 'DELETE',
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const matchesDepartment = selectedDepartment ? emp.department === parseInt(selectedDepartment) : true;
        const matchesDesignation = selectedDesignation ? emp.designation === parseInt(selectedDesignation) : true;
        return matchesDepartment && matchesDesignation;
    });

    return (
        <div className="container flex flex-col items-center mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Employee</h1>
            <button
                onClick={toggleForm}
                className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
            >
                Add New
            </button>
            {showForm && (
                <EmployeeForm
                    formData={formData}
                    departments={departments}
                    designations={designations}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    toggleForm={toggleForm}
                />
            )}
            <div className="w-full">
                <div className="mb-4">
                    <label htmlFor="departmentFilter" className="mr-2">Filter by Department:</label>
                    <select
                        id="departmentFilter"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="designationFilter" className="mr-2">Filter by Designation:</label>
                    <select
                        id="designationFilter"
                        value={selectedDesignation}
                        onChange={(e) => setSelectedDesignation(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        {designations.map((designation) => (
                            <option key={designation.id} value={designation.id}>{designation.name}</option>
                        ))}
                    </select>
                </div>

                <table className="w-full border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Emp ID</th>
                            <th className="px-4 py-2 border border-gray-300">Full Name</th>
                            <th className="px-4 py-2 border border-gray-300">Department</th>
                            <th className="px-4 py-2 border border-gray-300">Designation</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td className="px-4 py-2 border border-gray-300">{emp.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{emp.fullName}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {departments.find(dep => dep.id === emp.department)?.name}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {designations.find(desig => desig.id === emp.designation)?.name}
                                </td>
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
                        {filteredEmployees.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center border border-gray-300">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
