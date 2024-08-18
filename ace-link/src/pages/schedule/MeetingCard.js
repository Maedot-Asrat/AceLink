import React from 'react';

const MeetingCard = ({ meeting }) => {
  return (
    <div className="meeting-card">
      <h3>{meeting.title}</h3>
      <p>{meeting.instructor}</p>
      <p>{meeting.date} {meeting.time}</p>
      <a href='/meet'>
      <button>Join Session</button>
      </a>
    </div>
  );
};

export default MeetingCard;
