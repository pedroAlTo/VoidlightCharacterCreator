
import { Community } from '../types/voidlight';

export const COMMUNITIES: Community[] = [
    { 
        name: 'Core World', 
        description: 'You grew up in the heart of what remains of civilization. Vast data-nets, towering arcologies, and complex social hierarchies define life here.', 
        benefit: 'Institutional Leverage. When attempting to get a permit, access a restricted file, or navigate a social event, you may roll a d20 as your Hope die. On a success (10+), you gain 1 Favor Token.' 
    },
    { 
        name: 'Trade Hub', 
        description: 'You were raised in the chaotic symphony of a bazaar. Your information networks are gossip, shipping manifests, and the whispers of black-market dealers.', 
        benefit: 'Market Oracle. When negotiating prices or seeking info about goods, you can gamble resources on rumors. Roll Comprehend (DC 12). On a success, you gain a piece of true, actionable information and 1 Hope.' 
    },
    { 
        name: 'Frontier Colony', 
        description: 'Your home was a place of grit, rust, and shared hardship. You grew up with neighbors who would share their last water ration without a second thought. Practical ingenuity is your creed.', 
        benefit: 'Scrap-Savvy Ingenuity. You can improvise tools and simple devices from junk. When you do, roll your Fear die (e.g., d6 or d8) to determine the effect. On a low roll (1-3), the device breaks spectacularly after one use.' 
    },
    { 
        name: 'Void Station', 
        description: 'You grew up in a pressurized can hurtling through nothing, breathing recycled air alongside a dozen different species. This gave you a unique perspective.', 
        benefit: 'Cross-Species Intuition. You have 3 Linguistic Tokens. You can spend 1 token to reroll a Hope die on a negotiation check or to treat your Fear die as a Hope die for a single negotiation roll.' 
    },
    { 
        name: 'Free Fleet', 
        description: 'For you, home is not a place. It is the next jump. You find family not in blood, but in the shared experiences of the deep black.', 
        benefit: 'Voidborn Kinship. When recalling information about stellar hazards or aiding allies from your fleet, you can reroll a single failed piloting check.' 
    },
    { 
        name: 'AgriSynth', 
        description: 'You were born beneath the soft, pulsing glow of nutrient lamps. Your world was a place of sterile hydroponic bays and climate-controlled domes managed by vast AI networks.', 
        benefit: 'Nourished by Nature. You have advantage on Knowledge checks to stabilize creatures near death and on Survival checks to find or purify food and water in technologically-supported environments.' 
    },
];
