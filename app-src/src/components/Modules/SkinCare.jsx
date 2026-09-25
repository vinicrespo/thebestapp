import React, { useState, useEffect } from 'react';
import { getSkinDayContent, SKIN_PHASE_LIST, BODY_AREAS } from '../../utils/skinProtocol';
import { Sparkles, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Check, Lightbulb, UtensilsCrossed, Smile, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alkalean_skin_progress';

const getSkinProgress = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
};

const saveSkinProgress = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const SkinCare = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});
  const [bodyRatings, setBodyRatings] = useState({});
  const [showPhases, setShowPhases] = useState(false);
  const [showBodyTracker, setShowBodyTracker] = useState(false);

  useEffect(() => {
    const progress = getSkinProgress();
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastDate === today) {
      setCompletedSteps(progress.steps || {});
      setBodyRatings(progress.body || {});
      setSelectedDay(progress.day || 1);
    } else {
      setCompletedSteps({});
      const newDay = Math.min((progress.day || 0) + 1, 60);
      setSelectedDay(newDay);
      saveSkinProgress({ ...progress, day: newDay, lastDate: today, steps: {} });
    }
  }, []);

  const toggleStep = (idx) => {
    const next = { ...completedSteps, [idx]: !completedSteps[idx] };
    setCompletedSteps(next);
    saveSkinProgress({ ...getSkinProgress(), steps: next });
  };

  const rateBody = (id) => {
    const current = bodyRatings[id] || 0;
    const next = { ...bodyRatings, [id]: current >= 5 ? 0 : current + 1 };
    setBodyRatings(next);
    saveSkinProgress({ ...getSkinProgress(), body: next });
  };

  const content = getSkinDayContent(selectedDay);
  const stepsCompleted = content.routine.filter((_, i) => completedSteps[i]).length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Anti-Sagging Skin</h1>
        <p className="text-gray-500 text-sm">60-Day Collagen F3 Method</p>
      </div>

      {/* Phase Progress */}
      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A574] rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{content.phase.icon}</span>
              <div>
                <h2 className="font-bold text-[#D4A574] text-sm">{content.phase.name}</h2>
                <p className="text-[10px] text-gray-400">{content.phase.range}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500">{selectedDay}/60</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4A574] to-[#E8C9A0] h-full rounded-full transition-all duration-700" style={{ width: `${(selectedDay / 60) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{content.phase.desc}</p>
        </div>
      </div>

      {/* Phases Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button onClick={() => setShowPhases(!showPhases)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">All Phases</h3>
          {showPhases ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showPhases && (
          <div className="px-4 pb-4 space-y-2">
            {SKIN_PHASE_LIST.map((phase, i) => {
              const ranges = [[1,15],[16,30],[31,45],[46,60]];
              const isActive = selectedDay >= ranges[i][0] && selectedDay <= ranges[i][1];
              const isDone = selectedDay > ranges[i][1];
              return (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${isActive ? 'border-[#D4A574]/30 bg-[#F5E6D3]/30' : isDone ? 'border-[#5B8C5A]/20 bg-[#E8F0E9]/30' : 'border-gray-100 bg-gray-50'}`}>
                  <span className="text-lg">{phase.icon}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isActive ? 'text-[#D4A574]' : isDone ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{phase.name}</p>
                    <p className="text-[10px] text-gray-400">{phase.range}</p>
                  </div>
                  {isDone && <Check size={14} className="text-[#5B8C5A]" />}
                  {isActive && <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-pulse" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
        <button onClick={() => setSelectedDay(d => Math.max(1, d - 1))} disabled={selectedDay <= 1} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div className="text-center">
          <span className="text-2xl font-black text-gray-900">Day {selectedDay}</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{content.phase.name}</p>
        </div>
        <button onClick={() => setSelectedDay(d => Math.min(60, d + 1))} disabled={selectedDay >= 60} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Daily Routine */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Droplets size={18} className="text-[#5B8C5A]" />
            <h3 className="font-bold text-gray-900 text-sm">Daily Skin Routine</h3>
          </div>
          <span className="text-xs font-bold text-gray-400">{stepsCompleted}/{content.routine.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500" style={{ width: `${(stepsCompleted / content.routine.length) * 100}%` }} />
        </div>
        <div className="space-y-2">
          {content.routine.map((item, i) => (
            <button key={i} onClick={() => toggleStep(i)} className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all text-left ${completedSteps[i] ? 'bg-[#E8F0E9] border-[#5B8C5A]/30' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <span className={`text-sm ${completedSteps[i] ? 'text-[#3D6B3D] line-through' : 'text-gray-700'}`}>{item.step}</span>
                <span className="text-[10px] text-gray-400 block">{item.time}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedSteps[i] ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
                {completedSteps[i] && <Check size={12} className="text-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Collagen Recipe */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'recipe' ? null : 'recipe')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={18} className="text-[#D4A574]" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.recipe.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Collagen Recipe · {content.recipe.time}</p>
            </div>
          </div>
          {activeSection === 'recipe' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {activeSection === 'recipe' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.recipe.desc}</p>
          </div>
        )}
      </div>

      {/* Face Yoga */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'yoga' ? null : 'yoga')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smile size={18} className="text-rose-500" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.exercise.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{content.exercise.target} · {content.exercise.time}</p>
            </div>
          </div>
          {activeSection === 'yoga' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {activeSection === 'yoga' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.exercise.desc}</p>
          </div>
        )}
      </div>

      {/* DIY Mask */}
      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 mb-4 border border-[#D4A574]/20">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles size={18} className="text-[#D4A574]" />
          <h3 className="font-bold text-gray-900 text-sm">Weekly DIY Mask: {content.mask.title}</h3>
        </div>
        <p className="text-xs text-gray-500 mb-2 font-bold uppercase">{content.mask.benefit} · {content.mask.time}</p>
        <div className="bg-white/60 p-4 rounded-xl border border-[#D4A574]/10 mb-3">
          <p className="text-xs font-bold text-gray-600 mb-1">Ingredients:</p>
          <ul className="space-y-1">
            {content.mask.ingredients.map((ing, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start space-x-1">
                <span className="text-[#5B8C5A]">•</span><span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{content.mask.instructions}</p>
      </div>

      {/* Daily Tip */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb size={18} className="text-amber-500" />
          <h3 className="font-bold text-gray-900 text-sm">Skin Tip of the Day</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-amber-400 pl-3">{content.tip}</p>
      </div>

      {/* Body Area Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button onClick={() => setShowBodyTracker(!showBodyTracker)} className="w-full p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-pink-500" />
            <h3 className="font-bold text-gray-900 text-sm">Body Area Progress</h3>
          </div>
          {showBodyTracker ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showBodyTracker && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-500 mb-3">Rate firmness improvement for each area (tap to cycle 0-5).</p>
            <div className="grid grid-cols-2 gap-2">
              {BODY_AREAS.map(area => {
                const level = bodyRatings[area.id] || 0;
                return (
                  <button key={area.id} onClick={() => rateBody(area.id)} className={`p-3 rounded-xl border-2 text-left transition-all ${level > 0 ? 'border-[#D4A574]/30 bg-[#F5E6D3]/20' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{area.icon}</span>
                      <div className="flex space-x-0.5">
                        {[1,2,3,4,5].map(n => (
                          <div key={n} className={`w-2 h-2 rounded-full ${n <= level ? 'bg-[#D4A574]' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-700">{area.label}</p>
                    <p className="text-[10px] text-gray-400">{level}/5 improvement</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinCare;
