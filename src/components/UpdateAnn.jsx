import React, { useState } from 'react';

const UpdateAnn = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [from, setFrom] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [announcementPreviews, setAnnouncementPreviews] = useState([]); // Initialize with empty array
  const [showForm, setShowForm] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const announcement = {
      title: title,
      body: body,
      from: from
    };
    if (announcementIndex !== null) {
      const updatedAnnouncements = [...announcementPreviews];
      updatedAnnouncements[announcementIndex] = announcement;
      setAnnouncementPreviews(updatedAnnouncements);
      setAnnouncementIndex(null);
    } else {
      setAnnouncementPreviews([...announcementPreviews, announcement]);
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

  const handleDelete = (index) => {
    const updatedAnnouncements = [...announcementPreviews];
    updatedAnnouncements.splice(index, 1);
    setAnnouncementPreviews(updatedAnnouncements);
  };

  const handleUpdate = (index) => {
    const announcementToUpdate = announcementPreviews[index];
    setTitle(announcementToUpdate.title);
    setBody(announcementToUpdate.body);
    setFrom(announcementToUpdate.from);
    setAnnouncementIndex(index);
    setShowForm(true);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  // Dummy announcements
  const dummyAnnouncements = [
    {
      title: "Announcement 1",
      body: "This is the body of Announcement 1",
      from: "John Doe"
    },
    {
      title: "Announcement 2",
      body: "This is the body of Announcement 2",
      from: "Jane Smith"
    },
    {
      title: "Announcement 3",
      body: "This is the body of Announcement 3",
      from: "Alice Johnson"
    },
    {
      title: "Announcement 4",
      body: "This is the body of Announcement 4",
      from: "Bob Brown"
    },
    {
      title: "Announcement 5",
      body: "This is the body of Announcement 5",
      from: "Emily Wilson"
    }
  ];

  // Set initial announcements
  useState(() => {
    setAnnouncementPreviews(dummyAnnouncements);
  }, []);

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
              <input type="text" id="from" value={from} onChange={handleFromChange} className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:border-blue-500" required />
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
          <h3 className="text-lg font-semibold">{announcement.title}</h3>
          <p className="mt-2">{announcement.body}</p>
          <p className="mt-2 text-gray-500">From: {announcement.from}</p>
          <div className="flex justify-between">
            <button onClick={() => handleUpdate(index)} className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Update</button>
            <button onClick={() => handleDelete(index)} className="px-4 py-2 mt-4 font-semibold text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateAnn;
