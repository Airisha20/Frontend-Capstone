import React, { useContext } from 'react';
import { AirQualityContext } from '../context/AirQualityContext';

const PollutantItem = ({ label, value, unit, description }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1" title={description}>{label}</div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white">
      {value} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{unit}</span>
    </div>
  </div>
);

const Pollutants = () => {
  const { aqiData } = useContext(AirQualityContext);

  if (!aqiData) return null;

  const { pm2_5, pm10, co, no2, o3, so2 } = aqiData.components;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pollutant Concentration</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <PollutantItem label="PM2.5" value={pm2_5} unit="μg/m³" description="Fine particles matter" />
        <PollutantItem label="PM10" value={pm10} unit="μg/m³" description="Coarse particulate matter" />
        <PollutantItem label="CO" value={co} unit="μg/m³" description="Carbon monoxide" />
        <PollutantItem label="NO₂" value={no2} unit="μg/m³" description="Nitrogen dioxide" />
        <PollutantItem label="O₃" value={o3} unit="μg/m³" description="Ozone" />
        <PollutantItem label="SO₂" value={so2} unit="μg/m³" description="Sulphur dioxide" />
      </div>
    </div>
  );
};

export default Pollutants;
