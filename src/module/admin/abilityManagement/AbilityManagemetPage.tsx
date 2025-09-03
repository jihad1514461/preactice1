import React, { useState } from 'react';
import { DashboardCards } from '../index';
import { CoreModal } from '../index';

export const AbilityManagementPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ability Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Ability Manager
          </p>
        </div>

        <DashboardCards onCardClick={handleCardClick} />

        <CoreModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
};