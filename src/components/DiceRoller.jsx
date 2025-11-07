import React, { useState } from 'react';
import { Dices, Sparkles, Skull } from 'lucide-react';
import './DiceRoller.css';

const DiceRoller = () => {
  const [hopeDie, setHopeDie] = useState(null);
  const [fearDie, setFearDie] = useState(null);
  const [modifier, setModifier] = useState(0);
  const [dc, setDc] = useState(12);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const rollDice = () => {
    setRolling(true);
    
    // Simulate rolling animation
    setTimeout(() => {
      const hope = Math.floor(Math.random() * 12) + 1;
      const fear = Math.floor(Math.random() * 12) + 1;
      
      setHopeDie(hope);
      setFearDie(fear);
      setRolling(false);

      // Add to history
      const total = hope + fear + modifier;
      const success = total >= dc;
      const outcome = getOutcome(hope, fear, success);
      
      const roll = {
        id: Date.now(),
        hope,
        fear,
        modifier,
        dc,
        total,
        success,
        outcome,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setHistory([roll, ...history.slice(0, 9)]);
    }, 500);
  };

  const getOutcome = (hope, fear, success) => {
    if (hope === fear) {
      return 'critical';
    } else if (success && hope > fear) {
      return 'success-hope';
    } else if (success && fear > hope) {
      return 'success-fear';
    } else if (!success && hope > fear) {
      return 'failure-hope';
    } else {
      return 'failure-fear';
    }
  };

  const getOutcomeText = (outcome) => {
    switch (outcome) {
      case 'critical':
        return 'Critical Success! Auto-succeed, gain Hope, clear Stress';
      case 'success-hope':
        return 'Success with Hope - Achieve goal + gain 1 Hope';
      case 'success-fear':
        return 'Success with Fear - Achieve goal but with complication (Keeper gains 1 Fear)';
      case 'failure-hope':
        return 'Failure with Hope - Fail but create opportunity + gain 1 Hope';
      case 'failure-fear':
        return 'Failure with Fear - Fail and situation worsens (Keeper gains 1 Fear)';
      default:
        return '';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'critical':
        return '#fbbf24';
      case 'success-hope':
        return '#68d391';
      case 'success-fear':
        return '#f6ad55';
      case 'failure-hope':
        return '#90cdf4';
      case 'failure-fear':
        return '#fc8181';
      default:
        return '#a0aec0';
    }
  };

  const traits = [
    { name: 'Agility', value: 0 },
    { name: 'Strength', value: 0 },
    { name: 'Finesse', value: 0 },
    { name: 'Knowledge', value: 0 },
    { name: 'Instinct', value: 0 },
    { name: 'Presence', value: 0 },
  ];

  const difficulties = [
    { name: 'Easy', value: 10 },
    { name: 'Moderate', value: 12 },
    { name: 'Hard', value: 15 },
    { name: 'Very Hard', value: 18 },
    { name: 'Extreme', value: 21 },
  ];

  return (
    <div className="dice-roller">
      <div className="roller-main">
        <div className="section-header">
          <h2>
            <Dices size={28} />
            Duality Dice Roller
          </h2>
        </div>

        <div className="dice-display">
          <div className={`die hope-die ${rolling ? 'rolling' : ''}`}>
            <div className="die-label">Hope Die</div>
            <div className="die-value">
              {hopeDie !== null ? hopeDie : '?'}
            </div>
          </div>

          <div className="dice-operator">+</div>

          <div className={`die fear-die ${rolling ? 'rolling' : ''}`}>
            <div className="die-label">Fear Die</div>
            <div className="die-value">
              {fearDie !== null ? fearDie : '?'}
            </div>
          </div>

          {modifier !== 0 && (
            <>
              <div className="dice-operator">+</div>
              <div className="die modifier-die">
                <div className="die-label">Modifier</div>
                <div className="die-value">{modifier > 0 ? `+${modifier}` : modifier}</div>
              </div>
            </>
          )}

          <div className="dice-operator">=</div>

          <div className="die total-die">
            <div className="die-label">Total</div>
            <div className="die-value">
              {hopeDie !== null && fearDie !== null ? hopeDie + fearDie + modifier : '?'}
            </div>
          </div>
        </div>

        {hopeDie !== null && fearDie !== null && (
          <div className="result-display" style={{ borderColor: getOutcomeColor(getOutcome(hopeDie, fearDie, hopeDie + fearDie + modifier >= dc)) }}>
            <div className="result-header">
              {hopeDie + fearDie + modifier >= dc ? (
                <Sparkles size={24} style={{ color: getOutcomeColor(getOutcome(hopeDie, fearDie, true)) }} />
              ) : (
                <Skull size={24} style={{ color: getOutcomeColor(getOutcome(hopeDie, fearDie, false)) }} />
              )}
              <h3 style={{ color: getOutcomeColor(getOutcome(hopeDie, fearDie, hopeDie + fearDie + modifier >= dc)) }}>
                {hopeDie === fearDie ? '✨ CRITICAL SUCCESS ✨' : 
                 hopeDie + fearDie + modifier >= dc ? 'SUCCESS' : 'FAILURE'}
              </h3>
            </div>
            <p className="result-description">
              {getOutcomeText(getOutcome(hopeDie, fearDie, hopeDie + fearDie + modifier >= dc))}
            </p>
            <div className="result-details">
              <span>Roll: {hopeDie + fearDie + modifier}</span>
              <span>vs DC: {dc}</span>
              <span>Higher Die: {hopeDie > fearDie ? 'Hope' : fearDie > hopeDie ? 'Fear' : 'Equal (Critical!)'}</span>
            </div>
          </div>
        )}

        <div className="roll-controls">
          <div className="control-group">
            <label>Trait Modifier</label>
            <select value={modifier} onChange={(e) => setModifier(parseInt(e.target.value))}>
              <option value={-1}>-1</option>
              <option value={0}>+0</option>
              <option value={1}>+1</option>
              <option value={2}>+2</option>
            </select>
          </div>

          <div className="control-group">
            <label>Difficulty Class (DC)</label>
            <select value={dc} onChange={(e) => setDc(parseInt(e.target.value))}>
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>
                  {diff.name} (DC {diff.value})
                </option>
              ))}
              <option value={24}>Legendary (DC 24)</option>
            </select>
          </div>

          <button 
            className="btn btn-large btn-primary roll-btn" 
            onClick={rollDice}
            disabled={rolling}
          >
            <Dices size={24} />
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>

        <div className="quick-reference">
          <h4>Quick Reference</h4>
          <div className="reference-grid">
            <div className="reference-item">
              <strong>Critical Success:</strong> Both dice show same number
            </div>
            <div className="reference-item">
              <strong>Success with Hope:</strong> Meet DC, Hope die higher
            </div>
            <div className="reference-item">
              <strong>Success with Fear:</strong> Meet DC, Fear die higher
            </div>
            <div className="reference-item">
              <strong>Failure with Hope:</strong> Miss DC, Hope die higher
            </div>
            <div className="reference-item">
              <strong>Failure with Fear:</strong> Miss DC, Fear die higher
            </div>
          </div>
        </div>
      </div>

      <div className="roll-history">
        <h3>Roll History</h3>
        {history.length === 0 ? (
          <div className="empty-history">No rolls yet</div>
        ) : (
          <div className="history-list">
            {history.map(roll => (
              <div key={roll.id} className="history-item" style={{ borderLeftColor: getOutcomeColor(roll.outcome) }}>
                <div className="history-header">
                  <span className="history-time">{roll.timestamp}</span>
                  <span className="history-result" style={{ color: getOutcomeColor(roll.outcome) }}>
                    {roll.success ? 'SUCCESS' : 'FAILURE'}
                  </span>
                </div>
                <div className="history-dice">
                  <span className="history-hope">Hope: {roll.hope}</span>
                  <span className="history-fear">Fear: {roll.fear}</span>
                  <span className="history-total">Total: {roll.total} vs DC {roll.dc}</span>
                </div>
                <div className="history-outcome">
                  {getOutcomeText(roll.outcome)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;