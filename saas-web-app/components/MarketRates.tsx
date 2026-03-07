'use client';

import { TrendingUp, TrendingDown, MapPin, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface MarketRate {
  crop: string;
  price: number;
  unit: string;
  change: number;
  market: string;
  icon: string;
}

export default function MarketRates() {
  const [selectedMarket, setSelectedMarket] = useState('Bangalore APMC');
  const [rates, setRates] = useState<MarketRate[]>([
    { crop: 'Rice', price: 2100, unit: 'per quintal', change: 2.5, market: 'Bangalore APMC', icon: '🌾' },
    { crop: 'Wheat', price: 2250, unit: 'per quintal', change: -1.2, market: 'Bangalore APMC', icon: '🌾' },
    { crop: 'Tomato', price: 25, unit: 'per kg', change: 5.8, market: 'Bangalore APMC', icon: '🍅' },
    { crop: 'Onion', price: 18, unit: 'per kg', change: -3.4, market: 'Bangalore APMC', icon: '🧅' },
    { crop: 'Potato', price: 22, unit: 'per kg', change: 1.5, market: 'Bangalore APMC', icon: '🥔' },
    { crop: 'Cotton', price: 6800, unit: 'per quintal', change: 4.2, market: 'Bangalore APMC', icon: '🌱' },
    { crop: 'Sugarcane', price: 3200, unit: 'per ton', change: 0.8, market: 'Bangalore APMC', icon: '🎋' },
    { crop: 'Chilli', price: 85, unit: 'per kg', change: -2.1, market: 'Bangalore APMC', icon: '🌶️' }
  ]);

  const markets = ['Bangalore APMC', 'Mumbai APMC', 'Delhi APMC', 'Chennai APMC', 'Kolkata APMC'];

  const handleRefresh = () => {
    // Simulate price refresh
    setRates(prev => prev.map(rate => ({
      ...rate,
      price: rate.price + (Math.random() - 0.5) * 100,
      change: (Math.random() - 0.5) * 10
    })));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-100">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-xl text-gray-800">📊 Live Market Rates</h2>
          <button
            onClick={handleRefresh}
            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
            title="Refresh Rates"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Market Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
          >
            {markets.map(market => (
              <option key={market} value={market}>{market}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rates Grid */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {rates.map((rate, idx) => (
            <div
              key={idx}
              className="border-2 border-gray-100 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{rate.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{rate.crop}</h3>
                    <p className="text-xs text-gray-500">{rate.unit}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  rate.change >= 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {rate.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(rate.change).toFixed(1)}%
                </div>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  ₹{rate.price.toFixed(0)}
                </span>
                <span className="text-sm text-gray-500">
                  {rate.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Last updated: {new Date().toLocaleTimeString('en-IN')}
        </div>
      </div>
    </div>
  );
}
