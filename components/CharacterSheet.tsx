
import React, { useState } from 'react';
import { Character, Power } from '../types/voidlight';
import { exportCharacter } from '../utils/fileUtils';
import LevelUpModal from './LevelUpModal';

interface CharacterSheetProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  onEdit: () => void;
}

const StatBox: React.FC<{ title: string; value: string | number; className?: string; onClick?: () => void }> = ({ title, value, className, onClick }) => (
    <div className={`bg-gray-900/50 p-3 rounded-lg text-center border border-gray-700 ${className} ${onClick ? 'cursor-pointer hover:border-green-500' : ''}`} onClick={onClick}>
        <p className="text-xs text-indigo-300 uppercase font-bold tracking-wider">{title}</p>
        <p className="text-xl font-orbitron">{value}</p>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`mb-6 ${className}`}>
        <h2 className="text-2xl font-orbitron mb-3 text-indigo-200">{title}</h2>
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            {children}
        </div>
    </div>
);

const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, setCharacter, onEdit }) => {
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const handleExport = () => {
    if(character) exportCharacter(character);
  };

  const handleLevelUpConfirm = (newLevel: number, newPowers: Power[]) => {
    setCharacter(c => c ? { ...c, level: newLevel, powers: [...c.powers, ...newPowers] } : null);
    setIsLevelingUp(false);
  };

  const getProficiency = () => {
    if (!character.characterClass) return "Common";
    if (character.level >= character.characterClass.proficiency.experimental) return "Experimental";
    if (character.level >= character.characterClass.proficiency.military) return "Military";
    return "Common";
  }

  return (
    <>
      {isLevelingUp && character && (
        <LevelUpModal 
          character={character}
          onClose={() => setIsLevelingUp(false)}
          onLevelUpConfirm={handleLevelUpConfirm}
        />
      )}
      <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-2xl shadow-black/30 backdrop-blur-lg border border-gray-700 animate-fadeIn">
        <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-4xl font-orbitron text-indigo-300">{character.name}</h1>
            <p className="text-gray-400">{character.ancestry?.name} {character.characterClass?.name} ({character.subclass?.name})</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
              <button onClick={onEdit} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Edit</button>
              <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Export</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <StatBox title="Level" value={character.level} onClick={() => setIsLevelingUp(true)} className="!border-green-500/50" />
          <StatBox title="HP" value={character.characterClass?.startingHP || 'N/A'} />
          <StatBox title="Evasion" value={character.characterClass?.startingEvasion || 'N/A'} />
          <StatBox title="Stress" value="6" />
          <StatBox title="Wealth Tier" value={character.wealthTier} />
          <StatBox title="Proficiency" value={getProficiency()} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <Section title="Traits">
              <div className="grid grid-cols-3 gap-2">
                {character.traits.map(trait => (
                  <StatBox key={trait.name} title={trait.name} value={trait.value >= 0 ? `+${trait.value}`: trait.value} />
                ))}
              </div>
            </Section>
            
            <Section title="Key Experience">
              <p className="italic text-gray-300">"{character.experience}"</p>
            </Section>

            {character.backstory && (
              <Section title="Backstory">
                <p className="text-gray-300 whitespace-pre-wrap max-h-48 overflow-y-auto">{character.backstory}</p>
              </Section>
            )}
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-1">
              <Section title="Core Info">
                  <div className="space-y-3">
                      <div><strong className="text-indigo-300 block">Ancestry: {character.ancestry?.name}</strong><p className="text-sm text-gray-400">{character.ancestry?.gifts.map(g => g.name).join(', ')}</p></div>
                      <div><strong className="text-indigo-300 block">Community: {character.community?.name}</strong><p className="text-sm text-gray-400">{character.community?.benefit}</p></div>
                      <div><strong className="text-indigo-300 block">Class: {character.characterClass?.name}</strong><p className="text-sm text-gray-400">{character.characterClass?.hopeFeature.name}</p></div>
                      <div><strong className="text-indigo-300 block">Subclass: {character.subclass?.name}</strong><p className="text-sm text-gray-400">{character.subclass?.foundation.name}</p></div>
                  </div>
              </Section>
              <Section title="Proficiency">
                  <div className="space-y-2 text-sm">
                      <p><strong className="text-indigo-200">Common (Tier 1):</strong> Acquired at Level 1</p>
                      <p><strong className="text-indigo-200">Military (Tier 2):</strong> Acquired at Level {character.characterClass?.proficiency.military}</p>
                      <p><strong className="text-indigo-200">Experimental (Tier 3):</strong> Acquired at Level {character.characterClass?.proficiency.experimental}</p>
                  </div>
              </Section>
              <Section title="Equipment">
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                      {character.equipment.length > 0 ? character.equipment.map(e => (
                          <div key={e.name} className="border-b border-gray-800 pb-2 last:border-b-0">
                          <p className="font-bold text-indigo-200">{e.name} <span className="text-xs font-normal text-gray-400">(Tier {e.tier})</span></p>
                          </div>
                      )) : <p className="text-gray-500">No equipment selected.</p>}
                  </div>
              </Section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
              <Section title="Powers" className="h-full flex flex-col">
                  <div className="space-y-3 max-h-[38rem] overflow-y-auto flex-grow">
                  {character.powers.length > 0 ? character.powers.map(p => (
                      <div key={p.name} className="border-b border-gray-800 pb-2 last:border-b-0">
                      <p className="font-bold text-indigo-200">{p.name} <span className="text-xs font-normal text-gray-400">({p.domain} Lvl {p.level})</span></p>
                      <p className="text-sm text-gray-400">{p.description}</p>
                      </div>
                  )) : <p className="text-gray-500">No powers selected.</p>}
                  </div>
              </Section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterSheet;
