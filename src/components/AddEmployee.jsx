import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: '1', label: 'Employee 1' },
    { value: '2', label: 'Employee 2' },
    // Add more options as needed
];

const generateRandomPassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*';
    const numbers = '0123456789';

    let password = '';

    // Generate 4 random letters
    for (let i = 0; i < 4; i++) {
        password += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Generate 2 random symbols
    for (let i = 0; i < 2; i++) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    // Generate 3 random numbers
    for (let i = 0; i < 3; i++) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Shuffle the password characters
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
};

const AddEmployee = () => {
    const [showForm, setShowForm] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        password: ''
    });
    const [notification, setNotification] = useState('');

    const [employees, setEmployees] = useState([
        { id: 1, employeeId: '1', password: 'password1' },
        { id: 2, employeeId: '2', password: 'password2' },
        // Add more dummy data as needed
    ]);

    const toggleForm = () => setShowForm(!showForm);
    const toggleUpdateForm = () => setUpdateFormVisible(!updateFormVisible);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, employeeId: selectedOption.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = {
            id: employees.length + 1,
            employeeId: formData.employeeId,
            password: formData.password
        };
        setEmployees([...employees, newEmployee]);
        setFormData({ employeeId: '', password: '' });
        setShowForm(false);
        downloadCredentials(newEmployee);
    };

    const handleUpdatePassword = () => {
        const updatedEmployees = employees.map(emp =>
            emp.id === formData.id ? { ...emp, password: formData.password } : emp
        );
        setEmployees(updatedEmployees);
        setFormData({ ...formData, password: '', employeeId: '' });
        toggleUpdateForm();
        downloadCredentials(formData);
    };

    const downloadCredentials = (employee) => {
        const { employeeId, password } = employee;
        const text = `Employee ID: ${employeeId}\nPassword: ${password}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `credentials_${employeeId}.txt`;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const handleUpdate = (id) => {
        toggleUpdateForm();
        const employeeToUpdate = employees.find(emp => emp.id === id);
        setFormData({ ...formData, employeeId: employeeToUpdate.employeeId });
    };

    const handleDelete = (id) => {
        // Add logic to delete employee data
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const handleCancel = () => {
        setShowForm(false);
        setUpdateFormVisible(false);
    };

    const handleCopyPassword = (password) => {
        navigator.clipboard.writeText(password);
        setNotification('Password copied successfully. Paste password in password box.');
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleForm}
                className="absolute top-0 right-0 px-4 py-2 mr-4 text-white bg-blue-500 rounded-md"
            >
                Add New
            </button>
            {showForm && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Add Employee</h2>
                        {notification && (
                            <div className="mb-4 text-green-500">{notification}</div>
                        )}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <div className="mb-4">
                                <label htmlFor="employeeId" className="block mb-1 text-sm font-semibold">Employee ID:</label>
                                <Select
                                    id="employeeId"
                                    name="employeeId"
                                    value={options.find(option => option.value === formData.employeeId)}
                                    onChange={handleSelectChange}
                                    options={options}
                                    className="w-full"
                                    placeholder="Select Employee ID"
                                />
                            </div>
                            <div className="flex mb-4">
                                <label htmlFor="password" className="block mb-1 text-sm font-semibold">Password:</label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <button type="button" onClick={() => handleCopyPassword(generateRandomPassword())} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Copy Random Password</button>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                <button type="button" onClick={handleCancel} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {updateFormVisible && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="mb-4 text-lg font-semibold">Reset Password</h2>
                        <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 gap-4">
                            <div className="flex mb-4">
                                <label htmlFor="password" className="block mb-1 text-sm font-semibold">New Password:</label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <button type="button" onClick={() => handleCopyPassword(generateRandomPassword())} className="px-4 py-2 ml-2 text-white bg-gray-500 rounded-md">Copy Random Password</button>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Reset</button>
                                <button type="button" onClick={handleCancel} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold">Employee Data</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Employee ID</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td className="px-4 py-2 border">{employee.employeeId}</td>
                                <td className="px-4 py-2 border">
                                    <button onClick={() => handleUpdate(employee.id)} className="px-3 py-1 mr-2 text-white bg-green-500 rounded-md">Update</button>
                                    <button onClick={() => handleDelete(employee.id)} className="px-3 py-1 text-white bg-red-500 rounded-md">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddEmployee;
