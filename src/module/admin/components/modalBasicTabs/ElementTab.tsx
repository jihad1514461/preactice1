import React from 'react';
import { AbilityElements } from '../../../../features/abilities/types';
import { ElementsInputs } from '../sharedInputs';

interface ElementTabProps {
  initialData: AbilityElements;
  onDataChange: (data: AbilityElements) => void;
}

export const ElementTab: React.FC<ElementTabProps> = ({
  initialData,
  onDataChange
}) => {
  const handleMasteryChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, mastery: newValues });
  };

  const handleResistanceChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, resistance: newValues });
  };

  const handleReqMasteryChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, requirementMastery: newValues });
  };

  const handleReqResistanceChange = (newValues: Record<string, number>) => {
    onDataChange({ ...initialData, requirementResistance: newValues });
  };

  return (
    <div className="space-y-8">
      <ElementsInputs
        title="Mastery"
        initialValues={initialData.mastery}
        onValuesChange={handleMasteryChange}
      />
      
      <ElementsInputs
        title="Resistance"
        initialValues={initialData.resistance}
        onValuesChange={handleResistanceChange}
      />
      
      <ElementsInputs
        title="Requirement Mastery"
        initialValues={initialData.requirementMastery}
        onValuesChange={handleReqMasteryChange}
      />
      
      <ElementsInputs
        title="Requirement Resistance"
        initialValues={initialData.requirementResistance}
        onValuesChange={handleReqResistanceChange}
      />
    </div>
  );
};