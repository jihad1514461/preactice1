import React from 'react';
import { User, Settings } from 'lucide-react';
import { GenericTabbedModal } from '../reusableModal';
import { BasicTab } from './BasicTab';
import { ElementTab } from './ElementTab';
import { StatTab } from './StatTab';

interface CoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSave?: (data: any) => void;
}

export const CoreModal: React.FC<CoreModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData = {},
  onSave = () => {}
}) => {
  const [modalData, setModalData] = React.useState(initialData);

  const tabs = [
    { id: 'basic', label: 'Basic', icon: <User className="w-4 h-4" />, component: BasicTab },
    { id: 'stats', label: 'Stats', icon: <User className="w-4 h-4" />, component: StatTab },
    { id: 'elements', label: 'Elements', icon: <Settings className="w-4 h-4" />, component: ElementTab }
  ];

  const handleDataChange = (tabId: string, data: any) => {
    setModalData((prev: any) => ({ ...prev, [tabId]: data }));
  };

  const handleSave = (fullData: any) => {
    onSave(fullData);
  };

  return (
    <GenericTabbedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Generic Management"
      tabs={tabs}
      initialData={modalData}
      onDataChange={handleDataChange}
      onSave={handleSave}
      size="lg"
    />
  );
};