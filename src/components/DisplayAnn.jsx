import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch announcements when the component mounts
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/announsment'); // Replace '/api/announcements' with your backend API endpoint
      setAnnouncements(response.data.data); // Assuming the API response has a 'data' property containing the announcements
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div>
      <h1>Announcements</h1>
      <ul>
        {announcements.map(announcement => (
          <li key={announcement.id}>
            <h2>{announcement.title}</h2>
            <p>{announcement.body}</p>
            <p>From: {announcement.from}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
