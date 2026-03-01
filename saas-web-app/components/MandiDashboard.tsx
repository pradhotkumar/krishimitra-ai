'use client';

import { useState } from 'react';

interface MandiPrice {
  commodity: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  lastUpdated: string;
}

const indianStates = [
  'Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 
  'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
  'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export default function MandiDashboard() {
  const [state, setState] = useState('');
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    if (!state) {
      setError('Please select a state');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/mandi?state=${encodeURIComponent(state)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch mandi prices');
      }

      setPrices(data.prices);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch mandi prices');
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* State Selector */}
      <div className="glass p-6 rounded-lg shadow-soft">
        <div className="flex gap-3">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full border border-primary/20 focus:outline-none focus:border-primary bg-white"
          >
            <option value="">Select State</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={fetchPrices}
            disabled={loading || !state}
            className="px-8 py-3 bg-primary text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Prices'}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Prices Table */}
      {prices.length > 0 && (
        <div className="glass p-8 rounded-lg shadow-soft overflow-x-auto">
          <h3 className="text-2xl font-bold text-primary mb-6">
            Market Prices - {state}
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-3 px-4 text-primary font-semibold">Commodity</th>
                <th className="text-left py-3 px-4 text-primary font-semibold">Market</th>
                <th className="text-right py-3 px-4 text-primary font-semibold">Min Price</th>
                <th className="text-right py-3 px-4 text-primary font-semibold">Max Price</th>
                <th className="text-right py-3 px-4 text-primary font-semibold">Modal Price</th>
                <th className="text-right py-3 px-4 text-primary font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr key={index} className="border-b border-primary/10 hover:bg-primary/5">
                  <td className="py-3 px-4 font-medium">{price.commodity}</td>
                  <td className="py-3 px-4 text-text/70">{price.market}</td>
                  <td className="py-3 px-4 text-right">₹{price.minPrice}</td>
                  <td className="py-3 px-4 text-right">₹{price.maxPrice}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">
                    ₹{price.modalPrice}
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-text/60">
                    {price.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-text/50 text-center">
            Prices are in ₹ per quintal (100 kg). Data source: data.gov.in
          </p>
        </div>
      )}
    </div>
  );
}
