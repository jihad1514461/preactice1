import { useState } from 'react';
import { stats } from '../../../data/stats';

export function StatsInputs() {
  // Initialize state for all stats, default value 0
  const initialValues = Object.fromEntries(
    Object.keys(stats).map((key) => [key, 0])
  );
  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const handleChange = (key: string, newValue: number) => {
    setValues((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div>
      <h1>Stats</h1>
      <form className="space-y-4">
        {Object.entries(stats).map(([key]) => (
          <div key={key} className="flex items-center gap-4">
            <label htmlFor={key} className="w-20 font-bold">
              {key}
            </label>
            <input
              id={key}
              type="number"
              min={0}
              value={values[key]}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              className="border rounded px-2 py-1 w-24"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
