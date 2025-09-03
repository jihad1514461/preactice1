import { useState } from 'react';
import { elements } from '../../../data/Elements';

export function ElementsInputs() {
  // Initialize state for all elements
  const initialValues = Object.fromEntries(
    Object.keys(elements).map((key) => [key, 0])
  );
  const [values, setValues] = useState<Record<string, number>>(initialValues);

  const handleChange = (key: string, newValue: number) => {
    setValues((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div>
      <h1>Elements</h1>
      <form className="space-y-4">
        {Object.entries(elements).map(([key, element]) => (
          <div key={key} className="flex items-center gap-4">
            <label htmlFor={key} className="w-24 font-bold">
              {key}
            </label>
            <input
              id={key}
              type="range"
              min={-100}
              max={100}
              value={values[key]}
              onChange={(e) => handleChange(key, parseInt(e.target.value))}
              style={{
                accentColor: element.color, // for modern browsers
              }}
              className="w-64"
            />
            <span className="w-12 text-right font-mono">{values[key]}</span>
          </div>
        ))}
      </form>
    </div>
  );
}
