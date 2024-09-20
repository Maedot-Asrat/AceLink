import React from 'react';
import './WhatIsAcelink.css';
import ImageOne from '../../../assets/Rectangle 19.png';
import ImageTwo from '../../../assets/Rectangle 21.png';

const WhatIsAcelink = () => {
  return (
    <section className="what-is-acelink" id="about_us">
      <h1>What is <span className="highlight">Acelink?</span></h1>
      <p>Acelink revolutionizes education by leveraging AI to offer personalized, high-quality learning experiences at scale, and ensures tailored tutor matching, adaptive study plans, and interactive tools, enhancing relevance and engagement.</p>
      <div className="roles">
        <div className="role-card">
          <img src={ImageOne} alt="Instructors" />
          <div className='overImage'>
            <h3>FOR INSTRUCTORS</h3>
            <a href='/registerTutor'><button className="role-btn">Start as Instructor</button></a>
          </div>
        </div>
        <div className="role-card">
          <img src={ImageTwo} alt="Students" />
          <div className='overImage'>
            <h3>FOR STUDENTS</h3>
            <a className='/registerStudent'><button className="role-btn">Start as Student</button></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAcelink;
