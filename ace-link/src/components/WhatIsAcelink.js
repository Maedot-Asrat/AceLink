import React from 'react';
import './WhatIsAcelink.css';
import ImageOne from '../assets/Rectangle 19.png';
import ImageTwo from '../assets/Rectangle 21.png';

const WhatIsAcelink = () => {
  return (
    <section className="what-is-acelink">
      <h1>What is <span className="highlight">Acelink?</span></h1>
      <p>Acelink revolutionizes education by leveraging AI to offer personalized, high-quality learning experiences at scale, and ensures tailored tutor matching, adaptive study plans, and interactive tools, enhancing relevance and engagement.</p>
      <div className="roles">
        <div className="role-card">
          <img src={ImageOne} alt="Instructors" />
          <div className='overImage'>
            <h3>FOR INSTRUCTORS</h3>
            <button className="role-btn">Start as Instructor</button>
          </div>
        </div>
        <div className="role-card">
          <img src={ImageTwo} alt="Students" />
          <div className='overImage'>
            <h3>FOR STUDENTS</h3>
            <button className="role-btn">Start as Student</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAcelink;
