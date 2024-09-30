"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChartBar, FaChalkboardTeacher, FaBook, FaSchool, FaCodeBranch, FaSignOutAlt, FaTachometerAlt, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import DashboardStats from '@/components/DashboardStats';
import DashboardChart from '@/components/DashboardChart';
import DashboardHeader from '@/components/DashboardHeader';
import TeacherManagement from '@/components/TeacherManagement';
import SubjectManagement from '@/components/SubjectManagement';
import ClassManagement from '@/components/ClassManagement';
import BranchManagement from '@/components/BranchManagement';

const SidebarItem = ({ icon, text, onClick, isActive }: { icon: React.ReactNode; text: string; onClick: () => void; isActive: boolean }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </button>
);

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Mock school details (replace with actual data fetching in a real app)
  const schoolDetails = {
    name: "Springfield Elementary School",
    adminName: "John Doe",
    email: "admin@springfield.edu",
    phone: "+1 (555) 123-4567"
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="flex-grow mt-6 px-4">
          <SidebarItem 
            icon={<FaTachometerAlt className="text-xl" />} 
            text="Overview" 
            onClick={() => setActiveSection('')}
            isActive={activeSection === ''}
          />
          <SidebarItem 
            icon={<FaChalkboardTeacher className="text-xl" />} 
            text="Teachers" 
            onClick={() => setActiveSection('teacher')}
            isActive={activeSection === 'teacher'}
          />
          <SidebarItem 
            icon={<FaBook className="text-xl" />} 
            text="Subjects" 
            onClick={() => setActiveSection('subject')}
            isActive={activeSection === 'subject'}
          />
          <SidebarItem 
            icon={<FaSchool className="text-xl" />} 
            text="Classes" 
            onClick={() => setActiveSection('class')}
            isActive={activeSection === 'class'}
          />
          <SidebarItem 
            icon={<FaCodeBranch className="text-xl" />} 
            text="Branches" 
            onClick={() => setActiveSection('branch')}
            isActive={activeSection === 'branch'}
          />
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-red-600 transition-colors mt-2 bg-red-500 text-white"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader {...schoolDetails} />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {activeSection ? `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management` : 'Dashboard Overview'}
          </h1>
          {!activeSection && (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Welcome to your dashboard. Here's an overview of your system:</p>
              <DashboardStats />
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Class Performance</h2>
                <DashboardChart />
              </div>
            </>
          )}
          {activeSection === 'teacher' && <TeacherManagement />}
          {activeSection === 'subject' && <SubjectManagement />}
          {activeSection === 'class' && <ClassManagement />}
          {activeSection === 'branch' && <BranchManagement />}
        </div>
      </div>
    </div>
  );
}