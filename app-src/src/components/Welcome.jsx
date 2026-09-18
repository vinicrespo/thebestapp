import React, { useState, useEffect } from 'react';
import { markWelcomeSeen } from '../utils/storage';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

const Welcome = ({ onComplete, profile }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    markWelcomeSeen();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] via-white to-[#E8F0E9] flex flex-col items-center justify-center p-8 text-center">
      <div className={`transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
          <Heart className="text-[#C48B8F]" size={36} fill="#C48B8F" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Welcome to Your<br />New Beginning
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 max-w-sm mx-auto">
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            You just took the most important step. Most women only watch. <strong>You acted.</strong>
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Over the next 30 days, this app will guide you through a complete biological reset — one simple step at a time.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            No overwhelm. No confusion. Just follow your daily protocol, and let your body do the rest.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-[#5B8C5A] font-semibold mb-8">
          <Sparkles size={16} />
          <span>Your personalized protocol is ready</span>
        </div>

        <button
          onClick={handleContinue}
          className="bg-[#5B8C5A] text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center space-x-2 mx-auto shadow-lg shadow-[#5B8C5A]/30 hover:bg-[#4A7A49] transition-colors animate-pulse-soft"
        >
          <span>Let's Begin</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
