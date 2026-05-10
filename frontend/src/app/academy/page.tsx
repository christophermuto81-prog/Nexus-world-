'use client';

import Link from 'next/link';

const mainCourse = {
  title: '6-Week Practical Trading Course',
  price: 99,
  duration: '6 weeks',
  description: 'Master the fundamentals of trading with hands-on practical assignments, AI-generated lectures, and a $10 funded wallet grant upon graduation.',
  features: ['AI-generated lectures', 'Weekly quizzes (80% pass required)', 'Practical assignments', 'Soulbound NFT certificate', '$10 funded wallet grant', 'Alumni Community access'],
};

const proCourses = [
  { slug: 'mt5-automation', title: 'MT5 Automation', price: 29 },
  { slug: 'tradingview-automation', title: 'TradingView Automation', price: 29 },
  { slug: 'building-ai-scout', title: 'Building an AI Scout', price: 29 },
  { slug: 'binary-options', title: 'Binary Options', price: 29 },
  { slug: 'scalping', title: 'Scalping', price: 29 },
  { slug: 'swing-trading', title: 'Swing Trading', price: 29 },
  { slug: 'trading-psychology', title: 'Trading Psychology', price: 29 },
  { slug: 'trader-to-fund-manager', title: 'From Trader to Fund Manager', price: 29 },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#d4a853] mb-4 text-center">LatruxTrade Academy</h1>
        <p className="text-gray-400 text-center mb-12">Learn trading from AI-powered education. Graduate with a soulbound NFT certificate.</p>

        {/* Main Course */}
        <div className="border-2 border-[#d4a853] rounded-xl p-8 bg-[#0d1321] mb-12">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{mainCourse.title}</h2>
              <p className="text-gray-400 mb-4">{mainCourse.description}</p>
              <ul className="grid md:grid-cols-2 gap-2">
                {mainCourse.features.map(f => (
                  <li key={f} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-[#2ecc71]">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#d4a853]">${mainCourse.price}</p>
              <p className="text-gray-500 text-sm">{mainCourse.duration}</p>
              <button className="mt-4 px-8 py-3 bg-[#d4a853] text-black font-bold rounded-lg hover:bg-[#d4a853]/90 transition">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Professional Courses */}
        <h2 className="text-2xl font-bold text-white mb-6">Professional Courses</h2>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-400">$29 each</span>
          <span className="px-3 py-1 bg-[#d4a853]/10 border border-[#d4a853]/20 text-[#d4a853] rounded-full text-sm font-semibold">Bundle: $149 for all 8</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {proCourses.map(c => (
            <div key={c.slug} className="border border-gray-800 rounded-lg p-4 bg-[#0d1321] hover:border-[#d4a853]/30 transition">
              <h3 className="font-semibold text-white mb-2">{c.title}</h3>
              <p className="text-[#d4a853] font-bold">${c.price}</p>
              <button className="mt-3 w-full py-2 border border-[#d4a853] text-[#d4a853] rounded-lg hover:bg-[#d4a853]/10 transition text-sm">
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
