import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly Class Distribution (Last 6 Months)',
        color: isDark ? '#e5e7eb' : '#374151',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#e5e7eb' : '#374151',
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? '#e5e7eb' : '#374151',
        },
        beginAtZero: true,
      },
    },
  };

  const labels = ['February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Classes Scheduled',
        data: [65, 78, 90, 81, 86, 95],
        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.5)',
        borderColor: isDark ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.8)',
        borderWidth: 1,
      },
      {
        label: 'Classes Completed',
        data: [60, 72, 85, 78, 82, 90],
        backgroundColor: isDark ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.5)',
        borderColor: isDark ? 'rgba(16, 185, 129, 1)' : 'rgba(16, 185, 129, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="h-80">
        <Bar options={options as any} data={data} />
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>This chart shows the number of classes scheduled and completed over the last 6 months.</p>
        <p>The blue bars represent scheduled classes, while the green bars show completed classes.</p>
      </div>
    </div>
  );
};

export default DashboardChart;