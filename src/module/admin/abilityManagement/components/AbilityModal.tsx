import React, { useState, useEffect } from 'react';
import { User, Settings, TrendingUp, Zap } from 'lucide-react';
import { GenericTabbedModal } from '../../components/reusableModal';
import { BasicTab, StatTab, ElementTab } from '../../components/modalBasicTabs';
import { AbilityCoreTab } from './AbilityCoreTab';
import { Ability, AbilityBasic, AbilityCore, AbilityStats, AbilityElements } from '../../../../features/abilities/types';
import { useAbilityService } from '../../../../features/abilities/useAbilityService';
import { stats } from '../../../../data/Stats';
import { elements } from '../../../../data/Elements';

interface AbilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  ability?: Ability | null;
}

const createEmptyStats = () => Object.fromEntries(Object.keys(stats).map(key => [key, 0]));
const createEmptyElements = () => Object.fromEntries(Object.keys(elements).map(key => [key, 0]));

const createEmptyAbility = (): Omit<Ability, 'id' | 'createdAt' | 'updatedAt'> => ({
  basic: { name: '', description: '', image: null },
  core: { type: '', cost: 0, turn: 0, gold: 0, fixedValue: 0, percentageValue: 0 },
  stats: { bonus: createEmptyStats(), requirements: createEmptyStats() },
  elements: {
    mastery: createEmptyElements(),
    resistance: createEmptyElements(),
    requirementMastery: createEmptyElements(),
    requirementResistance: createEmptyElements()
  }
});

export const AbilityModal: React.FC<AbilityModalProps> = ({
  isOpen,
  onClose,
  ability
}) => {
  const { createAbility, updateAbility } = useAbilityService();
  const [abilityData, setAbilityData] = useState(createEmptyAbility());

  useEffect(() => {
    if (ability) {
      setAbilityData({
        basic: ability.basic,
        core: ability.core,
        stats: ability.stats,
        elements: ability.elements
      });
    } else {
      setAbilityData(createEmptyAbility());
    }
  }, [ability, isOpen]);

  const tabs = [
    { id: 'basic', label: 'Basic', icon: <User className="w-4 h-4" />, component: BasicTab },
    { id: 'core', label: 'Core', icon: <Zap className="w-4 h-4" />, component: AbilityCoreTab },
    { id: 'stats', label: 'Stats', icon: <TrendingUp className="w-4 h-4" />, component: StatTab },
    { id: 'elements', label: 'Elements', icon: <Settings className="w-4 h-4" />, component: ElementTab }
  ];

  const handleDataChange = (tabId: string, data: any) => {
    setAbilityData(prev => ({ ...prev, [tabId]: data }));
  };

  const handleSave = async (fullData: any) => {
    try {
      if (ability) {
        await updateAbility(ability.id, fullData);
      } else {
        await createAbility(fullData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save ability:', error);
    }
  };

  return (
    <GenericTabbedModal
      isOpen={isOpen}
      onClose={onClose}
      title={ability ? 'Edit Ability' : 'Create New Ability'}
      tabs={tabs}
      initialData={abilityData}
      onDataChange={handleDataChange}
      onSave={handleSave}
      size="lg"
    />
  );
};