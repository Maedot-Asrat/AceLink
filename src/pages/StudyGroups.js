import React, { useState, useEffect } from 'react';
import StudyGroupList from '../components/StudyGroup/StudyGroupList';
import AddGroupModal from '../components/StudyGroup/AddGroupModal';
import './StudyGroups.css';
import { FaPlus } from 'react-icons/fa';

const StudyGroups = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('api')
      .then(response => response.json())
      .then(data => setGroups(data));
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="study-groups-page">
      <div className="study-groups-header">
        <h1>Study Groups</h1>
        <button className="add-group-button" onClick={openModal}>
          <FaPlus />
        </button>
      </div>
      <div className="filter-options">
        <button>All</button>
        <button>My Study Groups</button>
      </div>
      <StudyGroupList groups={groups} />
      <AddGroupModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default StudyGroups;
