
import React, { useState, useReducer, useEffect } from 'react';
import { Character, Trait, Power, Equipment } from '../types/voidlight';
import { v4 as uuidv4 } from 'https://esm.sh/uuid';

import Step1Identity from './creator-steps/Step1_Identity';
import Step2Origin from './creator-steps/Step2_Origin';
import Step3Archetype from './creator-steps/Step3_Archetype';
import Step4Loadout from './creator-steps/Step4_Loadout';
import Step5Finalize from './creator-steps/Step5_Finalize';

import { ANCESTRIES } from '../data/ancestries';
import { COMMUNITIES } from '../data/communities';
import { CLASSES } from '../data/classes';
import { WEAPONS, ARMORS } from '../data/equipment';

export type CreatorAction =
  | { type: 'SET_ALL'; payload: Character }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_ANCESTRY'; payload: string }
  | { type: 'SET_COMMUNITY'; payload: string }
  | { type: 'SET_CLASS'; payload: string }
  | { type: 'SET_SUBCLASS'; payload: string }
  | { type: 'SET_TRAITS'; payload: Trait[] }
  | { type: 'SET_EXPERIENCE'; payload: string }
  | { type: 'SET_POWERS'; payload: Power[] }
  | { type: 'SET_EQUIPMENT'; payload: Equipment[] }
  | { type: 'SET_BACKSTORY'; payload: string }
  | { type: 'SET_WEALTH_TIER'; payload: 0 | 1 }
  | { type: 'RESET' };

const initialTraits: Trait[] = [
  { name: 'Agility', value: 0 }, { name: 'Strength', value: 0 }, { name: 'Finesse', value: 0 },
  { name: 'Knowledge', value: 0 }, { name: 'Instinct', value: 0 }, { name: 'Presence', value: 0 },
];

const getInitialState = (): Character => ({
  id: uuidv4(),
  name: '',
  ancestry: null,
  community: null,
  characterClass: null,
  subclass: null,
  traits: initialTraits,
  level: 1,
  experience: '',
  powers: [],
  equipment: [],
  backstory: '',
  wealthTier: 1,
});

function characterReducer(state: Character, action: CreatorAction): Character {
  switch (action.type) {
    case 'SET_ALL':
      return action.payload;
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_ANCESTRY':
      return { ...state, ancestry: ANCESTRIES.find(a => a.name === action.payload) || null };
    case 'SET_COMMUNITY':
      return { ...state, community: COMMUNITIES.find(c => c.name === action.payload) || null };
    case 'SET_CLASS':
      const characterClass = CLASSES.find(c => c.name === action.payload) || null;
      const classItems = characterClass ? characterClass.classItems.map(itemName => {
          const item = [...WEAPONS, ...ARMORS].find(i => i.name === itemName);
          return item || { name: itemName, type: 'Utility', tier: 1, cost: 0, stats: {} };
      }) as Equipment[] : [];
      return { ...state, characterClass, subclass: null, powers: [], equipment: classItems };
    case 'SET_SUBCLASS':
      return { ...state, subclass: state.characterClass?.subclasses.find(sc => sc.name === action.payload) || null };
    case 'SET_TRAITS':
      return { ...state, traits: action.payload };
    case 'SET_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'SET_POWERS':
      return { ...state, powers: action.payload };
    case 'SET_EQUIPMENT':
      return { ...state, equipment: action.payload };
    case 'SET_BACKSTORY':
      return { ...state, backstory: action.payload };
    case 'SET_WEALTH_TIER':
      return { ...state, wealthTier: action.payload };
    case 'RESET':
      return getInitialState();
    default:
      return state;
  }
}

interface CharacterCreatorProps {
  onCharacterCreated: (character: Character) => void;
  characterToEdit: Character | null;
}

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreated, characterToEdit }) => {
  const [step, setStep] = useState(1);
  const [character, dispatch] = useReducer(characterReducer, getInitialState());

  useEffect(() => {
    if (characterToEdit) {
      dispatch({ type: 'SET_ALL', payload: characterToEdit });
    } else {
      dispatch({ type: 'RESET' });
    }
  }, [characterToEdit]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (character.name && character.ancestry && character.community && character.characterClass && character.subclass) {
      onCharacterCreated(character);
    } else {
      alert('Please complete all required fields before finishing.');
    }
  };
  
  const steps = [
    { name: "Identity", component: Step1Identity },
    { name: "Origin", component: Step2Origin },
    { name: "Archetype", component: Step3Archetype },
    { name: "Loadout", component: Step4Loadout },
    { name: "Finalize", component: Step5Finalize },
  ];

  const CurrentStepComponent = steps[step - 1].component;
  const totalSteps = steps.length;

  return (
    <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-2xl shadow-black/30 backdrop-blur-lg border border-gray-700">
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">Step {step} of {totalSteps}: {steps[step-1].name}</p>
      </div>

      <div className="min-h-[65vh]">
        <CurrentStepComponent character={character} dispatch={dispatch} />
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        {step < totalSteps ? (
          <button
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Finish Character
          </button>
        )}
      </div>
    </div>
  );
};

export default CharacterCreator;
