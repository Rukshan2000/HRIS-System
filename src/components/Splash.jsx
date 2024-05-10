import React, { useEffect } from 'react';
import Login from './Login'; // Import the Login component

const Splash = () => {
    // Use useEffect to redirect to the dashboard after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            // Redirect to dashboard
            window.location.href = '/adminlogin';
        }, 3000);

        // Clear the timer when component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold">
                    <span className="text-green-500">Flexy</span>{' '}
                    <span className="text-white">HRIS</span>
                </h1>
                <div className="mt-8">
        <div class='flex space-x-2 justify-center items-center bg-gray-900 h-32 dark:'>
                            <span class='sr-only'>Loading...</span>
                            <div class='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                            <div class='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                            <div class='h-4 w-4 bg-white rounded-full animate-bounce'></div>
                        </div>                </div>
            </div>
        </div>
    );
};

export default Splash;
