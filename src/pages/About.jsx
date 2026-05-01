import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About AirSense</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A modern, real-time dashboard for monitoring air quality across the globe.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          The Air Quality Index (AQI)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          The Air Quality Index is a standardized indicator for reporting daily air quality. It tells you how clean or polluted your air is, and what associated health effects might be a concern for you.
        </p>
        
        <div className="space-y-3">
          {[
            { level: 1, label: 'Good', color: 'bg-green-500', desc: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' },
            { level: 2, label: 'Fair', color: 'bg-yellow-400', desc: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.' },
            { level: 3, label: 'Moderate', color: 'bg-orange-500', desc: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
            { level: 4, label: 'Poor', color: 'bg-red-500', desc: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
            { level: 5, label: 'Very Poor', color: 'bg-purple-600', desc: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' },
          ].map((item) => (
            <div key={item.level} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-white font-bold text-sm ${item.color}`}>
                {item.level}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technology & Data</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          This dashboard is built using modern web technologies including React, Vite, and Tailwind CSS.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex items-center gap-2">
          Data is provided by the
          <a href="https://openweathermap.org/api/air-pollution" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1">
            OpenWeather Air Pollution API
            <ExternalLink className="w-3 h-3" />
          </a>.
        </p>
      </div>
    </div>
  );
};

export default About;
