import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ClassModal from './ClassModal';

interface Class {
  id: number;
  name: string;
  grade: string;
  section: string;
  classTeacher: string;
  roomNumber: string;
  capacity: number;
}

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([
    { id: 1, name: 'Class 10A', grade: '10', section: 'A', classTeacher: 'John Doe', roomNumber: '101', capacity: 30 },
    { id: 2, name: 'Class 11B', grade: '11', section: 'B', classTeacher: 'Jane Smith', roomNumber: '202', capacity: 35 },
  ]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddClass = (newClass: Omit<Class, 'id'>) => {
    const classWithId = { ...newClass, id: Date.now() };
    setClasses(prev => [...prev, classWithId]);
    setIsAddingNew(false);
  };

  const handleUpdateClass = (updatedClass: Class) => {
    setClasses(prev => prev.map(cls => 
      cls.id === updatedClass.id ? updatedClass : cls
    ));
  };

  const handleDeleteClass = (id: number) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Manage Classes</h2>
      
      {/* Class List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Class List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Grade</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Section</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Class Teacher</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Room</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Capacity</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => (
                <tr key={cls.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    <button 
                      onClick={() => setSelectedClass(cls)}
                      className="hover:underline focus:outline-none"
                    >
                      {cls.name}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cls.grade}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cls.section}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cls.classTeacher}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cls.roomNumber}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cls.capacity}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => setSelectedClass(cls)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClass(cls.id)}
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

      {/* Add New Class Button */}
      <div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Add New Class
        </button>
      </div>

      {/* Class Modal */}
      {(selectedClass || isAddingNew) && (
        <ClassModal
          cls={selectedClass}
          onClose={() => {
            setSelectedClass(null);
            setIsAddingNew(false);
          }}
          onUpdate={handleUpdateClass}
          onAdd={handleAddClass}
          isNewClass={isAddingNew}
        />
      )}
    </div>
  );
};

export default ClassManagement;