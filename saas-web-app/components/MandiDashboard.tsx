"use client";

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
      <div className="glass-tier-1 p-6 rounded-2xl glass-specular shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative z-20 delay-1 animate-glass-reveal opacity-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="flex-1 px-5 py-3 rounded-pill glass-tier-1 text-text-primary focus:outline-none apple-focus appearance-none interactive-glass [&>option]:bg-[#10121f] [&>option]:text-white"
          >
            <option value="">Select State</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={fetchPrices}
            disabled={loading || !state}
            className="px-8 py-3 glass-tier-2 bg-glassTint-mint/20 text-white font-semibold rounded-pill interactive-glass glass-specular disabled:opacity-50 text-vibrancy apple-focus"
          >
            {loading ? 'Loading...' : 'Get Prices'}
          </button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-glassTint-pink font-medium pl-4">{error}</p>
        )}
      </div>

      {/* Prices Table */}
      {prices.length > 0 && (
        <div className="glass-tier-1 p-8 rounded-2xl glass-specular shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative z-20 overflow-hidden delay-2 animate-glass-reveal opacity-0">
          <h3 className="text-2xl font-bold text-text-primary text-vibrancy mb-6 tracking-tight">
            Market Prices - {state}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase">Commodity</th>
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase">Market</th>
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase text-right">Min Price</th>
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase text-right">Max Price</th>
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase text-right">Modal Price</th>
                  <th className="py-4 px-4 text-text-secondary font-semibold text-sm tracking-wide uppercase text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {prices.map((price, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 font-semibold text-text-primary flex items-center gap-2 group-hover:text-vibrancy">
                      <div className="w-2 h-2 rounded-full bg-glassTint-mint/80"></div>
                      {price.commodity}
                    </td>
                    <td className="py-4 px-4 text-text-secondary">{price.market}</td>
                    <td className="py-4 px-4 text-right text-text-primary">₹{price.minPrice}</td>
                    <td className="py-4 px-4 text-right text-text-primary">₹{price.maxPrice}</td>
                    <td className="py-4 px-4 text-right font-bold text-text-primary text-vibrancy">
                      ₹{price.modalPrice}
                    </td>
                    <td className="py-4 px-4 text-right text-xs font-mono text-text-tertiary">
                      {price.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-text-tertiary tracking-widest uppercase font-semibold">
              Prices are in ₹ per quintal (100 kg) &nbsp;•&nbsp; Source: data.gov.in
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
