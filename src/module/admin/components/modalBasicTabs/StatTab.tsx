import React from 'react';
import { AbilityStats } from '../../../../features/abilities/types';
import { StatsInputs } from '../sharedInputs';

interface StatTabProps {
  initialData: AbilityStats;
  onDataChange: (data: AbilityStats) => void;
}

export const StatTab: React.FC<StatTabProps> = ({
  initialData,
  onDataChange
}) => {
  const handleBonusChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, bonus: newValues });
  };

  const handleRequirementsChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, requirements: newValues });
  };

  return (
    <div className="space-y-8">
      <StatsInputs
        title="Stats Bonus"
        initialValues={initialData.bonus}
        onValuesChange={handleBonusChange}
      />
      
      <StatsInputs
        title="Requirements"
        initialValues={initialData.requirements}
        onValuesChange={handleRequirementsChange}
      />
    </div>
  );
};