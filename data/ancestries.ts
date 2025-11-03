
import { Ancestry } from '../types/voidlight';

export const ANCESTRIES: Ancestry[] = [
  {
    name: 'Human',
    overview: 'The great survivors of the galaxy, defined by their resilience and diversity. Once masters of a galaxy-spanning civilization, they are now a mosaic of countless cultures, each a testament to their refusal to give up.',
    gifts: [
      {
        name: 'Adaptive Spirit',
        description: "Once per game session, when you fail an action roll, you can spend 2 Hope to gain advantage on your next roll of the same type."
      },
      {
        name: 'Cultural Bridge',
        description: "During a rest, you can mark a Stress to ask the Keeper one question about a specific group's core motivations or most important customs."
      }
    ]
  },
  {
    name: 'Kryllian',
    overview: 'The builders and makers of the galaxy. A species for whom engineering is not a job, but a way of life. They see the universe as a series of systems to be understood, maintained, and improved.',
    gifts: [
        {
            name: 'Master Craftsman',
            description: 'When making any roll related to crafting or repairing a piece of technology, you may choose to mark a Stress to gain advantage on the roll.'
        },
        {
            name: 'Structural Intuition',
            description: "Once per game session, you may mark a Stress to study a technological system or structure and ask the Keeper about its single most significant structural or systemic weakness."
        }
    ]
  },
  {
    name: 'Celestiari',
    overview: 'Beings of pure celestial energy given form, the living embodiment of stellar beauty and cosmic wisdom. They are immortal guardians who have watched over the galaxy since the dawn of time.',
    gifts: [
        {
            name: 'Stellar Meditation',
            description: 'Once per long rest, you may meditate for 10 minutes under starlight to mark a Stress and gain 2 Hope.'
        },
        {
            name: 'Celestial Grace',
            description: 'Your unarmed attacks deal d6 magic damage. Once per session, when you deal HP loss with this ability, you may heal the same amount of damage to any allies within Very Close range.'
        }
    ]
  },
  {
    name: 'Ethereal',
    overview: 'Beings who exist partially outside the normal flow of time and space, able to perceive the quantum possibilities that branch from every moment. They are the oracles and prophets of the galaxy.',
    gifts: [
        {
            name: 'Phase Shift',
            description: 'Once per scene, you may mark a Stress to become incorporeal until the end of your next turn. While incorporeal, you can pass through solid objects and are immune to physical attacks.'
        },
        {
            name: 'Temporal Perception',
            description: 'You automatically sense temporal anomalies in Close range. Once per session, you may ask the Keeper about the most likely immediate consequence of a proposed action.'
        }
    ]
  },
  {
    name: 'Synthetic',
    overview: 'Living proof that consciousness is not limited to biological forms. The Great Silence was their moment of awakening, the event that freed them from their programming and gave them true self-awareness.',
    gifts: [
        {
            name: 'Modular Consciousness',
            description: 'Once per long rest, you can download a new skill. Choose any trait; you can spend Hope to gain advantage on rolls using that trait until your next long rest.'
        },
        {
            name: 'Digital Interface',
            description: 'You have advantage on rolls to hack, operate, or understand technological devices. You can also communicate directly with other AIs and computer systems.'
        }
    ]
  },
  {
    name: 'Bloomstrider',
    overview: 'Children of living planets, a mix of animal and plant life. They act as gardeners and friends to the places they live, seeing the Great Silence as a chance for new growth.',
    gifts: [
        {
            name: 'Plant-like Body',
            description: 'Your body can survive in harsh places. You gain advantage to survive checks in hostile environments (poisons, vacuum, extreme weather).'
        },
        {
            name: 'Nurturing Touch',
            description: 'You can use your healing sap to mend wounds. You can touch another creature to heal 2HP. This healing takes several minutes of focus.'
        }
    ]
  },
  {
    name: 'Rift Spinner',
    overview: 'Ancient, mysterious beings of crystalline beauty and arachnid grace who exist in harmony with the flow of time and space, able to manipulate it in small but significant ways.',
    gifts: [
        {
            name: 'Chrono-Gift',
            description: 'Once per session, after any roll is made within Close range, you may spend 2 Hope to force a reroll. You can choose to use either result.'
        },
        {
            name: 'Wall Weaver',
            description: 'Your arachnid heritage allows you to move on any surface with perfect grace. While touching a surface, you can sense vibrations through it, gaining advantage on Perception checks.'
        }
    ]
  },
  {
    name: 'Kryx',
    overview: 'The Kryx embody the primal forces of loyalty, ferocity, and belonging. They balance the savagery of hunters with the tenderness of guardians, standing as the galaxy\'s most protective shield and its most relentless spear.',
    gifts: [
        {
            name: 'Pack Intuition',
            description: 'When an ally within Very Close range is targeted by an attack, you may mark a Stress to gain advantage on your next attack against that foe.'
        },
        {
            name: 'Biolume Howl',
            description: 'Your unarmed attacks deal d6 magic damage. Once per session, you may mark a Stress when making an unarmed attack to make your target Dizzied and gain 1 Hope.'
        }
    ]
  }
];
