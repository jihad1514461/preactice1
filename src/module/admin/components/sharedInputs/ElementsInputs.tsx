import React from 'react';
import { elements } from '../../../../data/Elements';

interface ElementsInputsProps {
  initialValues: Record<string, number>;
  onValuesChange: (newValues: Record<string, number>) => void;
  title?: string;
}

export const ElementsInputs: React.FC<ElementsInputsProps> = ({
  initialValues,
  onValuesChange,
  title = "Elements"
}) => {
  const handleChange = (key: string, newValue: number) => {
    const updatedValues = { ...initialValues, [key]: newValue };
    onValuesChange(updatedValues);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="space-y-3">
        {Object.entries(elements).map(([key, element]) => (
          <div key={key} className="flex items-center gap-4">
            <label htmlFor={key} className="w-24 font-medium text-sm">
              {key}
            </label>
            <input
              id={key}
              type="range"
              min={-100}
              max={100}
              value={initialValues[key] || 0}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              style={{ accentColor: element.color }}
              className="w-32"
            />
            <span className="w-12 text-right font-mono text-sm">
              {initialValues[key] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};