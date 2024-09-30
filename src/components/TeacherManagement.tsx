import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import TeacherModal from './TeacherModal';

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

const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'John Doe', subject: 'Mathematics', email: 'john@example.com', address: '123 Main St, City, Country', phoneNumber: '+1 234 567 8900', department: 'Science', joinDate: '2022-01-15' },
    { id: 2, name: 'Jane Smith', subject: 'English', email: 'jane@example.com', address: '456 Elm St, Town, Country', phoneNumber: '+1 234 567 8901', department: 'Arts', joinDate: '2021-08-22' },
  ]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddTeacher = (newTeacher: Omit<Teacher, 'id'>) => {
    const teacherWithId = { ...newTeacher, id: Date.now() };
    setTeachers(prev => [...prev, teacherWithId]);
    setIsAddingNew(false);
  };

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === updatedTeacher.id ? updatedTeacher : teacher
    ));
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Manage Teachers</h2>
      
      {/* Teacher List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Teacher List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Subject</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Department</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    <button 
                      onClick={() => setSelectedTeacher(teacher)}
                      className="hover:underline focus:outline-none"
                    >
                      {teacher.name}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{teacher.subject}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{teacher.email}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{teacher.department}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTeacher(teacher.id)}
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

      {/* Add New Teacher Button */}
      <div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Add New Teacher
        </button>
      </div>

      {/* Teacher Modal */}
      {(selectedTeacher || isAddingNew) && (
        <TeacherModal
          teacher={selectedTeacher}
          onClose={() => {
            setSelectedTeacher(null);
            setIsAddingNew(false);
          }}
          onUpdate={handleUpdateTeacher}
          onAdd={handleAddTeacher}
          isNewTeacher={isAddingNew}
        />
      )}
    </div>
  );
};

export default TeacherManagement;