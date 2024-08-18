import React from 'react';
import Header from './pages/landing/header/Header';
import HeroSection from './pages/landing/herosection/HeroSection';
import LearningSoftware from './pages/landing/learningsoftware/LearningSoftware';
import WhatIsAcelink from './pages/landing/whatisacelink/WhatIsAcelink';
import Features from './pages/landing/features/Features';
import Footer from './pages/landing/footer/Footer';
import MiddlePage from './pages/landing/middlepage/MiddlePage';

function MainApp() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <LearningSoftware />
      <WhatIsAcelink />
      <MiddlePage />
      <Features />
      <Footer />
    </div>
  );
}

export default MainApp;