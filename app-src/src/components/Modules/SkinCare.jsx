import React from 'react';
import { Sparkles, Droplets, CheckCircle, Flame, MessageCircle, AlertCircle } from 'lucide-react';

const SkinCare = () => {
  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Anti-Sagging Skin</h1>
        <p className="text-gray-500 text-sm">Collagen F3 Method</p>
      </div>

      {/* The F3 Concept */}
      <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-6 shadow-sm mb-6 border border-orange-200">
        <Sparkles className="text-orange-600 mb-3" size={32} />
        <h2 className="font-bold text-orange-900 text-xl mb-3">Why Skin Sags & The F3 Solution</h2>
        <p className="text-sm text-orange-800/90 leading-relaxed mb-4">
          When you lose fat quickly, the skin often stays loose. This causes flabby arms, a loose belly, and sagging chin. Why? Because the body breaks down <strong>Collagen F3 ("Firmness 3")</strong>. 
        </p>
        <div className="bg-white/60 p-4 rounded-xl border border-orange-200 text-sm text-orange-900">
          <p className="flex items-start">
            <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            Most creams and pills use the wrong type of collagen. The AlkaLean shot you take daily primes your stomach acid to naturally synthesize F3 internally.
          </p>
        </div>
      </div>

      {/* Tightening Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
          <Droplets size={24} className="text-purple-900 mr-2" />
          Daily Tightening Tracker
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Check off these three physical actions daily to accelerate skin retraction while the F3 collagen builds.
        </p>

        <div className="space-y-4">
          {[
            { 
              title: "Morning Cold Rinse", 
              desc: "Closes pores and instantly triggers vasoconstriction, physically tightening the skin surface.",
              icon: <Droplets size={20} className="text-blue-500" />
            },
            { 
              title: "Dry Brushing", 
              desc: "Use a dry bristle brush on your belly and arms before showering to stimulate lymphatic drainage.",
              icon: <Flame size={20} className="text-orange-500" />
            },
            { 
              title: "F3 Collagen Meal", 
              desc: "Consume real bone broth or slow-cooked meats to deliver the raw amino acids for F3.",
              icon: <CheckCircle size={20} className="text-purple-900" />
            }
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 transition-colors">
              <div className="mt-1 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Community */}
      <div className="bg-purple-900 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <MessageCircle className="text-orange-500 mx-auto mb-3" size={32} />
        <h3 className="font-bold text-white text-xl mb-2">VIP Women's Support</h3>
        <p className="text-purple-200 text-sm mb-6 leading-relaxed">
          Join 10,000+ women sharing their reset results, recipes, and daily victories.
        </p>
        <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
          Access the Community
        </button>
      </div>
    </div>
  );
};

export default SkinCare;
