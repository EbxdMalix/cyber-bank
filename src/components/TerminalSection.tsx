import React, { useState } from 'react';
import './TerminalSection.css';

interface CommandOutput {
  command: string;
  response: string;
}

export const TerminalSection: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'help',
      response: 'Available commands: status, stake, audit, nodes, clear'
    }
  ]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    let responseText = '';

    switch (trimmed) {
      case 'status':
        responseText = '[ONLINE] Ebad Malik Mainnet Protocol - Health 100% | Latency: 0.003s | Consensus: Active';
        break;
      case 'stake':
        responseText = '[VAULT] High-Yield Staking Pool Active | APY: 14.8% | Lockup: Flexible | Fee: 0.00%';
        break;
      case 'audit':
        responseText = '[VERIFIED] CertiK Score: 99.8/100 | OpenZeppelin Audit Passed | Zero Critical Vulnerabilities';
        break;
      case 'nodes':
        responseText = '[NODES] 1,420 Active Validation Nodes across Tokyo, Frankfurt, Singapore, NYC';
        break;
      case 'help':
        responseText = 'Available commands: status, stake, audit, nodes, clear';
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        responseText = `Unknown command "${cmdStr}". Type "help" for command list.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, response: responseText }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal) {
      handleCommand(inputVal);
    }
  };

  return (
    <section className="terminal-section" id="terminal">
      <div className="section-container">
        <div className="section-header">
          <span className="section-badge">INTERACTIVE CLI</span>
          <h2>PROTOCOL TERMINAL</h2>
          <p>Execute real-time network queries directly on Ebad Malik node console.</p>
        </div>

        <div className="terminal-window">
          <div className="terminal-header-bar">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">ebad-malik-cli v2.4.0</div>
          </div>

          <div className="terminal-body">
            <div className="terminal-welcome">
              EBAD MALIK PROTOCOL [Version 2.4.0-release]<br />
              Type <strong>help</strong> or click quick command presets below.
            </div>

            <div className="quick-presets">
              <button type="button" onClick={() => handleCommand('status')}>/status</button>
              <button type="button" onClick={() => handleCommand('stake')}>/stake</button>
              <button type="button" onClick={() => handleCommand('audit')}>/audit</button>
              <button type="button" onClick={() => handleCommand('nodes')}>/nodes</button>
            </div>

            {history.map((item, i) => (
              <div key={i} className="terminal-log-entry">
                <div className="command-line">
                  <span className="prompt">ebad-malik:~#</span> {item.command}
                </div>
                <div className="response-line">{item.response}</div>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="terminal-input-form">
              <span className="prompt">ebad-malik:~#</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command here..."
                className="terminal-input"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
