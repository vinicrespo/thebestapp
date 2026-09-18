import React, { useState } from 'react';
import { saveProfile, saveProgress } from '../utils/storage';
import { ChevronRight, Heart } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    goalWeight: '',
    healthFlags: {
      menopause: false,
      thyroid: false,
      bloating: false,
      sagging: false,
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.age || !formData.weight) return;

    saveProfile(formData);
    saveProgress({
      currentDay: 1,
      streak: 0,
      lastLoginDate: null,
      bodyLog: [],
      completedDays: [],
      dailyHabits: { water: false, steps: false, supplements: false },
      badges: [],
      phase: 1
    });

    onComplete();
  };

  const toggleFlag = (flag) => {
    setFormData(prev => ({
      ...prev,
      healthFlags: {
        ...prev.healthFlags,
        [flag]: !prev.healthFlags[flag]
      }
    }));
  };

  const canProceed = step === 1
    ? formData.name.trim().length > 0
    : formData.age && formData.weight;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F0E9] p-6">
      <div className="pt-8 pb-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#5B8C5A]' : 'bg-gray-200'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#5B8C5A]' : 'bg-gray-200'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[#5B8C5A]' : 'bg-gray-200'}`} />
        </div>

        {step === 1 && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Let's personalize your journey</h1>
            <p className="text-gray-500 text-sm mb-8">First, what should we call you?</p>

            <div className="mb-6">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your first name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#5B8C5A] outline-none text-base"
                autoFocus
              />
            </div>

            <button
              onClick={() => canProceed && setStep(2)}
              disabled={!canProceed}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                canProceed
                  ? 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/20 hover:bg-[#4A7A49]'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <span>Continue</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">About your body</h1>
            <p className="text-gray-500 text-sm mb-8">This helps us calculate your personalized dosages and protocol.</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  placeholder="e.g. 48"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#5B8C5A] outline-none"
                />
              </div>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">Current Weight (lbs)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    placeholder="e.g. 185"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#5B8C5A] outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 tracking-wider">Goal Weight (lbs)</label>
                  <input
                    type="number"
                    value={formData.goalWeight}
                    onChange={(e) => setFormData({...formData, goalWeight: e.target.value})}
                    placeholder="e.g. 145"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#5B8C5A] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button onClick={() => setStep(1)} className="py-3.5 px-6 rounded-xl border border-gray-200 text-gray-500 font-semibold">
                Back
              </button>
              <button
                onClick={() => canProceed && setStep(3)}
                disabled={!canProceed}
                className={`flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                  canProceed
                    ? 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/20 hover:bg-[#4A7A49]'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h1>
            <p className="text-gray-500 text-sm mb-6">Select anything that applies — this personalizes your daily tips.</p>

            <div className="space-y-3 mb-8">
              {[
                { id: 'menopause', label: 'Menopause Symptoms', emoji: '🌸' },
                { id: 'thyroid', label: 'Thyroid / Slow Metabolism', emoji: '🦋' },
                { id: 'bloating', label: 'Digestive Bloating', emoji: '🍃' },
                { id: 'sagging', label: 'Skin Sagging Concerns', emoji: '✨' }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleFlag(item.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.healthFlags[item.id]
                      ? 'border-[#5B8C5A] bg-[#E8F0E9]'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.emoji}</span>
                    <span className={`font-medium ${formData.healthFlags[item.id] ? 'text-[#3D6B3D]' : 'text-gray-700'}`}>
                      {item.label}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.healthFlags[item.id] ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'
                  }`}>
                    {formData.healthFlags[item.id] && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 mb-4">You can skip this step — it's optional</p>

            <div className="flex space-x-3">
              <button type="button" onClick={() => setStep(2)} className="py-3.5 px-6 rounded-xl border border-gray-200 text-gray-500 font-semibold">
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#5B8C5A] text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#4A7A49] transition-colors shadow-lg shadow-[#5B8C5A]/20"
              >
                <Heart size={18} />
                <span>Start My Journey</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
