import React, { useState, useEffect } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <span className="brand-accent">EBAD MALIK</span>
        </a>

        <nav className="navbar-links">
          <a href="#features">Features</a>
          <a href="#stats">Telemetry</a>
          <a href="#terminal">Terminal</a>
          <a href="#security">Security</a>
        </nav>

        <div className="navbar-actions">
          <span className="status-badge">
            <span className="status-dot"></span>
            NETWORK ONLINE
          </span>
          <a href="#terminal" className="nav-btn">
            Launch Portal
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
