import React, { useState } from 'react';

const ScheduleSession = () => {
  const [formData, setFormData] = useState({
    title: '',
    sessionDateTime: '',
    duration: '',
    recurrence: 'none',
    studentsInvolved: '',
    notes: '',
    instructions: '',
    materialsUpload: '',
    reminder: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to your backend server using fetch/axios
    console.log(formData);
  };

  return (
    <div className="schedule-session">
      <h2>Schedule a Session</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            name="sessionDateTime"
            value={formData.sessionDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Recurrence:</label>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label>Students Involved (comma separated IDs):</label>
          <input
            type="text"
            name="studentsInvolved"
            value={formData.studentsInvolved}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Materials Upload (URLs or paths):</label>
          <input
            type="text"
            name="materialsUpload"
            value={formData.materialsUpload}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="reminder"
              checked={formData.reminder}
              onChange={handleChange}
            />
            Reminder
          </label>
        </div>
        <button type="submit">Schedule Session</button>
      </form>
    </div>
  );
};

export default ScheduleSession;
