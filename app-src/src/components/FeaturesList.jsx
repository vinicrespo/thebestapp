import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Flame, Droplets, Sparkles, Calendar, Target, ShoppingCart, UtensilsCrossed, Moon, BookOpen, ClipboardCheck, Activity, Gift } from 'lucide-react';

const FEATURES = [
  {
    category: 'Core Protocol',
    items: [
      { title: '30-Day AlkaLean Protocol', desc: 'Your daily alkaline shot recipes with tips and habit tracking.', path: '/', icon: <Calendar size={20} />, colors: 'bg-[#F0ECF9] text-[#6B3FA0] border-[#6B3FA0]/15' },
      { title: 'Progress Tracker', desc: 'Track your weight, measurements, and see your transformation over time.', path: '/progress', icon: <Activity size={20} />, colors: 'bg-blue-50 text-blue-600 border-blue-100' },
    ],
  },
  {
    category: 'Active Upgrades',
    items: [
      { title: '7X Accelerator', desc: '60-day gut health protocol to accelerate detox and fat burning.', path: '/gut', icon: <Flame size={20} />, colors: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      { title: 'Hormonal Balance', desc: '45-day protocol to rebalance hormones for better metabolism and mood.', path: '/hormones', icon: <Droplets size={20} />, colors: 'bg-purple-50 text-purple-600 border-purple-100' },
      { title: 'Anti-Sagging Skin', desc: '60-day collagen and elastin protocol for firmer, younger-looking skin.', path: '/skin', icon: <Sparkles size={20} />, colors: 'bg-rose-50 text-rose-600 border-rose-100' },
    ],
  },
  {
    category: 'Extended Programs',
    items: [
      { title: '180-Day Extended Protocol', desc: 'Daily shots, recipes, and challenges that never repeat — 6 full months.', path: '/extended', icon: <Target size={20} />, colors: 'bg-[#FEF0E4] text-[#D4874D] border-[#D4874D]/20', tag: 'NEW' },
      { title: 'Year-End Finish Line', desc: '97 daily missions from October to December to close the year strong.', path: '/yearend', icon: <Gift size={20} />, colors: 'bg-red-50 text-red-600 border-red-100' },
    ],
  },
  {
    category: 'Tools & Extras',
    items: [
      { title: 'Results Diagnostic', desc: 'Completed 30 days without results? Find out exactly what went wrong.', path: '/diagnostic', icon: <ClipboardCheck size={20} />, colors: 'bg-amber-50 text-amber-600 border-amber-100', tag: 'NEW' },
      { title: 'Shopping List', desc: 'Everything you need to follow the protocol — organized by category.', path: '/shopping', icon: <ShoppingCart size={20} />, colors: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      { title: 'Bonus Recipes', desc: 'Healthy alkaline-friendly meals and snacks to complement your protocol.', path: '/recipes', icon: <UtensilsCrossed size={20} />, colors: 'bg-orange-50 text-orange-600 border-orange-100' },
      { title: '7-Night Sleep Program', desc: 'Optimize your sleep to maximize recovery and fat burning.', path: '/sleep', icon: <Moon size={20} />, colors: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
      { title: 'My Journal', desc: 'Daily reflections to track your mindset and emotional wellbeing.', path: '/journal', icon: <BookOpen size={20} />, colors: 'bg-rose-50 text-rose-500 border-rose-100' },
    ],
  },
];

const FeaturesList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">All Features</h1>
        <p className="text-gray-500 text-sm mt-1">Everything included in your AlkaLean app</p>
      </div>

      {FEATURES.map((section) => (
        <div key={section.category} className="mb-5">
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-2.5 px-1">{section.category}</h3>
          <div className="space-y-2">
            {section.items.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3.5 rounded-2xl border transition-all hover:shadow-sm ${item.colors}`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 text-left ml-3 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                    {item.tag && (
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-[#6B3FA0] text-white px-1.5 py-0.5 rounded-full flex-shrink-0">{item.tag}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="text-gray-300 flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
