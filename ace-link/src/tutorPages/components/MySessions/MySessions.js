import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleSessionPopup from './ScheduleSessionPopup';
import './MySessions.css';


const MySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch sessions from the API
    axios.get(`${process.env.REACT_APP_API_URL}/trust/sessions`)
      .then(response => {
        setSessions(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  return (
    <div className="sessions-container">
      <div className="sessions-header">
      <button className="schedule-session-btn" onClick={() => setShowSchedulePopup(true)}>
          Schedule a Session
        </button>
      </div>

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
          {sessions.map(session => (
            <tr key={session._id}>
              <td>{session.studentsInvolved.map(student => student.name).join(', ')}</td>
              <td>{new Date(session.sessionDateTime).toLocaleDateString()}</td>
              <td>{session.duration} hour</td>
              <td className='material'>{session.materialsUpload.map(material => <a href={material} download>{material.split('/').pop()}</a>)}</td>
              <td><a href={`/session-details/${session._id}`}>Session Details</a></td>
              <td className={session.status === 'Cancelled' ? 'status-cancelled' : ''}>{session.status}</td>
              <td>
                {/* Actions such as view, edit, delete can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showSchedulePopup && (
        <ScheduleSessionPopup onClose={() => setShowSchedulePopup(false)} />
      )}
    </div>
  );
};

export default MySessions;
