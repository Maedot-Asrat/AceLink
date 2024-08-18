import React, { useEffect, useState } from 'react';
import { fetchMeetings } from '../services/api';
import MeetingCard from '../components/MeetingCard';
import '../components/SchedulePage.css';

const SchedulePage = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchMeetings();
        setMeetings(data);
      } catch (error) {
        console.error('Error loading meetings', error);
      }
    };

    loadMeetings();
  }, []);

  return (
    <div className="schedule-page">
      <h2>My Schedules</h2>
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
