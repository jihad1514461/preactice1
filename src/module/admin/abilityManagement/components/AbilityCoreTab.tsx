import React from 'react';
import { Input, Select, TypeaheadOption, Typeahead } from '../../../../components/ui/atoms';
import { AbilityCore } from '../../../../features/abilities/types';

interface AbilityCoreTabProps {
  initialData: AbilityCore;
  onDataChange: (data: AbilityCore) => void;
}

const abilityTypes: TypeaheadOption[] = [
  { id: '1', label: 'Offensive', value: 'offensive' },
  { id: '2', label: 'Defensive', value: 'defensive' },
  { id: '3', label: 'Support', value: 'support' },
  { id: '4', label: 'Utility', value: 'utility' }
];

export const AbilityCoreTab: React.FC<AbilityCoreTabProps> = ({
  initialData,
  onDataChange
}) => {
  const handleChange = (field: keyof AbilityCore, value: string | number) => {
    onDataChange({ ...initialData, [field]: value });
  };

  const selectedType = abilityTypes.find(type => type.value === initialData.type) || null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Typeahead
          options={abilityTypes}
          value={selectedType}
          onChange={(value) => handleChange('type', (value as TypeaheadOption)?.value || '')}
          placeholder="Select ability type..."
        />

        <Input
          label="Cost"
          type="number"
          value={initialData.cost.toString()}
          onChange={(e) => handleChange('cost', parseInt(e.target.value) || 0)}
          placeholder="Enter cost"
        />

        <Input
          label="Turn"
          type="number"
          value={initialData.turn.toString()}
          onChange={(e) => handleChange('turn', parseInt(e.target.value) || 0)}
          placeholder="Enter turn duration"
        />

        <Input
          label="Gold"
          type="number"
          value={initialData.gold.toString()}
          onChange={(e) => handleChange('gold', parseInt(e.target.value) || 0)}
          placeholder="Enter gold cost"
        />

        <Input
          label="Fixed Value"
          type="number"
          value={initialData.fixedValue.toString()}
          onChange={(e) => handleChange('fixedValue', parseInt(e.target.value) || 0)}
          placeholder="Enter fixed value"
        />

        <Input
          label="Percentage Value"
          type="number"
          value={initialData.percentageValue.toString()}
          onChange={(e) => handleChange('percentageValue', parseInt(e.target.value) || 0)}
          placeholder="Enter percentage value"
        />
      </div>
    </div>
  );
};