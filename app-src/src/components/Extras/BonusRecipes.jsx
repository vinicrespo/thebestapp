import React, { useState } from 'react';
import { BONUS_RECIPES } from '../../utils/protocol';
import { UtensilsCrossed, Clock, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BonusRecipes = () => {
  const navigate = useNavigate();
  const [activeRecipe, setActiveRecipe] = useState(null);

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const categoryColors = {
    Breakfast: 'bg-amber-50 text-amber-600 border-amber-200',
    Lunch: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Dinner: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    Snack: 'bg-rose-50 text-rose-500 border-rose-200',
  };

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <UtensilsCrossed size={24} className="text-orange-500 mr-2" /> Bonus Recipes
        </h1>
        <p className="text-gray-500 text-sm mt-1">Meals that complement your protocol perfectly</p>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 mb-5 border border-orange-200">
        <p className="text-sm text-orange-800 font-medium">
          🎁 These recipes are designed to work WITH your daily shots — boosting their effectiveness while keeping you satisfied and nourished.
        </p>
      </div>

      <div className="space-y-4">
        {BONUS_RECIPES.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setActiveRecipe(activeRecipe === recipe.id ? null : recipe.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${categoryColors[recipe.category]}`}>
                  {recipe.category}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm">{recipe.title}</h4>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <Clock size={11} className="text-gray-400" />
                    <span className="text-[11px] text-gray-400">{recipe.time}</span>
                  </div>
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

                <h5 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">How to Make</h5>
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

export default BonusRecipes;
