import React, { useState, useEffect } from 'react';
import { getProgress } from '../../utils/storage';
import { Lock, ShieldCheck, CheckSquare, Square } from 'lucide-react';

const GutHealth = () => {
  const [progress, setProgress] = useState(null);
  const UNLOCK_DAY = 1;

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
          The 7X Accelerator unlocks on Day {UNLOCK_DAY} of your reset. Stick to the daily protocol!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">7X Accelerator</h1>
        <p className="text-gray-500 text-sm">Advanced Gut Health Module</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-orange-500 p-4 flex items-center space-x-3">
          <ShieldCheck className="text-white" size={24} />
          <h2 className="font-bold text-white">The Good vs. Bad Bacteria War</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            According to the Yale Study protocol, your gut lining is currently in a state of repair. The baking soda is neutralizing the acidic environment where bad bacteria (Firmicutes) thrive.
          </p>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <h3 className="font-bold text-orange-800 text-sm mb-1">Today's Actionable Tip:</h3>
            <p className="text-sm text-orange-700">
              Avoid artificial sweeteners today. They actively feed the bad bacteria we are trying to starve out.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Cellulite Reduction Checklist</h2>
        <div className="space-y-3">
          {[
            "Drink 16oz of water upon waking",
            "Consume 1 serving of fermented food",
            "Walk for 15 minutes post-dinner"
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3 cursor-pointer">
              <Square size={20} className="text-gray-300 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GutHealth;
