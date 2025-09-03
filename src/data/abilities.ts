import { Ability } from '../features/abilities/types';
import { stats } from './Stats';
import { elements } from './Elements';

const createEmptyStats = () => 
  Object.fromEntries(Object.keys(stats).map(key => [key, 0]));

const createEmptyElements = () => 
  Object.fromEntries(Object.keys(elements).map(key => [key, 0]));

export const initialAbilities: Ability[] = [
  {
    id: '1',
    basic: {
      name: 'Fireball',
      description: 'A powerful fire spell that deals damage to enemies',
      image: null
    },
    core: {
      type: 'offensive',
      cost: 25,
      turn: 1,
      gold: 100,
      fixedValue: 50,
      percentageValue: 15
    },
    stats: {
      bonus: { STR: 10, INT: 20, ...createEmptyStats() },
      requirements: { INT: 15, WIS: 10, ...createEmptyStats() }
    },
    elements: {
      mastery: { Fire: 75, ...createEmptyElements() },
      resistance: { Water: -25, ...createEmptyElements() },
      requirementMastery: { Fire: 50, ...createEmptyElements() },
      requirementResistance: { ...createEmptyElements() }
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    basic: {
      name: 'Healing Light',
      description: 'Restores health to the caster or allies',
      image: null
    },
    core: {
      type: 'support',
      cost: 20,
      turn: 1,
      gold: 75,
      fixedValue: 30,
      percentageValue: 10
    },
    stats: {
      bonus: { WIS: 15, CHA: 10, ...createEmptyStats() },
      requirements: { WIS: 12, INT: 8, ...createEmptyStats() }
    },
    elements: {
      mastery: { Light: 60, ...createEmptyElements() },
      resistance: { Dark: -20, ...createEmptyElements() },
      requirementMastery: { Light: 40, ...createEmptyElements() },
      requirementResistance: { ...createEmptyElements() }
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
];