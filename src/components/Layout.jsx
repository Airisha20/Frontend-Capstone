import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      <div className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
