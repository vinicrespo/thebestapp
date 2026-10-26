import React, { useState, useEffect } from 'react';
import { getProfile, getProgress, toggleDayCompletion, saveDailyHabits, getHydration, saveHydration, getUnits, setUnits, convertRecipeUnits } from '../utils/storage';
import { getDailyProtocol, getMotivationalQuote, PHASES, BADGES, DID_YOU_KNOW } from '../utils/protocol';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, Check, Droplets, Activity, Heart, ArrowRight, Award, Sparkles, BookOpen, ShoppingCart, Moon, UtensilsCrossed, ChevronDown, ChevronUp, HelpCircle, X, Zap, RefreshCw, Megaphone, ClipboardCheck, LayoutGrid } from 'lucide-react';
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
  const [showCalendar, setShowCalendar] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const units = getUnits();
  const [dismissedUpdates, setDismissedUpdates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('alkalean_dismissed_updates') || '[]'); } catch { return []; }
  });

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

  const APP_UPDATES = [
    {
      id: 'diagnostic-quiz',
      date: 'Oct 26',
      tag: 'NEW',
      tagColor: 'bg-purple-100 text-purple-700',
      title: 'Results Diagnostic Quiz',
      desc: 'Completed 30 days without the results you expected? This diagnostic identifies exactly what went wrong and how to fix it.',
      action: () => navigate('/diagnostic'),
      actionLabel: 'Take the Quiz',
      icon: <ClipboardCheck size={16} className="text-purple-600" />,
    },
    {
      id: 'extended-180',
      date: 'Oct 19',
      tag: 'NEW',
      tagColor: 'bg-emerald-100 text-emerald-700',
      title: '180-Day Extended Protocol',
      desc: 'A full 6-month protocol with daily alkaline shots, recipes, and challenges that never repeat. Your longest transformation journey yet.',
      action: () => navigate('/extended'),
      actionLabel: 'Explore Now',
    },
  ];

  const latestUpdate = !dismissedUpdates.includes(APP_UPDATES[0].id) ? APP_UPDATES[0] : null;

  const dismissUpdate = (id) => {
    const next = [...dismissedUpdates, id];
    setDismissedUpdates(next);
    localStorage.setItem('alkalean_dismissed_updates', JSON.stringify(next));
  };

  const hasGut = true;
  const hasHormones = true;
  const hasSkin = true;

  return (
    <div className="pb-8">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Top Bar — Updated Weekly */}
      <div className="bg-gradient-to-r from-[#6B3FA0] to-[#5A2E8E] px-4 py-2.5 flex items-center justify-center space-x-2">
        <RefreshCw size={13} className="text-white/80" />
        <p className="text-[11px] text-white font-semibold tracking-wide">New updates being validated by specialists</p>
      </div>

      {newBadge && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 animate-fade-in" onClick={() => setNewBadge(null)}>
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-scale-in max-w-xs mx-4">
            <div className="text-5xl mb-3">{newBadge.icon}</div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">{newBadge.title}</h3>
            <p className="text-sm text-gray-500">{newBadge.desc}</p>
            <p className="text-xs text-[#6B3FA0] font-semibold mt-4">New badge unlocked!</p>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 animate-fade-in" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-3xl p-6 shadow-2xl animate-scale-in max-w-sm mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900">How to Use AlkaLean</h2>
              <button onClick={() => setShowHelp(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <div className="bg-[#F0ECF9] rounded-xl p-4">
                <h3 className="font-bold text-[#6B3FA0] mb-1">Step 1: Start with Day 1</h3>
                <p>Your <strong>30-Day Calendar</strong> is your main protocol. Each day has a unique alkaline shot recipe and health tip. Follow it in order — Day 1, Day 2, etc.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-bold text-blue-600 mb-1">Step 2: Track Your Habits</h3>
                <p>Below your daily protocol, track your <strong>water intake</strong> and <strong>daily habits</strong> (water, steps, shot). These build your streak and unlock badges!</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <h3 className="font-bold text-amber-600 mb-1">Step 3: Explore Your Bonuses</h3>
                <p>You have access to the <strong>Extended Protocol</strong> (180 days of recipes), <strong>Year-End Challenge</strong>, and bonus content like Sleep Guide, Journal & Recipes.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-bold text-purple-600 mb-1">Step 4: Use Your Upgrades</h3>
                <p>In the bottom menu, access your activated upgrades: <strong>7X Accelerator</strong> (gut health), <strong>Hormonal Balance</strong>, and <strong>Anti-Sagging Skin</strong>. Each has its own multi-week protocol.</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-4">
                <h3 className="font-bold text-rose-600 mb-1">New Content Every Week</h3>
                <p>This app is <strong>updated weekly</strong> with new recipes, tips, challenges, and features. Keep checking back — there's always something new!</p>
              </div>
            </div>
            {/* Unit Preference */}
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-bold text-gray-700 text-sm mb-2">Measurement Units</h3>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => { setUnits('imperial'); window.location.reload(); }}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all ${units === 'imperial' ? 'bg-[#6B3FA0] text-white' : 'bg-white text-gray-500'}`}
                >
                  lbs / oz
                </button>
                <button
                  onClick={() => { setUnits('metric'); window.location.reload(); }}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all ${units === 'metric' ? 'bg-[#6B3FA0] text-white' : 'bg-white text-gray-500'}`}
                >
                  kg / ml
                </button>
              </div>
            </div>
            <button onClick={() => setShowHelp(false)} className="w-full mt-4 bg-[#6B3FA0] text-white font-semibold py-3 rounded-xl">Got it!</button>
          </div>
        </div>
      )}

      <div className="p-5">

      {/* Greeting + Help Button */}
      <div className="flex justify-between items-start mb-5 pt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}{displayName ? `, ${displayName}` : ''}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Day {completedCount + 1} of your journey</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setShowHelp(true)} className="p-2 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-all">
            <HelpCircle size={18} className="text-gray-400" />
          </button>
          <div className="flex items-center space-x-1.5 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-200">
            <Flame size={16} className={progress.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
            <span className="font-bold text-orange-600 text-sm">{progress.streak}</span>
          </div>
        </div>
      </div>

      {/* All Features Button */}
      <button
        onClick={() => navigate('/features')}
        className="w-full flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#F0ECF9] rounded-xl flex items-center justify-center">
            <LayoutGrid size={20} className="text-[#6B3FA0]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">All Features</p>
            <p className="text-[11px] text-gray-500">Explore everything in your app</p>
          </div>
        </div>
        <ArrowRight size={16} className="text-gray-400" />
      </button>

      {/* What's New — latest only */}
      {latestUpdate && (
        <div className="mb-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6B3FA0] to-[#D4874D]" />
            <div className="pl-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Megaphone size={13} className="text-[#6B3FA0]" />
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${latestUpdate.tagColor}`}>{latestUpdate.tag}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{latestUpdate.date}</span>
                </div>
                <button onClick={() => dismissUpdate(latestUpdate.id)} className="p-1 rounded-full hover:bg-gray-100 transition-all">
                  <X size={14} className="text-gray-300" />
                </button>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{latestUpdate.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{latestUpdate.desc}</p>
              <button
                onClick={latestUpdate.action}
                className="flex items-center space-x-1.5 text-xs font-bold text-[#6B3FA0] hover:text-[#5A2E8E] transition-colors"
              >
                <span>{latestUpdate.actionLabel}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* START HERE — Getting Started Card */}
      <div className="bg-gradient-to-br from-[#6B3FA0] to-[#4A2580] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl opacity-5 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/15 px-2.5 py-0.5 rounded-full">Start Here</span>
          </div>
          <h2 className="font-bold text-lg mb-1">Your 30-Day AlkaLean Protocol</h2>
          <p className="text-white/70 text-xs leading-relaxed">Follow your daily shot recipe below. Mark each day complete to build your streak and unlock badges.</p>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Your Phase</h3>
          <span className="text-xs font-bold text-[#6B3FA0]">{completedCount}/30 days</span>
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

      {/* 30-Day Calendar (open by default) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-full p-5 flex justify-between items-center"
        >
          <h3 className="font-bold text-gray-900 flex items-center text-sm">
            <CalendarIcon size={16} className="text-[#6B3FA0] mr-2" />
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
                      isCompleted && isSelected ? 'bg-[#6B3FA0] text-white ring-3 ring-[#6B3FA0]/20' :
                      isCompleted ? 'bg-[#6B3FA0] text-white' :
                      isSelected ? 'bg-white border-2 border-[#D4874D] text-[#D4874D] ring-3 ring-[#D4874D]/10' :
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

        <div className="bg-[#F9F7FC] rounded-xl p-4 mb-4 border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 leading-relaxed">
            {convertRecipeUnits(protocol.recipe, units)}
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Today's Tip</h3>
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-[#D4874D] pl-3">
            {protocol.tip}
          </p>
        </div>

        <button
          onClick={handleToggleShot}
          className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
            isSelectedDayCompleted
              ? 'bg-[#F0ECF9] text-[#6B3FA0] border border-[#6B3FA0]/20'
              : 'bg-[#6B3FA0] text-white shadow-lg shadow-[#6B3FA0]/20 hover:bg-[#5A2E8E]'
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
          {hydration.glasses >= 8 ? 'Daily Goal Reached!' : '+ Add Glass of Water'}
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
            { id: 'water', label: units === 'metric' ? '2L Water' : '64oz Water', icon: <Droplets size={18} />, color: 'text-blue-500' },
            { id: 'steps', label: '7K Steps', icon: <Activity size={18} />, color: 'text-green-500' },
            { id: 'supplements', label: 'Shot Taken', icon: <Heart size={18} />, color: 'text-rose-400' }
          ].map(h => (
            <button
              key={h.id}
              onClick={() => handleHabitToggle(h.id)}
              className={`p-3.5 rounded-xl flex flex-col items-center justify-center space-y-1.5 border-2 transition-all ${
                progress.dailyHabits?.[h.id] ? 'bg-[#F0ECF9] border-[#6B3FA0]/30' : 'bg-gray-50 border-transparent'
              }`}
            >
              <span className={progress.dailyHabits?.[h.id] ? 'text-[#6B3FA0]' : h.color}>{h.icon}</span>
              <span className={`text-[10px] font-bold ${progress.dailyHabits?.[h.id] ? 'text-[#6B3FA0]' : 'text-gray-500'}`}>{h.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
          <CalendarIcon size={16} className="text-[#6B3FA0] mr-2" /> Weekly Summary
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-[#F0ECF9] rounded-xl">
            <p className="text-lg font-black text-[#6B3FA0]">{completedCount}</p>
            <p className="text-[9px] text-gray-500 font-bold">Days Done</p>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded-xl">
            <p className="text-lg font-black text-orange-600">{progress.streak}</p>
            <p className="text-[9px] text-gray-500 font-bold">Streak</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-xl">
            <p className="text-lg font-black text-blue-600">{hydration.glasses}</p>
            <p className="text-[9px] text-gray-500 font-bold">Water</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-xl">
            <p className="text-lg font-black text-purple-600">{(progress.badges || []).length}</p>
            <p className="text-[9px] text-gray-500 font-bold">Badges</p>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-[#FEF0E4] to-[#F0ECF9] rounded-2xl p-4 mb-5 border border-[#D4874D]/20">
        <p className="text-sm text-gray-700 italic leading-relaxed text-center">"{quote}"</p>
      </div>

      {/* Active Upgrades */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
          <Zap size={16} className="text-amber-500 mr-2" /> Your Active Upgrades
        </h3>
        <div className="space-y-2">
          {hasGut && (
            <button onClick={() => navigate('/gut')} className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-sm transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Flame size={16} className="text-emerald-600" /></div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">7X Accelerator</p>
                  <p className="text-[10px] text-gray-500">60-day gut health protocol</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                <ArrowRight size={14} className="text-gray-400" />
              </div>
            </button>
          )}
          {hasHormones && (
            <button onClick={() => navigate('/hormones')} className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:shadow-sm transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"><Droplets size={16} className="text-purple-600" /></div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">Hormonal Balance</p>
                  <p className="text-[10px] text-gray-500">45-day hormonal protocol</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                <ArrowRight size={14} className="text-gray-400" />
              </div>
            </button>
          )}
          {hasSkin && (
            <button onClick={() => navigate('/skin')} className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100 hover:shadow-sm transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center"><Sparkles size={16} className="text-rose-600" /></div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-900">Anti-Sagging Skin</p>
                  <p className="text-[10px] text-gray-500">60-day collagen protocol</p>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                <ArrowRight size={14} className="text-gray-400" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Extended Protocols */}
      <div className="space-y-3 mb-5">
        <button
          onClick={() => navigate('/extended')}
          className="w-full bg-gradient-to-r from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-4 text-left relative overflow-hidden border border-gray-800"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4874D] rounded-full blur-3xl opacity-15 -mr-8 -mt-8" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4874D] bg-[#D4874D]/10 px-2 py-0.5 rounded-full">180 Days</span>
              </div>
              <h3 className="font-bold text-white text-sm">Extended Protocol</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Daily shots, recipes & challenges that never repeat.</p>
            </div>
            <ArrowRight size={18} className="text-[#D4874D] flex-shrink-0 ml-3" />
          </div>
        </button>

        <button
          onClick={() => navigate('/yearend')}
          className="w-full bg-gradient-to-r from-red-900 to-green-900 rounded-2xl p-4 text-left relative overflow-hidden border border-red-800"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-15 -mr-8 -mt-8" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-red-300 bg-red-500/20 px-2 py-0.5 rounded-full">Bonus</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-green-300 bg-green-500/20 px-2 py-0.5 rounded-full">Oct-Dec</span>
              </div>
              <h3 className="font-bold text-white text-sm">Year-End Finish Line Protocol</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">97 daily missions to close the year as your best self.</p>
            </div>
            <ArrowRight size={18} className="text-red-300 flex-shrink-0 ml-3" />
          </div>
        </button>
      </div>

      {/* Did You Know */}
      <div className="bg-gradient-to-r from-[#F0ECF9] to-[#FEF0E4] rounded-2xl p-5 mb-5 border border-[#8B6DB5]/20">
        <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
          <Sparkles size={14} className="text-[#D4874D] mr-1.5" /> Did You Know?
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
            <Award size={16} className="text-[#D4874D] mr-2" /> Your Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map(id => {
              const badge = BADGES[id];
              if (!badge) return null;
              return (
                <div key={id} className="bg-gradient-to-r from-[#FEF0E4] to-[#F0ECF9] px-3 py-2 rounded-xl flex items-center space-x-2 border border-[#D4874D]/20">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-bold text-gray-700">{badge.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}


      </div>
    </div>
  );
};

export default Dashboard;
