import React from 'react';
import { Input } from '../../../../components/ui/atoms';
import { AbilityBasic } from '../../../../features/abilities/types';

interface BasicTabProps {
  initialData: AbilityBasic;
  onDataChange: (data: AbilityBasic) => void;
}

export const BasicTab: React.FC<BasicTabProps> = ({
  initialData,
  onDataChange
}) => {
  const handleChange = (field: keyof AbilityBasic, value: string | File | null) => {
    onDataChange({ ...initialData, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleChange('image', file);
  };

  return (
    <div className="space-y-6">
      <Input
        label="Name"
        value={initialData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter name"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          value={initialData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter description"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        />
        {initialData.image && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Selected: {initialData.image.name}
          </p>
        )}
      </div>
    </div>
  );
};