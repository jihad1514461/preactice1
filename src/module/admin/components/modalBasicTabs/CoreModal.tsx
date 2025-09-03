import React, { useState } from 'react';
import { User, Settings } from 'lucide-react';
import { Button, Input,TabNavigation,Modal } from '../../../../MainIndex';
import { BasicTab } from '../../components/modalBasicTabs/BasicTab';
import { ElementTab } from "../../components/modalBasicTabs/ElementTab";
import { StatTab } from "../../components/modalBasicTabs/StatTab";

interface CoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoreModal: React.FC<CoreModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });

  const tabs = [
    { id: 'basic', label: 'Basic', icon: <User className="w-4 h-4" /> },
    { id: 'core', label: 'Core', icon: <Settings className="w-4 h-4" /> },
    { id: 'stats', label: 'Stats', icon: <User className="w-4 h-4" /> },
    { id: 'elements', label: 'Elemenrts', icon: <Settings className="w-4 h-4" /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Management" size="lg">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {activeTab === 'basic' && (
          <>
           <BasicTab />
          </>
        )}
        {activeTab === 'core' && (
          <>
           
          </>
        )}
        {activeTab === 'stats' && (
          <>
           <StatTab />
          </>
        )}
        {activeTab === 'elements' && (
          <>
           <ElementTab/>
          </>
        )}
        
        
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};