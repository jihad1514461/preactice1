export interface AbilityCore {
  type: string;
  cost: number;
  turn: number;
  gold: number;
  fixedValue: number;
  percentageValue: number;
}

export interface AbilityStats {
  bonus: Record<string, number>;
  requirements: Record<string, number>;
}

export interface AbilityElements {
  mastery: Record<string, number>;
  resistance: Record<string, number>;
  requirementMastery: Record<string, number>;
  requirementResistance: Record<string, number>;
}

export interface AbilityBasic {
  name: string;
  description: string;
  image: File | null;
}

export interface Ability {
  id: string;
  basic: AbilityBasic;
  core: AbilityCore;
  stats: AbilityStats;
  elements: AbilityElements;
  createdAt: Date;
  updatedAt: Date;
}