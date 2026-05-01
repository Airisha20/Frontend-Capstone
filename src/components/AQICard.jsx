import React, { useContext } from 'react';
import { AirQualityContext } from '../context/AirQualityContext';
import { Wind } from 'lucide-react';

const aqiLabels = {
  1: { label: 'Good', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-500', message: 'Air is safe. Enjoy your outdoor activities!' },
  2: { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-400', message: 'Air quality is acceptable. Unusually sensitive individuals should consider limiting prolonged outdoor exertion.' },
  3: { label: 'Moderate', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', border: 'border-orange-500', message: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
  4: { label: 'Poor', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-500', message: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
  5: { label: 'Very Poor', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-600 dark:border-purple-400', message: 'Health warnings of emergency conditions. The entire population is more likely to be affected. Stay indoors.' }
};

const AQICard = () => {
  const { aqiData, selectedCity } = useContext(AirQualityContext);

  if (!aqiData || !selectedCity) return null;

  const aqi = aqiData.main.aqi;
  const { label, color, bg, border, message } = aqiLabels[aqi];

  return (
    <div className={`p-6 rounded-2xl shadow-lg border-l-4 ${border} bg-white dark:bg-gray-800 transition-colors duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {selectedCity.name}
            {selectedCity.country && <span className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{selectedCity.country}</span>}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date(aqiData.dt * 1000).toLocaleString()}
          </p>
        </div>
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${bg}`}>
          <Wind className={`w-8 h-8 ${color}`} />
        </div>
      </div>
      
      <div className="mt-8 flex items-end gap-4">
        <div className="text-5xl font-black text-gray-900 dark:text-white">
          {aqi}
        </div>
        <div className={`text-xl font-semibold mb-1 ${color}`}>
          {label}
        </div>
      </div>
      
      <div className={`mt-6 p-4 rounded-lg ${bg}`}>
        <p className={`text-sm md:text-base font-medium text-gray-800 dark:text-gray-200`}>
          <strong>Health Insight:</strong> {message}
        </p>
      </div>
    </div>
  );
};

export default AQICard;
