
export interface Trait {
  name: 'Agility' | 'Strength' | 'Finesse' | 'Knowledge' | 'Instinct' | 'Presence';
  value: number;
}

export interface Power {
  domain: string;
  name: string;
  level: number;
  type: 'Ability' | 'Spell';
  description: string;
  recallCost: number;
}

export interface Ancestry {
  name: string;
  overview: string;
  gifts: { name: string; description: string }[];
}

export interface Community {
  name: string;
  description: string;
  benefit: string;
}

export interface Subclass {
  name: string;
  trait: string;
  foundation: { name: string; description: string };
  specialization: { name: string; description: string };
  mastery: { name: string; description: string };
}

export interface Class {
  name: string;
  description: string;
  domains: [string, string];
  startingEvasion: number;
  startingHP: number;
  classItems: string[];
  hopeFeature: { name: string; description: string };
  classFeature: { name: string; description: string };
  subclasses: Subclass[];
  proficiency: {
    military: number;
    experimental: number;
  };
  primaryTraits: Trait['name'][];
}

export interface Equipment {
  name: string;
  type: 'Weapon' | 'Armor' | 'Utility';
  tier: number;
  cost: number;
  stats: Record<string, any>;
}

export interface Character {
  id: string;
  name: string;
  ancestry: Ancestry | null;
  community: Community | null;
  characterClass: Class | null;
  subclass: Subclass | null;
  traits: Trait[];
  level: number;
  experience: string;
  powers: Power[];
  equipment: Equipment[];
  backstory: string;
  wealthTier: 0 | 1;
}
