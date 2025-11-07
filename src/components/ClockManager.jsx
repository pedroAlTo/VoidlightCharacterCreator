import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Circle, CheckCircle } from 'lucide-react';
import './ClockManager.css';

const ClockManager = ({ clocks, setClocks }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClock, setNewClock] = useState({
    name: '',
    segments: 4,
    type: 'project',
    description: ''
  });

  const clockTypes = [
    { value: 'project', label: 'Project Clock', color: '#667eea' },
    { value: 'complication', label: 'Complication Clock', color: '#f56565' },
    { value: 'threat', label: 'Threat Clock', color: '#ed8936' },
    { value: 'supplies', label: 'Supplies Running Low', color: '#ecc94b' },
    { value: 'attention', label: 'Attention Drawn', color: '#9f7aea' },
    { value: 'custom', label: 'Custom Clock', color: '#48bb78' }
  ];

  const addClock = () => {
    if (newClock.name.trim()) {
      const clock = {
        id: Date.now(),
        ...newClock,
        filled: 0,
        createdAt: new Date().toISOString()
      };
      setClocks([...clocks, clock]);
      setNewClock({ name: '', segments: 4, type: 'project', description: '' });
      setShowAddForm(false);
    }
  };

  const deleteClock = (id) => {
    if (confirm('Are you sure you want to delete this clock?')) {
      setClocks(clocks.filter(c => c.id !== id));
    }
  };

  const fillSegment = (id) => {
    setClocks(clocks.map(c => {
      if (c.id === id && c.filled < c.segments) {
        return { ...c, filled: c.filled + 1 };
      }
      return c;
    }));
  };

  const unfillSegment = (id) => {
    setClocks(clocks.map(c => {
      if (c.id === id && c.filled > 0) {
        return { ...c, filled: c.filled - 1 };
      }
      return c;
    }));
  };

  const resetClock = (id) => {
    setClocks(clocks.map(c => {
      if (c.id === id) {
        return { ...c, filled: 0 };
      }
      return c;
    }));
  };

  const getClockColor = (type) => {
    return clockTypes.find(t => t.value === type)?.color || '#667eea';
  };

  const renderClockSegments = (clock) => {
    const segments = [];
    const anglePerSegment = 360 / clock.segments;
    
    for (let i = 0; i < clock.segments; i++) {
      const isFilled = i < clock.filled;
      const rotation = i * anglePerSegment;
      
      segments.push(
        <div
          key={i}
          className={`clock-segment ${isFilled ? 'filled' : ''}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            '--segment-color': getClockColor(clock.type)
          }}
        />
      );
    }
    
    return segments;
  };

  return (
    <div className="clock-manager">
      <div className="section-header">
        <h2>Clock Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={20} />
          Add Clock
        </button>
      </div>

      {showAddForm && (
        <div className="add-clock-form fade-in">
          <h3>Create New Clock</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Clock Name</label>
              <input
                type="text"
                value={newClock.name}
                onChange={(e) => setNewClock({ ...newClock, name: e.target.value })}
                placeholder="e.g., Decipher the Signal"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={newClock.type}
                onChange={(e) => setNewClock({ ...newClock, type: e.target.value })}
              >
                {clockTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Segments</label>
              <select
                value={newClock.segments}
                onChange={(e) => setNewClock({ ...newClock, segments: parseInt(e.target.value) })}
              >
                <option value={4}>4 Segments (Simple)</option>
                <option value={6}>6 Segments (Standard)</option>
                <option value={8}>8 Segments (Complex)</option>
                <option value={12}>12 Segments (Legendary)</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Description (Optional)</label>
              <textarea
                value={newClock.description}
                onChange={(e) => setNewClock({ ...newClock, description: e.target.value })}
                placeholder="What does this clock represent?"
                rows={2}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addClock}>
              Create Clock
            </button>
          </div>
        </div>
      )}

      <div className="clocks-grid">
        {clocks.length === 0 ? (
          <div className="empty-state">
            <Circle size={64} strokeWidth={1} />
            <h3>No Clocks Yet</h3>
            <p>Create your first clock to start tracking progress in your campaign</p>
          </div>
        ) : (
          clocks.map(clock => (
            <div key={clock.id} className="clock-card fade-in">
              <div className="clock-header">
                <div>
                  <h3>{clock.name}</h3>
                  <span className="clock-type" style={{ backgroundColor: getClockColor(clock.type) }}>
                    {clockTypes.find(t => t.value === clock.type)?.label}
                  </span>
                </div>
                <button className="icon-btn danger" onClick={() => deleteClock(clock.id)}>
                  <Trash2 size={18} />
                </button>
              </div>

              {clock.description && (
                <p className="clock-description">{clock.description}</p>
              )}

              <div className="clock-visual">
                <div className="clock-circle">
                  {renderClockSegments(clock)}
                  <div className="clock-center">
                    <span className="clock-progress">{clock.filled}/{clock.segments}</span>
                  </div>
                </div>
              </div>

              <div className="clock-actions">
                <button 
                  className="btn btn-small btn-secondary" 
                  onClick={() => unfillSegment(clock.id)}
                  disabled={clock.filled === 0}
                >
                  - Unfill
                </button>
                <button 
                  className="btn btn-small btn-primary" 
                  onClick={() => fillSegment(clock.id)}
                  disabled={clock.filled === clock.segments}
                >
                  + Fill
                </button>
                <button 
                  className="btn btn-small btn-secondary" 
                  onClick={() => resetClock(clock.id)}
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              {clock.filled === clock.segments && (
                <div className="clock-complete">
                  <CheckCircle size={20} />
                  Clock Complete!
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClockManager;