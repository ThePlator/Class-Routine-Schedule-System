"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForms';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleAuth = (email: string, password: string) => {
    // In a real app, you'd validate credentials here
    // For this example, we'll just set a dummy token
    localStorage.setItem('authToken', 'dummyToken');
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
          <AuthForm isSignUp={isSignUp} onSubmit={handleAuth} />
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition duration-300 ease-in-out"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}