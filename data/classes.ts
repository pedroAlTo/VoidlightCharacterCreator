
import { Class } from '../types/voidlight';

export const CLASSES: Class[] = [
    {
        name: 'Soldier',
        description: 'The hardened combatant, a master of weapons and tactics.',
        domains: ['Kinetic', 'Synthesis'],
        startingEvasion: 9,
        startingHP: 7,
        classItems: ["Dented Riot Shield", "Fallen Comrade's Dog-tag"],
        hopeFeature: { name: 'Combat Surge (2 Hope)', description: 'After you hit with an attack, you can spend 2 Hope to deal an additional 1d6 damage.' },
        classFeature: { name: 'Combat Focus', description: 'You use a d4 for your Focus die, starting at 1. When you enter a Focus state, you gain powerful benefits. Every time you deal damage, you increase your Focus die by 1.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Strength', 'Finesse', 'Presence'],
        subclasses: [
            { name: 'Guardian', trait: 'Strength', foundation: {name:'Bodyguard Protocol (Reaction)', description: 'When an ally within Close range is hit by an attack, you can spend 1 Stress to intercept it, taking the damage yourself.'}, specialization: {name:'Hold the Line! (Action)', description: 'Mark 1 Stress. You become a point of mobile cover. Allies adjacent to you gain the benefit of cover (+2 to their Evasion).'}, mastery: {name:'Unbreakable (Reaction)', description: 'Once per session, when one or more allies would take damage, you can spend 3 Hope to negate all of it.'} },
            { name: 'Military Officer', trait: 'Finesse', foundation: {name:'Call the Shot (Action)', description: 'Mark 1 Stress to grant an ally one of the following benefits on their next action: gain advantage, their attack ignores cover, or their action does not draw the spotlight.'}, specialization: {name:'Exploit Weakness (Action)', description: 'Spend 1 Hope to analyze an enemy\'s tactics or equipment. For the rest of the scene, all attacks made by your allies against that enemy have the Armor Piercing quality.'}, mastery: {name:'Battlefield Symphony (Action)', description: 'Once per session, spend 3 Hope. You perfectly orchestrate the flow of battle. Every other member of the crew may immediately perform one free action.'} },
            { name: 'Peacekeeper', trait: 'Presence', foundation: {name:'Unspoken Authority (Action)', description: 'Spend 1 Hope to halt a conflict for a single, tense moment. No one can take hostile action until you speak or act.'}, specialization: {name:'Common Ground (Action)', description: 'Spend 1 Stress and make a Presence check.On a success, you find a point of leverage or empathy with one enemy.'}, mastery: {name:'Sanctuary (Action)', description: 'Once per session, spend 3 Hope to declare a zone around you as neutral ground for the scene.'} },
        ]
    },
    {
        name: 'Pilot',
        description: 'The navigation ace, one with their ship, seeing paths where others see chaos.',
        domains: ['Void', 'Tech'],
        startingEvasion: 11,
        startingHP: 6,
        classItems: ["Frayed Star Chart", "Veil-Energy Control Crystal"],
        hopeFeature: { name: 'Veil Surge (3 Hope)', description: 'You can spend 3 Hope to gain advantage on all piloting tests. You also ignore one instance of Severe Damage to your ship until your next rest.' },
        classFeature: { name: 'Stellar Instinct', description: 'You have advantage on all piloting and navigation tests. Once per session, you can reroll one failed Void-related test. If you spend Hope on a navigation roll, you may add an additional +1d8 to the result.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Agility', 'Instinct', 'Finesse'],
        subclasses: [
            { name: 'Void Runner', trait: 'Instinct', foundation: {name:'Pathfinder\'s Sense (Action)', description: 'Mark 1 Stress to sense the safest or fastest route through a dangerous area. You and your ship gain advantage on all Piloting and Evasion rolls.'}, specialization: {name:'Sensor Savant (Action)', description: 'When you make a sensor or navigation roll, you can spend 1 Hope to gain advantage.'}, mastery: {name:'Veil Dancer (Passive/Action)', description: 'You no longer suffer penalties for navigating through Veil storms. Once per session, spend 3 Hope to "fold" space.'} },
            { name: 'Combat Ace', trait: 'Agility', foundation: {name:'Tactical Grace (Reaction)', description: 'When you or your ship is the target of an attack, you can spend 1 Stress to add your Agility modifier to the ship\'s Evasion.'}, specialization: {name:'Target Lock (Action)', description: 'Mark 1 Stress to analyze the weaknesses of an enemy ship. For the rest of the scene, all attacks made by you or your allies against that ship gain +1d4 damage.'}, mastery: {name:'Ace Maneuver (Action)', description: 'Once per scene, you can spend 2 Hope to perform an impressive maneuver. Choose one: Evasive Pattern, Attack Run, or Expose Weakness.'} },
            { name: 'System Jockey', trait: 'Finesse', foundation: {name:'Orbital Whisperer (Action)', description: 'When attempting to dock, land, or navigate in tight spaces, you can spend 1 Stress to automatically succeed.'}, specialization: {name:'Gravity Slingshot (Action)', description: 'Make a Finesse + Piloting roll (DC 12) to reach your destination in half the time and consume no fuel.'}, mastery: {name:'Ghost in the Machine (Action)', description: 'Once per session, you can spend 3 Hope to seamlessly integrate into the systems of a station or capital ship.'} },
        ]
    },
    {
        name: 'Engineer',
        description: 'The technical genius, capable of building, repairing, and hacking anything.',
        domains: ['Tech', 'Synthesis'],
        startingEvasion: 9,
        startingHP: 7,
        classItems: ["Alien-etched Multi-Tool", "Universal Lubricant"],
        hopeFeature: { name: 'Scrap Genius (3 Hope)', description: 'You can spend 3 Hope to create one temporary device that works flawlessly for one scene.' },
        classFeature: { name: 'Technical Intuition', description: 'You have advantage on all repair and diagnosis tests. Once per session, when a system fails, you can spend 1 Stress to improvise a perfect fix.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Knowledge', 'Instinct'],
        subclasses: [
            { name: 'Tech Specialist', trait: 'Knowledge', foundation: {name:'Digital Ghost (Action)', description: 'You have advantage on all hacking and technology rolls. When you successfully hack a system, you leave no trace.'}, specialization: {name:'ICE Breaker (Action)', description: 'When you encounter a security system, you can spend 1 Hope to obtain information about it, including weaknesses and access codes.'}, mastery: {name:'Master of the Matrix (Action)', description: 'Once per session, you can spend 3 Hope to establish an unhackable and undetectable quantum communications network across a star system.'} },
            { name: 'Xenotech Savant', trait: 'Knowledge', foundation: {name:'Adaptive Interface (Action)', description: 'You can operate any xenotech without penalties, and you have advantage when trying to understand or modify its functions.'}, specialization: {name:'Xenotech Integration (Action)', description: 'You can spend 1 Hope to temporarily integrate a piece of alien technology into your equipment or ship, gaining its benefits for the scene.'}, mastery: {name:'Technological Symbiosis (Passive)', description: 'You have formed a permanent bond with an alien AI or technological entity. Once per session, you can spend 2 Hope to ask your symbiont for crucial help.'} },
            { name: 'Medical Technician', trait: 'Instinct', foundation: {name:'Field Surgery (Action)', description: 'Mark 1 Stress to perform emergency medical aid. Heal a target for 2 HP + 1 HP for 1d4 rounds, or stabilize a dying creature.'}, specialization: {name:'Bio-Mechanic (Passive)', description: 'All healing you perform on augmented individuals or with technological tools heals an additional +1 HP.'}, mastery: {name:'Miracle Worker (Action)', description: 'Once per story arc, you can spend 3 Hope to bring a character who died within the last hour back from the brink of death.'} },
        ]
    },
    {
        name: 'Explorer',
        description: 'The pathfinder of the shattered galaxy, driven by an insatiable curiosity for the unknown.',
        domains: ['Synthesis', 'Void'],
        startingEvasion: 11,
        startingHP: 6,
        classItems: ["Advanced Survival Kit", "Encrypted Star Chart"],
        hopeFeature: { name: 'Pathfinder\'s Insight (3 Hope)', description: 'When making a Travel or Scan the Area roll during a Void Crawl, you can spend 3 Hope to automatically treat the result as a "Success with Hope".' },
        classFeature: { name: 'Foremost Survivor', description: 'You have advantage on all Survival tests. Once per session, spend 1 Stress to gain temporary immunity to an environmental hazard for the scene.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Instinct', 'Agility'],
        subclasses: [
            { name: 'Cartographer', trait: 'Instinct', foundation: {name:'Cosmic Cartography (Passive)', description: 'Advantage on long-distance Piloting and astrogation rolls. Advantage on Chart a Safe Route during a Void Crawl.'}, specialization: {name:'Eye for the Anomaly (Action)', description: 'Spend 1 Hope with Scan the Area to gain advantage; with Success + Hope, gain an extra Intel question.'}, mastery: {name:'The Unseen Path (Action)', description: 'Once per major session, spend 3 Hope to find a hidden route or method that bypasses an obstacle.'} },
            { name: 'Wilderness', trait: 'Synthesis', foundation: {name:'Naturalist\'s Eye (Passive)', description: 'Gain advantage on Knowledge rolls to identify flora/fauna and on Instinct rolls to track creatures or find natural resources.'}, specialization: {name:'Environmental Symbiosis (Action)', description: 'Spend 1 Hope. For the scene, you need no food/water, have Advantage on Survival rolls against natural hazards.'}, mastery: {name:'Primal Connection (Action)', description: 'Spend 3 Hope (once per session) to command local non-sentient fauna (up to a Major threat) for one scene.'} },
            { name: 'Stalker', trait: 'Instinct', foundation: {name:'Mark Quarry (Action)', description: 'As an action, mark a single target. Until your next long rest, you have Advantage on Instinct rolls to track them and your first successful attack each round deals an extra 1d6 damage.'}, specialization: {name:'Unrelenting Pursuit (Action)', description: 'While pursuing your marked quarry, spend 1 Hope to flawlessly overcome one environmental obstacle without losing time or momentum.'}, mastery: {name:'The Trap is Sprung (Action)', description: 'Once per session, spend 3 Hope to declare you have set a trap for your marked quarry. Your quarry is automatically Restrained or Cornered for the scene.'} },
        ]
    },
    {
        name: 'Scoundrel',
        description: 'Ghosts in the machine. They slip through security grids and wear identities like cheap suits. They trade secrets like currency.',
        domains: ['Void', 'Social'],
        startingEvasion: 12,
        startingHP: 6,
        classItems: ["Morphic Skeleton Key", "Influential Holo-Mask"],
        hopeFeature: { name: 'Vanishing Act (3 Hope)', description: 'You can spend 3 Hope to disappear from sight and sound for 1 minute. During this time, you are immune to all forms of tracking.' },
        classFeature: { name: 'Shadow Operative', description: 'You have advantage on all Stealth tests. You can also reroll one failed Evasion roll. When you have advantage on an attack, you deal an extra +1d6 damage (Sneak Attack).' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Finesse', 'Agility', 'Presence'],
        subclasses: [
            { name: 'Assassin', trait: 'Finesse', foundation: {name:'Deadly Masquerade (Action)', description: 'Spend 1 Stress to create a flawless disguise and identity for one scene. Spend 1 Hope to make this identity stand up to any level of scrutiny for 24 hours.'}, specialization: {name:'Viper\'s Kiss (Passive)', description: 'When you score a critical hit, the target is automatically Stunned. You can also choose to spend 1 Stress to apply a potent neurotoxin (Poisoned effect).'}, mastery: {name:'Perfect Kill (Action)', description: 'Once per combat, you can spend 2 Hope to declare your next attack against an unaware target is a perfect kill (automatic critical success, max damage).'} },
            { name: 'Ghost', trait: 'Agility', foundation: {name:'Ghost (Action)', description: 'Mark 1 Stress to become invisible for one round, or to remove all traces of your passage through an area.'}, specialization: {name:'Like a Whisper (Passive)', description: 'You are a ghost to machines. You cannot be detected by non-psionic sensors, cameras, or automated systems unless you choose to be.'}, mastery: {name:'Shadow Network (Action)', description: 'Once per session, you can spend 2 Hope to call upon your network of spies and informants for a crucial piece of information or a diversion.'} },
            { name: 'Contrabandist', trait: 'Presence', foundation: {name:'Hidden Pockets (Action)', description: 'Spend 1 Hope to produce a small, non-obvious, but useful item that you had stashed away (e.g., a lockpick, a data spike).'}, specialization: {name:'Smuggler\'s Run (Action)', description: 'When attempting to get past a blockade or patrol, you can mark 1 Stress. For the rest of the scene, all attempts to detect you, your ship, or your hidden cargo are made with disadvantage.'}, mastery: {name:'Black Market Access (Action)', description: 'Once per session, you can spend 3 Hope to acquire a specific piece of rare or illegal equipment (up to Tier 3).'} },
        ]
    },
    {
        name: 'Mystic',
        description: 'Mystics hear the galaxy\'s heartbeat. For them, the Veil is not just energy. It is a living river that they swim in.',
        domains: ['Neural', 'Social'],
        startingEvasion: 10,
        startingHP: 6,
        classItems: ["Whispering Veil-Crystal", "Starlight Blindfold"],
        hopeFeature: { name: 'Reality Unfold (3 Hope)', description: 'You can spend 3 Hope to roll with advantage on all rolls. This effect lasts until you roll with Fear. You then take 1d4 Stress.' },
        classFeature: { name: 'Psychic Resonance', description: 'Once per round, when you roll for a Mystic feature, you can reroll one die. If the new die result is lower than the previous result, you gain 1 Stress.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Instinct', 'Presence'],
        subclasses: [
            { name: 'Veil Walker', trait: 'Instinct', foundation: {name:'Phase Step (Reaction)', description: 'When you are the target of an attack or need to move through an obstacle, you can spend 1 Stress to "blink" to a location in Close range.'}, specialization: {name:'Temporal Distortion (Action)', description: 'Once per scene, you can spend 1 Hope to briefly manipulate time around an enemy. That enemy must reroll all dice on their next action and choose the lowest result.'}, mastery: {name:'Causality Reverse (Action)', description: 'Once per session, you can spend 3 Stress to undo a single, recent event that occurred within Close range. A fatal blow is undone, a destroyed artifact is made whole.'} },
            { name: 'Mind-Touched', trait: 'Presence', foundation: {name:'Thought Tide (Action)', description: 'Spend 1 Hope to allow an ally to use your Presence or Instinct modifier for one roll. Once per rest, you can spend 1 Stress to grant your entire crew a mental shield.'}, specialization: {name:'Implant Suggestion (Action)', description: 'Make a Presence vs. Spirit contest. On a success, you plant a single, subtle command in a target\'s mind (e.g., "forget my face," "trust me").'}, mastery: {name:'Collective Consciousness (Action)', description: 'Once per session, you can spend 3 Hope to merge your mind with up to 3 allies in Close range for one scene. You share senses, emotions, and thoughts.'} },
            { name: 'Precursor Touched', trait: 'Presence', foundation: {name:'Ancient Echo (Action)', description: 'Spend 1 Hope to open your mind to a Precursor artifact or site. The Keeper will give you a cryptic, dream-like vision related to its purpose or history.'}, specialization: {name:'Waken the Sleepers (Action)', description: 'Mark 1 Stress. You can temporarily awaken a dormant Precursor device. The device will perform its most basic function for one minute.'}, mastery: {name:'Cosmic Truth (Action)', description: 'Spend 3 Stress to ask one specific, actionable question about the current story arc. The answer is true, but the Keeper gains 2 Fear and introduces a complication.'} },
        ]
    },
    {
        name: 'Vanguard',
        description: 'Warriors who seek perfection through the synthesis of mind (Neural) and body (Kinetic). They reject over-reliance on technology, trusting instead in discipline.',
        domains: ['Neural', 'Kinetic'],
        startingEvasion: 11,
        startingHP: 6,
        classItems: ["Light Staff (Melee)", "Meditation Orb", "Spiced Tea Mix"],
        hopeFeature: { name: 'Path to Nirvana (3 Hope)', description: 'You can spend 3 Hope to enter the Nirvana State for one scene. You gain Advantage on all Agility, Instinct, and Strength rolls, and are immune to Stunned and Dazed effects.' },
        classFeature: { name: 'Unbroken Focus', description: 'While not wearing Heavy or Very Heavy armor, you gain +1 AC. Your unarmed attacks count as having the Energy Tag. Once per turn, you may spend 1 Stress to ignore any negative modifiers to your Evasion score for 1 round.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Finesse', 'Instinct', 'Knowledge'],
        subclasses: [
            { name: 'Ghost Blade', trait: 'Finesse', foundation: {name:'Perfect Deflection (Reaction)', description: 'Spend 1 Stress to gain +3 Evasion against one incoming attack. If the attack misses due to this bonus, you gain Advantage on your next Melee attack against that attacker.'}, specialization: {name:'Unseen Movement (Action)', description: 'Spend 1 Hope and make a Finesse Ability check (DC 14). Success: Move up to Far Range. The attacker you move away from gains Disadvantage on its next attack roll against you.'}, mastery: {name:'Blade Dance (Action)', description: 'Mark 1 Stress. Make a single Melee attack roll against up to three enemies within your reach. You make one roll and compare it to each of their Evasion scores.'} },
            { name: 'Kinetic Echo', trait: 'Instinct', foundation: {name:'Precog Dodge (Reaction)', description: 'Spend 1 Hope when targeted by an attack. You force the attacker to reroll the attack roll (the Keeper must accept the new result).'}, specialization: {name:'Kinetic Reversal (Reaction)', description: 'When you are subjected to forced movement, you can spend 1 Stress to negate the movement and instead move up to your speed in any direction.'}, mastery: {name:'Echoing Strike (Passive)', description: 'When you succeed with Hope on a Melee attack, you create a temporal echo. The target is Dazed until the end of their next turn and suffers 1d6 Magic damage at the start of their next turn.'} },
            { name: 'Pure Conduit', trait: 'Knowledge', foundation: {name:'Force Projection (Action)', description: 'Spend 1 Stress. Choose one: Push one object or creature up to Far Range, OR create a wall of force that provides cover until your next turn, OR deal 1d6 Kinetic damage to everything in Close Range.'}, specialization: {name:'Shield of Will (Reaction)', description: 'When an ally in Close Range is targeted by a mental or social attack, you can spend 1 Stress to impose disadvantage on the roll.'}, mastery: {name:'Immovable Fortress (Action)', description: 'Spend 2 Hope to create a shimmering dome of kinetic force with a 5m radius around you for one scene. The dome is immobile and has an Armor score of 6 and 10 HP.'} },
        ]
    },
    {
        name: 'Diplomat',
        description: 'Diplomats weave peace in a galaxy of shattered trust. They can read the tiny expressions on the faces of other species. A sharp tongue is more valuable than a plasma rifle.',
        domains: ['Social', 'Synthesis'],
        startingEvasion: 10,
        startingHP: 6,
        classItems: ["Encrypted Datapad", "Treasured Token"],
        hopeFeature: { name: 'The Power of Suggestion (3 Hope)', description: 'You can spend 3 Hope to choose one of three powerful effects: Plant an Idea, Create an Opening, or Gather Intelligence.' },
        classFeature: { name: 'Cultural Lens', description: 'You have advantage on all Social tests. When you succeed on a Persuasion or Deception roll, you gain 1 Favor Token (max 4). During every long rest, you gain 1 Favor Token.' },
        proficiency: { military: 2, experimental: 5 },
        primaryTraits: ['Presence', 'Instinct'],
        subclasses: [
            { name: 'Cultural Attaché', trait: 'Presence', foundation: {name:'The Unmasking Gaze (Action)', description: 'Spend 1 Hope and make a Presence check against a target\'s Spirit. On a success, ask the Keeper one question about the target\'s true intentions, fears, or loyalties.'}, specialization: {name:'Social Chameleon (Passive)', description: 'When in a new social environment, you can spend 1 Hope to declare you have a plausible identity and contacts there. You gain advantage on your first social roll in that scene.'}, mastery: {name:'Universal Argument (Action)', description: 'Once per session, spend 3 Hope to make a statement so compelling it transcends language. One target who can perceive you must comply with a single, reasonable command.'} },
            { name: 'The Icon', trait: 'Presence', foundation: {name:'Control the Narrative (Action)', description: 'Make a Presence check (DC 13) to perform or report, on success, gain 1 Favor.'}, specialization: {name:'The Story\'s Debt (Action)', description: 'Spend 2 Favors to declare that a target NPC now owes you a Favor. Narrate how your past work inspired them.'}, mastery: {name:'Defining Moment (Action)', description: 'Once per story arc, spend 4 Favor tokens in a single, masterful performance or report: Your work goes viral. Choose a theme: Hope, Defiance, Peace, Rebellion, or Sorrow.'} },
            { name: 'Political Operative', trait: 'Instinct', foundation: {name:'Web of Favors (Passive)', description: 'You start each session with 2 Favor tokens. You can spend a Favor to introduce a helpful NPC contact or to produce a piece of common (Tier 1) gear as a "gift".'}, specialization: {name:'Call in a Debt (Action)', description: 'Spend 2 Favor tokens to compel an NPC to perform a significant and risky service. They cannot refuse without serious consequences.'}, mastery: {name:'Checkmate (Action)', description: 'Once per story arc, you can spend 5 Favor tokens to orchestrate a major political event (expose a rival\'s secret, trigger a vote of no confidence, start a scandal, instigate a coup).'} },
        ]
    }
];
