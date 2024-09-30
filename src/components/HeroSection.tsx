import React from 'react';
import { FaUserTie, FaChalkboardTeacher, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full">
    <div className="flex items-center mb-4">
      <div className="text-3xl text-blue-500 dark:text-blue-400 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

const HeroSection: React.FC = () => {
  const stats = [
    {
      title: "Professors",
      value: 25,
      icon: <FaUserTie />,
      description: "Experienced faculty members dedicated to quality education."
    },
    {
      title: "Classes",
      value: 50,
      icon: <FaChalkboardTeacher />,
      description: "Diverse range of courses catering to various disciplines."
    },
    {
      title: "Routines",
      value: 10,
      icon: <FaCalendarAlt />,
      description: "Efficiently organized schedules for optimal learning."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in-down">
              Class Routine / Schedule System
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 animate-fade-in-up">
              Efficiently manage your academic schedules with our comprehensive system. Streamline your institution's timetabling process.
            </p>
            <Link href="/get-started" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg transition duration-150 ease-in-out animate-fade-in-up">
              Get Started
              <FaArrowRight className="ml-2" />
            </Link>
            <div className="mt-12 text-left">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Key Features
              </h2>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Intuitive drag-and-drop interface for easy scheduling</li>
                <li>• Conflict detection and resolution</li>
                <li>• Customizable templates for different academic terms</li>
                <li>• Integration with student and faculty management systems</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;