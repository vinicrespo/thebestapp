import React, { useState } from 'react';
import { CheckSquare, Droplets, Zap, ChevronDown, ChevronUp, Activity, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GutHealth = () => {
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState(1);

  const days = [
    { day: 1, title: "Starve the Saboteurs", desc: "Remove all artificial sweeteners. Firmicutes bacteria feed on them rapidly. Check labels for sucralose, aspartame, and saccharin — they're hidden in many 'diet' and 'light' products.", emoji: "🚫" },
    { day: 2, title: "Introduce the Helpers", desc: "Eat 1 cup of fermented food (kefir, yogurt, or sauerkraut) to seed new beneficial bacteria. These probiotics start competing with the bad bacteria immediately.", emoji: "🦠" },
    { day: 3, title: "The Fiber Flush", desc: "Consume 30g of insoluble fiber (from vegetables, nuts, seeds) to sweep dead bacteria out of the GI tract. Think of it as a natural internal broom.", emoji: "🧹" },
    { day: 4, title: "Repair the Lining", desc: "Drink 1 cup of warm bone broth. The collagen and amino acids seal micro-tears in the gut wall that have been allowing toxins to leak into your bloodstream.", emoji: "🩹" },
    { day: 5, title: "Deep Hydration", desc: "Drink half your body weight in ounces of water to maintain mucosal health. Your gut lining needs hydration to form a protective barrier against bad bacteria.", emoji: "💧" },
    { day: 6, title: "Prebiotic Feeding", desc: "Eat asparagus, onions, or leeks. These contain special fibers that ONLY good bacteria can digest — it's like sending a feast to your new allies.", emoji: "🌱" },
    { day: 7, title: "The Reset Check", desc: "Notice your reduced bloating and better digestion! The bacterial ratio has started to shift. You may also notice more energy and fewer cravings.", emoji: "✅" },
  ];

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">7X Accelerator</h1>
        <p className="text-gray-500 text-sm">Microbiome Remodeling Protocol</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="text-white" size={22} />
            <h2 className="font-bold text-white text-sm">Gut Flora Ratio</h2>
          </div>
          <span className="text-[10px] text-emerald-100 font-bold bg-white/10 px-2 py-1 rounded-full">Goal: 80/20</span>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Estimated Starting Baseline</p>
          <div className="w-full flex h-5 rounded-full overflow-hidden mb-2">
            <div className="bg-red-400 w-[98%] flex items-center justify-center text-[10px] text-white font-bold">98.9% Harmful</div>
            <div className="bg-emerald-500 w-[2%]"></div>
          </div>
          <p className="text-[11px] text-gray-400 mb-5">After 7 days, this ratio begins shifting toward a healthier balance.</p>

          <h3 className="font-bold text-gray-900 text-sm mb-3">7-Day Remodeling Plan</h3>
          <div className="space-y-2.5">
            {days.map((item) => (
              <div key={item.day} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                  className="w-full bg-gray-50/50 p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-bold text-sm text-gray-800">Day {item.day}: {item.title}</span>
                  </div>
                  {openDay === item.day ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openDay === item.day && (
                  <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-100 leading-relaxed animate-fade-in">
                    {item.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] text-white rounded-2xl shadow-sm p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A574] rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
        <h2 className="font-bold text-lg mb-2 flex items-center relative z-10">
          <Zap size={20} className="text-[#D4A574] mr-2" />
          Cellulite Reduction Protocol
        </h2>
        <p className="text-xs text-gray-400 mb-5 leading-relaxed relative z-10">
          Cellulite is trapped toxins in the fascia layer. Follow this daily checklist to help flush them out naturally.
        </p>
        <div className="space-y-2.5 relative z-10">
          {[
            { title: "Hydration Flush", desc: "16oz of warm water immediately upon waking — before anything else." },
            { title: "Dry Brushing", desc: "Brush skin upwards toward the heart before showering. Use a natural bristle brush." },
            { title: "Contrast Shower", desc: "End your shower with 30 seconds of cold water. This boosts circulation and tightens skin." }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
              <CheckSquare size={18} className="text-[#D4A574] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-[11px] text-gray-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GutHealth;
