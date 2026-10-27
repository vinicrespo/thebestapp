import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Target, ClipboardCheck } from 'lucide-react';

const FEATURES = [
  { title: '180-Day Extended Protocol', desc: 'Daily shots, recipes, and challenges that never repeat — 6 full months.', path: '/extended', icon: <Target size={20} />, colors: 'bg-[#FEF0E4] text-[#D4874D] border-[#D4874D]/20' },
  { title: 'Results Diagnostic', desc: 'Completed 30 days without results? Find out exactly what went wrong.', path: '/diagnostic', icon: <ClipboardCheck size={20} />, colors: 'bg-amber-50 text-amber-600 border-amber-100', tag: 'NEW' },
];

const FeaturesList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Tools & Extras</h1>
        <p className="text-gray-500 text-sm mt-1">Additional features to support your journey</p>
      </div>

      <div className="space-y-2.5">
        {FEATURES.map((item) => (
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
  );
};

export default FeaturesList;
