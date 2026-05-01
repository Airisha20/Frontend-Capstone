const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getCoordinates(city) {
  if (!API_KEY) throw new Error("API Key is missing.");
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch coordinates");
  const data = await response.json();
  if (!data || data.length === 0) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, country: data[0].country };
}

export async function getAirPollutionData(lat, lon) {
  if (!API_KEY) throw new Error("API Key is missing.");
  const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch air pollution data");
  const data = await response.json();
  if (!data || !data.list || data.list.length === 0) throw new Error("No air quality data available");
  return data.list[0];
}
