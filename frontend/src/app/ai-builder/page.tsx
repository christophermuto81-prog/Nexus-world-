'use client';

import { useState } from 'react';

const tiers = [
  { id: 'BUILDER_STARTER', name: 'Starter', price: 19, filters: 5, gpuCredits: 100 },
  { id: 'BUILDER_PRO', name: 'Pro', price: 49, filters: 10, gpuCredits: 500 },
  { id: 'BUILDER_ENTERPRISE', name: 'Enterprise', price: 99, filters: 14, gpuCredits: 2000 },
];

const level1Filters = ['RSI', 'MACD', 'Bollinger Bands', 'EMA Cross', 'Fibonacci', 'Ichimoku', 'Volume Profile', 'ATR', 'Stochastic', 'ADX', 'Parabolic SAR', 'VWAP', 'Supertrend', 'Pivot Points'];

export default function AiBuilderPage() {
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleFilter = (f: string) => {
    if (selectedFilters.includes(f)) {
      setSelectedFilters(selectedFilters.filter(x => x !== f));
    } else if (selectedFilters.length < selectedTier.filters) {
      setSelectedFilters([...selectedFilters, f]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#d4a853] mb-4 text-center">Static AI Builder</h1>
        <p className="text-gray-400 text-center mb-2">Build your own trading strategy using Level 1 technical filters.</p>
        <p className="text-yellow-600 text-center text-sm mb-12 italic">
          This builder uses only Level 1 Executor filters. It does not include the autonomous AI core, esoteric filters, or proprietary intelligence.
        </p>

        {/* Progress Steps */}
        <div className="flex justify-center gap-2 mb-12">
          {[1,2,3,4,5,6].map(s => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-[#d4a853] text-black' : 'bg-gray-800 text-gray-500'}`}>
              {s}
            </div>
          ))}
        </div>

        {/* Tier Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map(t => (
            <button
              key={t.id}
              onClick={() => { setSelectedTier(t); setSelectedFilters([]); }}
              className={`p-6 rounded-xl border text-left transition ${selectedTier.id === t.id ? 'border-[#d4a853] bg-[#d4a853]/10' : 'border-gray-800 bg-[#0d1321]'}`}
            >
              <h3 className="text-lg font-bold text-white">{t.name}</h3>
              <p className="text-3xl font-bold text-[#d4a853] my-2">${t.price}<span className="text-sm text-gray-500">/mo</span></p>
              <p className="text-gray-400 text-sm">Up to {t.filters} filters</p>
              <p className="text-gray-400 text-sm">{t.gpuCredits} GPU credits</p>
            </button>
          ))}
        </div>

        {/* Filter Selection */}
        <h2 className="text-xl font-bold mb-4">Select Filters ({selectedFilters.length}/{selectedTier.filters})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {level1Filters.map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`p-3 rounded-lg text-sm font-medium transition ${selectedFilters.includes(f) ? 'bg-[#d4a853] text-black' : 'bg-[#0d1321] border border-gray-800 text-gray-300 hover:border-[#d4a853]/30'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={() => setStep(Math.min(step + 1, 6))}
          disabled={selectedFilters.length === 0}
          className="w-full py-4 bg-[#d4a853] text-black font-bold rounded-lg hover:bg-[#d4a853]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step < 6 ? 'Next Step' : 'Build Strategy'}
        </button>
      </div>
    </div>
  );
}
