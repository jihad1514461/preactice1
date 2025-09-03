import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../components/ui/atoms';
import { useAbilityService } from '../../../features/abilities/useAbilityService';
import { Ability } from '../../../features/abilities/types';
import { AbilityTable } from './AbilityTable';
import { PaginationControls } from './PaginationControls';
import { AbilityModal } from './components/AbilityModal';

export const AbilityListPage: React.FC = () => {
  const { abilities, isLoading, deleteAbility } = useAbilityService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAbility, setEditingAbility] = useState<Ability | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(abilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAbilities = abilities.slice(startIndex, startIndex + itemsPerPage);

  const handleCreate = () => {
    setEditingAbility(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ability: Ability) => {
    setEditingAbility(ability);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this ability?')) {
      await deleteAbility(id);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAbility(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Abilities</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage game abilities and their properties
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Ability
        </Button>
      </div>

      <AbilityTable
        abilities={paginatedAbilities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={abilities.length}
      />

      <AbilityModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        ability={editingAbility}
      />
    </div>
  );
};