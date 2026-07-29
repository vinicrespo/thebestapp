import React, { useState } from 'react';
import { Sparkles, Droplets, CheckCircle, Flame, MessageCircle, AlertCircle } from 'lucide-react';

const SkinCare = () => {
  const [completedActions, setCompletedActions] = useState({
    rinse: false,
    brush: false,
    meal: false
  });

  const toggleAction = (action) => {
    setCompletedActions(prev => ({ ...prev, [action]: !prev[action] }));
  };

  return (
    <div className="p-6 pb-24">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Anti-Sagging Skin</h1>
        <p className="text-gray-500 text-sm">Collagen F3 Method</p>
      </div>

      {/* The F3 Concept with Visual Diagram */}
      <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-6 shadow-sm mb-6 border border-orange-200 overflow-hidden relative">
        <Sparkles className="text-orange-600 mb-3" size={32} />
        <h2 className="font-bold text-orange-900 text-xl mb-3">The F3 Architecture</h2>
        
        {/* CSS Diagram of F3 Collagen */}
        <div className="bg-white/80 p-4 rounded-xl mb-4 flex items-center justify-between border border-orange-200">
          <div className="flex flex-col items-center space-y-1 w-1/3">
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <span className="text-[9px] font-bold text-gray-500 text-center mt-1">Normal Collagen (Weak)</span>
          </div>
          <div className="text-orange-500 font-bold text-lg">➔</div>
          <div className="flex flex-col items-center space-y-1 w-1/3 relative">
            <div className="w-full h-2 bg-orange-500 rounded-full transform rotate-2 absolute top-2"></div>
            <div className="w-full h-2 bg-purple-600 rounded-full transform -rotate-2 absolute top-2"></div>
            <div className="w-full h-2 bg-orange-400 rounded-full mt-4"></div>
            <span className="text-[9px] font-bold text-orange-800 text-center mt-2">Collagen F3 (Interlocked)</span>
          </div>
        </div>

        <p className="text-sm text-orange-800/90 leading-relaxed mb-4">
          When you lose fat quickly, the skin stays loose because normal collagen breaks down. The AlkaLean shot primes your stomach acid to naturally synthesize interlocking <strong>Collagen F3</strong> internally.
        </p>
        <div className="bg-white/60 p-3 rounded-xl border border-orange-200 text-xs text-orange-900">
          <p className="flex items-start font-medium">
            <AlertCircle size={14} className="mr-2 mt-0.5 flex-shrink-0" />
            Most creams use the wrong type of collagen. F3 must be built from the inside out.
          </p>
        </div>
      </div>

      {/* Tightening Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-lg flex items-center">
            <Droplets size={24} className="text-purple-900 mr-2" />
            Daily Tracker
          </h2>
          <span className="text-xs font-bold text-gray-400">
            {Object.values(completedActions).filter(Boolean).length}/3 Done
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Check off these physical actions daily to accelerate skin retraction while F3 builds.
        </p>

        <div className="space-y-3">
          {[
            { 
              id: 'rinse',
              title: "Morning Cold Rinse", 
              desc: "Closes pores and instantly triggers vasoconstriction.",
              icon: <Droplets size={20} className={completedActions.rinse ? "text-white" : "text-blue-500"} />
            },
            { 
              id: 'brush',
              title: "Dry Brushing", 
              desc: "Brush upwards toward the heart to stimulate drainage.",
              icon: <Flame size={20} className={completedActions.brush ? "text-white" : "text-orange-500"} />
            },
            { 
              id: 'meal',
              title: "F3 Amino Meal", 
              desc: "Consume real bone broth or slow-cooked meats.",
              icon: <CheckCircle size={20} className={completedActions.meal ? "text-white" : "text-purple-900"} />
            }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => toggleAction(item.id)}
              className={`w-full flex items-start space-x-4 p-4 rounded-xl border transition-all text-left ${
                completedActions[item.id] 
                  ? 'bg-purple-900 border-purple-900 shadow-lg shadow-purple-900/30' 
                  : 'bg-gray-50 border-gray-100 hover:border-purple-200'
              }`}
            >
              <div className={`mt-1 p-2 rounded-lg flex-shrink-0 transition-colors ${
                completedActions[item.id] ? 'bg-purple-800' : 'bg-white shadow-sm border border-gray-100'
              }`}>
                {item.icon}
              </div>
              <div>
                <h4 className={`font-bold text-sm mb-1 ${completedActions[item.id] ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed ${completedActions[item.id] ? 'text-purple-200' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkinCare;
