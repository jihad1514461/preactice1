import React, { useState } from 'react';
import { Sidebar, Topbar, DashboardPage, UIShowcasePage,AbilityManagementPage } from '../index';

type PageType = string;

export const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'ui-showcase':
        return <UIShowcasePage />;
        case "ability-management":
        return <AbilityManagementPage />;
      case 'typeahead':
        return <div className="p-6"><h1 className="text-2xl font-bold">Typeahead Page</h1><p>Coming soon...</p></div>;
      case 'inventory':
        return <div className="p-6"><h1 className="text-2xl font-bold">Inventory Page</h1><p>Coming soon...</p></div>;
      case 'analytics':
        return <div className="p-6"><h1 className="text-2xl font-bold">Analytics Page</h1><p>Coming soon...</p></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">Settings Page</h1><p>Coming soon...</p></div>;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};