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
import TaskUser from './pages/TaskUser.jsx';
import ProfileUser from './pages/ProfileUser.jsx';
import PayRollUser from './pages/PayRollUser.jsx';
import LeaveUser from './pages/LeaveUser.jsx';
import EmployeeUpdate from './pages/EmployeeUpdate.jsx';
import Announcement from './pages/Announcement.jsx';
import ReportPage from './pages/ReportPage.jsx';
import PrivateRoutes from './utils/PrivateRoutes.js';
import Page404 from './pages/Page404.jsx';
import ManagePayroll from './components/ManagePayroll.jsx';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/splashpage" />} /> {/* Redirect to AdminLogin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/splashpage" element={<SplashPage />} />
        <Route path="/signup" element={<Sidebar><Signup /></Sidebar>} />
        
        {/* Protected routes  */}
        {/* <Route element={<PrivateRoutes/>}> */}
          <Route path="/dashboard/*" element={<Sidebar><Dashboard /></Sidebar>} />
          <Route path="/addemployee" element={<Sidebar><AddEmployee /></Sidebar>} />
          <Route path="/payroll" element={<Sidebar><Payroll /></Sidebar>} />
          <Route path="/leave" element={<Sidebar><Leave /></Sidebar>} />
          <Route path="/employee" element={<Sidebar><Employee /></Sidebar>} />
          <Route path="/designations" element={<Sidebar><Designations /></Sidebar>} />
          <Route path="/tasks" element={<Sidebar><Tasks /></Sidebar>} />
          <Route path="/securelayer" element={<Sidebar><SecureLayer /></Sidebar>} />
          <Route path="/adminprofile" element={<Sidebar><AdminProfile /></Sidebar>} />
          <Route path="/announcement" element={<Sidebar><Announcement /></Sidebar>} />
          <Route path="/employeeupdate" element={<Sidebar><EmployeeUpdate /></Sidebar>} />
          <Route path="/mydashboard" element={<MyDashboard />} /> 
          <Route path="/reportpage" element={<Sidebar><ReportPage /></Sidebar>} /> 
          <Route path="/leaveuser" element={<LeaveUser />} /> 
          <Route path="/payrolluser" element={<PayRollUser />} /> 
          <Route path="/profileuser" element={<ProfileUser />} /> 
          <Route path="/taskuser" element={<TaskUser />} />
          <Route path="/managepayroll" element={<Sidebar><ManagePayroll /></Sidebar>} />
          <Route path="*" element={<Page404 />} /> 

        {/* </Route>  */}



      </Routes>
    </BrowserRouter>
  );
};

export default App;
