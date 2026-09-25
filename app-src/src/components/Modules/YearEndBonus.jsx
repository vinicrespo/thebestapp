import React, { useState, useEffect } from 'react';
import { getYearEndDayContent, YEAR_END_MONTHS } from '../../utils/yearEndBonus';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Check, Target, Calendar, Star, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alkalean_yearend_progress';

const getYEProgress = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
};

const saveYEProgress = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const YearEndBonus = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [showMonths, setShowMonths] = useState(false);

  const totalDays = 97;

  useEffect(() => {
    const progress = getYEProgress();
    setCompletedDays(progress.completed || []);
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastDate !== today) {
      const newDay = Math.min((progress.day || 0) + 1, totalDays);
      setSelectedDay(newDay);
      saveYEProgress({ ...progress, day: newDay, lastDate: today });
    } else {
      setSelectedDay(progress.day || 1);
    }
  }, []);

  const toggleDayComplete = () => {
    const progress = getYEProgress();
    let completed = progress.completed || [];
    if (completed.includes(selectedDay)) {
      completed = completed.filter(d => d !== selectedDay);
    } else {
      completed = [...completed, selectedDay];
    }
    setCompletedDays(completed);
    saveYEProgress({ ...progress, completed });
  };

  const content = getYearEndDayContent(selectedDay);
  const isDayComplete = completedDays.includes(selectedDay);
  const completedCount = completedDays.length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <div className="flex items-center space-x-2 mb-1">
          <Gift size={24} className="text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">Year-End Bonus</h1>
        </div>
        <p className="text-gray-500 text-sm">Your 97-Day Finish Line Protocol (Oct-Dec)</p>
      </div>

      {/* Month Progress */}
      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{content.month.icon}</span>
              <div>
                <h2 className="font-bold text-red-400 text-sm">{content.month.name}</h2>
                <p className="text-[10px] text-gray-400">Day {selectedDay} of {totalDays}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500">{completedCount}/{totalDays}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-green-500 h-full rounded-full transition-all duration-700" style={{ width: `${(completedCount / totalDays) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{content.month.desc}</p>
        </div>
      </div>

      {/* Months Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button onClick={() => setShowMonths(!showMonths)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">Monthly Roadmap</h3>
          {showMonths ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showMonths && (
          <div className="px-4 pb-4 space-y-2">
            {YEAR_END_MONTHS.map((month, i) => {
              const ranges = [[1,31],[32,61],[62,97]];
              const isActive = selectedDay >= ranges[i][0] && selectedDay <= ranges[i][1];
              const isDone = selectedDay > ranges[i][1];
              return (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${isActive ? 'border-red-200 bg-red-50' : isDone ? 'border-[#5B8C5A]/20 bg-[#E8F0E9]/30' : 'border-gray-100 bg-gray-50'}`}>
                  <span className="text-lg">{month.icon}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isActive ? 'text-red-600' : isDone ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{month.name}</p>
                  </div>
                  {isDone && <Check size={14} className="text-[#5B8C5A]" />}
                  {isActive && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
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
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{content.month.name.split(':')[0]}</p>
        </div>
        <button onClick={() => setSelectedDay(d => Math.min(totalDays, d + 1))} disabled={selectedDay >= totalDays} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Weekly Theme */}
      <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-2xl p-4 mb-4 border border-red-200/30">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar size={16} className="text-red-500" />
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">This Week's Focus</h3>
        </div>
        <p className="text-sm text-gray-700 font-medium">{content.weekTheme}</p>
      </div>

      {/* Daily Mission */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target size={18} className="text-red-500" />
            <h3 className="font-bold text-gray-900 text-sm">Today's Mission</h3>
          </div>
          <button onClick={toggleDayComplete} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isDayComplete ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300 hover:border-[#5B8C5A]'}`}>
            {isDayComplete && <Check size={16} className="text-white" />}
          </button>
        </div>
        <div className={`p-4 rounded-xl border-2 ${isDayComplete ? 'bg-[#E8F0E9] border-[#5B8C5A]/20' : 'bg-gray-50 border-gray-100'}`}>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{content.mission.icon}</span>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">{content.mission.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{content.mission.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 mb-4 border border-[#D4A574]/20">
        <div className="flex items-center space-x-2 mb-3">
          <Star size={18} className="text-amber-500" />
          <h3 className="font-bold text-gray-900 text-sm">Daily Motivation</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed italic">"{content.quote}"</p>
      </div>

      {/* Streak Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3">Your Year-End Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-red-50 rounded-xl">
            <p className="text-2xl font-black text-red-600">{completedCount}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Days Done</p>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <p className="text-2xl font-black text-amber-600">{totalDays - completedCount}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Remaining</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <p className="text-2xl font-black text-green-600">{Math.round((completedCount / totalDays) * 100)}%</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearEndBonus;
