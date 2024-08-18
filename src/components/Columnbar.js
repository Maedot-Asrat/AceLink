import React from 'react';
import './Columnbar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>AceLink</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <i className="fas fa-chalkboard-teacher"></i>
          Tutors
        </li>
        <li>
          <i className="fas fa-book-open"></i>
          My Courses
        </li>
        <li>
          <i className="fas fa-users"></i>
          Study Groups
        </li>
        <li>
          <i className="fas fa-comments"></i>
          Community
        </li>
        <li>
          <i className="fas fa-calendar-alt"></i>
          My Schedules
        </li>
        <li>
          <i className="fas fa-envelope"></i>
          Messages
        </li>
        <li>
          <i className="fas fa-book"></i>
          Library
        </li>
      </ul>
      <div className="sidebar-profile">
        <img src="src/assets/images/profile.png" alt="Profile" />
        <div>
          <p className="profile-name">Mr. John Doe</p>
          <p className="profile-role">Student</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
