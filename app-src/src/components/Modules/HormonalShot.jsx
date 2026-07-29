import React, { useState, useEffect } from 'react';
import { getProfile, getProgress } from '../../utils/storage';
import { getHormonalCalculator } from '../../utils/protocol';
import { Lock, Droplet, Coffee, HeartPulse } from 'lucide-react';

const HormonalShot = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const UNLOCK_DAY = 3;

  useEffect(() => {
    setProfile(getProfile());
    setProgress(getProgress());
  }, []);

  if (!progress || !profile) return null;

  const isUnlocked = progress.currentDay >= UNLOCK_DAY;

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Lock className="text-gray-400" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Vault Locked</h2>
        <p className="text-gray-500 text-sm">
          The Hormonal Shot App unlocks on Day {UNLOCK_DAY}. Allow your gut to prime first.
        </p>
      </div>
    );
  }

  const dosageText = getHormonalCalculator(profile.weight, profile.age);

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Hormonal App</h1>
        <p className="text-gray-500 text-sm">Menopause & Estrogen Balancer</p>
      </div>

      <div className="bg-purple-900 rounded-2xl shadow-sm overflow-hidden mb-6 text-white p-6 relative">
        <Droplet className="absolute top-4 right-4 text-purple-700 opacity-50" size={64} />
        <h2 className="font-bold text-lg mb-2 relative z-10">Your Personalized Dosage</h2>
        <p className="text-purple-100 text-sm leading-relaxed relative z-10">
          {dosageText}
        </p>
      </div>

      <h3 className="font-bold text-gray-900 mb-4 px-1">Bonus Recipes</h3>
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start space-x-4">
          <div className="bg-pink-100 p-3 rounded-lg text-pink-600 flex-shrink-0">
            <HeartPulse size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Desire Tonic</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Mix 1/2 tsp Maca powder with warm almond milk and a pinch of cinnamon. Drink 30 mins before intimacy.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start space-x-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600 flex-shrink-0">
            <Coffee size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Bariatric Coffee</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Decaf coffee blended with 1 tsp coconut oil and a dash of turmeric. Boosts nighttime metabolism safely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HormonalShot;
