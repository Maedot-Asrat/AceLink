import React, { useState } from 'react';
import ScheduleSessionPopup from './ScheduleSessionPopup';

const MySessions = () => {
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);

  return (
    <div className="sessions-container">
      <div className="sessions-header">
        <button className="schedule-session-btn" onClick={() => setShowSchedulePopup(true)}>
          Schedule a Session
        </button>
      </div>

      {/* Sessions Table here */}

      {showSchedulePopup && (
        <ScheduleSessionPopup onClose={() => setShowSchedulePopup(false)} />
      )}
    </div>
  );
};

export default MySessions;
