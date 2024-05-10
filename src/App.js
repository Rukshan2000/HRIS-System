// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Payroll from './pages/Payroll.jsx';
import Employee from './pages/Employee.jsx';
import Leave from './pages/Leave.jsx';
import Designations from './pages/Designations.jsx';
import Tasks from './pages/Tasks.jsx';
import Signup from './pages/Signup.jsx';
import MyDashboard from './pages/MyDashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx'; // Import AdminLogin component
import SplashPage from './pages/SplashPage.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import SecureLayer from './pages/SecureLayer.jsx';
import AdminProfile from './pages/AdminProfile.jsx';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/splashpage" />} /> {/* Redirect to AdminLogin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/addemployee" element={<Sidebar><AddEmployee /></Sidebar>} />
        <Route path="/splashpage" element={<SplashPage />} />
        <Route path="/dashboard/*" element={<Sidebar><Dashboard /></Sidebar>} /> {/* Protected route for Dashboard */}
        <Route path="/mydashboard" element={<MyDashboard />} /> {/* Render MyDashboard component without Sidebar */}
        <Route path="/payroll" element={<Sidebar><Payroll /></Sidebar>} />
        <Route path="/leave" element={<Sidebar><Leave /></Sidebar>} />
        <Route path="/employee" element={<Sidebar><Employee /></Sidebar>} />
        <Route path="/designations" element={<Sidebar><Designations /></Sidebar>} />
        <Route path="/tasks" element={<Sidebar><Tasks /></Sidebar>} />
        <Route path="/signup" element={<Sidebar><Signup /></Sidebar>} />
        <Route path="/securelayer" element={<Sidebar><SecureLayer /></Sidebar>} />
        <Route path="/adminprofile" element={<Sidebar><AdminProfile /></Sidebar>} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
