import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import BranchModal from './BranchModal';

interface Branch {
  id: number;
  name: string;
  location: string;
  headTeacher: string;
  contactNumber: string;
  email: string;
  establishedDate: string;
}

const BranchManagement: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: 'Main Branch', location: 'City Center', headTeacher: 'John Doe', contactNumber: '+1 234 567 8900', email: 'main@school.com', establishedDate: '2000-01-01' },
    { id: 2, name: 'North Branch', location: 'North Suburb', headTeacher: 'Jane Smith', contactNumber: '+1 234 567 8901', email: 'north@school.com', establishedDate: '2010-05-15' },
  ]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddBranch = (newBranch: Omit<Branch, 'id'>) => {
    const branchWithId = { ...newBranch, id: Date.now() };
    setBranches(prev => [...prev, branchWithId]);
    setIsAddingNew(false);
  };

  const handleUpdateBranch = (updatedBranch: Branch) => {
    setBranches(prev => prev.map(branch => 
      branch.id === updatedBranch.id ? updatedBranch : branch
    ));
  };

  const handleDeleteBranch = (id: number) => {
    setBranches(prev => prev.filter(branch => branch.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Manage Branches</h2>
      
      {/* Branch List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Branch List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Location</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Head Teacher</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Contact</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map(branch => (
                <tr key={branch.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    <button 
                      onClick={() => setSelectedBranch(branch)}
                      className="hover:underline focus:outline-none"
                    >
                      {branch.name}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{branch.location}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{branch.headTeacher}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{branch.contactNumber}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => setSelectedBranch(branch)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteBranch(branch.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Branch Button */}
      <div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Add New Branch
        </button>
      </div>

      {/* Branch Modal */}
      {(selectedBranch || isAddingNew) && (
        <BranchModal
          branch={selectedBranch}
          onClose={() => {
            setSelectedBranch(null);
            setIsAddingNew(false);
          }}
          onUpdate={handleUpdateBranch}
          onAdd={handleAddBranch}
          isNewBranch={isAddingNew}
        />
      )}
    </div>
  );
};

export default BranchManagement;