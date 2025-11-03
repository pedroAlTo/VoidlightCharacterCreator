
import { Character, Trait, Power, Equipment } from '../types/voidlight';
import { v4 as uuidv4 } from 'https://esm.sh/uuid';
import { ANCESTRIES } from '../data/ancestries';
import { COMMUNITIES } from '../data/communities';
import { CLASSES } from '../data/classes';
import { POWERS } from '../data/powers';
import { ARMORS, WEAPONS } from '../data/equipment';

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const shuffleArray = <T>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

export function generateRandomCharacter(): Character {
  const randomClass = getRandomElement(CLASSES);
  const randomSubclass = getRandomElement(randomClass.subclasses);
  const randomAncestry = getRandomElement(ANCESTRIES);
  const randomCommunity = getRandomElement(COMMUNITIES);

  // Logically assign traits
  const traitValues = [2, 1, 1, 0, 0, -1];
  const shuffledValues = shuffleArray(traitValues);
  const traitNames: Trait['name'][] = ['Agility', 'Strength', 'Finesse', 'Knowledge', 'Instinct', 'Presence'];
  const traits: Trait[] = [];
  
  const primaryTrait = getRandomElement(randomClass.primaryTraits);
  const remainingTraits = traitNames.filter(t => t !== primaryTrait);
  const shuffledRemainingTraits = shuffleArray(remainingTraits);

  const assignments: Record<string, number> = {};
  assignments[primaryTrait] = shuffledValues[0]; // Assign best value to primary trait
  shuffledRemainingTraits.forEach((trait, index) => {
    assignments[trait] = shuffledValues[index + 1];
  });

  traitNames.forEach(name => {
    traits.push({ name, value: assignments[name] });
  });


  // Select powers
  const availablePowers = POWERS.filter(p => randomClass.domains.includes(p.domain) && p.level === 1);
  const selectedPowers: Power[] = [];
  if (availablePowers.length > 0) {
    selectedPowers.push(getRandomElement(availablePowers));
    if (availablePowers.length > 1) {
        const secondPower = getRandomElement(availablePowers.filter(p => p.name !== selectedPowers[0].name));
        if(secondPower) selectedPowers.push(secondPower);
    }
  }

  // Select equipment
  const startingEquipment: Equipment[] = [];
  const classItems = randomClass.classItems.map(itemName => {
      const item = [...WEAPONS, ...ARMORS].find(i => i.name === itemName);
      return item || { name: itemName, type: 'Utility', tier: 1, cost: 0, stats: {} };
  });
  startingEquipment.push(...classItems as Equipment[]);


  const character: Character = {
    id: uuidv4(),
    name: `${randomAncestry.name} ${randomClass.name}`,
    ancestry: randomAncestry,
    community: randomCommunity,
    characterClass: randomClass,
    subclass: randomSubclass,
    traits,
    level: 1,
    experience: `A defining moment as a ${randomCommunity.name.toLowerCase()} ${randomAncestry.name.toLowerCase()}.`,
    powers: selectedPowers,
    equipment: startingEquipment,
    backstory: '',
    wealthTier: 1,
  };

  return character;
}
