
import { Power } from '../types/voidlight';

export const POWERS: Power[] = [
  // Domain 1: Tech – The Ghost in the Machine
  {
    domain: 'Tech',
    name: 'System Jackknife',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. Choose one electronic system within Close range. Make an Ability check (DC 10/13/16 - Simple/Complex/Military). Success: You gain control of the system for 10 minutes. On a Success with Hope: You can issue one simple, permanent command.',
    recallCost: 0,
  },
  {
    domain: 'Tech',
    name: 'Drone Whisper',
    level: 1,
    type: 'Ability',
    description: "Spend 1 Hope. Choose one mechanical unit (Tier 1-2) within Close range. Make a contested Ability check vs. the unit's security rating (DC 12/15/18 - Civilian/Military/AI). Success: You control the unit for 1 hour. Failure: The attempt backfires, alerting the owner and you Mark 1 Stress.",
    recallCost: 0,
  },
  {
    domain: 'Tech',
    name: 'Quantum Firewall',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. Touch one device or network. For the next scene or ongoing investigation, the system becomes unhackable by anyone but you. Any intrusion attempt triggers a silent alarm to you and grants the intruder Disadvantage on future attempts to hack systems you have protected.',
    recallCost: 1,
  },
  // Domain 2: Synthesis – The Forged and Found
  {
    domain: 'Synthesis',
    name: 'Biological Scan',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. Touch a living creature. You learn its current/max HP, and any active physical conditions. Make an Ability check (DC 12). Success: You also detect any diseases, toxins, or cybernetics.',
    recallCost: 0,
  },
  {
    domain: 'Synthesis',
    name: 'Environmental Adaptation',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. You adapt your body to a hostile environment for one hour. You gain immunity to the harmful physical effects of vacuum, extreme temperature, toxicity, or ambient radiation.',
    recallCost: 0,
  },
  {
    domain: 'Synthesis',
    name: 'Rapid Regeneration',
    level: 1,
    type: 'Ability',
    description: 'Reaction. When you or an ally in Very Close range takes damage, you may Spend 1 Hope. The target immediately heals 1d4+1 HP. You may use this once per target, per scene. On Success with Hope: The target also clears 1 Stress.',
    recallCost: 1,
  },
  // Domain 3: Social – The Heart and the Crowd
  {
    domain: 'Social',
    name: 'Perfect Facade',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. For 1 hour, you create a perfect disguise matching any person you have observed. You gain Advantage on Presence rolls to maintain the deception. It is flawless to casual observation but can be seen through with a DC 16 Instinct check on close scrutiny.',
    recallCost: 0,
  },
  {
    domain: 'Social',
    name: 'Silver Tongue',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope when making a Presence roll to persuade, deceive, or convince. You may add your Level to the roll. Treat any roll of 11 on the Hope die as a 12.',
    recallCost: 0,
  },
  // Domain 4: Neural – The Mind’s Unseen Ocean
  {
    domain: 'Neural',
    name: 'Veil Sensitivity',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. For one scene, you sense the surface emotions and thoughts of creatures within Close range. You gain Advantage on Instinct checks to detect lies and hostile intent.',
    recallCost: 0,
  },
  {
    domain: 'Neural',
    name: 'Telekinetic Grasp',
    level: 1,
    type: 'Spell',
    description: 'Spellcast Roll (DC 11). For 1 minute, you can move an object weighing up to 50 lbs within Far range with fine precision. As an action, you can hurl it at a target to deal 1d6 Magic damage.',
    recallCost: 1,
  },
  // Domain 5: Kinetic – The Master of Motion
  {
    domain: 'Kinetic',
    name: 'Tactical Overwatch',
    level: 1,
    type: 'Ability',
    description: 'Reaction. When an ally in Close range is targeted by an attack, you may Spend 1 Hope. They gain Advantage on their defense and +2 Armor until the start of your next turn.',
    recallCost: 0,
  },
  {
    domain: 'Kinetic',
    name: 'Kinetic Strike',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope when making a melee attack. The attack deals an additional 1d6 damage and gains the Energy tag. On a Success with Hope: The target takes 1d4 ongoing Energy damage until they spend an action to douse it.',
    recallCost: 0,
  },
  // Domain 6: Void – The Threads of Probability
  {
    domain: 'Void',
    name: 'Temporal Cloak',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope. Choose one mode: Vehicle (ship is nearly invisible for 10 min, enemies have Disadvantage on attacks) or Personal (you are nearly invisible for 10 min, gain Advantage on stealth). The effect ends if you attack or use another Void power.',
    recallCost: 0,
  },
  {
    domain: 'Void',
    name: 'Vector Calculus',
    level: 1,
    type: 'Ability',
    description: 'Spend 1 Hope when making an Agility or piloting roll. You may add your Level to the roll and treat a 10 or lower as an 11 on the Hope die.',
    recallCost: 1,
  },
];
