import React from 'react';
import './StudyGroupCard.css';

const StudyGroupCard = ({ title, description, image }) => {
  return (
    <div className="study-group-card">
      <img src={image} alt={`${title}`} className="study-group-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="join-group-button">Join Group</button>
    </div>
  );
};

export default StudyGroupCard;
