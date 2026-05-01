import React, { useContext } from 'react';
import { AirQualityContext } from '../context/AirQualityContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Chart = () => {
  const { aqiData, theme } = useContext(AirQualityContext);

  if (!aqiData) return null;

  const { pm2_5, pm10, co, no2, o3, so2 } = aqiData.components;
  
  // Normalize data slightly for visualization or just show raw (CO is usually much higher so we might need log scale or separate chart, but we'll show raw for prototype)
  // Scaling down CO just for visual balance in this prototype, usually it's in a different order of magnitude
  const data = [
    { name: 'PM2.5', value: pm2_5, color: '#ef4444' }, // red
    { name: 'PM10', value: pm10, color: '#f97316' },  // orange
    { name: 'NO₂', value: no2, color: '#eab308' },    // yellow
    { name: 'O₃', value: o3, color: '#3b82f6' },      // blue
    { name: 'SO₂', value: so2, color: '#a855f7' },    // purple
  ];

  const textColor = theme === 'dark' ? '#9ca3af' : '#4b5563'; // gray-400 : gray-600
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb'; // gray-700 : gray-200

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 transition-colors duration-200 h-80">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison (μg/m³)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="name" stroke={textColor} tick={{fill: textColor}} axisLine={false} tickLine={false} />
          <YAxis stroke={textColor} tick={{fill: textColor}} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{fill: theme === 'dark' ? '#374151' : '#f3f4f6'}}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              borderRadius: '0.5rem'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
