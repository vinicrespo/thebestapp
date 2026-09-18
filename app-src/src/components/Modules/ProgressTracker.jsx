import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { Target, TrendingDown, Scale, Camera, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([]);
  const [photos, setPhotos] = useState({ day1: null, current: null });

  useEffect(() => {
    const prof = getProfile();
    setProfile(prof);

    const history = JSON.parse(localStorage.getItem('alkalean_weight_history') || '[]');
    if (history.length === 0 && prof?.weight) {
      const initial = { date: new Date().toISOString(), weight: Number(prof.weight) };
      localStorage.setItem('alkalean_weight_history', JSON.stringify([initial]));
      setWeightHistory([initial]);
    } else {
      setWeightHistory(history);
    }

    try {
      const savedPhotos = JSON.parse(localStorage.getItem('alkalean_photos') || '{"day1":null,"current":null}');
      setPhotos(savedPhotos);
    } catch { /* ignore */ }
  }, []);

  const handlePhotoUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        const newPhotos = { ...photos, [type]: dataUrl };
        setPhotos(newPhotos);
        localStorage.setItem('alkalean_photos', JSON.stringify(newPhotos));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

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
  const goalWeight = Number(profile.goalWeight);

  const totalToLose = startWeight - goalWeight;
  const lostSoFar = startWeight - latestWeight;

  let progressPercent = 0;
  if (totalToLose > 0 && lostSoFar > 0) {
    progressPercent = Math.min((lostSoFar / totalToLose) * 100, 100);
  }

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Journey</h1>
        <p className="text-gray-500 text-sm">Track your body transformation</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-[#E8F0E9] p-2.5 rounded-full text-[#5B8C5A] mb-2">
            <Scale size={20} />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Current</p>
          <p className="text-2xl font-black text-gray-900">{latestWeight.toFixed(1)} <span className="text-xs font-normal text-gray-400">lbs</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-[#F5E6D3] p-2.5 rounded-full text-[#D4A574] mb-2">
            <Target size={20} />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Goal</p>
          <p className="text-2xl font-black text-gray-900">{goalWeight || '—'} <span className="text-xs font-normal text-gray-400">lbs</span></p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex justify-between items-end mb-3">
          <h3 className="font-bold text-gray-900 flex items-center text-sm">
            <TrendingDown size={18} className="text-[#5B8C5A] mr-2" />
            Milestone Progress
          </h3>
          <span className="text-xs font-bold text-[#5B8C5A]">
            {lostSoFar > 0 ? `-${lostSoFar.toFixed(1)} lbs` : '0 lbs'}
          </span>
        </div>

        <div className="relative w-full h-3 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5B8C5A] to-[#7BAF7A] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Start: {startWeight}</span>
          <span>Goal: {goalWeight || '—'}</span>
        </div>

        {weightHistory.length > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-500 mb-2">Recent Entries</h4>
            <div className="space-y-1.5">
              {weightHistory.slice(-5).reverse().map((entry, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-400">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="font-bold text-gray-700">{entry.weight.toFixed(1)} lbs</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl shadow-lg p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4A574] rounded-full blur-3xl opacity-10"></div>

        <div className="relative z-10">
          <h3 className="font-bold text-lg mb-1">Log Today's Weight</h3>
          <p className="text-gray-400 text-sm mb-4">Consistency is the key to breaking plateaus.</p>

          <form onSubmit={handleLogWeight} className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="Enter weight..."
              className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4A574] font-medium"
            />
            <button
              type="submit"
              className="bg-[#D4A574] text-white font-bold px-6 rounded-xl hover:bg-[#C49564] transition-colors"
            >
              Log
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 flex items-center text-sm mb-1">
          <Camera size={18} className="text-[#D4A574] mr-2" />
          Transformation Gallery
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          The scale doesn't always show the fat you lose. Weekly photos reveal your body recomposition.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {['day1', 'current'].map((type) => (
            <label key={type} className="relative aspect-[3/4] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden group">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, type)} />
              {photos[type] ? (
                <>
                  <img src={photos[type]} alt={type === 'day1' ? 'Day 1' : 'Current'} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">Update</div>
                </>
              ) : (
                <>
                  <ImageIcon size={24} className="mb-2 opacity-40" />
                  <span className="text-xs font-bold">{type === 'day1' ? 'Add Day 1' : 'Add Current'}</span>
                </>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
