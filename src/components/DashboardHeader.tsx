import React from 'react';
import { FaSchool, FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

interface SchoolDetails {
  name: string;
  adminName: string;
  email: string;
  phone: string;
}

const DashboardHeader: React.FC<SchoolDetails> = ({ name, adminName, email, phone }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaSchool className="text-4xl mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="text-sm opacity-75">Class Routine / Schedule System</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="mr-2" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>Welcome, {adminName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-700 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center mb-2 sm:mb-0">
            <FaEnvelope className="mr-2" />
            <span>{email}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;