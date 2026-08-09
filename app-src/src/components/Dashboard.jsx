import React, { useState, useEffect } from 'react';
import { getProfile, getProgress, toggleDayCompletion, saveDailyHabits } from '../utils/storage';
import { getDailyProtocol } from '../utils/protocol';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, Check, Droplets, Activity, Heart, ArrowRight, Play, Lock, Award } from 'lucide-react';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    const prof = getProfile();
    const prog = getProgress();
    setProfile(prof);
    setProgress(prog);
    setSelectedDay(prog.currentDay);
  }, []);

  const handleToggleShot = () => {
    const newProgress = toggleDayCompletion(selectedDay);
    setProgress(newProgress);
  };

  const handleHabitToggle = (habit) => {
    const newHabits = { ...progress.dailyHabits, [habit]: !progress.dailyHabits[habit] };
    setProgress({ ...progress, dailyHabits: newHabits });
    saveDailyHabits(newHabits);
  };

  if (!profile || !progress) return <div className="p-6">Loading...</div>;

  const protocol = getDailyProtocol(selectedDay, profile);
  const isSelectedDayCompleted = progress.completedDays.includes(selectedDay);

  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const isCompleted = progress.completedDays.includes(i);
      const isSelected = selectedDay === i;

      days.push(
        <button 
          key={i} 
          onClick={() => setSelectedDay(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${
            isCompleted && isSelected ? 'bg-purple-900 text-white ring-4 ring-purple-200' :
            isCompleted ? 'bg-purple-800 text-white opacity-80' : 
            isSelected ? 'bg-white border-2 border-orange-500 text-orange-500 ring-4 ring-orange-100' : 
            'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          {isCompleted ? <Check size={16} strokeWidth={3} /> : i}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 flex items-center">
            <CalendarIcon size={18} className="text-purple-900 mr-2" />
            30-Day Map
          </h3>
          <span className="text-xs font-bold text-gray-400 uppercase">
            {progress.completedDays.length} / 30 Completed
          </span>
        </div>
        <div className="grid grid-cols-6 gap-y-3 gap-x-2 place-items-center">
          {days}
        </div>
      </div>
    );
  };

  const renderDailyHabits = () => {
    const habits = [
      { id: 'water', label: '64oz Water', icon: <Droplets size={16} className="text-blue-500" /> },
      { id: 'steps', label: '7,000 Steps', icon: <Activity size={16} className="text-green-500" /> },
      { id: 'supplements', label: 'Supplements', icon: <Heart size={16} className="text-red-500" /> }
    ];
    
    const completedCount = Object.values(progress.dailyHabits || {}).filter(Boolean).length;
    const progressPercent = (completedCount / 3) * 100;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-gray-900">Micro-Habits</h3>
          <span className="text-xs text-gray-400 font-bold">{completedCount}/3</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div className="bg-purple-900 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {habits.map(h => (
            <button 
              key={h.id}
              onClick={() => handleHabitToggle(h.id)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-2 border transition-all ${
                progress.dailyHabits?.[h.id] ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              {h.icon}
              <span className={`text-[10px] font-bold ${progress.dailyHabits?.[h.id] ? 'text-purple-900' : 'text-gray-500'}`}>{h.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderYearPlan = () => (
    <div className="space-y-4">
      <div className="bg-purple-900 text-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="font-bold text-xl mb-2 text-orange-500">The 1-Year Optimization</h2>
        <p className="text-sm text-purple-100 leading-relaxed">
          The first 30 days is the Biological Reset. Months 2-12 are about Maintenance and Optimization. This is where your new metabolism becomes permanent.
        </p>
      </div>

      {[
        { month: "Months 2-3: The Stabilization", focus: "Gut lining hardening, hormonal plateau breaking. Introduce 2 days of 16-hour fasting per week." },
        { month: "Months 4-6: Cellular Autophagy", focus: "Deep fat-store release. Start incorporating high-intensity interval training (HIIT) 2x a week." },
        { month: "Months 7-12: The New Baseline", focus: "Your body no longer recognizes its old set-point weight. Maintenance mode requires only 3 days of protocols per week." }
      ].map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden flex items-start space-x-4">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col text-gray-500">
            <Lock size={24} className="mb-2 text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Unlocks after 30-Day Reset</span>
          </div>
          <div className="bg-orange-100 p-3 rounded-xl text-orange-500 font-bold opacity-30">M{i+2}</div>
          <div className="opacity-30">
            <h4 className="font-bold text-gray-900 text-sm mb-1">{item.month}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{item.focus}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      {/* Monthly Updates Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 mb-6 text-white text-center shadow-md animate-pulse">
        <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">System Update</p>
        <p className="text-sm font-semibold">🗓️ August Update: New Fat-Burning Protocols Added!</p>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning.</h1>
          <p className="text-gray-500">Welcome to your dashboard.</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1.5 rounded-full text-orange-600 font-bold text-sm shadow-sm mb-2">
            <Flame size={16} className={progress.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
            <span>{progress.streak}</span>
          </div>
          {progress.streak > 3 && (
            <div className="flex items-center space-x-1 text-[10px] font-bold text-green-600 uppercase">
              <Award size={12} />
              <span>Top 12% Consistency!</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'daily' ? 'bg-white shadow-sm text-purple-900' : 'text-gray-500'}`}
        >
          Daily Protocol
        </button>
        <button 
          onClick={() => setActiveTab('year')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'year' ? 'bg-white shadow-sm text-purple-900' : 'text-gray-500'}`}
        >
          Year 1 Plan
        </button>
      </div>

      {activeTab === 'daily' ? (
        <>
          {renderCalendar()}
          {renderDailyHabits()}

          {/* Dynamic Recipe Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Day {selectedDay} Protocol</h2>
              <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-1 rounded uppercase tracking-wider">
                {protocol.phase}
              </span>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
              <p className="text-sm font-bold text-gray-800 leading-relaxed">
                {protocol.recipe}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Doctor's Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-orange-500 pl-3">
                {protocol.tip}
              </p>
            </div>

            <button 
              onClick={handleToggleShot}
              className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
                isSelectedDayCompleted 
                  ? 'bg-purple-50 text-purple-900 border border-purple-200' 
                  : 'bg-purple-900 text-white shadow-lg shadow-purple-900/30 hover:bg-purple-950'
              }`}
            >
              {isSelectedDayCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              <span>{isSelectedDayCompleted ? `Day ${selectedDay} Completed` : `Mark Day ${selectedDay} as Done`}</span>
            </button>
          </div>
        </>
      ) : (
        renderYearPlan()
      )}
    </div>
  );
};

export default Dashboard;
