import React from 'react';
import './SchedulePage.css';
import video from '../../assets/video-svgrepo-com.svg';
const meetings = [
  {
    id: 1,
    title: 'Data structure and Algorithm',
    instructor: 'Daniel Abebe',
    date: '2024-07-15',
    time: '10:00AM',
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    instructor: 'Meaza Tadle',
    date: '2024-08-10',
    time: '02:00PM',
  },
  {
    id: 3,
    title: 'Machine Learning Basics',
    instructor: 'Fenet Girma',
    date: '2024-08-25',
    time: '11:00AM',
  },
  {
    id: 4,
    title: 'Introduction to React',
    instructor: 'Maedot Asrat',
    date: '2024-09-01',
    time: '09:00AM',
  },
];

const SchedulePage = () => {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const filterMeetings = (condition) => {
    return meetings.filter(condition);
  };

  const renderMeetings = (meetingList, emptyMessage) => {
    if (meetingList.length === 0) {
      return <p>{emptyMessage}</p>;
    }
    return meetingList.map((meeting) => (
      <div className="meeting-card" key={meeting.id}>
        <div className="icon">
          <img src={video} alt="Meeting Icon" />
        </div>
        <div className='details'>
          <h3>{meeting.title}</h3>
          <p>by {meeting.instructor}</p>
          </div>
        <div className="details">
          
          <p>{meeting.date}</p>
          <p>{meeting.time}</p>
        </div>
        <a href='/meeting' >
          <button className="join-button">Join Session</button>
        </a>
      </div>
    ));
  };

  const todayMeetings = filterMeetings(
    (meeting) => meeting.date === today
  );

  const thisMonthMeetings = filterMeetings(
    (meeting) => 
      new Date(meeting.date).getMonth() + 1 === currentMonth &&
      new Date(meeting.date).getFullYear() === currentYear
  );

  const laterMeetings = filterMeetings(
    (meeting) => new Date(meeting.date).getMonth() + 1 > currentMonth ||
                 new Date(meeting.date).getFullYear() > currentYear
  );

  return (
    <div className="schedule-page">
      <div className="timeframe">
        <h2>Today</h2>
        {renderMeetings(todayMeetings, 'None Today')}
      </div>
      <div className="timeframe">
        <h2>This Month</h2>
        {renderMeetings(thisMonthMeetings, 'None This Month')}
      </div>
      <div className="timeframe">
        <h2>Later</h2>
        {renderMeetings(laterMeetings, 'No Later Sessions')}
      </div>
    </div>
  );
};

export default SchedulePage;
