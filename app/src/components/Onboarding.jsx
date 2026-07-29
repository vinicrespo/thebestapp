import React, { useState } from 'react';
import { saveProfile, saveProgress } from '../utils/storage';
import { ChevronRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [formData, setFormData] = useState({
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
    
    // Save to local storage
    saveProfile(formData);
    saveProgress({
      currentDay: 1,
      streak: 0,
      lastLoginDate: null,
      bodyLog: []
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

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="pt-8 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Medical Intake</h1>
        <p className="text-gray-500 text-sm">To personalize your AlkaLean protocol, please provide your current biological baseline.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Age</label>
            <input 
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="e.g. 45"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Current Weight (lbs)</label>
              <input 
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                placeholder="e.g. 180"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Goal Weight (lbs)</label>
              <input 
                type="number"
                value={formData.goalWeight}
                onChange={(e) => setFormData({...formData, goalWeight: e.target.value})}
                placeholder="e.g. 140"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-3">Check all that apply to you</label>
          <div className="space-y-3">
            {[
              { id: 'menopause', label: 'Menopause Symptoms' },
              { id: 'thyroid', label: 'Thyroid Issues / Slow Metabolism' },
              { id: 'bloating', label: 'Digestive Bloating' },
              { id: 'sagging', label: 'Skin Sagging Concerns' }
            ].map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleFlag(item.id)}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  formData.healthFlags[item.id] 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className={`font-medium ${formData.healthFlags[item.id] ? 'text-green-800' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  formData.healthFlags[item.id] ? 'bg-green-600 border-green-600' : 'border-gray-300'
                }`}>
                  {formData.healthFlags[item.id] && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-8 bg-gray-900 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-black transition-colors"
        >
          <span>Generate My Protocol</span>
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
