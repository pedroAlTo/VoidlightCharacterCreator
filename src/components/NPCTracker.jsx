import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import './NPCTracker.css';

const NPCTracker = ({ npcs, setNpcs }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'ally',
    hp: 10,
    maxHp: 10,
    evasion: 10,
    notes: '',
    threat: 'minion'
  });

  const npcTypes = [
    { value: 'ally', label: 'Ally', color: '#68d391' },
    { value: 'neutral', label: 'Neutral', color: '#90cdf4' },
    { value: 'enemy', label: 'Enemy', color: '#fc8181' },
    { value: 'boss', label: 'Boss', color: '#9f7aea' }
  ];

  const threatLevels = [
    { value: 'minion', label: 'Minion (1-3 HP)' },
    { value: 'standard', label: 'Standard (4-10 HP)' },
    { value: 'elite', label: 'Elite (11-20 HP)' },
    { value: 'boss', label: 'Boss (21+ HP)' }
  ];

  const addNPC = () => {
    if (formData.name.trim()) {
      const npc = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setNpcs([...npcs, npc]);
      resetForm();
    }
  };

  const updateNPC = () => {
    setNpcs(npcs.map(npc => 
      npc.id === editingId ? { ...npc, ...formData } : npc
    ));
    resetForm();
  };

  const deleteNPC = (id) => {
    if (confirm('Are you sure you want to delete this NPC?')) {
      setNpcs(npcs.filter(npc => npc.id !== id));
    }
  };

  const startEdit = (npc) => {
    setFormData({
      name: npc.name,
      type: npc.type,
      hp: npc.hp,
      maxHp: npc.maxHp,
      evasion: npc.evasion,
      notes: npc.notes,
      threat: npc.threat
    });
    setEditingId(npc.id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'ally',
      hp: 10,
      maxHp: 10,
      evasion: 10,
      notes: '',
      threat: 'minion'
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const adjustHP = (id, amount) => {
    setNpcs(npcs.map(npc => {
      if (npc.id === id) {
        const newHp = Math.max(0, Math.min(npc.maxHp, npc.hp + amount));
        return { ...npc, hp: newHp };
      }
      return npc;
    }));
  };

  const getTypeColor = (type) => {
    return npcTypes.find(t => t.value === type)?.color || '#a0aec0';
  };

  return (
    <div className="npc-tracker">
      <div className="section-header">
        <h2>NPC & Enemy Tracker</h2>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={20} />
          Add NPC
        </button>
      </div>

      {showAddForm && (
        <div className="npc-form fade-in">
          <h3>{editingId ? 'Edit NPC' : 'Add New NPC'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Captain Rodriguez"
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {npcTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Threat Level</label>
              <select
                value={formData.threat}
                onChange={(e) => setFormData({ ...formData, threat: e.target.value })}
              >
                {threatLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Current HP</label>
              <input
                type="number"
                value={formData.hp}
                onChange={(e) => setFormData({ ...formData, hp: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Max HP</label>
              <input
                type="number"
                value={formData.maxHp}
                onChange={(e) => setFormData({ ...formData, maxHp: parseInt(e.target.value) || 1 })}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Evasion</label>
              <input
                type="number"
                value={formData.evasion}
                onChange={(e) => setFormData({ ...formData, evasion: parseInt(e.target.value) || 10 })}
                min="1"
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Special abilities, motivations, etc."
                rows={3}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={resetForm}>
              <X size={18} />
              Cancel
            </button>
            <button className="btn btn-primary" onClick={editingId ? updateNPC : addNPC}>
              <Save size={18} />
              {editingId ? 'Update' : 'Add'} NPC
            </button>
          </div>
        </div>
      )}

      <div className="npcs-grid">
        {npcs.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '4rem' }}>👥</span>
            <h3>No NPCs Yet</h3>
            <p>Add NPCs and enemies to track during your session</p>
          </div>
        ) : (
          npcs.map(npc => (
            <div key={npc.id} className="npc-card fade-in">
              <div className="npc-header">
                <div>
                  <h3>{npc.name}</h3>
                  <div className="npc-badges">
                    <span className="npc-type" style={{ backgroundColor: getTypeColor(npc.type) }}>
                      {npcTypes.find(t => t.value === npc.type)?.label}
                    </span>
                    <span className="npc-threat">
                      {threatLevels.find(t => t.value === npc.threat)?.label.split(' ')[0]}
                    </span>
                  </div>
                </div>
                <div className="npc-actions">
                  <button className="icon-btn" onClick={() => startEdit(npc)}>
                    <Edit2 size={18} />
                  </button>
                  <button className="icon-btn danger" onClick={() => deleteNPC(npc.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="npc-stats">
                <div className="stat-row">
                  <label>HP</label>
                  <div className="hp-control">
                    <button 
                      className="hp-btn"
                      onClick={() => adjustHP(npc.id, -1)}
                      disabled={npc.hp === 0}
                    >
                      -
                    </button>
                    <div className="hp-display">
                      <span className={`hp-current ${npc.hp === 0 ? 'dead' : npc.hp <= npc.maxHp * 0.3 ? 'critical' : ''}`}>
                        {npc.hp}
                      </span>
                      <span className="hp-separator">/</span>
                      <span className="hp-max">{npc.maxHp}</span>
                    </div>
                    <button 
                      className="hp-btn"
                      onClick={() => adjustHP(npc.id, 1)}
                      disabled={npc.hp === npc.maxHp}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="hp-bar">
                  <div 
                    className="hp-fill"
                    style={{ 
                      width: `${(npc.hp / npc.maxHp) * 100}%`,
                      backgroundColor: npc.hp === 0 ? '#4a5568' : npc.hp <= npc.maxHp * 0.3 ? '#fc8181' : '#68d391'
                    }}
                  />
                </div>

                <div className="stat-row">
                  <label>Evasion</label>
                  <div className="stat-value">{npc.evasion}</div>
                </div>

                {npc.hp === 0 && (
                  <div className="status-badge dead">
                    💀 Defeated
                  </div>
                )}
              </div>

              {npc.notes && (
                <div className="npc-notes">
                  <strong>Notes:</strong>
                  <p>{npc.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NPCTracker;