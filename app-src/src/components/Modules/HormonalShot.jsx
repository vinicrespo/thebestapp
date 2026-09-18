import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { getHormonalCalculator } from '../../utils/protocol';
import { Droplet, Coffee, HeartPulse, Sparkles, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HormonalShot = () => {
  const navigate = useNavigate();
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
      icon: <HeartPulse size={22} />,
      title: "Desire Tonic",
      desc: "A natural aphrodisiac to support libido and relieve dryness.",
      bg: "bg-pink-50",
      color: "text-pink-500",
      border: "border-pink-100",
      ingredients: ["1/2 tsp Maca powder", "4oz warm almond milk", "Pinch of cinnamon", "Optional: 1/2 tsp honey"],
      instructions: "Froth the maca and cinnamon into the warm milk. Add honey if desired. Drink 30 minutes before intimacy or as an evening ritual.",
      tip: "Maca has been used for centuries in Peru to enhance libido and energy. It works by balancing hormones, not just masking symptoms."
    },
    {
      id: 'coffee',
      icon: <Coffee size={22} />,
      title: "Bariatric Coffee",
      desc: "A bedtime drink designed to support metabolism while you sleep.",
      bg: "bg-amber-50",
      color: "text-amber-600",
      border: "border-amber-100",
      ingredients: ["1 cup decaf coffee", "1 tsp coconut oil", "Dash of turmeric", "Pinch of cinnamon"],
      instructions: "Blend the coconut oil and spices into hot decaf coffee until frothy. Drink 1 hour before bed.",
      tip: "MCTs in coconut oil provide slow-burning fuel overnight, while turmeric reduces inflammation that causes belly fat storage."
    },
    {
      id: 'cream',
      icon: <Droplet size={22} />,
      title: "Forbidden Youth Cream",
      desc: "Stimulates collagen to help reduce sagging and wrinkles.",
      bg: "bg-purple-50",
      color: "text-purple-500",
      border: "border-purple-100",
      ingredients: ["2 tbsp Shea butter", "1 tsp Rosehip oil", "1/4 tsp Vitamin E oil"],
      instructions: "Melt shea butter slightly in your hands, mix with oils. Apply to face, neck, and any areas of concern every night before bed.",
      tip: "Rosehip oil is one of the few oils clinically shown to reduce wrinkles. Combined with Vitamin E, it creates a powerful anti-aging duo."
    },
    {
      id: 'cortisol',
      icon: <Sparkles size={22} />,
      title: "Cortisol Calmer",
      desc: "An evening tonic to lower stress hormones that cause belly fat.",
      bg: "bg-indigo-50",
      color: "text-indigo-500",
      border: "border-indigo-100",
      ingredients: ["1/2 tsp Ashwagandha powder", "1 cup warm milk (any kind)", "1/2 tsp honey", "Pinch of nutmeg"],
      instructions: "Warm the milk gently (don't boil). Stir in ashwagandha, honey, and nutmeg. Drink 30 minutes before bed.",
      tip: "Ashwagandha can reduce cortisol levels by up to 30%. High cortisol is the #1 hidden cause of belly fat in women over 40."
    }
  ];

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hormonal App</h1>
        <p className="text-gray-500 text-sm">Menopause & Hormone Support</p>
      </div>

      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl shadow-md overflow-hidden mb-6 text-white p-5 relative border border-gray-800">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A574] rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
        <h2 className="font-bold text-lg mb-3 relative z-10 text-[#D4A574]">Your Custom Dosage</h2>
        <p className="text-gray-300 text-sm leading-relaxed relative z-10 bg-white/5 p-4 rounded-xl border border-white/10">
          {dosageText}
        </p>

        <div className="mt-5 relative z-10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hormone Restoration Timeline</h3>
          <div className="flex justify-between text-[10px] font-bold text-gray-500">
            <span>Days 1-3</span>
            <span>Days 4-7</span>
            <span>Day 14+</span>
          </div>
          <div className="w-full flex h-2 rounded-full overflow-hidden mt-1 bg-white/5">
            <div className="bg-[#D4A574] w-[33%] border-r border-gray-800"></div>
            <div className="bg-[#D4A574] w-[33%] border-r border-gray-800 opacity-50"></div>
            <div className="bg-[#D4A574] w-[34%] opacity-25"></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>Hot flashes ease</span>
            <span>Energy returns</span>
            <span>Metabolism wakes</span>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-sm mb-3 px-1 flex items-center">
        Premium Recipes
      </h3>

      <div className="space-y-3">
        {recipes.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setActiveRecipe(activeRecipe === recipe.id ? null : recipe.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className={`${recipe.bg} p-3 rounded-xl ${recipe.color} flex-shrink-0 border ${recipe.border}`}>
                  {recipe.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{recipe.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{recipe.desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${activeRecipe === recipe.id ? 'rotate-90' : ''}`} />
            </button>

            {activeRecipe === recipe.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 animate-fade-in">
                <h5 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Ingredients</h5>
                <ul className="space-y-1.5 mb-4">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="text-[#5B8C5A] mt-0.5">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
                <h5 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Instructions</h5>
                <p className="text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-xl border border-gray-200 mb-3">
                  {recipe.instructions}
                </p>
                <div className="flex items-start space-x-2 bg-[#E8F0E9] p-3 rounded-xl">
                  <Lightbulb size={16} className="text-[#5B8C5A] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#3D6B3D] leading-relaxed">{recipe.tip}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HormonalShot;
