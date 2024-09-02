import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScheduleSessionPopup.css';

const ScheduleSessionPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    sessionDateTime: '',
    duration: 1,
    recurrence: 'none',
    studentsInvolved: [],
    notes: '',
    instructions: '',
    materialsUpload: [],
    reminder: false,
    tutorId: '' // Add the tutor ID here
  });

//   useEffect(() => {
//     // Retrieve the tutor ID from local storage when the component mounts
//     const tutorId = localStorage.getItem('tutorId');
//     if (tutorId) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         tutorId: tutorId,
//       }));
//     }
//   }, []);
  const [tutorId, setTutorId] = useState('');
  useEffect(() => {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      // Set the user's name in state
      if (storedUser && storedUser.id) {
          setTutorId(storedUser.id);
      }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, materialsUpload: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure that the createdBy field (tutorId) is set
    if (!formData.tutorId) {
      alert('Tutor ID is missing. Please log in again.');
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/trust/sessions`, formData)
      .then((response) => {
        alert('Session scheduled successfully!');
        onClose();
      })
      .catch((error) => {
        console.error('Error scheduling session:', error);
        alert('Failed to schedule session.');
      });
  };

//   const tutorId = formData.tutorId;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create Schedule</h2>
        <h5>id:{tutorId}</h5>
        <form onSubmit={handleSubmit} className="form-grid">
      

          <div className="form-column">
          <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                name="tutorId"
                value={formData.tutorId}
                onChange={handleInputChange}
                placeholder={tutorId}
                required
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter session title"
                required
              />
            </div>

            <div className="form-group">
              <label>Date and Time</label>
              <input
                type="datetime-local"
                name="sessionDateTime"
                value={formData.sessionDateTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (hours)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Recurrence</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleInputChange}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Students Involved</label>
              <input
                type="text"
                name="studentsInvolved"
                value={formData.studentsInvolved}
                onChange={handleInputChange}
                placeholder="Enter student IDs"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter notes"
              />
            </div>

            <div className="form-group">
              <label>Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Enter instructions"
              />
            </div>

            <div className="form-group">
              <label>Materials Upload</label>
              <input
                type="file"
                name="materialsUpload"
                onChange={handleFileUpload}
                multiple
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="reminder"
                  checked={formData.reminder}
                  onChange={() => setFormData({ ...formData, reminder: !formData.reminder })}
                />
                Send Reminder
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSessionPopup;
