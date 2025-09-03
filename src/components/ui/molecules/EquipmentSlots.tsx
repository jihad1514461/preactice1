import React from 'react';
import { Shield } from 'lucide-react';
import { EquipmentSlot, InventoryItem } from '../../../features/inventory/types';
import { cn } from '../../../lib';

interface EquipmentSlotsProps {
  equipment: EquipmentSlot[];
  onDrop: (slotId: string) => void;
  onDragStart: (itemId: string, slotId: string) => void;
  onDragEnd: () => void;
  isDragging: (itemId: string) => boolean;
  canDrop: (slotId: string) => boolean;
}

const getSlotIcon = (type: string) => {
  const icons = {
    weapon: '⚔️',
    helmet: '🪖',
    chest: '🛡️',
    legs: '👖',
    boots: '🥾',
    ring: '💍',
    necklace: '📿'
  };
  return icons[type as keyof typeof icons] || '❓';
};

const getRarityColor = (rarity: string) => {
  const colors = {
    common: 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
    uncommon: 'border-green-400 bg-green-50 dark:border-green-500 dark:bg-green-900/20',
    rare: 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20',
    epic: 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/20',
    legendary: 'border-orange-400 bg-orange-50 dark:border-orange-500 dark:bg-orange-900/20'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

export const EquipmentSlots: React.FC<EquipmentSlotsProps> = ({
  equipment,
  onDrop,
  onDragStart,
  onDragEnd,
  isDragging,
  canDrop
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    onDrop(slotId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Equipment
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Top row */}
        <div />
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'helmet')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        <div />
        
        {/* Middle row */}
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'weapon')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'chest')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'necklace')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        
        {/* Bottom row */}
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'ring')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'legs')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
        <EquipmentSlotComponent
          slot={equipment.find(s => s.type === 'boots')!}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isDragging={isDragging}
          canDrop={canDrop}
        />
      </div>
    </div>
  );
};

interface EquipmentSlotComponentProps {
  slot: EquipmentSlot;
  onDrop: (e: React.DragEvent, slotId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (itemId: string, slotId: string) => void;
  onDragEnd: () => void;
  isDragging: (itemId: string) => boolean;
  canDrop: (slotId: string) => boolean;
}

const EquipmentSlotComponent: React.FC<EquipmentSlotComponentProps> = ({
  slot,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
  isDragging,
  canDrop
}) => {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, slot.id)}
      className={cn(
        'aspect-square border-2 rounded-lg p-2 transition-all',
        'flex flex-col items-center justify-center',
        slot.item 
          ? cn(
              'cursor-move hover:shadow-md hover:scale-105',
              getRarityColor(slot.item.rarity),
              slot.item && isDragging(slot.item.id) && 'opacity-50 scale-95'
            )
          : cn(
              'border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50',
              canDrop(slot.id) && 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
            )
      )}
      title={slot.item ? `${slot.item.name} - ${slot.item.description}` : `${slot.name} Slot`}
    >
      {slot.item ? (
        <div
          draggable
          onDragStart={() => onDragStart(slot.item!.id, slot.id)}
          onDragEnd={onDragEnd}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <span className="text-2xl mb-1">{slot.item.icon}</span>
          <span className="text-xs text-center font-medium truncate w-full">
            {slot.item.name}
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <span className="text-2xl mb-1">{getSlotIcon(slot.type)}</span>
          <span className="text-xs text-center">{slot.name}</span>
        </div>
      )}
    </div>
  );
};