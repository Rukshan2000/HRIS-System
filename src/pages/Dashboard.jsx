import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Summary from '../components/Summary';
import LeaveApprovedStatus from '../components/LeaveApprovedStatus ';
import DailyAttendance from '../components/DailyAttendance';
import { FaUser } from 'react-icons/fa'; // Import the user icon

const Dashboard = () => {
  // Function to handle profile icon click
  const handleProfileClick = () => {
    // Navigate to the admin profile page
    window.location.href = '/adminprofile';
  };

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true)
          setName(res.data.name)
          setRole(res.data.role)

        } else {
          setAuth(false)
          setMessage(res.data.Error)
        }
      })
      .then(err => console.log(err));
  }, [])





  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center">
          {/* Profile icon with click event */}
          <p className='text-white me-2 '>{name}</p>
          <p className='text-white me-2 '>{role}</p>
          <FaUser
            className="mr-4 text-xl text-white"
            onClick={handleProfileClick} // Attach onClick event handler
          />
          {/* Add your profile menu here */}
        </div>
      </div>
      
      <Summary />
      <DailyAttendance />
    </div>
  );
};

export default Dashboard;
