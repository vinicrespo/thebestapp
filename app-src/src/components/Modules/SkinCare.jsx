import React, { useState, useEffect } from 'react';
import { getProgress } from '../../utils/storage';
import { Lock, Sparkles, Droplets, CheckCircle } from 'lucide-react';

const SkinCare = () => {
  const [progress, setProgress] = useState(null);
  const UNLOCK_DAY = 7;

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  const isUnlocked = progress.currentDay >= UNLOCK_DAY;

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="text-gray-400" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Vault Locked</h2>
        <p className="text-gray-500 text-sm">
          The Anti-Sagging Skin Method unlocks on Day {UNLOCK_DAY}. Detox must be completed first for visible results.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Anti-Sagging Skin</h1>
        <p className="text-gray-500 text-sm">Collagen F3 Method</p>
      </div>

      <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl p-6 shadow-sm mb-6 border border-amber-200">
        <Sparkles className="text-amber-600 mb-3" size={28} />
        <h2 className="font-bold text-amber-900 text-lg mb-2">Why Skin Sags & How to Fix It</h2>
        <p className="text-sm text-amber-800/80 leading-relaxed">
          The VSL introduced you to "Collagen F3". Unlike normal collagen, F3 requires high stomach acid to absorb. Your daily AlkaLean shot primes this environment.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center">
          <Droplets size={20} className="text-blue-500 mr-2" />
          Tightening Tracker
        </h2>
        <div className="space-y-4">
          {[
            { title: "Morning Cold Rinse", desc: "Closes pores and tightens skin surface." },
            { title: "Dry Brushing", desc: "Stimulates lymphatic drainage." },
            { title: "Bone Broth / Collagen Meal", desc: "Delivers the raw building blocks." }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <CheckCircle size={20} className="text-gray-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 text-center shadow-lg">
        <h3 className="font-bold text-white mb-2">VIP Support Group</h3>
        <p className="text-gray-400 text-xs mb-4">Join 10,000+ women sharing their reset results.</p>
        <button className="w-full bg-white text-gray-900 font-bold py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default SkinCare;
