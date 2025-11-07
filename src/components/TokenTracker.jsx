import React from 'react';
import { Plus, Minus, Users, Zap } from 'lucide-react';
import './TokenTracker.css';

const TokenTracker = ({ fearTokens, setFearTokens, players, setPlayers }) => {
  const maxFear = 10;

  const adjustFear = (amount) => {
    const newValue = Math.max(0, Math.min(maxFear, fearTokens + amount));
    setFearTokens(newValue);
  };

  const updatePlayer = (id, field, value) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const addPlayer = () => {
    const newPlayer = {
      id: Date.now(),
      name: `Player ${players.length + 1}`,
      hope: 0,
      stress: 0,
      hp: 6
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (id) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  return (
    <div className="token-tracker">
      <div className="tracker-section">
        <div className="section-header">
          <h2>
            <Zap size={28} />
            Fear Tokens (Keeper)
          </h2>
        </div>

        <div className="fear-tracker">
          <div className="fear-display">
            <div className="fear-count">{fearTokens}</div>
            <div className="fear-max">/ {maxFear}</div>
          </div>

          <div className="fear-tokens-visual">
            {Array.from({ length: maxFear }).map((_, i) => (
              <div
                key={i}
                className={`fear-token ${i < fearTokens ? 'filled' : ''}`}
              />
            ))}
          </div>

          <div className="fear-controls">
            <button 
              className="btn btn-large btn-secondary" 
              onClick={() => adjustFear(-1)}
              disabled={fearTokens === 0}
            >
              <Minus size={24} />
              Remove
            </button>
            <button 
              className="btn btn-large btn-danger" 
              onClick={() => adjustFear(1)}
              disabled={fearTokens === maxFear}
            >
              <Plus size={24} />
              Add Fear
            </button>
          </div>

          <div className="fear-info">
            <h4>Using Fear Tokens</h4>
            <ul>
              <li><strong>1 Fear:</strong> Cause a minor complication or malfunction</li>
              <li><strong>2 Fear:</strong> Use an antagonist's special ability</li>
              <li><strong>3 Fear:</strong> Make a major hard move (separate characters, inflict serious harm)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="tracker-section">
        <div className="section-header">
          <h2>
            <Users size={28} />
            Player Tokens
          </h2>
          <button className="btn btn-primary" onClick={addPlayer}>
            <Plus size={20} />
            Add Player
          </button>
        </div>

        <div className="players-grid">
          {players.map(player => (
            <div key={player.id} className="player-card fade-in">
              <div className="player-header">
                <input
                  type="text"
                  className="player-name-input"
                  value={player.name}
                  onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                />
                {players.length > 1 && (
                  <button 
                    className="icon-btn danger small"
                    onClick={() => removePlayer(player.id)}
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="player-stats">
                <div className="stat-group">
                  <label>Hope (Max 5)</label>
                  <div className="stat-control">
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'hope', Math.max(0, player.hope - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <div className="stat-value hope">{player.hope}</div>
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'hope', Math.min(5, player.hope + 1))}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="stat-dots">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`stat-dot hope ${i < player.hope ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="stat-group">
                  <label>Stress (Max 6)</label>
                  <div className="stat-control">
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'stress', Math.max(0, player.stress - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <div className="stat-value stress">{player.stress}</div>
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'stress', Math.min(6, player.stress + 1))}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="stat-dots">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`stat-dot stress ${i < player.stress ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                  {player.stress === 6 && (
                    <div className="overwhelmed-warning">
                      ⚠️ OVERWHELMED - Disadvantage on all rolls
                    </div>
                  )}
                </div>

                <div className="stat-group">
                  <label>Hit Points</label>
                  <div className="stat-control">
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'hp', Math.max(0, player.hp - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <div className="stat-value hp">{player.hp}</div>
                    <button
                      className="stat-btn"
                      onClick={() => updatePlayer(player.id, 'hp', player.hp + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {player.hp === 1 && (
                    <div className="critical-warning">
                      💀 CRITICAL - Death Move on next HP loss
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenTracker;