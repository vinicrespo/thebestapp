import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { getHormonalCalculator } from '../../utils/protocol';
import { Droplet, Coffee, HeartPulse, Sparkles, ChevronRight } from 'lucide-react';

const HormonalShot = () => {
  const [profile, setProfile] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  if (!profile) return null;

  const dosageText = getHormonalCalculator(profile.weight, profile.age);

  const recipes = [
    {
      id: 'desire',
      icon: <HeartPulse size={24} />,
      title: "Desire Tonic",
      desc: "A natural aphrodisiac designed to increase libido and relieve vaginal dryness.",
      bg: "bg-pink-100",
      color: "text-pink-600",
      ingredients: ["1/2 tsp Maca powder", "4oz warm almond milk", "Pinch of cinnamon"],
      instructions: "Froth the maca and cinnamon into the warm milk. Drink 30 minutes before intimacy."
    },
    {
      id: 'coffee',
      icon: <Coffee size={24} />,
      title: "Bariatric Coffee",
      desc: "A 100% safe bedtime drink designed to support metabolism while you sleep.",
      bg: "bg-amber-100",
      color: "text-amber-600",
      ingredients: ["1 cup decaf coffee", "1 tsp coconut oil", "Dash of turmeric"],
      instructions: "Blend the coconut oil into hot decaf coffee until frothy. Drink 1 hour before bed."
    },
    {
      id: 'cream',
      icon: <Droplet size={24} />,
      title: "Forbidden Youth Cream",
      desc: "Stimulates collagen production to help reduce skin sagging and wrinkles.",
      bg: "bg-purple-100",
      color: "text-purple-600",
      ingredients: ["2 tbsp Shea butter", "1 tsp Rosehip oil", "1/4 tsp Vitamin E oil"],
      instructions: "Melt shea butter slightly in your hands, mix with oils. Apply to face and neck nightly."
    }
  ];

  return (
    <div className="p-6 pb-24">
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
        
        <div className="mt-6 relative z-10">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Estrogen Restoration Timeline</h3>
          <div className="flex justify-between text-[10px] font-bold text-purple-200">
            <span>Days 1-3</span>
            <span>Days 4-7</span>
            <span>Day 14+</span>
          </div>
          <div className="w-full flex h-2 rounded-full overflow-hidden mt-1 bg-purple-950">
            <div className="bg-orange-500 w-[33%] border-r border-purple-900"></div>
            <div className="bg-orange-400 w-[33%] border-r border-purple-900 opacity-50"></div>
            <div className="bg-orange-300 w-[34%] opacity-25"></div>
          </div>
          <div className="flex justify-between text-[10px] text-purple-400 mt-1">
            <span>Hot flashes drop</span>
            <span>Energy returns</span>
            <span>Metabolism unlocks</span>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-4 px-1 flex items-center">
        <Sparkles className="text-orange-500 mr-2" size={20} /> Premium Recipes
      </h3>
      
      <div className="space-y-4">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button 
              onClick={() => setActiveRecipe(activeRecipe === recipe.id ? null : recipe.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`${recipe.bg} p-3 rounded-xl ${recipe.color} flex-shrink-0`}>
                  {recipe.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{recipe.title}</h4>
                  <p className="text-xs text-gray-500 truncate w-48">{recipe.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className={`text-gray-400 transition-transform ${activeRecipe === recipe.id ? 'rotate-90' : ''}`} />
            </button>
            
            {activeRecipe === recipe.id && (
              <div className="p-5 bg-gray-50 border-t border-gray-100">
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Ingredients</h5>
                <ul className="list-disc pl-5 mb-4 text-sm text-gray-600 space-y-1">
                  {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
                <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Instructions</h5>
                <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded-lg border border-gray-200">
                  {recipe.instructions}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HormonalShot;
