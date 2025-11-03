
import React, { useState, useCallback } from 'react';
import { Character } from './types/voidlight';
import CharacterCreator from './components/CharacterCreator';
import CharacterSheet from './components/CharacterSheet';
import { generateRandomCharacter } from './utils/generator';
import { importCharacter } from './utils/fileUtils';

type View = 'home' | 'creator' | 'sheet';

const Header: React.FC = () => (
  <header className="text-center p-4 md:p-6 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-20">
    <h1 className="text-3xl md:text-5xl font-bold font-orbitron text-indigo-400 tracking-widest">
      VOIDLIGHT CHARACTER FORGE
    </h1>
    <p className="text-gray-400 mt-2 text-sm md:text-base">A Spark in the Dark</p>
  </header>
);

const App: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [view, setView] = useState<View>('home');
  const [isEditing, setIsEditing] = useState(false);

  const handleCharacterCreated = (newCharacter: Character) => {
    setCharacter(newCharacter);
    setIsEditing(false);
    setView('sheet');
  };

  const handleStartNew = () => {
    setIsEditing(false);
    setCharacter(null);
    setView('creator');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setView('creator');
  };

  const handleGenerateRandom = () => {
    const randomChar = generateRandomCharacter();
    setCharacter(randomChar);
    setIsEditing(false);
    setView('sheet');
  };

  const handleImport = useCallback(async () => {
    try {
      const importedChar = await importCharacter();
      setCharacter(importedChar);
      setIsEditing(false);
      setView('sheet');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }, []);

  const renderView = () => {
    switch (view) {
      case 'creator':
        return <CharacterCreator onCharacterCreated={handleCharacterCreated} characterToEdit={isEditing ? character : null} />;
      case 'sheet':
        return character ? <CharacterSheet character={character} setCharacter={setCharacter} onEdit={handleEdit} /> : <p>No character loaded.</p>;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-center max-w-3xl">
              <p className="text-lg text-gray-300 mb-8">
                Welcome, Traveler. In the fractured, quieter galaxy, your actions echo. Forge your stellar soul, create a legend, and leave your mark on the void.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleStartNew}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/30"
                >
                  Create New Character
                </button>
                <button
                  onClick={handleGenerateRandom}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
                >
                  Generate Random
                </button>
                <button
                  onClick={handleImport}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-600/30"
                >
                  Import Character
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8 relative">
        {view !== 'home' && (
          <button 
            onClick={() => { setView('home'); setIsEditing(false); }}
            className="absolute top-[-55px] md:top-[-75px] left-4 md:left-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors z-30"
          >
            &larr; Home
          </button>
        )}
        {renderView()}
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-800">
        Voidlight Character Forge | Built for a universe of patched-up ships and patched-up souls.
      </footer>
    </div>
  );
};

export default App;
