import React, { useState } from 'react';
import './session.css'; // Add your CSS here

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScheduling, setIsScheduling] = useState(false); // Control modal visibility

  const sessions = [
    {
      name: 'Imani Gbeho',
      date: 'Feb 14, 2010',
      duration: '1 hour',
      materials: 'Maths.pdf',
      summary: 'Session Details',
      status: 'Cancelled',
    },
    // Add more data here...
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleScheduleSessionClick = () => {
    setIsScheduling(true); // Show schedule form modal
  };

  const handleSubmitSchedule = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsScheduling(false); // After submission, close modal
  };

  const handleCloseModal = () => {
    setIsScheduling(false);
  };

  return (
    <div className="app-container">
      {/* Schedule a Session Modal */}
      {isScheduling && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Schedule a New Session</h2>
            <form onSubmit={handleSubmitSchedule}>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Session Date & Time:</label>
                <input type="datetime-local" required />
              </div>
              <div className="form-group">
                <label>Duration (in minutes):</label>
                <input type="number" required />
              </div>
              <div className="form-group">
                <label>Recurrence:</label>
                <select>
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea></textarea>
              </div>
              <div className="form-group">
                <label>Instructions:</label>
                <textarea></textarea>
              </div>
              <div className="form-group">
                <label>Materials Upload:</label>
                <input type="file" multiple />
              </div>
              <div className="form-group">
                <label>Reminder:</label>
                <input type="checkbox" />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="schedule-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Tabs */}
      <div className="session-tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => handleTabChange('all')}
        >
          All Sessions
        </button>
        <button
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming Sessions
        </button>
        <button
          className={activeTab === 'pending' ? 'active' : ''}
          onClick={() => handleTabChange('pending')}
        >
          Pending Requests
        </button>
      </div>

      {/* Schedule a Session Button */}
      <div className="schedule-session">
        <button className="schedule-btn" onClick={handleScheduleSessionClick}>
          <i className="fas fa-plus"></i> Schedule a Session
        </button>
      </div>

      {/* Sessions Table */}
      <table className="sessions-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Session Duration</th>
            <th>Materials</th>
            <th>Session Summary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.name}</td>
              <td>{session.date}</td>
              <td>{session.duration}</td>
              <td>{session.materials}</td>
              <td>
                <a href="#" className="session-details-link">
                  {session.summary}
                </a>
              </td>
              <td>
                <span className="status cancelled">{session.status}</span>
              </td>
              <td>
                <button className="action-btn">View</button>
                <button className="action-btn">Edit</button>
                <button className="action-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        <button
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button
          className={currentPage === 2 ? 'active' : ''}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        {/* Add more pages as needed */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default App;
