import React from 'react';
import { ShieldCheck, CheckSquare, BugOff, Droplets, Utensils, Zap } from 'lucide-react';

const GutHealth = () => {
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
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            According to the 2023 Yale University study, 98.9% of women over 38 have a gut microbiome dominated by harmful bacteria (Firmicutes). 
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            These saboteurs cause your body to extract more calories from the exact same foods, storing them as fat and increasing your sugar cravings. Our goal with this module is to starve the bad bacteria and feed the good ones, unlocking real fat-burning results.
          </p>
          
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
            <h3 className="font-bold text-orange-900 text-sm flex items-center mb-2">
              <BugOff size={16} className="mr-2" /> Foods to Avoid (Starve the Saboteurs)
            </h3>
            <ul className="text-sm text-orange-800 space-y-2 list-disc pl-5">
              <li>Artificial sweeteners (Aspartame, Sucralose)</li>
              <li>Highly processed seed oils (Canola, Soybean)</li>
              <li>Refined white sugar and hidden sugars in sauces</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <h3 className="font-bold text-purple-900 text-sm flex items-center mb-2">
              <Utensils size={16} className="mr-2" /> Foods to Eat (Feed the Helpers)
            </h3>
            <ul className="text-sm text-purple-800 space-y-2 list-disc pl-5">
              <li>Fermented foods (Kefir, Sauerkraut, Kimchi)</li>
              <li>Fibrous greens (Asparagus, Spinach, Leeks)</li>
              <li>Bone broth (repairs the gut lining)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-900 text-white rounded-2xl shadow-sm p-6">
        <h2 className="font-bold text-lg mb-4 flex items-center">
          <Zap size={20} className="text-orange-500 mr-2" />
          Goodbye Cellulite in 21 Days
        </h2>
        <p className="text-xs text-purple-200 mb-4 leading-relaxed">
          Follow this 5-step daily checklist to flush out toxins trapped in fat cells, reducing the appearance of cellulite.
        </p>
        <div className="space-y-3">
          {[
            { title: "Hydration Flush", desc: "Drink 16oz of warm water immediately upon waking." },
            { title: "Dry Brushing", desc: "Brush upwards toward the heart for 2 minutes before showering." },
            { title: "Contrast Shower", desc: "Finish your shower with 30 seconds of pure cold water." },
            { title: "Lymphatic Walk", desc: "15 minutes of brisk walking after your largest meal." },
            { title: "Collagen Support", desc: "Consume your daily shot to activate cellular repair." }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-3 bg-purple-800 p-3 rounded-xl border border-purple-700">
              <CheckSquare size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-purple-200 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GutHealth;
