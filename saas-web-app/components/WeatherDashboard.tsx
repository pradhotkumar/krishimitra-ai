"use client";

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
      <div className="glass-tier-1 p-6 rounded-2xl glass-specular shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative z-20 delay-1 animate-glass-reveal opacity-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            placeholder="Enter your region (e.g., Delhi, Mumbai, Pune)"
            className="flex-1 px-5 py-3 rounded-pill glass-tier-1 text-text-primary placeholder:text-text-tertiary focus:outline-none apple-focus transition-all interactive-glass"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-8 py-3 glass-tier-2 bg-glassTint-blue/20 text-text-primary font-semibold rounded-pill interactive-glass glass-specular disabled:opacity-50 text-vibrancy apple-focus"
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-glassTint-pink font-medium pl-4">{error}</p>
        )}
      </div>

      {/* Current Weather */}
      {weather && (
        <div className="glass-tier-1 p-8 rounded-2xl glass-specular shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative z-20 delay-2 animate-glass-reveal opacity-0">
          <h3 className="text-2xl font-bold text-text-primary text-vibrancy mb-6 tracking-tight">Current Weather - {region}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-tier-2 p-6 rounded-xl text-center glass-specular interactive-glass">
              <div className="text-4xl mb-3 drop-shadow-md">🌡️</div>
              <p className="text-4xl font-bold text-text-primary text-vibrancy">{weather.temperature}°C</p>
              <p className="text-sm text-text-secondary mt-1 tracking-wide font-medium">Temperature</p>
            </div>
            <div className="glass-tier-2 p-6 rounded-xl text-center glass-specular interactive-glass">
              <div className="text-4xl mb-3 drop-shadow-md">💧</div>
              <p className="text-4xl font-bold text-text-primary text-vibrancy">{weather.humidity}%</p>
              <p className="text-sm text-text-secondary mt-1 tracking-wide font-medium">Humidity</p>
            </div>
            <div className="glass-tier-2 p-6 rounded-xl text-center glass-specular interactive-glass">
              <div className="text-4xl mb-3 drop-shadow-md">🌧️</div>
              <p className="text-4xl font-bold text-text-primary text-vibrancy">{weather.rainfall}<span className="text-lg">mm</span></p>
              <p className="text-sm text-text-secondary mt-1 tracking-wide font-medium">Rainfall</p>
            </div>
            <div className="glass-tier-2 p-6 rounded-xl text-center glass-specular interactive-glass">
              <div className="text-4xl mb-3 drop-shadow-md">💨</div>
              <p className="text-4xl font-bold text-text-primary text-vibrancy">{weather.windSpeed} <span className="text-lg">km/h</span></p>
              <p className="text-sm text-text-secondary mt-1 tracking-wide font-medium">Wind Speed</p>
            </div>
          </div>

          <div className="mt-8 text-center bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-xl capitalize text-text-primary text-vibrancy font-medium">{weather.description}</p>
            <p className="text-xs text-text-tertiary mt-2 uppercase tracking-widest font-semibold">
              Last updated: {new Date(weather.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Forecast */}
      {forecast.length > 0 && (
        <div className="glass-tier-1 p-8 rounded-2xl glass-specular shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative z-20 delay-3 animate-glass-reveal opacity-0">
          <h3 className="text-2xl font-bold text-text-primary text-vibrancy mb-6 tracking-tight">24-Hour Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.slice(0, 4).map((item, index) => (
              <div key={index} className="glass-tier-2 p-5 rounded-xl text-center glass-specular interactive-glass hover:-translate-y-1 transition-transform">
                <p className="text-sm text-text-secondary mb-3 font-medium">
                  {new Date(item.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-3xl font-bold text-text-primary text-vibrancy mb-2">{item.temperature}°</p>
                <p className="text-sm capitalize text-text-primary/90">{item.description}</p>
                {item.rainfall > 0 && (
                  <p className="text-xs text-glassTint-blue font-semibold mt-2 drop-shadow-sm">🌧️ {item.rainfall}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
