import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import SubjectModal from './SubjectModal';

interface Subject {
  id: number;
  name: string;
  code: string;
  department: string;
  credits: number;
  description: string;
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Mathematics', code: 'MATH101', department: 'Science', credits: 3, description: 'Introduction to Calculus' },
    { id: 2, name: 'English Literature', code: 'ENG201', department: 'Arts', credits: 4, description: 'Study of classic literature' },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddSubject = (newSubject: Omit<Subject, 'id'>) => {
    const subjectWithId = { ...newSubject, id: Date.now() };
    setSubjects(prev => [...prev, subjectWithId]);
    setIsAddingNew(false);
  };

  const handleUpdateSubject = (updatedSubject: Subject) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Manage Subjects</h2>
      
      {/* Subject List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Subject List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-600">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Code</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Department</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Credits</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => (
                <tr key={subject.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    <button 
                      onClick={() => setSelectedSubject(subject)}
                      className="hover:underline focus:outline-none"
                    >
                      {subject.name}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{subject.code}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{subject.department}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{subject.credits}</td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => setSelectedSubject(subject)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteSubject(subject.id)}
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

      {/* Add New Subject Button */}
      <div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Add New Subject
        </button>
      </div>

      {/* Subject Modal */}
      {(selectedSubject || isAddingNew) && (
        <SubjectModal
          subject={selectedSubject}
          onClose={() => {
            setSelectedSubject(null);
            setIsAddingNew(false);
          }}
          onUpdate={handleUpdateSubject}
          onAdd={handleAddSubject}
          isNewSubject={isAddingNew}
        />
      )}
    </div>
  );
};

export default SubjectManagement;