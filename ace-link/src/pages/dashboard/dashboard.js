import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBell } from 'react-icons/fa';
import './dashboard.css';
import { useState,useEffect } from "react";
const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      // Set the user's name in state
      if (storedUser && storedUser.email) {
          setUserEmail(storedUser.email);
      }
      if (storedUser && storedUser.username) {
          setUserName(storedUser.username);
      }
  }, []);
  return (
    <div className="dashboard-container">
      <div> </div>

      <div className="main-contents">
        <div className="welcome-section">
          <h1 style={{ color: '#004080' }}>Welcome back, {userName}!</h1>
          <p>you have an upcoming chemistry lesson with your tutor in 2 hours.</p>
          <button className="join-buttons">Join session</button>
        </div>

        <div className="classes-sections">
          <h2>Classes</h2>
          <div className="classes">
            <div className="class-card gradient-blue">
              <h3>Python</h3>
              <p>Teacher: Meaza</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="class-card gradient-purple">
              <h3>Chemistry</h3>
              <p>Teacher: Meaza</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="class-card gradient-red">
              <h3>Video Editing</h3>
              <p>Teacher: Meaza</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lessons-section">
          <h2>Lessons</h2>
          <div className="lessons-table">
          <div className="head-row">
              <div className="table-cell">Course</div>
              <div className="table-cell">Teacher</div>
              <div className="table-cell">Starts</div>
              <div className="table-cell">Ends</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Python 101</div>
              <div className="table-cell">Abebe</div>
              <div className="table-cell">4:00 pm, Today</div>
              <div className="table-cell">5:00 pm, Today</div>
            </div>
          
          </div>
        </div>
      </div>

      <div className="right-sidebar">
      

        <div className="calendar">
          <Calendar />
        </div>

        <div className="reminders">
          <h2>Reminders</h2>
          <div className="reminder-item">
            <FaBell className="reminder-icon" />
            <span>Eng - essay, <br/> 21 August 2024, Friday</span>
          </div>
          <div className="reminder-item">
            <FaBell className="reminder-icon" />
            <span>Eng - essay, <br/> 21 August 2024, Friday</span>
          </div>
          <div className="reminder-item">
            <FaBell className="reminder-icon" />
            <span>Eng - essay, <br/> 21 August 2024, Friday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
