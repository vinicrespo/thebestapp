import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, BugOff, Droplets, Utensils, Zap, ChevronDown, ChevronUp, Activity } from 'lucide-react';

const GutHealth = () => {
  const [openDay, setOpenDay] = useState(1);

  const days = [
    { day: 1, title: "Starve the Saboteurs", desc: "Remove all artificial sweeteners. Firmicutes bacteria feed on them rapidly." },
    { day: 2, title: "Introduce the Helpers", desc: "Eat 1 cup of fermented food (kefir or sauerkraut) to seed new good bacteria." },
    { day: 3, title: "The Fiber Flush", desc: "Consume 30g of insoluble fiber to sweep dead bad bacteria out of the GI tract." },
    { day: 4, title: "Repair the Lining", desc: "Drink 1 cup of warm bone broth. The collagen seals micro-tears in the gut wall." },
    { day: 5, title: "Deep Hydration", desc: "Drink half your body weight in ounces of water to maintain mucosal health." },
    { day: 6, title: "Prebiotic Feeding", desc: "Eat asparagus or leeks. These contain fibers that ONLY good bacteria can digest." },
    { day: 7, title: "The Reset Check", desc: "Notice your reduced bloating. The bacterial ratio has successfully shifted!" },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">7X Accelerator</h1>
        <p className="text-gray-500 text-sm">Microbiome Remodeling</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-orange-500 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="text-white" size={24} />
            <h2 className="font-bold text-white">Gut Flora Ratio</h2>
          </div>
          <span className="text-xs text-orange-100 font-bold">Goal: 80% / 20%</span>
        </div>
        <div className="p-6">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Current Estimated Baseline (Yale Study)</p>
          <div className="w-full flex h-4 rounded-full overflow-hidden mb-6">
            <div className="bg-red-500 w-[98%] flex items-center justify-center text-[10px] text-white font-bold">98.9% Bad</div>
            <div className="bg-green-500 w-[2%]"></div>
          </div>
          
          <h3 className="font-bold text-gray-900 text-sm mb-4">7-Day Remodeling Plan</h3>
          <div className="space-y-3">
            {days.map((item) => (
              <div key={item.day} className="border border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                  className="w-full bg-gray-50 p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-sm text-gray-800">Day {item.day}: {item.title}</span>
                  {openDay === item.day ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                </button>
                {openDay === item.day && (
                  <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                    {item.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-900 text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <h2 className="font-bold text-lg mb-2 flex items-center relative z-10">
          <Zap size={20} className="text-orange-500 mr-2" />
          Goodbye Cellulite in 21 Days
        </h2>
        <p className="text-xs text-purple-200 mb-6 leading-relaxed relative z-10">
          Cellulite is simply trapped toxins in the fascia layer. Follow this physical checklist to flush them out.
        </p>
        <div className="space-y-3 relative z-10">
          {[
            { title: "Hydration Flush", desc: "16oz of warm water immediately upon waking." },
            { title: "Dry Brushing", desc: "Brush upwards toward the heart before showering." },
            { title: "Contrast Shower", desc: "Finish with 30 seconds of pure cold water." }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3 bg-purple-800/80 backdrop-blur-sm p-4 rounded-xl border border-purple-700">
              <CheckSquare size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-[11px] text-purple-200 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GutHealth;
