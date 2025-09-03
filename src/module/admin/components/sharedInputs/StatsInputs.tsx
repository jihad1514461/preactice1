import React from 'react';
import { stats } from '../../../../data/Stats';

interface StatsInputsProps {
  initialValues: Record<string, number>;
  onValuesChange: (newValues: Record<string, number>) => void;
  title?: string;
}

export const StatsInputs: React.FC<StatsInputsProps> = ({
  initialValues,
  onValuesChange,
  title = "Stats"
}) => {
  const handleChange = (key: string, newValue: number) => {
    const updatedValues = { ...initialValues, [key]: newValue };
    onValuesChange(updatedValues);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="space-y-3">
        {Object.entries(stats).map(([key]) => (
          <div key={key} className="flex items-center gap-4">
            <label htmlFor={key} className="w-20 font-medium text-sm">
              {key}
            </label>
            <input
              id={key}
              type="number"
              min={0}
              value={initialValues[key] || 0}
              onChange={(e) => handleChange(key, parseInt(e.target.value) || 0)}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 w-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};