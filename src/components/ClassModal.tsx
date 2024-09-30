import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Class {
  id: number;
  name: string;
  grade: string;
  section: string;
  classTeacher: string;
  roomNumber: string;
  capacity: number;
}

interface ClassModalProps {
  cls: Class | null;
  onClose: () => void;
  onUpdate: (updatedClass: Class) => void;
  onAdd: (newClass: Omit<Class, 'id'>) => void;
  isNewClass: boolean;
}

const ClassModal: React.FC<ClassModalProps> = ({ cls, onClose, onUpdate, onAdd, isNewClass }) => {
  const [editedClass, setEditedClass] = useState<Omit<Class, 'id'>>({
    name: '',
    grade: '',
    section: '',
    classTeacher: '',
    roomNumber: '',
    capacity: 0,
  });

  useEffect(() => {
    if (cls && !isNewClass) {
      setEditedClass(cls);
    }
  }, [cls, isNewClass]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedClass(prev => ({ ...prev, [name]: name === 'capacity' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewClass) {
      onAdd(editedClass);
    } else {
      onUpdate({ ...editedClass, id: cls!.id });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isNewClass ? 'Add New Class' : 'Edit Class'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedClass.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grade</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={editedClass.grade}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
              <input
                type="text"
                id="section"
                name="section"
                value={editedClass.section}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="classTeacher" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Teacher</label>
              <input
                type="text"
                id="classTeacher"
                name="classTeacher"
                value={editedClass.classTeacher}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Number</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={editedClass.roomNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={editedClass.capacity}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                min="1"
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
              {isNewClass ? 'Add Class' : 'Update Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassModal;