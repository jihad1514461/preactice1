import React, { useState } from 'react';
import { Card, Button } from '../atoms';
import { TabbedModal } from '../organisms';
import { TypeaheadShowcase } from './TypeaheadShowcase';
import { ButtonShowcase } from './ButtonShowcase';
import { FormShowcase } from './FormShowcase';
import { DragDropDemo } from './DragDropDemo';

export const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <TypeaheadShowcase />
      
      <ButtonShowcase />
      
      <FormShowcase />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DragDropDemo />
        
        <Card>
          <h3 className="text-lg font-semibold mb-4">Modal Components</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interactive modals with tabbed navigation and forms
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Tabbed Modal
          </Button>
        </Card>
      </div>

      <TabbedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};