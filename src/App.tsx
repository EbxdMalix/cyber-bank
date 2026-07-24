import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import TerminalSection from './components/TerminalSection';
import SecuritySection from './components/SecuritySection';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TerminalSection />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
