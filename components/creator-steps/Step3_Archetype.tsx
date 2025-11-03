
import React, { useState, useEffect } from 'react';
import { Character, Trait } from '../../types/voidlight';
import { CreatorAction } from '../CharacterCreator';
import { CLASSES } from '../../data/classes';

interface Props {
  character: Character;
  dispatch: React.Dispatch<CreatorAction>;
}

const TRAIT_VALUES_POOL = [2, 1, 1, 0, 0, -1];
const TRAIT_NAMES: Trait['name'][] = ['Agility', 'Strength', 'Finesse', 'Knowledge', 'Instinct', 'Presence'];

const Step3Archetype: React.FC<Props> = ({ character, dispatch }) => {
  const [assignments, setAssignments] = useState<Record<Trait['name'], number | null>>({
    Agility: null, Strength: null, Finesse: null, Knowledge: null, Instinct: null, Presence: null
  });

  useEffect(() => {
    const initial: Record<Trait['name'], number | null> = { Agility: null, Strength: null, Finesse: null, Knowledge: null, Instinct: null, Presence: null };
    let validInitial = false;
    const initialPool = [...TRAIT_VALUES_POOL];
    
    character.traits.forEach(t => {
        const index = initialPool.indexOf(t.value);
        if (index > -1) {
            initial[t.name] = t.value;
            initialPool.splice(index, 1);
            validInitial = true;
        }
    });

    if(validInitial && character.traits.some(t => t.value !== 0)) {
        setAssignments(initial);
    } else {
        setAssignments({ Agility: null, Strength: null, Finesse: null, Knowledge: null, Instinct: null, Presence: null });
    }
  }, [character.id]);

  const getRemainingValues = (currentAssignments: Record<Trait['name'], number | null>) => {
    const assignedValues = Object.values(currentAssignments).filter(v => v !== null) as number[];
    const newRemaining = [...TRAIT_VALUES_POOL];
    assignedValues.forEach(val => {
      const index = newRemaining.indexOf(val);
      if (index > -1) {
        newRemaining.splice(index, 1);
      }
    });
    return newRemaining;
  };

  const handleSelectTrait = (traitName: Trait['name'], valueStr: string) => {
    const value = valueStr === '' ? null : parseInt(valueStr, 10);
    setAssignments(prev => {
        const newAssignments = { ...prev };
        newAssignments[traitName] = value;
        return newAssignments;
    });
  };

  useEffect(() => {
    const allAssigned = TRAIT_NAMES.every(name => assignments[name] !== null);
    if (allAssigned) {
      const newTraits: Trait[] = TRAIT_NAMES.map(name => ({
        name,
        value: assignments[name]!
      }));
      dispatch({ type: 'SET_TRAITS', payload: newTraits });
    }
  }, [assignments, dispatch]);

  const remainingValues = getRemainingValues(assignments);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 font-orbitron">Step 3: Archetype</h2>
      <p className="text-gray-400 mb-6">Define your core role by choosing a Class and Subclass, then assign your Traits to reflect your strengths and weaknesses.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Class & Subclass Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Class & Subclass</h3>
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {CLASSES.map(cls => (
              <div key={cls.name} className={`p-3 rounded-lg transition-colors border-2 ${character.characterClass?.name === cls.name ? 'bg-indigo-900/50 border-indigo-400' : 'bg-gray-800/50 border-gray-700'}`}>
                <div onClick={() => dispatch({ type: 'SET_CLASS', payload: cls.name })} className="cursor-pointer">
                  <p className="font-bold">{cls.name}</p>
                  <p className="text-xs text-gray-400">{cls.description}</p>
                </div>
                {character.characterClass?.name === cls.name && (
                  <div className="mt-3 pt-3 border-t border-indigo-800 space-y-2">
                    <div className="mb-2 p-2 bg-gray-900/50 rounded">
                        <p className="font-semibold text-sm text-indigo-200">{cls.hopeFeature.name}</p>
                        <p className="text-xs text-gray-400">{cls.hopeFeature.description}</p>
                    </div>
                     <div className="mb-3 p-2 bg-gray-900/50 rounded">
                        <p className="font-semibold text-sm text-indigo-200">{cls.classFeature.name}</p>
                        <p className="text-xs text-gray-400">{cls.classFeature.description}</p>
                    </div>
                    {cls.subclasses.map(sc => (
                      <div key={sc.name} onClick={() => dispatch({ type: 'SET_SUBCLASS', payload: sc.name })}
                        className={`p-2 rounded cursor-pointer border ${character.subclass?.name === sc.name ? 'bg-indigo-700 border-indigo-500' : 'bg-gray-700 border-transparent hover:border-indigo-600'}`}>
                        <p className="font-semibold">{sc.name} <span className="text-sm font-normal text-gray-400">({sc.trait})</span></p>
                        {character.subclass?.name === sc.name && (
                            <div className="text-xs text-gray-400 mt-2 space-y-1 p-2 bg-black/20 rounded">
                                <p><strong>Foundation:</strong> {sc.foundation.description}</p>
                                <p><strong>Specialization:</strong> {sc.specialization.description}</p>
                                <p><strong>Mastery:</strong> {sc.mastery.description}</p>
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trait Assignment */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Traits</h3>
          <p className="text-gray-400 mb-4 text-sm">Remaining: <strong className="text-white">[{remainingValues.join(', ')}]</strong></p>
          <div className="grid grid-cols-2 gap-4">
            {TRAIT_NAMES.map(traitName => {
              const currentVal = assignments[traitName];
              const availableOptions = currentVal === null ? remainingValues : [...remainingValues, currentVal].sort((a, b) => b - a);
              return (
                <div key={traitName} className="bg-gray-900/50 p-3 rounded-lg">
                  <label className="font-bold text-lg text-indigo-200">{traitName}</label>
                  <select
                    value={currentVal ?? ''}
                    onChange={(e) => handleSelectTrait(traitName, e.target.value)}
                    className="mt-2 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-white p-2"
                  >
                    <option value="" disabled>Assign</option>
                    {availableOptions.map((val, index) => (
                      <option key={`${val}-${index}`} value={val}>{val >= 0 ? `+${val}` : val}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Archetype;
