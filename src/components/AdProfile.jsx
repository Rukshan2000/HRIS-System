import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

const AdProfile = () => {
    // State to store employee data
    const [employee, setEmployee] = useState(null);
    const location = useLocation();
    const username = location.state && location.state.username;

    // Function to fetch employee data based on username
    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/employee?username=${username}`);
            const result = await response.json();
            if (result.success === 1 && Array.isArray(result.data)) {
                // Assuming username is unique, directly take the first employee from the array
                const foundEmployee = result.data[0];
                setEmployee(foundEmployee);
            } else {
                console.error('Unexpected data format:', result);
            }
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    // Fetch employee data on component mount
    useEffect(() => {
        fetchEmployee();
    }, [username]); // Trigger fetchEmployee again when username changes

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
        </div>
    );
};

export default AdProfile;
