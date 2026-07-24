import React from 'react';
import './SecuritySection.css';

export const SecuritySection: React.FC = () => {
  return (
    <section className="security-section" id="security">
      <div className="section-container">
        <div className="security-box">
          <div className="security-content">
            <span className="section-badge">AUDITED & SECURE</span>
            <h2>ENTERPRISE INFRASTRUCTURE ASSURANCE</h2>
            <p>
              Ebad Malik network protocols undergo continuous automated formal verification
              and third-party security audits.
            </p>

            <div className="audit-badges">
              <div className="audit-badge">
                <span className="badge-svg-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <div>
                  <strong>CertiK Skynet 99.8</strong>
                  <p>Real-time threat monitoring</p>
                </div>
              </div>

              <div className="audit-badge">
                <span className="badge-svg-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <div>
                  <strong>OpenZeppelin Verified</strong>
                  <p>Smart contract security score: A+</p>
                </div>
              </div>

              <div className="audit-badge">
                <span className="badge-svg-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </span>
                <div>
                  <strong>Zero-Knowledge Proofs</strong>
                  <p>Privacy-preserving validation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
