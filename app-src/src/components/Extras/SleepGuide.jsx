import React from 'react';
import { SLEEP_TIPS } from '../../utils/protocol';
import { Moon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SleepGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Moon size={24} className="text-indigo-500 mr-2" /> Sleep Guide
        </h1>
        <p className="text-gray-500 text-sm mt-1">5 habits that accelerate your results overnight</p>
      </div>

      <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 rounded-2xl p-5 mb-6 border border-indigo-200">
        <p className="text-sm text-indigo-800 leading-relaxed">
          <strong>Why sleep matters for weight loss:</strong> Your body does most of its fat burning, cell repair, and hormone balancing while you sleep. Poor sleep can increase hunger hormones by up to 45% and slow metabolism by 20%. These 5 simple habits can transform your nights — and your results.
        </p>
      </div>

      <div className="space-y-4">
        {SLEEP_TIPS.map((tip, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start space-x-4">
              <div className="text-3xl flex-shrink-0">{tip.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 mt-6 border border-[#D4A574]/20 text-center">
        <p className="text-sm text-gray-700 font-medium mb-1">🌙 Tonight's Challenge</p>
        <p className="text-xs text-gray-600 leading-relaxed">
          Pick just ONE of these habits to try tonight. Small changes lead to big results. You don't have to do everything at once.
        </p>
      </div>
    </div>
  );
};

export default SleepGuide;
