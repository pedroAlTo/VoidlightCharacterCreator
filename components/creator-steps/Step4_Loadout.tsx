
import React, { useState, useEffect } from 'react';
import { Character, Power, Equipment } from '../../types/voidlight';
import { CreatorAction } from '../CharacterCreator';
import { POWERS } from '../../data/powers';
import { WEAPONS, ARMORS } from '../../data/equipment';

interface Props {
  character: Character;
  dispatch: React.Dispatch<CreatorAction>;
}

const ALL_STARTING_GEAR = [...WEAPONS, ...ARMORS].filter(e => e.tier === 1 || e.tier === 2);
const TIER_BUDGET = 4;

const Step4Loadout: React.FC<Props> = ({ character, dispatch }) => {
  const classItems = character.characterClass?.classItems || [];

  const calculateCost = (items: Equipment[]) => {
    return items.reduce((total, item) => {
        if (classItems.includes(item.name)) return total;
        return total + (item.tier === 2 ? 2 : 1);
    }, 0);
  };

  const [currentCost, setCurrentCost] = useState(calculateCost(character.equipment));

  useEffect(() => {
    setCurrentCost(calculateCost(character.equipment));
  }, [character.equipment, character.characterClass]);

  const handleToggleEquipment = (item: Equipment) => {
    const isSelected = character.equipment.some(e => e.name === item.name);
    const itemCost = item.tier === 2 ? 2 : 1;
    const currentEquipment = character.equipment;

    if (isSelected) {
      dispatch({ type: 'SET_EQUIPMENT', payload: currentEquipment.filter(e => e.name !== item.name) });
    } else {
      if (calculateCost(currentEquipment) + itemCost <= TIER_BUDGET) {
        dispatch({ type: 'SET_EQUIPMENT', payload: [...currentEquipment, item] });
      } else {
        alert("Not enough Tier Points for this item.");
      }
    }
  };

  const handleTogglePower = (power: Power) => {
    const isSelected = character.powers.some(p => p.name === power.name);
    if (isSelected) {
      dispatch({ type: 'SET_POWERS', payload: character.powers.filter(p => p.name !== power.name) });
    } else {
      if (character.powers.length < 2) {
        dispatch({ type: 'SET_POWERS', payload: [...character.powers, power] });
      }
    }
  };

  if (!character.characterClass) {
    return <p className="text-yellow-400">Please select a class on the previous step to see available loadout options.</p>;
  }

  const availablePowers = POWERS.filter(p => 
    character.characterClass?.domains.includes(p.domain) && p.level === 1
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 font-orbitron">Step 4: Loadout</h2>
      <p className="text-gray-400 mb-6">Select your starting abilities and gear. You get two Level 1 powers and have 4 Tier Points for equipment.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Powers */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Powers ({character.powers.length}/2)</h3>
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {availablePowers.map(power => {
              const isSelected = !!character.powers.find(p => p.name === power.name);
              return (
                <div key={power.name} onClick={() => handleTogglePower(power)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${isSelected ? 'bg-indigo-900/50 border-indigo-400' : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500'}`}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-indigo-300">{power.name}</h4>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{power.domain}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{power.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Equipment ({TIER_BUDGET - currentCost} Pts Left)</h3>
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {ALL_STARTING_GEAR.map(item => {
              const isSelected = character.equipment.some(e => e.name === item.name);
              const isClassItem = classItems.includes(item.name);
              const itemCost = item.tier === 2 ? 2 : 1;
              return (
                <div key={item.name} onClick={() => !isClassItem && handleToggleEquipment(item)}
                  className={`p-3 rounded-lg transition-all border-2 relative ${isClassItem ? 'bg-gray-700/50 border-gray-600 cursor-default opacity-60' : isSelected ? 'bg-indigo-900/50 border-indigo-400 cursor-pointer' : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500 cursor-pointer'}`}>
                  <div className="absolute top-2 right-2 bg-gray-900 text-xs px-2 py-1 rounded-full text-yellow-300">{itemCost} pt</div>
                  <h4 className="font-bold text-indigo-300">{item.name}</h4>
                  <p className="text-xs text-gray-400">Tier {item.tier} {item.type}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Loadout;
