import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBullhorn } from 'react-icons/fa';

const UpdateAnn = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [from, setFrom] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [announcementPreviews, setAnnouncementPreviews] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(null);

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const announcement = {
      title: title,
      body: body,
      from: from
    };
    try {
      if (announcementIndex !== null) {
        await axios.put(`http://localhost:8081/api/announcement/${announcementIndex}`, announcement);
        console.log('Updated Announcement:', announcement);
      } else {
        await axios.post('http://localhost:8081/api/announcement', announcement);
        console.log('Created Announcement:', announcement);
      }
      fetchAnnouncements();
      setAnnouncementIndex(null);
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
    setShowSuccess(true);
    setTitle('');
    setBody('');
    setFrom('');
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/announcement/${id}`);
      console.log('Deleted Announcement with ID:', id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleUpdate = (index) => {
    const announcementToUpdate = announcementPreviews[index];
    setTitle(announcementToUpdate.Title);
    setBody(announcementToUpdate.Body);
    setFrom(announcementToUpdate.Emp_ID); // Assuming 'from' is the employee ID
    setAnnouncementIndex(announcementToUpdate.Announcement_ID); // Use the announcement ID for updates
    setShowForm(true);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="relative p-4">
      {showForm && <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50"></div>}
      <div className="flex justify-center">
        <div className="fixed bottom-10 right-10">
          <button onClick={handleToggleForm} className="px-6 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
            {showForm ? 'Close Form' : 'Add Announcement'}
          </button>
        </div>
      </div>
      {showForm && (
        <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-semibold">Title</label>
              <input type="text" id="title" value={title} onChange={handleTitleChange} className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-lg font-semibold">Body</label>
              <textarea id="body" value={body} onChange={handleBodyChange} rows="5" className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:border-blue-500" required></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="from" className="block text-lg font-semibold">From</label>
              <select id="from" value={from} onChange={handleFromChange} className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:border-blue-500" required>
                <option value="" disabled>Select employee</option>
                {employees.map((employee) => (
                  <option key={employee.Emp_ID} value={employee.Emp_ID}>{employee.Name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button type="submit" className="px-6 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">{announcementIndex !== null ? 'Update' : 'Submit'}</button>
              <button onClick={handleToggleForm} className="px-6 py-3 font-semibold text-white bg-gray-600 rounded hover:bg-gray-700">Close</button>
            </div>
          </form>
        </div>
      )}
      {showSuccess && (
        <div className="fixed z-50 px-4 py-2 text-green-700 bg-green-100 border border-green-400 rounded bottom-10 right-10">
          Announcement submitted successfully!
        </div>
      )}
      {announcementPreviews.map((announcement, index) => (
        <div key={index} className="w-3/4 p-4 mx-auto mt-6 bg-gray-100 border border-gray-300 rounded">
          <div className="flex items-center">
            <FaBullhorn className="mr-4 text-2xl text-blue-500" />
            <h3 className="text-xl font-semibold text-blue-700">{announcement.Title}</h3>
          </div>          <p className="mt-2">{announcement.Body}</p>
          <p className="mt-2 text-gray-500">From: {getEmployeeName(announcement.Emp_ID)}</p>
          <div className="flex justify-between">
            <button onClick={() => handleUpdate(index)} className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Update</button>
            <button onClick={() => handleDelete(announcement.Announcement_ID)} className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateAnn;
