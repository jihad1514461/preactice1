import React, { useState } from 'react';
import { Card, Typeahead, TypeaheadOption, Button } from '../atoms';

const technologies: TypeaheadOption[] = [
  { id: '1', label: 'React', value: 'react' },
  { id: '2', label: 'Vue.js', value: 'vue' },
  { id: '3', label: 'Angular', value: 'angular' },
  { id: '4', label: 'Svelte', value: 'svelte' },
  { id: '5', label: 'TypeScript', value: 'typescript' },
  { id: '6', label: 'JavaScript', value: 'javascript' }
];

const countries: TypeaheadOption[] = [
  { id: '1', label: 'United States', value: 'us' },
  { id: '2', label: 'Canada', value: 'ca' },
  { id: '3', label: 'United Kingdom', value: 'uk' },
  { id: '4', label: 'Germany', value: 'de' },
  { id: '5', label: 'France', value: 'fr' },
  { id: '6', label: 'Japan', value: 'jp' }
];

export const TypeaheadShowcase: React.FC = () => {
  const [singleTech, setSingleTech] = useState<TypeaheadOption | null>(null);
  const [multiTech, setMultiTech] = useState<TypeaheadOption[]>([]);
  const [country, setCountry] = useState<TypeaheadOption | null>(countries[0]);

  const resetAll = () => {
    setSingleTech(null);
    setMultiTech([]);
    setCountry(null);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Typeahead Examples</h3>
        <Button variant="secondary" size="sm" onClick={resetAll}>
          Reset All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Single Select</label>
            <Typeahead
              options={technologies}
              value={singleTech}
              onChange={(value) => setSingleTech(value as TypeaheadOption)}
              placeholder="Choose a technology..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Multi Select</label>
            <Typeahead
              options={technologies}
              value={multiTech}
              onChange={(value) => setMultiTech(value as TypeaheadOption[])}
              placeholder="Choose technologies..."
              multiple
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">With Default Value</label>
            <Typeahead
              options={countries}
              value={country}
              onChange={(value) => setCountry(value as TypeaheadOption)}
              placeholder="Select country..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Disabled State</label>
            <Typeahead
              options={technologies}
              value={technologies[0]}
              onChange={() => {}}
              placeholder="Disabled..."
              disabled
            />
          </div>
        </div>
      </div>
    </Card>
  );
};