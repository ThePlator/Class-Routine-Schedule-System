import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaSchool, FaPhone } from 'react-icons/fa';

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>
      {isSignUp && (
        <>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="relative">
            <FaSchool className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="School Name"
              required
            />
          </div>
          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Phone Number"
              required
            />
          </div>
        </>
      )}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Password"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;