import React from 'react';
import './FeaturesSection.css';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

const features: FeatureCard[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Quantum Cryptographic Shield',
    description: 'Advanced cryptographic primitives ensuring infrastructure immunity against next-generation security threats.',
    tag: 'SECURITY'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Sub-Millisecond Settlement',
    description: 'High-frequency transaction execution layer delivering sub-millisecond deterministic finality.',
    tag: 'PERFORMANCE'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Liquidity Mesh',
    description: 'Frictionless cross-chain routing operating 24/7 with zero intermediary friction.',
    tag: 'ARCHITECTURE'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="15" x2="23" y2="15"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="15" x2="4" y2="15"/>
      </svg>
    ),
    title: 'Automated Yield Engine',
    description: 'Algorithmic smart contract routing optimizing liquidity efficiency across verified pools.',
    tag: 'AUTOMATION'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Multi-Key Governance',
    description: 'Hardware-enforced quorum verification combined with time-locked execution safeguards.',
    tag: 'GOVERNANCE'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Real-Time Telemetry',
    description: 'Full-spectrum on-chain analytics providing transparent, granular auditability.',
    tag: 'ANALYTICS'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">CORE PILLARS</span>
          <h2>EBAD MALIK PROTOCOL</h2>
          <p>Built for security, speed, and high-capacity performance.</p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card-header">
                <span className="feature-svg-icon">{item.icon}</span>
                <span className="feature-tag">{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
