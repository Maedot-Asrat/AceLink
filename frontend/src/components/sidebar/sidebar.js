// Sidebar.js
import React from 'react';
import communityicon from '../../assets/community icon.png';
import libraryicon from '../../assets/library icon.png';
import logo from '../../assets/Logo.png';
import manavatar from '../../assets/Man Avatar.png';
import messageicon from '../../assets/messages icon.png';
import mycoursesicon from '../../assets/my courses icon.png';
import myscheduleicon from '../../assets/my schedules icon.png';
import settingicon from '../../assets/settings icon.png';
import studygroupicon from '../../assets/study group icon.png';
import tutorsicon from '../../assets/tutors icon.png';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src = {logo} alt="AceLink Logo" className="logo-img" />
        <h2>AceLink</h2>
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <img src={tutorsicon} alt="Tutors" className="nav-icon" />
          <a href="#tutors">Tutors</a>
        </li>
        <li className="nav-item">
          <img src={mycoursesicon}alt="My Courses" className="nav-icon" />
          <a href="#my-courses">My Courses</a>
        </li>
        <li className="nav-item">
          <img src={studygroupicon} alt="Study Groups" className="nav-icon" />
          <a href="#study-groups">Study Groups</a>
        </li>
        <li className="nav-item">
          <img src={communityicon} alt="Community" className="nav-icon" />
          <a href="#community">Community</a>
        </li>
        <li className="nav-item">
          <img src={myscheduleicon} alt="My Schedules" className="nav-icon" />
          <a href="#schedules">My Schedules</a>
        </li>
        <li className="nav-item">
          <img src={messageicon} alt="Messages" className="nav-icon" />
          <a href="#messages">Messages</a>
          <span className="message-count">1</span>
        </li>
        <li className="nav-item">
          <img src={libraryicon} alt="Library" className="nav-icon" />
          <a href="#library">Library</a>
        </li>
      </ul>
      <div className="profile">
        <img src={manavatar} alt="Profile" className="profile-img" />
        <div className="profile-info">
          <p className="profile-name">Mr John Doe</p>
          <p className="profile-role">Student</p>
        </div>
        <img src={settingicon} alt="Settings" className="settings-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
