import React, { useContext } from 'react';
import { AirQualityContext } from '../context/AirQualityContext';
import { Trash2, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const { history, clearHistory, removeSearch, fetchCityData } = useContext(AirQualityContext);
  const navigate = useNavigate();

  const handleSearchAgain = (city) => {
    fetchCityData(city.name);
    navigate('/');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search History</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your recently checked locations</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 text-center border border-gray-100 dark:border-gray-700">
          <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No search history yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Locations you search for will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl ${
                  item.aqi === 1 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  item.aqi === 2 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                  item.aqi === 3 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                  item.aqi === 4 ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                  'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
                }`}>
                  {item.aqi}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    {item.city.name}
                    {item.city.country && <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{item.city.country}</span>}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button 
                  onClick={() => handleSearchAgain(item.city)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Search Again
                </button>
                <button 
                  onClick={() => removeSearch(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
