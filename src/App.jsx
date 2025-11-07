import React, { useState, useEffect } from 'react';
import { Moon, Sun, Plus, Trash2, Save, Download, Upload } from 'lucide-react';
import ClockManager from './components/ClockManager';
import TokenTracker from './components/TokenTracker';
import DiceRoller from './components/DiceRoller';
import NPCTracker from './components/NPCTracker';
import SessionNotes from './components/SessionNotes';
import KeeperMoves from './components/KeeperMoves';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('clocks');
  const [fearTokens, setFearTokens] = useState(0);
  const [clocks, setClocks] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [sessionNotes, setSessionNotes] = useState('');
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', hope: 0, stress: 0, hp: 6 },
    { id: 2, name: 'Player 2', hope: 0, stress: 0, hp: 6 },
    { id: 3, name: 'Player 3', hope: 0, stress: 0, hp: 6 },
    { id: 4, name: 'Player 4', hope: 0, stress: 0, hp: 6 },
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('voidlight-dm-data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setFearTokens(data.fearTokens || 0);
        setClocks(data.clocks || []);
        setNpcs(data.npcs || []);
        setSessionNotes(data.sessionNotes || '');
        setPlayers(data.players || players);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage
  const saveData = () => {
    const data = {
      fearTokens,
      clocks,
      npcs,
      sessionNotes,
      players,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('voidlight-dm-data', JSON.stringify(data));
    alert('Campaign data saved!');
  };

  // Export data
  const exportData = () => {
    const data = {
      fearTokens,
      clocks,
      npcs,
      sessionNotes,
      players,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voidlight-campaign-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import data
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setFearTokens(data.fearTokens || 0);
          setClocks(data.clocks || []);
          setNpcs(data.npcs || []);
          setSessionNotes(data.sessionNotes || '');
          setPlayers(data.players || players);
          alert('Campaign data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'clocks', label: 'Clocks', icon: '⏱️' },
    { id: 'tokens', label: 'Tokens', icon: '🎲' },
    { id: 'dice', label: 'Dice Roller', icon: '🎲' },
    { id: 'npcs', label: 'NPCs', icon: '👥' },
    { id: 'notes', label: 'Session Notes', icon: '📝' },
    { id: 'moves', label: 'Keeper Moves', icon: '⚡' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">✨</span>
            Voidlight DM Tool
            <span className="title-subtitle">Campaign Manager</span>
          </h1>
          <div className="header-actions">
            <button className="icon-btn" onClick={saveData} title="Save Campaign">
              <Save size={20} />
            </button>
            <button className="icon-btn" onClick={exportData} title="Export Campaign">
              <Download size={20} />
            </button>
            <label className="icon-btn" title="Import Campaign">
              <Upload size={20} />
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        <nav className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'clocks' && (
          <ClockManager clocks={clocks} setClocks={setClocks} />
        )}
        {activeTab === 'tokens' && (
          <TokenTracker
            fearTokens={fearTokens}
            setFearTokens={setFearTokens}
            players={players}
            setPlayers={setPlayers}
          />
        )}
        {activeTab === 'dice' && (
          <DiceRoller />
        )}
        {activeTab === 'npcs' && (
          <NPCTracker npcs={npcs} setNpcs={setNpcs} />
        )}
        {activeTab === 'notes' && (
          <SessionNotes notes={sessionNotes} setNotes={setSessionNotes} />
        )}
        {activeTab === 'moves' && (
          <KeeperMoves fearTokens={fearTokens} setFearTokens={setFearTokens} />
        )}
      </main>
    </div>
  );
}

export default App;