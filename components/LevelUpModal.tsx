
import React, { useState, useMemo } from 'react';
import { Character, Power } from '../types/voidlight';
import { POWERS } from '../data/powers';

interface LevelUpModalProps {
  character: Character;
  onClose: () => void;
  onLevelUpConfirm: (newLevel: number, newPowers: Power[]) => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ character, onClose, onLevelUpConfirm }) => {
  const [selectedPowers, setSelectedPowers] = useState<Power[]>([]);
  const newLevel = character.level + 1;
  const slots = 2;

  const availablePowers = useMemo(() => {
    if (!character.characterClass) return [];
    return POWERS.filter(p => 
      character.characterClass!.domains.includes(p.domain) &&
      p.level <= newLevel &&
      !character.powers.some(cp => cp.name === p.name)
    ).sort((a, b) => a.level - b.level);
  }, [character, newLevel]);

  const handleTogglePower = (power: Power) => {
    setSelectedPowers(prev => {
      if (prev.some(p => p.name === power.name)) {
        return prev.filter(p => p.name !== power.name);
      }
      if (prev.length < slots) {
        return [...prev, power];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    onLevelUpConfirm(newLevel, selectedPowers);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-indigo-500 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-3xl font-orbitron text-indigo-300">Level Up!</h2>
          <p className="text-gray-400">Level {character.level} &rarr; {newLevel}. You have {slots} Advancement Slots to spend.</p>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          <h3 className="text-xl font-semibold text-indigo-200 mb-4">Advancement Choice: Acquire New Powers ({selectedPowers.length}/{slots})</h3>
          <div className="space-y-2">
            {availablePowers.map(power => {
              const isSelected = selectedPowers.some(p => p.name === power.name);
              return (
                <div 
                  key={power.name} 
                  onClick={() => handleTogglePower(power)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'bg-indigo-900/50 border-indigo-400' : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500'}`}
                >
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-indigo-300">{power.name}</h4>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{power.domain} / Lvl {power.level}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{power.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Confirm Level Up</button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpModal;
