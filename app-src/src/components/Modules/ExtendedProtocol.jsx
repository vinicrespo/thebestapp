import React, { useState, useEffect } from 'react';
import { getProgress } from '../../utils/storage';
import { getExtendedDayContent, EXTENDED_PHASES } from '../../utils/extendedProtocol';
import { ChevronLeft, ChevronRight, Flame, Droplets, Lightbulb, UtensilsCrossed, Target, Lock, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExtendedProtocol = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [selectedDay, setSelectedDay] = useState(31);
  const [showPhases, setShowPhases] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const prog = getProgress();
    setProgress(prog);
    const completed = prog?.completedDays?.length || 0;
    setSelectedDay(Math.max(31, Math.min(completed + 1, 210)));
  }, []);

  if (!progress) return null;

  const completedCount = progress.completedDays?.length || 0;
  const isLocked = completedCount < 30;
  const content = getExtendedDayContent(selectedDay);
  const overallProgress = Math.max(0, completedCount - 30);

  const handlePrevDay = () => setSelectedDay(d => Math.max(31, d - 1));
  const handleNextDay = () => setSelectedDay(d => Math.min(210, d + 1));

  if (isLocked) {
    return (
      <div className="p-5 pb-24">
        <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
          <ChevronLeft size={18} /> Back
        </button>
        <div className="text-center py-16">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Complete Your 30-Day Protocol First</h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
            The 180-Day Extended Protocol unlocks after you finish all 30 days. You've completed <strong>{completedCount}/30</strong> days so far. Keep going!
          </p>
          <div className="w-48 bg-gray-100 rounded-full h-2.5 mx-auto mt-4 overflow-hidden">
            <div className="bg-[#5B8C5A] h-full rounded-full transition-all" style={{ width: `${(completedCount / 30) * 100}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">180-Day Protocol</h1>
        <p className="text-gray-500 text-sm">Your extended transformation journey</p>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A574] rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{content.phase.icon}</span>
              <div>
                <h2 className="font-bold text-[#D4A574] text-sm">{content.phase.name}</h2>
                <p className="text-[10px] text-gray-400">{content.phase.months}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500">{overallProgress}/180</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4A574] to-[#E8C9A0] h-full rounded-full transition-all duration-700" style={{ width: `${(overallProgress / 180) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{content.phase.desc}</p>
        </div>
      </div>

      {/* Phase Overview (collapsible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button onClick={() => setShowPhases(!showPhases)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">All Phases</h3>
          {showPhases ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showPhases && (
          <div className="px-4 pb-4 space-y-2">
            {EXTENDED_PHASES.map((phase, i) => {
              const phaseStart = [30, 60, 90, 120, 150, 180][i];
              const phaseEnd = [60, 90, 120, 150, 180, 210][i];
              const isActive = overallProgress >= (phaseStart - 30) && overallProgress < (phaseEnd - 30);
              const isDone = overallProgress >= (phaseEnd - 30);
              return (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${isActive ? 'border-[#D4A574]/30 bg-[#F5E6D3]/30' : isDone ? 'border-[#5B8C5A]/20 bg-[#E8F0E9]/30' : 'border-gray-100 bg-gray-50'}`}>
                  <span className="text-lg">{phase.icon}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isActive ? 'text-[#D4A574]' : isDone ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{phase.name}</p>
                    <p className="text-[10px] text-gray-400">{phase.months}</p>
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
        <button onClick={handlePrevDay} disabled={selectedDay <= 31} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div className="text-center">
          <span className="text-2xl font-black text-gray-900">Day {selectedDay}</span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{content.phase.name}</p>
        </div>
        <button onClick={handleNextDay} disabled={selectedDay >= 210} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Morning Shot */}
      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 mb-4 border border-[#D4A574]/20">
        <div className="flex items-center space-x-2 mb-3">
          <Droplets size={18} className="text-[#D4A574]" />
          <h3 className="font-bold text-gray-900 text-sm">Morning Shot</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-[#D4A574]/10">
          {content.shot}
        </p>
      </div>

      {/* Daily Tip */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb size={18} className="text-amber-500" />
          <h3 className="font-bold text-gray-900 text-sm">Tip of the Day</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-amber-400 pl-3">
          {content.tip}
        </p>
      </div>

      {/* Meal Suggestion */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button
          onClick={() => setActiveSection(activeSection === 'meal' ? null : 'meal')}
          className="w-full p-5 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={18} className="text-[#5B8C5A]" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.meal.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{content.meal.category}</p>
            </div>
          </div>
          {activeSection === 'meal' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {activeSection === 'meal' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4 animate-fade-in">
            <p className="text-sm text-gray-600 leading-relaxed">{content.meal.desc}</p>
          </div>
        )}
      </div>

      {/* Wellness Challenge */}
      <div className="bg-gradient-to-r from-[#E8F0E9] to-[#F5E6D3] rounded-2xl p-5 border border-[#5B8C5A]/10">
        <div className="flex items-center space-x-2 mb-3">
          <Target size={18} className="text-[#5B8C5A]" />
          <h3 className="font-bold text-gray-900 text-sm">Today's Challenge</h3>
        </div>
        <div className="bg-white/60 p-4 rounded-xl border border-[#5B8C5A]/10">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{content.challenge.icon}</span>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{content.challenge.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{content.challenge.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedProtocol;
