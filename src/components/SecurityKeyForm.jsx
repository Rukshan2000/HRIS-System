import React, { useState } from 'react';

const SecurityKeyForm = () => {
    const [securityKey, setSecurityKey] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSecurityKey(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the security key is correct (you can replace this with your own logic)
        if (securityKey === 'password') {
            // Navigate to the Add Employee page
            window.location.href = '/addemployee';
        } else {
            // Display error message for incorrect security key
            setError('Incorrect security key. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-md shadow-md">
                <h2 className="mb-4 font-mono text-2xl font-bold text-center text-gray-800">Enter Security Key</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter security key"
                        value={securityKey}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 mb-4 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="w-full py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                </form>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default SecurityKeyForm;
