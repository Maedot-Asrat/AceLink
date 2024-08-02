import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/header-pic.png'; // Ensure the path is correct

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="text-section">
        <h1>
          <span className="highlight">Studying</span> Online is now much easier
        </h1>
        <p>
          Acelink is an interesting platform that will teach you in a more interactive way.
        </p>
        <button className="join-btn">Join for free</button>
        <button className="how-btn">How it works</button>
      </div>
      <div className="image-section">
        <img src={heroImage} alt="Girl Studying" />

      </div>
    </section>
  );
};

export default HeroSection;
