import React, { useState } from 'react';
import image from '../../assets/image1.png';
import Sidebar from '../../components/sidebar/sidebar';
import './studygroup.css';

const StudyGroups = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const groups = [
    {
      title: 'Math',
      description: 'Prompt writing involves crafting clear and engaging prompts, while using images to create',
      image: image, 
      buttonText: 'Join Group',
    },
    {
      title: 'Graphics Design',
      description: 'Prompt writing involves crafting clear and engaging prompts, while using images to create',
      image: image, 
      buttonText: 'Join Group',
    },
    {
      title: 'Architecture',
      description: 'Prompt writing involves crafting clear and engaging prompts, while using images to create',
      image: image, 
      buttonText: 'Join Group',
    },
  ];

  const myGroups = groups.slice(0, 2);

  return (
    <div className="study-groups-wrapper">
      <Sidebar className="sidebar" />
      <div className="content">
        <h2 className="header">Study Groups</h2>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`tab ${activeTab === 'my' ? 'active' : ''}`} 
            onClick={() => setActiveTab('my')}
          >
            My Study Groups
          </button>
          <button 
            className="tab" 
            onClick={() => setShowModal(true)}
          >
            Create Group
          </button>
        </div>
        <div className="groups-grid">
          {(activeTab === 'all' ? groups : myGroups).map((group, index) => (
            <div className="group-card" key={index}>
              <img className="group-image" src={group.image} alt={group.title} />
              <div className="discription-card">
                <h3 className="group-title">{group.title}</h3>
                <p className="group-description">{group.description}</p>
                <button className="edit-button">{group.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close-button" 
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3>Group Information</h3>
            <form>
              <label>
                Group Name
                <input type="text" placeholder="Enter group name" />
              </label>
              <label>
                Description
                <input type="text" placeholder="Enter description" />
              </label>
              <label>
                Subject
                <input type="text" placeholder="Enter subject" />
              </label>
              <button 
                type="button" 
                className="save-button" 
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
