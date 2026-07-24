import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-title">EBAD MALIK</span>
            <p>Next-generation decentralized financial infrastructure engineered for speed, privacy, and scale.</p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Protocol</h4>
              <a href="#features">Features</a>
              <a href="#stats">Telemetry</a>
              <a href="#terminal">Terminal CLI</a>
              <a href="#security">Audits</a>
            </div>

            <div className="footer-col">
              <h4>Ecosystem</h4>
              <a href="#hero">Liquidity Pools</a>
              <a href="#hero">Yield Optimization</a>
              <a href="#hero">Governance</a>
              <a href="#hero">Developers API</a>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ebad Malik. All rights reserved.</p>
          <div className="footer-status">
            <span className="dot-active"></span> System Status: All Nodes Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
