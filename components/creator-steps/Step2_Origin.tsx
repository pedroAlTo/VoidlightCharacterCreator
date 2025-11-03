
import React from 'react';
import { Character } from '../../types/voidlight';
import { CreatorAction } from '../CharacterCreator';
import { ANCESTRIES } from '../../data/ancestries';
import { COMMUNITIES } from '../../data/communities';

interface Props {
  character: Character;
  dispatch: React.Dispatch<CreatorAction>;
}

const Step2Origin: React.FC<Props> = ({ character, dispatch }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 font-orbitron">Step 2: Origin</h2>
      <p className="text-gray-400 mb-6">Choose your heritage and the environment that shaped you.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Ancestry</h3>
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {ANCESTRIES.map(anc => (
              <div key={anc.name} onClick={() => dispatch({ type: 'SET_ANCESTRY', payload: anc.name })}
                className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${character.ancestry?.name === anc.name ? 'bg-indigo-900/50 border-indigo-400' : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500'}`}>
                <h4 className="font-bold text-indigo-300">{anc.name}</h4>
                <p className="text-xs text-gray-400 mt-1 mb-2">{anc.overview}</p>
                <div className="border-t border-gray-700 pt-2 space-y-1">
                    {anc.gifts.map(gift => (
                        <div key={gift.name}>
                            <h5 className="font-semibold text-sm text-indigo-200">{gift.name}</h5>
                            <p className="text-xs text-gray-400">{gift.description}</p>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-200">Community</h3>
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-2">
            {COMMUNITIES.map(com => (
              <div key={com.name} onClick={() => dispatch({ type: 'SET_COMMUNITY', payload: com.name })}
                className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${character.community?.name === com.name ? 'bg-indigo-900/50 border-indigo-400' : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500'}`}>
                <h4 className="font-bold text-indigo-300">{com.name}</h4>
                <p className="text-xs text-gray-400 mt-1 mb-2">{com.description}</p>
                <div className="border-t border-gray-700 pt-2">
                    <p className="text-sm text-green-400 font-semibold">Benefit:</p>
                    <p className="text-xs text-gray-300">{com.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Origin;
