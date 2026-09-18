import React, { useState, useEffect } from 'react';
import { getProfile, getProgress, toggleDayCompletion, saveDailyHabits, getHydration, saveHydration } from '../utils/storage';
import { getDailyProtocol, getMotivationalQuote, PHASES, BADGES, DID_YOU_KNOW } from '../utils/protocol';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, Check, Droplets, Activity, Heart, ArrowRight, Lock, Award, Sparkles, BookOpen, ShoppingCart, Moon, UtensilsCrossed, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from './Confetti';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [hydration, setHydration] = useState({ glasses: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const prof = getProfile();
    const prog = getProgress();
    setProfile(prof);
    setProgress(prog);
    setSelectedDay(prog.currentDay);
    setHydration(getHydration());
  }, []);

  const handleToggleShot = () => {
    const oldBadges = [...(progress.badges || [])];
    const newProgress = toggleDayCompletion(selectedDay);
    setProgress(newProgress);

    const addedBadges = (newProgress.badges || []).filter(b => !oldBadges.includes(b));
    if (addedBadges.length > 0 && !progress.completedDays.includes(selectedDay)) {
      setNewBadge(BADGES[addedBadges[addedBadges.length - 1]]);
      setShowConfetti(true);
      setTimeout(() => setNewBadge(null), 4000);
    } else if (!progress.completedDays.includes(selectedDay)) {
      setShowConfetti(true);
    }
  };

  const handleHabitToggle = (habit) => {
    const newHabits = { ...progress.dailyHabits, [habit]: !progress.dailyHabits[habit] };
    setProgress({ ...progress, dailyHabits: newHabits });
    saveDailyHabits(newHabits);
  };

  const handleAddWater = () => {
    const newGlasses = Math.min(hydration.glasses + 1, 10);
    setHydration({ ...hydration, glasses: newGlasses });
    saveHydration(newGlasses);
  };

  if (!profile || !progress) return null;

  const protocol = getDailyProtocol(selectedDay, profile);
  const isSelectedDayCompleted = progress.completedDays.includes(selectedDay);
  const quote = getMotivationalQuote();
  const completedCount = progress.completedDays.length;
  const currentPhase = PHASES.find((p, i) => {
    const next = PHASES[i + 1];
    return !next || completedCount < parseInt(next.range.split(' ')[0].replace('Days ', ''));
  }) || PHASES[0];

  const phaseForDay = (day) => {
    if (day <= 7) return PHASES[0];
    if (day <= 14) return PHASES[1];
    if (day <= 21) return PHASES[2];
    return PHASES[3];
  };

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const didYouKnow = DID_YOU_KNOW[dayOfYear % DID_YOU_KNOW.length];

  const displayName = profile.name ? profile.name.split(' ')[0] : '';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="p-5 pb-8">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {newBadge && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 animate-fade-in" onClick={() => setNewBadge(null)}>
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-scale-in max-w-xs mx-4">
            <div className="text-5xl mb-3">{newBadge.icon}</div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">{newBadge.title}</h3>
            <p className="text-sm text-gray-500">{newBadge.desc}</p>
            <p className="text-xs text-[#5B8C5A] font-semibold mt-4">New badge unlocked!</p>
          </div>
        </div>
      )}

      {/* Greeting */}
      <div className="flex justify-between items-start mb-5 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}{displayName ? `, ${displayName}` : ''} 🌿
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Day {completedCount + 1} of your journey</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-200">
            <Flame size={16} className={progress.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
            <span className="font-bold text-orange-600 text-sm">{progress.streak}</span>
          </div>
        </div>
      </div>

      {/* New Feature Banner */}
      <button
        onClick={() => navigate('/extended')}
        className="w-full bg-gradient-to-r from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-4 mb-5 text-left relative overflow-hidden border border-gray-800"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A574] rounded-full blur-3xl opacity-15 -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5B8C5A] rounded-full blur-3xl opacity-10 -ml-6 -mb-6" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4A574] bg-[#D4A574]/10 px-2 py-0.5 rounded-full">New</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Update</span>
              </div>
              <h3 className="font-bold text-white text-sm">180-Day Extended Protocol</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Daily shots, recipes & challenges that never repeat. More updates coming soon.</p>
            </div>
            <ArrowRight size={18} className="text-[#D4A574] flex-shrink-0 ml-3" />
          </div>
        </div>
      </button>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-4 mb-5 border border-[#D4A574]/20">
        <p className="text-sm text-gray-700 italic leading-relaxed text-center">"{quote}"</p>
      </div>

      {/* Phase Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Your Phase</h3>
          <span className="text-xs font-bold text-[#5B8C5A]">{completedCount}/30 days</span>
        </div>
        <div className="flex space-x-1.5 mb-3">
          {PHASES.map((phase, i) => {
            const phaseStart = [0, 7, 14, 21][i];
            const phaseEnd = [7, 14, 21, 30][i];
            const phaseProgress = Math.min(Math.max((completedCount - phaseStart) / (phaseEnd - phaseStart), 0), 1);
            const isActive = completedCount >= phaseStart && completedCount < phaseEnd;
            const isCompleted = completedCount >= phaseEnd;

            return (
              <div key={i} className="flex-1">
                <div className={`h-2 rounded-full overflow-hidden ${isCompleted || isActive ? 'bg-gray-200' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${phase.color}`}
                    style={{ width: `${isCompleted ? 100 : isActive ? phaseProgress * 100 : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{phaseForDay(completedCount + 1).icon}</span>
          <div>
            <p className="text-xs font-bold text-gray-900">{phaseForDay(completedCount + 1).name}</p>
            <p className="text-[10px] text-gray-400">{phaseForDay(completedCount + 1).range}</p>
          </div>
        </div>
      </div>

      {/* 30-Day Calendar (collapsible) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full p-5 flex justify-between items-center"
        >
          <h3 className="font-bold text-gray-900 flex items-center text-sm">
            <CalendarIcon size={16} className="text-[#5B8C5A] mr-2" />
            30-Day Calendar
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-400">{completedCount}/30</span>
            {showCalendar ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </button>
        {showCalendar && (
          <div className="px-5 pb-5 pt-0">
            <div className="grid grid-cols-6 gap-y-2.5 gap-x-2 place-items-center">
              {Array.from({ length: 30 }, (_, i) => i + 1).map(i => {
                const isCompleted = progress.completedDays.includes(i);
                const isSelected = selectedDay === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isCompleted && isSelected ? 'bg-[#5B8C5A] text-white ring-3 ring-[#5B8C5A]/20' :
                      isCompleted ? 'bg-[#5B8C5A] text-white' :
                      isSelected ? 'bg-white border-2 border-[#D4A574] text-[#D4A574] ring-3 ring-[#D4A574]/10' :
                      'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : i}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Daily Protocol Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Day {selectedDay} Protocol</h2>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-gradient-to-r ${phaseForDay(selectedDay).color} text-white`}>
            {protocol.phase}
          </span>
        </div>

        <div className="bg-[#FAFAF7] rounded-xl p-4 mb-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 leading-relaxed">
            {protocol.recipe}
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Today's Tip</h3>
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-[#D4A574] pl-3">
            {protocol.tip}
          </p>
        </div>

        <button
          onClick={handleToggleShot}
          className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
            isSelectedDayCompleted
              ? 'bg-[#E8F0E9] text-[#5B8C5A] border border-[#5B8C5A]/20'
              : 'bg-[#5B8C5A] text-white shadow-lg shadow-[#5B8C5A]/20 hover:bg-[#4A7A49]'
          }`}
        >
          {isSelectedDayCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          <span>{isSelectedDayCompleted ? `Day ${selectedDay} Completed ✓` : `Mark Day ${selectedDay} as Done`}</span>
        </button>
      </div>

      {/* Hydration Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm flex items-center">
            <Droplets size={16} className="text-blue-400 mr-2" />
            Hydration Tracker
          </h3>
          <span className="text-xs font-bold text-blue-400">{hydration.glasses}/8 glasses</span>
        </div>
        <div className="flex space-x-1.5 mb-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className={`flex-1 h-8 rounded-lg transition-all duration-300 ${i < hydration.glasses ? 'bg-blue-400' : 'bg-blue-50 border border-blue-100'}`} />
          ))}
        </div>
        <button
          onClick={handleAddWater}
          disabled={hydration.glasses >= 8}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            hydration.glasses >= 8
              ? 'bg-blue-50 text-blue-400'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
          }`}
        >
          {hydration.glasses >= 8 ? '💧 Daily Goal Reached!' : '+ Add Glass of Water'}
        </button>
      </div>

      {/* Micro-Habits */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Daily Habits</h3>
          <span className="text-xs text-gray-400 font-bold">
            {Object.values(progress.dailyHabits || {}).filter(Boolean).length}/3
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'water', label: '64oz Water', icon: <Droplets size={18} />, color: 'text-blue-500' },
            { id: 'steps', label: '7K Steps', icon: <Activity size={18} />, color: 'text-green-500' },
            { id: 'supplements', label: 'Shot Taken', icon: <Heart size={18} />, color: 'text-rose-400' }
          ].map(h => (
            <button
              key={h.id}
              onClick={() => handleHabitToggle(h.id)}
              className={`p-3.5 rounded-xl flex flex-col items-center justify-center space-y-1.5 border-2 transition-all ${
                progress.dailyHabits?.[h.id] ? 'bg-[#E8F0E9] border-[#5B8C5A]/30' : 'bg-gray-50 border-transparent'
              }`}
            >
              <span className={progress.dailyHabits?.[h.id] ? 'text-[#5B8C5A]' : h.color}>{h.icon}</span>
              <span className={`text-[10px] font-bold ${progress.dailyHabits?.[h.id] ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Did You Know */}
      <div className="bg-gradient-to-r from-[#E8F0E9] to-[#F5E6D3] rounded-2xl p-5 mb-5 border border-[#7C9A82]/20">
        <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
          <Sparkles size={14} className="text-[#D4A574] mr-1.5" /> Did You Know?
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{didYouKnow}</p>
      </div>

      {/* Quick Access Grid */}
      <h3 className="font-bold text-gray-900 text-sm mb-3 px-1">Bonus Content</h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: <ShoppingCart size={20} />, label: "Shopping List", path: "/shopping", color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
          { icon: <UtensilsCrossed size={20} />, label: "Bonus Recipes", path: "/recipes", color: "bg-orange-50 text-orange-500", border: "border-orange-100" },
          { icon: <Moon size={20} />, label: "Sleep Guide", path: "/sleep", color: "bg-indigo-50 text-indigo-500", border: "border-indigo-100" },
          { icon: <BookOpen size={20} />, label: "My Journal", path: "/journal", color: "bg-rose-50 text-rose-400", border: "border-rose-100" },
        ].map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className={`${item.color} ${item.border} border p-4 rounded-2xl flex flex-col items-center space-y-2 hover:shadow-sm transition-all`}
          >
            {item.icon}
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Badges */}
      {progress.badges && progress.badges.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
          <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
            <Award size={16} className="text-[#D4A574] mr-2" /> Your Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map(id => {
              const badge = BADGES[id];
              if (!badge) return null;
              return (
                <div key={id} className="bg-gradient-to-r from-[#F5E6D3] to-[#E8F0E9] px-3 py-2 rounded-xl flex items-center space-x-2 border border-[#D4A574]/20">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-bold text-gray-700">{badge.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-center mt-8 mb-4 px-4">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Educational content only. Consult your doctor before making any changes to your routine. Individual results may vary. This app does not replace professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
