import React from 'react';

const SuccessMessage = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-lg font-semibold">Success</h3>
                <div className="p-2 text-green-700 bg-green-100 border border-green-400 rounded-md">
                    {message}
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Close</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
