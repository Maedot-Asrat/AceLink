// import React from 'react';
import './HeroSection.css';
import heroImage from '../../../assets/header-pic.png'; // Ensure the path is correct

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="text-section">
        <h1>
          <span className="highlight">Online Tutoring</span> Made easy with AI.
        </h1>
        <p>
          Acelink is an interesting platform that will teach you in a more interactive way.
        </p>
       <a href='/registerStudent'> <button className="join-btn">Join for free</button></a> 
        <a href="https://youtu.be/EcZWLrYb5Uc" target="_blank"><button className="how-btn">How it works</button></a>
      </div>
      <div className="image-section">
        <img src={heroImage} alt="Girl Studying" />

      </div>
    </section>
  );
};

export default HeroSection;
