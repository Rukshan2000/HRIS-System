import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

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
    const [formData, setFormData] = useState({
        employeeId: '',
        role: 'emp',
        password: ''
    });
    const [notification, setNotification] = useState('');
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/users')
            .then(res => {
                // console.log('Response from /api/employee:', response); // Add this line
                setEmployees(res.data.data)
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        axios.get('http://localhost:8081/api/employee')
            .then(response => {
                console.log('Response from /api/employee:', response); // Add this line
                if (Array.isArray(response.data.data)) {
                    const options = response.data.data.map(emp => ({
                        value: emp.Emp_ID,
                        label: emp.Emp_ID.toString() // Set label to employee ID
                    }));
                    setEmployeeOptions(options);
                } else {
                    console.error('Expected an array but got:', response.data.data); // Add this line
                }
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const toggleForm = () => setShowForm(!showForm);

    const handleSelectChange = (selectedOption) => {
        setFormData({ ...formData, employeeId: selectedOption.value });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.employeeId) {
            alert('Please select an employee ID.');
            return;
        }
        const newPassword = generateRandomPassword();
        const newEmployee = {
            id: employees.length + 1,
            employeeId: formData.employeeId,
            role: formData.role,
            password: newPassword
        };
        setEmployees([...employees, newEmployee]);
        setFormData({ employeeId: '', password: '' });
        setShowForm(false);
        downloadCredentials(newEmployee);
        saveUser(newEmployee);
        window.location.reload();
    };

    const handleUpdate = (id) => {
        const newPassword = generateRandomPassword();
        const data = {
            password: newPassword
        }
        // Update employee's password
        // const updatedEmployees = employees.map(emp =>
        //     emp.id === id ? { ...emp, password: newPassword } : emp
        // );
        // setEmployees(updatedEmployees);
        try {
            axios.patch(`http://localhost:8081/api/users/${id}`, data)
                .then(res => {
                    console.log(res.data);
                    // Download updated credentials
                    const updatedEmployee = { employeeId: id, password: newPassword };
                    downloadCredentials(updatedEmployee);

                })
        } catch (error) {
            console.log('update error', error)
        }

    };

    // Function to handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${id}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting designation:', error);
        }
    };


    const handleCopyPassword = (password) => {
        navigator.clipboard.writeText(password);
        setNotification('Password copied successfully. Paste password in password box.');
        setTimeout(() => {
            setNotification('');
        }, 3000);
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

    const saveUser = (employee) => {
        const { employeeId, password, role } = employee;
        const employeeObj = { username: employeeId, password: password, role: role };
        axios.post('http://localhost:8081/api/users/', employeeObj)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className=" p-10">
            <button
                onClick={toggleForm}
                className="float-end px-4 py-2 mr-4 text-white bg-blue-500 rounded-md"
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
                                    value={employeeOptions.find(option => option.value === formData.employeeId)}
                                    onChange={handleSelectChange}
                                    options={employeeOptions}
                                    className="w-full"
                                    placeholder="Select Employee ID"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role" className="block mb-1 text-sm font-semibold">
                                    Blood Category:
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="emp">Employer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Save</button>
                                <button type="button" onClick={toggleForm} className="px-4 py-2 text-white bg-gray-500 rounded-md">Cancel</button>
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
                            <th className="px-4 py-2 border">Role</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.Emp_Id}>
                                <td className="px-4 py-2 border">{employee.Emp_ID}</td>
                                <td className="px-4 py-2 border">{employee.role}</td>
                                <td className="px-4 py-2 border">
                                    <button onClick={() => handleUpdate(employee.Emp_ID)} className="px-3 py-1 mr-2 text-white bg-green-500 rounded-md">Reset</button>
                                    <button onClick={() => handleDelete(employee.Emp_ID)} className="px-3 py-1 text-white bg-red-500 rounded-md">Delete</button>
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
