
import { Equipment } from '../types/voidlight';

export const WEAPONS: Equipment[] = [
  // Tier 1
  {
    name: 'Combat Knife',
    type: 'Weapon',
    tier: 1,
    cost: 1,
    stats: {
      trait: 'Finesse',
      damage: 'd6 phys.',
      burden: 1,
      feature: 'Paired'
    }
  },
  {
    name: 'Shock Baton',
    type: 'Weapon',
    tier: 1,
    cost: 1,
    stats: {
      trait: 'Strength',
      damage: 'd6+1 phys.',
      burden: 1,
      feature: 'Stunning, Paired+1'
    }
  },
  {
    name: 'Slug Pistol',
    type: 'Weapon',
    tier: 1,
    cost: 1,
    stats: {
      range: 'Close r.',
      trait: 'Agility',
      damage: 'd8+1 phys.',
      burden: 1,
      feature: 'Reliable'
    }
  },
  {
    name: 'Holdout Blaster',
    type: 'Weapon',
    tier: 1,
    cost: 1,
    stats: {
      range: 'Very Close',
      trait: 'Agility',
      damage: 'd6+1 ene.',
      burden: 1,
      feature: 'Concealable'
    }
  },
  // Tier 2
  {
    name: 'Plasma Cutter',
    type: 'Weapon',
    tier: 2,
    cost: 4,
    stats: {
        trait: 'Agility',
        damage: 'd8 magic',
        burden: 1,
        feature: 'Cutting, Paired+2'
    }
  },
  {
    name: 'Vibro-Sword',
    type: 'Weapon',
    tier: 2,
    cost: 4,
    stats: {
        trait: 'Strength',
        damage: 'd8+3 phys.',
        burden: 1,
        feature: 'Vibration (ignore Armor 1)'
    }
  },
  {
    name: 'Plasma Pistol',
    type: 'Weapon',
    tier: 2,
    cost: 4,
    stats: {
        range: 'Close',
        trait: 'Instinct',
        damage: 'd8 magic',
        burden: 1,
        feature: 'Overheating'
    }
  },
  {
    name: 'Assault Rifle',
    type: 'Weapon',
    tier: 2,
    cost: 4,
    stats: {
        range: 'Close',
        trait: 'Strength',
        damage: 'd8+1 phys.',
        burden: 2,
        feature: 'Automatic'
    }
  }
];

export const ARMORS: Equipment[] = [
  // Tier 1
  {
    name: 'Frontier Vest',
    type: 'Armor',
    tier: 1,
    cost: 1,
    stats: {
      armorSlots: 3,
      damageThres: '5/11',
      armorScore: 3,
      feature: 'Flexible'
    }
  },
  {
    name: 'Environmental Suit',
    type: 'Armor',
    tier: 1,
    cost: 1,
    stats: {
      armorSlots: 3,
      damageThres: '4/8',
      armorScore: 3,
      feature: 'Life Support'
    }
  },
  {
    name: 'Riot Armor',
    type: 'Armor',
    tier: 1,
    cost: 1,
    stats: {
        armorSlots: 6,
        damageThres: '8/17',
        armorScore: 4,
        feature: 'Heavy, Fort.'
    }
  },
  // Tier 2
  {
    name: 'Mesh Armor',
    type: 'Armor',
    tier: 2,
    cost: 4,
    stats: {
        armorSlots: 4,
        damageThres: '5/10',
        armorScore: 3,
        feature: 'Self-Repair'
    }
  },
  {
    name: 'Combat Armor',
    type: 'Armor',
    tier: 2,
    cost: 4,
    stats: {
        armorSlots: 3,
        damageThres: '8/16',
        armorScore: 4,
        feature: 'Resilient'
    }
  }
];
