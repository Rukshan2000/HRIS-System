import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SuccessMessage from './SuccessMessage';


const AdProfile = () => {
    // State to store employee data
    const [employee, setEmployee] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
    const [employeeId, setemployeeId] = useState('');


    // Function to fetch employee data based on username
    const fetchEmployee = async (empid) => {
        try {
            await axios.get(`http://localhost:8081/api/employee/${empid}`)
                .then(res => {
                    setEmployee(res.data.data)
                });

        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    // Function to handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // Check if new password and confirm password match
        if (newPassword === confirmPassword) {
            
            const data = {
                password: newPassword
            }
            // Update employee's password
            try {
                axios.patch(`http://localhost:8081/api/users/${employeeId}`, data)
                    .then(res => {
                        console.log(res.data);
                    })
            } catch (error) {
                console.log('update error', error)
            }

            // Reset password fields and hide modal
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordModal(false);
            // Set password update success status
            setPasswordUpdateSuccess(true);
        } else {
            // Set passwordsMatch state to false to display red notification
            setPasswordsMatch(false);
        }
    };

    // Fetch employee data on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get('http://localhost:8081/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    // console.log('data', res.data);
                    setemployeeId(res.data.empId);
                    fetchEmployee(res.data.empId);
                })
                .catch(err => console.log(err));
        };

    }, []);

    // Return loading message while data is being fetched
    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="mb-6 text-3xl font-bold text-center">My Profile</h2>

            {/* Profile Information */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Personal Information</h3>
                    <div>
                        <p><span className="font-semibold">Full Name:</span> {employee.Name}</p>
                        <p><span className="font-semibold">Date of Birth:</span> {employee.DOB}</p>
                        <p><span className="font-semibold">Gender:</span> {employee.Gender}</p>
                        <p><span className="font-semibold">NIC Number:</span> {employee.NIC}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h3>
                    <div>
                        <p><span className="font-semibold">Permanent Address:</span> {employee.Address}</p>
                        <p><span className="font-semibold">Primary Contact Number:</span> {employee.Primary_Contact_No}</p>
                        <p><span className="font-semibold">Email Address:</span> {employee.Email}</p>
                        <p><span className="font-semibold">Secondary Contact Number:</span> {employee.Secondary_Contact_No}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Employment Information</h3>
                    <div>
                        <p><span className="font-semibold">Employment Start Date:</span> {employee.Start_Date}</p>
                        <p><span className="font-semibold">Department:</span> {employee.Department_ID}</p>
                        <p><span className="font-semibold">Designation:</span> {employee.Designation_ID}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Emergency Contact</h3>
                    <div>
                        <p><span className="font-semibold">Name:</span> {employee.Emergency_Name}</p>
                        <p><span className="font-semibold">Contact Number:</span> {employee.Emergency_Contact}</p>
                    </div>
                </div>
            </div>

             {/* Password Update Modal */}
             {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-lg font-semibold">Update Password</h3>
                        <form onSubmit={handlePasswordUpdate}>
                            {/* Password input fields */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <input 
                                    type="password" 
                                    id="newPassword" 
                                    name="newPassword" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    className="block w-full p-2 mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className={`block w-full p-2 mt-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${!passwordsMatch && 'border-red-500'}`} 
                                />
                                {/* Red notification for mismatched passwords */}
                                {!passwordsMatch && <p className="mt-1 text-sm text-red-500">Passwords do not match.</p>}
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Success message pop-up */}
            {passwordUpdateSuccess && (
                <SuccessMessage message="Password updated successfully!" onClose={() => setPasswordUpdateSuccess(false)} />
            )}
            {/* Button to toggle password update modal */}
            <div className="flex justify-center mt-8">
                <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update Password</button>
            </div>
        </div>
    );
};

export default AdProfile;
