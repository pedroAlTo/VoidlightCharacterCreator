
import React from 'react';
import { Character } from '../../types/voidlight';
import { CreatorAction } from '../CharacterCreator';
import GeminiBackstoryGenerator from '../GeminiBackstoryGenerator';

interface Props {
  character: Character;
  dispatch: React.Dispatch<CreatorAction>;
}

const Step5Finalize: React.FC<Props> = ({ character, dispatch }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 font-orbitron">Step 5: Finalize</h2>
      <p className="text-gray-400 mb-6">Review your character's core details. You can go back to change anything. When you're ready, generate an AI-powered backstory to bring them to life, then finish creation.</p>
      
      <div className="bg-gray-900/70 p-4 rounded-lg mb-6 border border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><strong className="text-indigo-300">Name:</strong> {character.name || '...'}</div>
        <div><strong className="text-indigo-300">Ancestry:</strong> {character.ancestry?.name || '...'}</div>
        <div><strong className="text-indigo-300">Community:</strong> {character.community?.name || '...'}</div>
        <div><strong className="text-indigo-300">Class:</strong> {character.characterClass?.name || '...'} ({character.subclass?.name || '...'})</div>
        <div className="md:col-span-2"><strong className="text-indigo-300">Experience:</strong> <em className="text-gray-300">"{character.experience || '...'}"</em></div>
      </div>

      <GeminiBackstoryGenerator 
        character={character} 
        onBackstoryGenerated={(backstory) => dispatch({ type: 'SET_BACKSTORY', payload: backstory })}
      />

      {character.backstory && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700 max-h-48 overflow-y-auto">
          <h3 className="font-bold text-lg mb-2 text-indigo-300">Generated Backstory:</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{character.backstory}</p>
        </div>
      )}
    </div>
  );
};

export default Step5Finalize;
