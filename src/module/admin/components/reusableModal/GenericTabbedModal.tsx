import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../../components/ui/atoms';
import { TabNavigation } from '../../../../components/ui/molecules';
import { cn } from '../../../../lib';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  component: React.ElementType;
}

interface GenericTabbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tabs: Tab[];
  initialData: any;
  onDataChange: (tabId: string, data: any) => void;
  onSave: (fullData: any) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const GenericTabbedModal: React.FC<GenericTabbedModalProps> = ({
  isOpen,
  onClose,
  title,
  tabs,
  initialData,
  onDataChange,
  onSave,
  size = 'lg'
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-4xl'
  };

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component;

  const handleSave = () => {
    onSave(initialData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className={cn(
        'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full mx-4 max-h-[90vh] flex flex-col',
        sizes[size]
      )}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <TabNavigation
          tabs={tabs.map(tab => ({ id: tab.id, label: tab.label, icon: tab.icon }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 overflow-y-auto p-6">
          {ActiveComponent && (
            <ActiveComponent
              initialData={initialData[activeTab]}
              onDataChange={(data: any) => onDataChange(activeTab, data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};