import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="mb-2 sm:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-center sm:text-left">
              Made with <span className="text-red-500">❤</span> by Team_parallax
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;