import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Subject {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  description: string;
}

interface SubjectModalProps {
  subject: Subject | null;
  onClose: () => void;
  onUpdate: (updatedSubject: Subject) => void;
  onAdd: (newSubject: Omit<Subject, 'id'>) => void;
  isNewSubject: boolean;
}

const SubjectModal: React.FC<SubjectModalProps> = ({ subject, onClose, onUpdate, onAdd, isNewSubject }) => {
  const [editedSubject, setEditedSubject] = useState<Omit<Subject, 'id'>>({
    name: '',
    code: '',
    department: '',
    credits: 0,
    description: '',
  });

  useEffect(() => {
    if (subject && !isNewSubject) {
      setEditedSubject(subject);
    }
  }, [subject, isNewSubject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedSubject(prev => ({ ...prev, [name]: name === 'credits' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewSubject) {
      onAdd(editedSubject);
    } else {
      onUpdate({ ...editedSubject, id: subject!.id });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isNewSubject ? 'Add New Subject' : 'Edit Subject'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedSubject.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={editedSubject.code}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={editedSubject.department}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="credits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Credits</label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={editedSubject.credits}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                min="0"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedSubject.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
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
              {isNewSubject ? 'Add Subject' : 'Update Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;