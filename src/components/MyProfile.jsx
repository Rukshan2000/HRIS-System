import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';

const MyProfile = () => {
    // Dummy user data (replace with actual user data from your database or state)
    const userData = {
        fullName: "John Doe",
        dateOfBirth: "01/01/1990",
        gender: "Male",
        nicNumber: "123456789V",
        permanentAddress: "123 Main St, City",
        primaryContactNumber: "+1234567890",
        emailAddress: "john.doe@example.com",
        secondaryContactNumber: "+9876543210",
        employmentStartDate: "01/01/2020",
        department: "Human Resources",
        designation: "Manager",
        emergencyContact: {
            name: "Jane Doe",
            gender: "Female",
            contactNumber: "+1987654321",
            address: "456 Second St, Town"
        }
    };

    // State to manage password update modal, password fields, success status, and profile picture modal
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
    const [showProfilePicModal, setShowProfilePicModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    // Function to handle password update
    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // Check if new password and confirm password match
        if (newPassword === confirmPassword) {
            // Logic to update password
            console.log("Password update logic goes here");
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

    // Function to handle profile picture upload
    const handleProfilePictureUpload = (e) => {
        const file = e.target.files[0];
        // Logic to upload profile picture
        console.log("Profile picture upload logic goes here");
        // Set profile picture and close modal
        setProfilePicture(URL.createObjectURL(file));
        setShowProfilePicModal(false);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="mb-6 text-3xl font-bold text-center">My Profile</h2>
            {/* Profile Picture */}
            {profilePicture && (
                <div className="flex justify-center mb-6">
                    <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full shadow-lg" />
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Profile Information */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Personal Information</h3>
                    <div>
                        <p><span className="font-semibold">Full Name:</span> {userData.fullName}</p>
                        <p><span className="font-semibold">Date of Birth:</span> {userData.dateOfBirth}</p>
                        <p><span className="font-semibold">Gender:</span> {userData.gender}</p>
                        <p><span className="font-semibold">NIC Number:</span> {userData.nicNumber}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h3>
                    <div>
                        <p><span className="font-semibold">Permanent Address:</span> {userData.permanentAddress}</p>
                        <p><span className="font-semibold">Primary Contact Number:</span> {userData.primaryContactNumber}</p>
                        <p><span className="font-semibold">Email Address:</span> {userData.emailAddress}</p>
                        <p><span className="font-semibold">Secondary Contact Number:</span> {userData.secondaryContactNumber}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Employment Information</h3>
                    <div>
                        <p><span className="font-semibold">Employment Start Date:</span> {userData.employmentStartDate}</p>
                        <p><span className="font-semibold">Department:</span> {userData.department}</p>
                        <p><span className="font-semibold">Designation:</span> {userData.designation}</p>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Emergency Contact</h3>
                    <div>
                        <p><span className="font-semibold">Name:</span> {userData.emergencyContact.name}</p>
                        <p><span className="font-semibold">Gender:</span> {userData.emergencyContact.gender}</p>
                        <p><span className="font-semibold">Contact Number:</span> {userData.emergencyContact.contactNumber}</p>
                        <p><span className="font-semibold">Address:</span> {userData.emergencyContact.address}</p>
                    </div>
                </div>
            </div>

            {/* Button to upload profile picture */}
            <div className="flex justify-center mt-8">
                <button onClick={() => setShowProfilePicModal(true)} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Upload Profile Picture</button>
            </div>

            {/* Upload Profile Picture Modal */}
            {showProfilePicModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-lg font-semibold">Upload Profile Picture</h3>
                        <input type="file" onChange={handleProfilePictureUpload} />
                    </div>
                </div>
            )}

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

export default MyProfile;
