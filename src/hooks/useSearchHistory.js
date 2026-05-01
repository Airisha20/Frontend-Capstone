import { useState, useEffect } from 'react';

const HISTORY_KEY = 'airQualitySearchHistory';
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const item = localStorage.getItem(HISTORY_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error("Error reading localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  }, [history]);

  const addSearch = (cityCoords, aqiData) => {
    setHistory((prev) => {
      // Remove if it already exists to move it to the top
      const filtered = prev.filter(item => item.city.name !== cityCoords.name || item.city.country !== cityCoords.country);
      
      const newEntry = {
        id: Date.now().toString(),
        city: cityCoords,
        aqi: aqiData.main.aqi,
        timestamp: new Date().toISOString()
      };
      
      return [newEntry, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeSearch = (id) => {
    setHistory((prev) => prev.filter(item => item.id !== id));
  };

  return { history, addSearch, clearHistory, removeSearch };
}
