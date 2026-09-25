import React, { useState, useEffect } from 'react';
import { getProfile } from '../../utils/storage';
import { getHormonalCalculator } from '../../utils/protocol';
import { getHormonalDayContent, HORMONAL_CYCLES, SYMPTOM_CATEGORIES } from '../../utils/hormonalProtocol';
import { Droplet, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Lightbulb, Check, Activity, BookOpen, UtensilsCrossed, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alkalean_hormonal_progress';

const getHormonalProgress = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
};

const saveHormonalProgress = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const HormonalShot = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [completedChecklist, setCompletedChecklist] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showCycles, setShowCycles] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    const progress = getHormonalProgress();
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastDate === today) {
      setCompletedChecklist(progress.checklist || {});
      setSymptoms(progress.symptoms || {});
      setSelectedDay(progress.day || 1);
    } else {
      setCompletedChecklist({});
      const newDay = Math.min((progress.day || 0) + 1, 45);
      setSelectedDay(newDay);
      saveHormonalProgress({ ...progress, day: newDay, lastDate: today, checklist: {} });
    }
  }, []);

  const toggleCheck = (idx) => {
    const next = { ...completedChecklist, [idx]: !completedChecklist[idx] };
    setCompletedChecklist(next);
    saveHormonalProgress({ ...getHormonalProgress(), checklist: next });
  };

  const rateSymptom = (id) => {
    const current = symptoms[id] || 0;
    const next = { ...symptoms, [id]: current >= 5 ? 0 : current + 1 };
    setSymptoms(next);
    saveHormonalProgress({ ...getHormonalProgress(), symptoms: next });
  };

  const content = getHormonalDayContent(selectedDay);
  const checklistDone = content.checklist.filter((_, i) => completedChecklist[i]).length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Hormonal Shot App</h1>
        <p className="text-gray-500 text-sm">45-Day Hormonal Balance Protocol</p>
      </div>

      {/* Dosage Card */}
      {profile && (
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-15 -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <Droplet size={20} className="text-pink-300" />
              <h2 className="font-bold text-sm">Your Personalized Dosage</h2>
            </div>
            <p className="text-sm text-purple-200 leading-relaxed bg-white/10 p-3 rounded-xl">
              {getHormonalCalculator(Number(profile.weight), Number(profile.age))}
            </p>
          </div>
        </div>
      )}

      {/* Cycle Progress */}
      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{content.cycle.icon}</span>
              <div>
                <h2 className="font-bold text-purple-400 text-sm">{content.cycle.name}</h2>
                <p className="text-[10px] text-gray-400">{content.cycle.range}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500">{selectedDay}/45</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-full rounded-full transition-all duration-700" style={{ width: `${(selectedDay / 45) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{content.cycle.desc}</p>
        </div>
      </div>

      {/* Cycles Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button onClick={() => setShowCycles(!showCycles)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">All Cycles</h3>
          {showCycles ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showCycles && (
          <div className="px-4 pb-4 space-y-2">
            {HORMONAL_CYCLES.map((cycle, i) => {
              const ranges = [[1,15],[16,30],[31,45]];
              const isActive = selectedDay >= ranges[i][0] && selectedDay <= ranges[i][1];
              const isDone = selectedDay > ranges[i][1];
              return (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${isActive ? 'border-purple-200 bg-purple-50' : isDone ? 'border-[#5B8C5A]/20 bg-[#E8F0E9]/30' : 'border-gray-100 bg-gray-50'}`}>
                  <span className="text-lg">{cycle.icon}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isActive ? 'text-purple-600' : isDone ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{cycle.name}</p>
                    <p className="text-[10px] text-gray-400">{cycle.range}</p>
                  </div>
                  {isDone && <Check size={14} className="text-[#5B8C5A]" />}
                  {isActive && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
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
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{content.cycle.name}</p>
        </div>
        <button onClick={() => setSelectedDay(d => Math.min(45, d + 1))} disabled={selectedDay >= 45} className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Morning Shot */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 mb-4 border border-purple-200/30">
        <div className="flex items-center space-x-2 mb-3">
          <Droplet size={18} className="text-purple-500" />
          <h3 className="font-bold text-gray-900 text-sm">Morning Hormonal Shot</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-purple-200/20">{content.shot}</p>
      </div>

      {/* Daily Routine Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ListChecks size={18} className="text-[#5B8C5A]" />
            <h3 className="font-bold text-gray-900 text-sm">Daily Routine</h3>
          </div>
          <span className="text-xs font-bold text-gray-400">{checklistDone}/{content.checklist.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500" style={{ width: `${(checklistDone / content.checklist.length) * 100}%` }} />
        </div>
        <div className="space-y-2">
          {content.checklist.map((item, i) => (
            <button key={i} onClick={() => toggleCheck(i)} className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all text-left ${completedChecklist[i] ? 'bg-[#E8F0E9] border-[#5B8C5A]/30' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
              <span className="text-lg">{item.icon}</span>
              <span className={`flex-1 text-sm ${completedChecklist[i] ? 'text-[#3D6B3D] line-through' : 'text-gray-700'}`}>{item.task}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedChecklist[i] ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
                {completedChecklist[i] && <Check size={12} className="text-white" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recipe */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'recipe' ? null : 'recipe')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={18} className="text-[#5B8C5A]" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.recipe.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{content.recipe.category} · {content.recipe.time}</p>
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

      {/* Educational Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'edu' ? null : 'edu')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen size={18} className="text-indigo-500" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.education.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Learn</p>
            </div>
          </div>
          {activeSection === 'edu' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {activeSection === 'edu' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.education.content}</p>
          </div>
        )}
      </div>

      {/* Symptom Tracker */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button onClick={() => setShowSymptoms(!showSymptoms)} className="w-full p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-pink-500" />
            <h3 className="font-bold text-gray-900 text-sm">Symptom Tracker</h3>
          </div>
          {showSymptoms ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showSymptoms && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-500 mb-3">Rate each symptom 0-5 (tap to cycle). Track weekly to see hormonal improvements.</p>
            <div className="grid grid-cols-2 gap-2">
              {SYMPTOM_CATEGORIES.map(s => {
                const level = symptoms[s.id] || 0;
                return (
                  <button key={s.id} onClick={() => rateSymptom(s.id)} className={`p-3 rounded-xl border-2 text-left transition-all ${level > 0 ? 'border-purple-200 bg-purple-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{s.icon}</span>
                      <div className="flex space-x-0.5">
                        {[1,2,3,4,5].map(n => (
                          <div key={n} className={`w-2 h-2 rounded-full ${n <= level ? 'bg-purple-500' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-700">{s.label}</p>
                    <p className="text-[10px] text-gray-400">{level}/5</p>
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

export default HormonalShot;
