import React, { createContext, useState, useEffect } from 'react';
import { getCoordinates, getAirPollutionData } from '../utils/api';
import { useSearchHistory } from '../hooks/useSearchHistory';

export const AirQualityContext = createContext();

export const AirQualityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null); // { name, lat, lon, country }
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const { history, addSearch, clearHistory, removeSearch } = useSearchHistory();

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const fetchCityData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCoordinates(city);
      setSelectedCity(coords);
      const pollution = await getAirPollutionData(coords.lat, coords.lon);
      setAqiData(pollution);
      addSearch(coords, pollution);
    } catch (err) {
      setError(err.message || "Failed to fetch data. Please try again.");
      setAqiData(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load for a default city (e.g., London)
  useEffect(() => {
    fetchCityData('London');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AirQualityContext.Provider value={{
      selectedCity,
      aqiData,
      loading,
      error,
      theme,
      toggleTheme,
      fetchCityData,
      history,
      clearHistory,
      removeSearch
    }}>
      {children}
    </AirQualityContext.Provider>
  );
};
