import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Wind, Clock, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Wind className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">AirSense</span>
          </div>
          
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({isActive}) => `flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Wind className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </NavLink>
            <NavLink 
              to="/history" 
              className={({isActive}) => `flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => `flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </NavLink>
            <div className="ml-2 pl-4 border-l border-gray-300 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
