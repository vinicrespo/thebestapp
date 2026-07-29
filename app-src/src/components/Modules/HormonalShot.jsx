import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { getHormonalCalculator } from '../../utils/protocol';
import { Droplet, Coffee, HeartPulse, Sparkles } from 'lucide-react';

const HormonalShot = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  if (!profile) return null;

  const dosageText = getHormonalCalculator(profile.weight, profile.age);

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Hormonal App</h1>
        <p className="text-gray-500 text-sm">Menopause & Estrogen Balancer</p>
      </div>

      <div className="bg-purple-900 rounded-2xl shadow-md overflow-hidden mb-8 text-white p-6 relative border border-purple-800">
        <Droplet className="absolute -top-4 -right-4 text-purple-700 opacity-40" size={120} />
        <h2 className="font-bold text-xl mb-3 relative z-10 text-orange-500">Your Custom Dosage</h2>
        <p className="text-purple-100 text-sm leading-relaxed relative z-10 bg-purple-950/50 p-4 rounded-xl border border-purple-800 backdrop-blur-sm">
          {dosageText}
        </p>
        <p className="text-xs text-purple-300 mt-4 relative z-10">
          * Mix this dosage with 4oz of warm water before bed to naturally activate female hormone receptors and restore estrogen balance.
        </p>
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-4 px-1 flex items-center">
        <Sparkles className="text-orange-500 mr-2" size={20} /> Premium Recipes
      </h3>
      <div className="space-y-4">
        
        {/* Desire Tonic */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-pink-100 p-2.5 rounded-lg text-pink-600 flex-shrink-0">
              <HeartPulse size={20} />
            </div>
            <h4 className="font-bold text-gray-900">Desire Tonic</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            A natural aphrodisiac designed to increase libido, improve sensitivity, and relieve vaginal dryness.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-700 space-y-1">
            <p><strong>Ingredients:</strong> 1/2 tsp Maca powder, 4oz warm almond milk, pinch of cinnamon.</p>
            <p><strong>Instructions:</strong> Froth together. Drink 30 mins before intimacy.</p>
          </div>
        </div>

        {/* Bariatric Coffee */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 flex-shrink-0">
              <Coffee size={20} />
            </div>
            <h4 className="font-bold text-gray-900">Bariatric Coffee</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            A 100% safe bedtime drink designed to support metabolism and help your body burn fat while you sleep.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-700 space-y-1">
            <p><strong>Ingredients:</strong> 1 cup decaf coffee, 1 tsp coconut oil, dash of turmeric.</p>
            <p><strong>Instructions:</strong> Blend until frothy. Drink 1 hour before bed.</p>
          </div>
        </div>

        {/* Forbidden Youth Cream */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600 flex-shrink-0">
              <Droplet size={20} />
            </div>
            <h4 className="font-bold text-gray-900">Forbidden Youth Cream</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            Stimulates collagen production to help reduce skin sagging, wrinkles, crow's feet, and expression lines.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-700 space-y-1">
            <p><strong>Ingredients:</strong> 2 tbsp Shea butter, 1 tsp Rosehip oil, 1/4 tsp Vitamin E oil.</p>
            <p><strong>Instructions:</strong> Melt shea butter slightly, mix oils. Apply to face and neck nightly.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HormonalShot;
