import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Branch {
  id: number;
  name: string;
  location: string;
  headTeacher: string;
  contactNumber: string;
  email: string;
  establishedDate: string;
}

interface BranchModalProps {
  branch: Branch | null;
  onClose: () => void;
  onUpdate: (updatedBranch: Branch) => void;
  onAdd: (newBranch: Omit<Branch, 'id'>) => void;
  isNewBranch: boolean;
}

const BranchModal: React.FC<BranchModalProps> = ({ branch, onClose, onUpdate, onAdd, isNewBranch }) => {
  const [editedBranch, setEditedBranch] = useState<Omit<Branch, 'id'>>({
    name: '',
    location: '',
    headTeacher: '',
    contactNumber: '',
    email: '',
    establishedDate: '',
  });

  useEffect(() => {
    if (branch && !isNewBranch) {
      setEditedBranch(branch);
    }
  }, [branch, isNewBranch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedBranch(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewBranch) {
      onAdd(editedBranch);
    } else {
      onUpdate({ ...editedBranch, id: branch!.id });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isNewBranch ? 'Add New Branch' : 'Edit Branch'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Branch Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedBranch.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={editedBranch.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="headTeacher" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Head Teacher</label>
              <input
                type="text"
                id="headTeacher"
                name="headTeacher"
                value={editedBranch.headTeacher}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={editedBranch.contactNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedBranch.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="establishedDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Established Date</label>
              <input
                type="date"
                id="establishedDate"
                name="establishedDate"
                value={editedBranch.establishedDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isNewBranch ? 'Add Branch' : 'Update Branch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchModal;