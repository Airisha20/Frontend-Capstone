import React, { useState, useEffect, useContext } from 'react';
import { Search } from 'lucide-react';
import { AirQualityContext } from '../context/AirQualityContext';
import { useDebounce } from '../utils/debounce';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { fetchCityData } = useContext(AirQualityContext);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchCityData(debouncedSearchTerm.trim());
    }
  }, [debouncedSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchCityData(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 dark:text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 transition-colors"
        />
      </div>
    </form>
  );
};

export default SearchBar;
