import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card } from '../../../../components/index';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <Card variant="metric">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
    <div className="text-sm text-green-600 dark:text-green-400">{change}</div>
  </Card>
);

const FeatureCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({
  title, description, onClick
}) => (
  <Card variant="feature" className="h-32" onClick={onClick}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </Card>
);

interface DashboardCardsProps {
  onCardClick: () => void;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({ onCardClick }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$45,231"
          change="+12.5% from last month"
          icon={<DollarSign className="w-5 h-5 text-green-500" />}
        />
        <MetricCard
          title="Active Users"
          value="2,431"
          change="+5.2% from last month"
          icon={<Users className="w-5 h-5 text-blue-500" />}
        />
        <MetricCard
          title="Growth Rate"
          value="23.1%"
          change="+2.1% from last month"
          icon={<TrendingUp className="w-5 h-5 text-purple-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          title="Analytics Dashboard"
          description="View detailed analytics and insights about your business performance."
          onClick={onCardClick}
        />
        <FeatureCard
          title="User Management"
          description="Manage users, roles, and permissions across your organization."
          onClick={onCardClick}
        />
      </div>
    </div>
  );
};