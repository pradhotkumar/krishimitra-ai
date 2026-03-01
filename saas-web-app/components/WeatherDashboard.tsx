'use client';

import { useState } from 'react';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
  lastUpdated: string;
}

interface ForecastItem {
  time: string;
  temperature: number;
  description: string;
  rainfall: number;
}

export default function WeatherDashboard() {
  const [region, setRegion] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!region.trim()) {
      setError('Please enter a region name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/weather?region=${encodeURIComponent(region)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      setWeather(data.current);
      setForecast(data.forecast);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="glass p-6 rounded-lg shadow-soft">
        <div className="flex gap-3">
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            placeholder="Enter your region (e.g., Delhi, Mumbai, Pune)"
            className="flex-1 px-4 py-3 rounded-full border border-primary/20 focus:outline-none focus:border-primary"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-8 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Current Weather */}
      {weather && (
        <div className="glass p-8 rounded-lg shadow-soft">
          <h3 className="text-2xl font-bold text-primary mb-6">Current Weather - {region}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🌡️</div>
              <p className="text-3xl font-bold text-primary">{weather.temperature}°C</p>
              <p className="text-sm text-text/60">Temperature</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💧</div>
              <p className="text-3xl font-bold text-primary">{weather.humidity}%</p>
              <p className="text-sm text-text/60">Humidity</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🌧️</div>
              <p className="text-3xl font-bold text-primary">{weather.rainfall}mm</p>
              <p className="text-sm text-text/60">Rainfall</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💨</div>
              <p className="text-3xl font-bold text-primary">{weather.windSpeed} km/h</p>
              <p className="text-sm text-text/60">Wind Speed</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg capitalize text-text/70">{weather.description}</p>
            <p className="text-xs text-text/50 mt-2">
              Last updated: {new Date(weather.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Forecast */}
      {forecast.length > 0 && (
        <div className="glass p-8 rounded-lg shadow-soft">
          <h3 className="text-2xl font-bold text-primary mb-6">24-Hour Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.slice(0, 4).map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-soft text-center">
                <p className="text-sm text-text/60 mb-2">
                  {new Date(item.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-2xl font-bold text-primary mb-1">{item.temperature}°C</p>
                <p className="text-xs capitalize text-text/70">{item.description}</p>
                {item.rainfall > 0 && (
                  <p className="text-xs text-blue-600 mt-1">🌧️ {item.rainfall}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
