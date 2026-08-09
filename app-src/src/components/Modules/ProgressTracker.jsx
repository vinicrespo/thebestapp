import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { Target, TrendingDown, Scale, Camera, Image as ImageIcon } from 'lucide-react';

const ProgressTracker = () => {
  const [profile, setProfile] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    const prof = getProfile();
    setProfile(prof);
    
    // Load weight history
    const history = JSON.parse(localStorage.getItem('alkalean_weight_history') || '[]');
    if (history.length === 0 && prof?.weight) {
      // Add initial weight if empty
      const initial = { date: new Date().toISOString(), weight: Number(prof.weight) };
      localStorage.setItem('alkalean_weight_history', JSON.stringify([initial]));
      setWeightHistory([initial]);
    } else {
      setWeightHistory(history);
    }
  }, []);

  const handleLogWeight = (e) => {
    e.preventDefault();
    if (!currentWeight || isNaN(currentWeight)) return;

    const newEntry = { date: new Date().toISOString(), weight: Number(currentWeight) };
    const newHistory = [...weightHistory, newEntry];
    
    localStorage.setItem('alkalean_weight_history', JSON.stringify(newHistory));
    setWeightHistory(newHistory);
    setCurrentWeight('');
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  const startWeight = weightHistory.length > 0 ? weightHistory[0].weight : Number(profile.weight);
  const latestWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : startWeight;
  const goalWeight = Number(profile.targetWeight);
  
  const totalToLose = startWeight - goalWeight;
  const lostSoFar = startWeight - latestWeight;
  
  // Prevent division by zero or negative progress
  let progressPercent = 0;
  if (totalToLose > 0 && lostSoFar > 0) {
    progressPercent = Math.min((lostSoFar / totalToLose) * 100, 100);
  } else if (lostSoFar < 0) {
    progressPercent = 0;
  }

  return (
    <div className="p-6">
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Your Journey</h1>
        <p className="text-gray-500">Track your body transformation.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-purple-100 p-2 rounded-full text-purple-900 mb-2">
            <Scale size={20} />
          </div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Current</p>
          <p className="text-2xl font-black text-gray-900">{latestWeight.toFixed(1)} <span className="text-sm font-normal text-gray-400">lbs</span></p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-green-100 p-2 rounded-full text-green-600 mb-2">
            <Target size={20} />
          </div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Goal</p>
          <p className="text-2xl font-black text-gray-900">{goalWeight} <span className="text-sm font-normal text-gray-400">lbs</span></p>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-gray-900 flex items-center">
            <TrendingDown size={18} className="text-purple-900 mr-2" />
            Milestone Progress
          </h3>
          <span className="text-xs font-bold text-green-600">
            {lostSoFar > 0 ? `-${lostSoFar.toFixed(1)} lbs` : '0 lbs'}
          </span>
        </div>
        
        <div className="relative w-full h-4 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-900 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Start: {startWeight}</span>
          <span>Goal: {goalWeight}</span>
        </div>
      </div>

      {/* Log Weight Form */}
      <div className="bg-purple-900 rounded-2xl shadow-lg p-6 mb-6 text-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-800 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-1">Log Today's Weight</h3>
          <p className="text-purple-200 text-sm mb-4">Consistency is the key to breaking plateaus.</p>
          
          <form onSubmit={handleLogWeight} className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                placeholder="Enter weight..."
                className="w-full bg-white/10 border border-purple-400/30 text-white placeholder-purple-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
            <button 
              type="submit"
              className="bg-orange-500 text-white font-bold px-6 rounded-xl hover:bg-orange-400 transition-colors"
            >
              Log
            </button>
          </form>
        </div>
      </div>

      {/* Photos Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="font-bold text-gray-900 flex items-center mb-4">
          <Camera size={18} className="text-purple-900 mr-2" />
          Transformation Gallery
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          The scale doesn't always show the fat you lose. Take weekly photos to see your body recomposition.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[3/4] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors">
            <ImageIcon size={24} className="mb-2 opacity-50" />
            <span className="text-xs font-bold">Add Day 1</span>
          </div>
          <div className="aspect-[3/4] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors">
            <ImageIcon size={24} className="mb-2 opacity-50" />
            <span className="text-xs font-bold">Add Current</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProgressTracker;
