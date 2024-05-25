import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false); // State to control showing error message
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        axios.post('http://localhost:8081/api/users/login', data)
        .then(res => {
            if (res.data.success==1) {
                // if (res.data.role === 'admin') {
                //     localStorage.setItem("token",res.data.token);
                //     navigate('/dashboard');
                // } else {
                //     navigate('/mydashboard');
                // }
                localStorage.setItem("token",res.data.token);
                navigate('/dashboard');
            } else {
                alert(res.data.Error); // Notify the user of the specific error
            }
            console.log(res);
        })
        .catch(err => console.log(err));



        // // Check if username and password match
        // if (username === 'admin' && password === 'admin') {
        //     // Authentication successful, redirect to dashboard
        //     window.location.href = '/dashboard';
        // } else if (username === 'employee' && password === 'employee') {
        //     // Authentication successful for employee, redirect to mydashboard
        //     window.location.href = '/mydashboard';
        // } else {
        //     // Authentication failed, show error message
        //     setShowError(true);
        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-900 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center">
                        <span className="text-green-500">Flexy</span> <span className="text-white">HRIS</span>
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={handleUsernameChange}
                                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className="relative block w-full px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={handleTogglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                            >
                                <FaEye />
                            </button>
                        </div>
                    </div>

                    {/* Error notification */}
                    {showError && (
                        <div className="p-4 mb-4 text-red-700 bg-red-200 rounded-md">
                            Invalid username or password
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-100">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
