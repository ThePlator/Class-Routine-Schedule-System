import React from 'react';
import { FaChalkboardTeacher, FaBook, FaSchool, FaCalendarAlt } from 'react-icons/fa';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardStats: React.FC = () => {
  // These would typically come from your backend or state management
  const stats = [
    { icon: <FaChalkboardTeacher size={24} />, title: 'Teachers', value: 50 },
    { icon: <FaBook size={24} />, title: 'Subjects', value: 30 },
    { icon: <FaSchool size={24} />, title: 'Classes', value: 20 },
    { icon: <FaCalendarAlt size={24} />, title: 'Schedules', value: 100 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;