
import React from 'react';
import { Character } from '../../types/voidlight';
import { CreatorAction } from '../CharacterCreator';

interface Props {
  character: Character;
  dispatch: React.Dispatch<CreatorAction>;
}

const Step1Identity: React.FC<Props> = ({ character, dispatch }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 font-orbitron">Step 1: Identity</h2>
      <p className="text-gray-400 mb-6">Define your character's name, their starting economic status, and the single most important moment from their past.</p>
      <div className="space-y-6">
        <label className="block">
          <span className="text-gray-300">Character Name</span>
          <input
            type="text"
            value={character.name}
            onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-white p-2"
            placeholder="e.g., Kael the Ghost"
          />
        </label>
        <label className="block">
          <span className="text-gray-300">Starting Wealth Tier</span>
          <select
            value={character.wealthTier}
            onChange={(e) => dispatch({ type: 'SET_WEALTH_TIER', payload: parseInt(e.target.value) as 0 | 1 })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-white p-2"
          >
            <option value={1}>Tier 1: The Established (Steady work, steady hope.)</option>
            <option value={0}>Tier 0: The Forgotten (Invisible ghosts haunting civilization.)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-300">Key Experience</span>
          <textarea
            value={character.experience}
            onChange={(e) => dispatch({ type: 'SET_EXPERIENCE', payload: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-white p-2"
            placeholder="e.g., 'Survived the three-week siege of Elysium Station.'"
            rows={4}
          />
           <p className="text-xs text-gray-500 mt-1">This is a defining moment from your past, linked to one of your Traits. You can spend Hope to invoke this memory.</p>
        </label>
      </div>
    </div>
  );
};

export default Step1Identity;
