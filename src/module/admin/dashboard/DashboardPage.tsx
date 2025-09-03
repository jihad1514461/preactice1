import React, { useState } from 'react';
import { DashboardCards } from '../index';
import { TabbedModal } from '../../../components/index';

export const DashboardPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your business metrics and manage your data
          </p>
        </div>

        <DashboardCards onCardClick={handleCardClick} />

        <TabbedModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
};