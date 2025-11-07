import React from 'react';
import { Save, Download } from 'lucide-react';
import './SessionNotes.css';

const SessionNotes = ({ notes, setNotes }) => {
  const saveNotes = () => {
    localStorage.setItem('voidlight-session-notes', notes);
    alert('Session notes saved!');
  };

  const exportNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voidlight-session-notes-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="session-notes">
      <div className="section-header">
        <h2>Session Notes</h2>
        <div className="notes-actions">
          <button className="btn btn-secondary" onClick={saveNotes}>
            <Save size={20} />
            Save Notes
          </button>
          <button className="btn btn-primary" onClick={exportNotes}>
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      <div className="notes-container">
        <textarea
          className="notes-editor"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your session notes here...

Track important events, player decisions, NPC interactions, plot threads, and anything else you need to remember for your campaign.

Tips:
- Note key player choices and their consequences
- Track NPC relationships and faction standings
- Record unresolved plot threads
- Document important discoveries
- Keep track of promises made and debts owed"
        />
      </div>

      <div className="notes-tips">
        <h3>Session Notes Tips</h3>
        <ul>
          <li><strong>Key Events:</strong> Record major story beats and turning points</li>
          <li><strong>Player Actions:</strong> Note significant choices and their impact</li>
          <li><strong>NPCs:</strong> Track relationships, promises, and unfinished business</li>
          <li><strong>Clues & Mysteries:</strong> Document what players have discovered</li>
          <li><strong>Future Hooks:</strong> Jot down ideas for future sessions</li>
          <li><strong>Loot & Rewards:</strong> Keep track of items and rewards given</li>
        </ul>
      </div>
    </div>
  );
};

export default SessionNotes;