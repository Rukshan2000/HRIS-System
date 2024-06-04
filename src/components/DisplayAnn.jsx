import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBullhorn } from 'react-icons/fa';

const DisplayAnn = () => {
  const [announcementPreviews, setAnnouncementPreviews] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    fetchEmployees();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/announcement');
      const announcements = response.data.data;
      console.log('Fetched Announcements:', announcements);
      setAnnouncementPreviews(announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/employee');
      const employees = response.data.data;
      console.log('Fetched Employees:', employees);
      setEmployees(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const getEmployeeName = (empId) => {
    const employee = employees.find(emp => emp.Emp_ID === empId);
    return employee ? employee.Name : 'Unknown';
  };

  return (
    <div className="relative p-4">
      {announcementPreviews.map((announcement, index) => (
        <div key={index} className="w-3/4 p-6 mx-auto mt-6 bg-white border border-gray-300 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaBullhorn className="mr-4 text-2xl text-blue-500" />
            <h3 className="text-xl font-semibold text-blue-700">{announcement.Title}</h3>
          </div>
          <p className="mt-4 text-gray-700">{announcement.Body}</p>
          <p className="mt-4 text-gray-500">From: {getEmployeeName(announcement.Emp_ID)}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnn;
