import React, { Suspense, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import AQICard from '../components/AQICard';
import Pollutants from '../components/Pollutants';
import { AirQualityContext } from '../context/AirQualityContext';
import { AlertCircle, Loader2 } from 'lucide-react';

// Lazy load the chart component
const Chart = React.lazy(() => import('../components/Chart'));

const Dashboard = () => {
  const { loading, error, aqiData } = useContext(AirQualityContext);

  return (
    <main>
      <SearchBar />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 rounded-md flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Analyzing air quality...</p>
        </div>
      ) : (
        aqiData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AQICard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Pollutants />
              <Suspense fallback={
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 flex items-center justify-center h-80">
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              }>
                <Chart />
              </Suspense>
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default Dashboard;
