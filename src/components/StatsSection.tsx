import React from 'react';
import './StatsSection.css';

interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

const stats: StatItem[] = [
  {
    value: '$4.85 Billion+',
    label: 'Total Value Locked (TVL)',
    subtext: 'Across 14 cross-chain liquidity vaults'
  },
  {
    value: '1,420,000+',
    label: 'Transactions Per Second',
    subtext: 'Parallel throughput capacity'
  },
  {
    value: '0.0035s',
    label: 'Average Latency',
    subtext: 'Global edge-node response speed'
  },
  {
    value: '99.999%',
    label: 'Network Availability',
    subtext: 'Zero downtime since genesis block'
  }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="stats-section" id="stats">
      <div className="section-container">
        <div className="stats-wrapper">
          <div className="stats-intro">
            <span className="section-badge">LIVE METRICS</span>
            <h2>PROTOCOL TELEMETRY</h2>
            <p>Real-time performance benchmark across Ebad Malik network nodes.</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
