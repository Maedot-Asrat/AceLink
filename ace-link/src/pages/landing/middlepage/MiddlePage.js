// import React from 'react';
import './MiddlePage.css';
import ClassroomImage from '../../../assets/Group 17.png';
const MiddlePage = () => {
  return (
    <section className="middle-page">
      <div className="text-container">
        <h2>Everything you can do in a physical classroom,<span className='highlight'> you can do with Acelink</span></h2>
        <p>
          Acelink’s school management software upgrades traditional with efficient tutor matching, adaptive study plans,
          and interactive tools, enhancing relevance and engagement all in one secure cloud-based system.
        </p>
       
      </div>
      <div className="image-container">
        <img src={ClassroomImage} alt="Classroom" />
      </div>
    </section>
  );
};

export default MiddlePage;
