import React, { useState } from 'react';
import { AbilityListPage } from './AbilityListPage';

export const AbilityManagementPage: React.FC = () => {
  return (
    <div className="p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ability Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Create, edit, and manage game abilities
        </p>
        <AbilityListPage />
      </div>
    </div>
  );
};