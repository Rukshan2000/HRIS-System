import React from 'react';

const DisplayAnn = () => {
  // Sample announcement data (you can replace it with actual data from the backend)
  const announcements = [
    {
      id: 1,
      title: 'Important Announcement',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere sapien sed arcu elementum commodo.',
      from: 'Admin'
    },
    {
      id: 2,
      title: 'Reminder: Team Meeting',
      body: 'Nam vitae urna vel velit feugiat congue. Sed vestibulum urna at justo vestibulum, id semper nisl malesuada.',
      from: 'Manager'
    },
    // Add more announcement objects here if needed
  ];

  return (
    <div className="container px-4 py-8 mx-auto lg:px-8">
      <h2 className="mb-8 text-3xl font-bold">Announcements</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-2 text-xl font-semibold">{announcement.title}</h3>
            <p className="mb-4 text-gray-700">{announcement.body}</p>
            <p className="text-gray-500">From: {announcement.from}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAnn;
