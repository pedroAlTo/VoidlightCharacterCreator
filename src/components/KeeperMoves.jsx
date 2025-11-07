import React, { useState } from 'react';
import { Zap, AlertTriangle, Skull, Eye, Lock } from 'lucide-react';
import './KeeperMoves.css';

const KeeperMoves = ({ fearTokens, setFearTokens }) => {
  const [selectedMove, setSelectedMove] = useState(null);

  const softMoves = [
    {
      id: 1,
      name: 'Show a Threat',
      cost: 0,
      description: 'Reveal a danger or enemy approaching',
      example: '"Through the viewport, you see three more pirate frigates drop out of FTL."'
    },
    {
      id: 2,
      name: 'Reveal an Unwelcome Truth',
      cost: 0,
      description: 'Expose a hidden fact that complicates the situation',
      example: '"You decrypt the file. It\'s a list of payments from your own patron to the pirates you\'ve been fighting."'
    },
    {
      id: 3,
      name: 'Foreshadow Trouble',
      cost: 0,
      description: 'Give a warning sign of coming danger',
      example: '"The engine whines ominously, a sound you\'ve never heard before."'
    },
    {
      id: 4,
      name: 'Present a Difficult Choice',
      cost: 0,
      description: 'Force the players to choose between two bad options',
      example: '"You can save the ship or save the crew, but not both."'
    },
    {
      id: 5,
      name: 'Tick a Clock',
      cost: 0,
      description: 'Advance a threat or complication clock',
      example: 'Fill one segment of "The Assassin Closes In" clock'
    }
  ];

  const hardMoves = [
    {
      id: 1,
      name: 'Inflict Harm',
      cost: 1,
      description: 'Deal damage to a character',
      example: '"The pirate\'s shot hits you square in the chest. Take damage."'
    },
    {
      id: 2,
      name: 'Cause a Malfunction',
      cost: 1,
      description: 'Make a piece of equipment fail',
      example: '"As you pull the trigger, your plasma rifle sputters and dies. It\'s overheated."'
    },
    {
      id: 3,
      name: 'Separate the Characters',
      cost: 1,
      description: 'Split the party or isolate someone',
      example: '"The explosion causes the catwalk to collapse, separating you from the rest of your crew."'
    },
    {
      id: 4,
      name: 'Use Antagonist Ability',
      cost: 2,
      description: 'Activate a special ability of an enemy or antagonist',
      example: '"The Inquisitor activates his Bastion Protocol, creating a shield around his allies."'
    },
    {
      id: 5,
      name: 'Capture Someone',
      cost: 2,
      description: 'An enemy captures a character or important NPC',
      example: '"The bounty hunters stun your ally and drag them toward their ship."'
    },
    {
      id: 6,
      name: 'Destroy Something Important',
      cost: 3,
      description: 'Permanently damage or destroy a valuable asset',
      example: '"The missile strike tears through your ship\'s engine room. It\'s gone."'
    },
    {
      id: 7,
      name: 'Turn Their Move Against Them',
      cost: 3,
      description: 'Make their action backfire spectacularly',
      example: '"Your hack succeeds, but the AI notices. It now knows exactly where you are and what you want."'
    }
  ];

  const executeMove = (move) => {
    if (move.cost > 0 && fearTokens >= move.cost) {
      setFearTokens(fearTokens - move.cost);
      setSelectedMove(move);
      setTimeout(() => setSelectedMove(null), 3000);
    } else if (move.cost === 0) {
      setSelectedMove(move);
      setTimeout(() => setSelectedMove(null), 3000);
    }
  };

  return (
    <div className="keeper-moves">
      <div className="section-header">
        <h2>
          <Zap size={28} />
          Keeper Moves
        </h2>
        <div className="fear-display-small">
          <span className="fear-label">Fear Tokens:</span>
          <span className="fear-count">{fearTokens}</span>
        </div>
      </div>

      {selectedMove && (
        <div className="move-executed fade-in">
          <h3>✨ Move Executed: {selectedMove.name}</h3>
          <p>{selectedMove.description}</p>
          <div className="move-example">
            <strong>Example:</strong> {selectedMove.example}
          </div>
          {selectedMove.cost > 0 && (
            <div className="move-cost">
              Spent {selectedMove.cost} Fear Token{selectedMove.cost > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      <div className="moves-section">
        <div className="moves-header">
          <h3>
            <Eye size={24} />
            Soft Moves (No Fear Cost)
          </h3>
          <p className="moves-description">
            Use these to build tension and foreshadow danger. They signal coming trouble without immediate harm.
          </p>
        </div>

        <div className="moves-grid">
          {softMoves.map(move => (
            <div key={move.id} className="move-card soft-move">
              <div className="move-header">
                <h4>{move.name}</h4>
                <span className="move-cost free">Free</span>
              </div>
              <p className="move-description">{move.description}</p>
              <div className="move-example">
                <strong>Example:</strong> {move.example}
              </div>
              <button 
                className="btn btn-small btn-secondary"
                onClick={() => executeMove(move)}
              >
                Use Move
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="moves-section">
        <div className="moves-header">
          <h3>
            <Skull size={24} />
            Hard Moves (Costs Fear)
          </h3>
          <p className="moves-description">
            Direct consequences that change the situation. The danger is no longer coming—it's here.
          </p>
        </div>

        <div className="moves-grid">
          {hardMoves.map(move => (
            <div key={move.id} className="move-card hard-move">
              <div className="move-header">
                <h4>{move.name}</h4>
                <span className={`move-cost ${fearTokens >= move.cost ? 'available' : 'unavailable'}`}>
                  {move.cost} Fear
                </span>
              </div>
              <p className="move-description">{move.description}</p>
              <div className="move-example">
                <strong>Example:</strong> {move.example}
              </div>
              <button 
                className="btn btn-small btn-danger"
                onClick={() => executeMove(move)}
                disabled={fearTokens < move.cost}
              >
                {fearTokens >= move.cost ? 'Use Move' : 'Not Enough Fear'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="keeper-principles">
        <h3>
          <Lock size={24} />
          Keeper Principles
        </h3>
        <div className="principles-grid">
          <div className="principle-card">
            <h4>Make the Galaxy Feel Alive</h4>
            <p>The universe doesn't wait for the players. Factions move, threats advance, and opportunities pass.</p>
          </div>
          <div className="principle-card">
            <h4>Embrace the Duality</h4>
            <p>Every success with Fear and failure with Hope creates interesting complications. Use them to drive the story forward.</p>
          </div>
          <div className="principle-card">
            <h4>Ask Questions</h4>
            <p>Use the players' answers to build the world. "What does your ship look like?" "Who do you owe a debt to?"</p>
          </div>
          <div className="principle-card">
            <h4>Be a Fan of the Characters</h4>
            <p>You want to see them succeed, but you also want to see them struggle. Make their victories meaningful.</p>
          </div>
          <div className="principle-card">
            <h4>Telegraph Danger</h4>
            <p>Give players a chance to react. Use soft moves before hard moves. Let them see the threat coming.</p>
          </div>
          <div className="principle-card">
            <h4>Follow Through</h4>
            <p>When you establish a threat or consequence, make it real. Don't pull punches, but be fair.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeeperMoves;