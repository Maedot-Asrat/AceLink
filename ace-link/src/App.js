import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LearningSoftware from './components/LearningSoftware';
import WhatIsAcelink from './components/WhatIsAcelink';
import Features from './components/Features';
import Footer from './components/Footer';
import MiddlePage from './components/MiddlePage';

function App() {
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

export default App;
