import React, { useState, useEffect } from 'react';
import { Sparkles, Droplets, CheckCircle, Flame, AlertCircle, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkinCare = () => {
  const navigate = useNavigate();
  const [completedActions, setCompletedActions] = useState(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = JSON.parse(localStorage.getItem('alkalean_skin_tracker') || '{}');
      return saved.date === today ? saved.actions : { rinse: false, brush: false, meal: false };
    } catch { return { rinse: false, brush: false, meal: false }; }
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('alkalean_skin_tracker', JSON.stringify({ date: today, actions: completedActions }));
  }, [completedActions]);

  const toggleAction = (action) => {
    setCompletedActions(prev => ({ ...prev, [action]: !prev[action] }));
  };

  const completedCount = Object.values(completedActions).filter(Boolean).length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Anti-Sagging Skin</h1>
        <p className="text-gray-500 text-sm">Collagen F3 Method</p>
      </div>

      {/* The F3 Concept */}
      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 shadow-sm mb-5 border border-[#D4A574]/20 overflow-hidden relative">
        <Sparkles className="text-[#D4A574] mb-3" size={28} />
        <h2 className="font-bold text-gray-900 text-lg mb-3">The F3 Architecture</h2>

        <div className="bg-white/70 p-4 rounded-xl mb-4 flex items-center justify-between border border-[#D4A574]/10">
          <div className="flex flex-col items-center space-y-1 w-2/5">
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <span className="text-[9px] font-bold text-gray-500 text-center mt-1">Normal Collagen</span>
            <span className="text-[8px] text-gray-400">(breaks easily)</span>
          </div>
          <div className="text-[#D4A574] font-bold text-xl">→</div>
          <div className="flex flex-col items-center space-y-1 w-2/5 relative">
            <div className="w-full h-2 bg-[#D4A574] rounded-full transform rotate-1"></div>
            <div className="w-full h-2 bg-[#5B8C5A] rounded-full transform -rotate-1"></div>
            <div className="w-full h-2 bg-[#D4A574] rounded-full"></div>
            <span className="text-[9px] font-bold text-gray-700 text-center">Collagen F3</span>
            <span className="text-[8px] text-[#5B8C5A]">(interlocked & firm)</span>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          When you lose fat quickly, the skin stays loose because normal collagen breaks down. The AlkaLean shot primes your body to naturally synthesize interlocking <strong>Collagen F3</strong> from the inside out.
        </p>
        <div className="bg-white/60 p-3 rounded-xl border border-[#D4A574]/10 text-xs text-gray-700">
          <p className="flex items-start font-medium">
            <AlertCircle size={14} className="mr-2 mt-0.5 flex-shrink-0 text-[#D4A574]" />
            Most creams use the wrong type of collagen. F3 must be built internally — no cream can do this.
          </p>
        </div>
      </div>

      {/* Tightening Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 flex items-center">
            <Droplets size={20} className="text-[#5B8C5A] mr-2" />
            Daily Skin Protocol
          </h2>
          <span className="text-xs font-bold text-gray-400">
            {completedCount}/3 Done
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500" style={{ width: `${(completedCount / 3) * 100}%` }} />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Do these 3 things daily to accelerate skin tightening while Collagen F3 builds internally.
        </p>

        <div className="space-y-2.5">
          {[
            {
              id: 'rinse',
              title: "Morning Cold Rinse",
              desc: "End your shower with 30 seconds of cold water. Closes pores and triggers vasoconstriction for tighter skin.",
              emoji: "🚿"
            },
            {
              id: 'brush',
              title: "Dry Brushing",
              desc: "Use a natural bristle brush. Brush upwards toward the heart to stimulate lymphatic drainage and blood flow.",
              emoji: "✨"
            },
            {
              id: 'meal',
              title: "F3 Amino Meal",
              desc: "Consume real bone broth, slow-cooked meats, or collagen-rich foods. These provide the raw materials for F3 synthesis.",
              emoji: "🍖"
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => toggleAction(item.id)}
              className={`w-full flex items-start space-x-3 p-4 rounded-xl border-2 transition-all text-left ${
                completedActions[item.id]
                  ? 'bg-[#E8F0E9] border-[#5B8C5A]/30'
                  : 'bg-gray-50 border-transparent hover:border-gray-200'
              }`}
            >
              <span className="text-xl mt-0.5">{item.emoji}</span>
              <div className="flex-1">
                <h4 className={`font-bold text-sm mb-1 ${completedActions[item.id] ? 'text-[#3D6B3D]' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed ${completedActions[item.id] ? 'text-[#5B8C5A]' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 ${
                completedActions[item.id] ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'
              }`}>
                {completedActions[item.id] && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-r from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 border border-[#D4A574]/20">
        <h3 className="font-bold text-gray-900 text-sm mb-3">What to Expect</h3>
        <div className="space-y-3">
          {[
            { time: "Week 1-2", text: "Skin texture begins to feel smoother and more hydrated." },
            { time: "Week 3-4", text: "You may notice tightening around the chin, arms, and belly area." },
            { time: "Month 2+", text: "Visible firmness improvement as F3 collagen fibers interlock." },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-16 flex-shrink-0">
                <span className="text-xs font-bold text-[#5B8C5A]">{item.time}</span>
              </div>
              <div className="flex-1 bg-white/60 p-3 rounded-xl">
                <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinCare;
