import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  address: string;
  phoneNumber: string;
  department: string;
  joinDate: string;
}

interface TeacherModalProps {
  teacher: Teacher | null;
  onClose: () => void;
  onUpdate: (updatedTeacher: Teacher) => void;
  onAdd: (newTeacher: Omit<Teacher, 'id'>) => void;
  isNewTeacher: boolean;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ teacher, onClose, onUpdate, onAdd, isNewTeacher }) => {
  const [editedTeacher, setEditedTeacher] = useState<Omit<Teacher, 'id'>>({
    name: '',
    subject: '',
    email: '',
    address: '',
    phoneNumber: '',
    department: '',
    joinDate: '',
  });

  useEffect(() => {
    if (teacher && !isNewTeacher) {
      setEditedTeacher(teacher);
    }
  }, [teacher, isNewTeacher]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTeacher(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewTeacher) {
      onAdd(editedTeacher);
    } else {
      onUpdate({ ...editedTeacher, id: teacher!.id });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isNewTeacher ? 'Add New Teacher' : 'Edit Teacher'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedTeacher.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={editedTeacher.subject}
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
                value={editedTeacher.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={editedTeacher.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={editedTeacher.address}
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
                value={editedTeacher.department}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={editedTeacher.joinDate}
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
              {isNewTeacher ? 'Add Teacher' : 'Update Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;