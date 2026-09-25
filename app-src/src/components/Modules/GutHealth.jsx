import React, { useState, useEffect } from 'react';
import { getGutDayContent, GUT_PHASE_LIST, GI_SYMPTOMS } from '../../utils/gutProtocol';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Droplets, Moon, UtensilsCrossed, Lightbulb, Dumbbell, Check, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'alkalean_gut_progress';

const getGutProgress = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
};

const saveGutProgress = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const GutHealth = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeSection, setActiveSection] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [showPhases, setShowPhases] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    const progress = getGutProgress();
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastDate === today) {
      setCompletedTasks(progress.tasks || {});
      setSymptoms(progress.symptoms || {});
      setSelectedDay(progress.day || 1);
    } else {
      setCompletedTasks({});
      setSymptoms({});
      const newDay = Math.min((progress.day || 0) + 1, 60);
      setSelectedDay(newDay);
      saveGutProgress({ ...progress, day: newDay, lastDate: today, tasks: {}, symptoms: {} });
    }
  }, []);

  const toggleTask = (taskId) => {
    const next = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(next);
    saveGutProgress({ ...getGutProgress(), tasks: next });
  };

  const toggleSymptom = (id) => {
    const current = symptoms[id] || 0;
    const next = { ...symptoms, [id]: current >= 3 ? 0 : current + 1 };
    setSymptoms(next);
    saveGutProgress({ ...getGutProgress(), symptoms: next });
  };

  const content = getGutDayContent(selectedDay);
  const taskCount = ['morning', 'evening', 'recipe', 'exercise'].filter(t => completedTasks[t]).length;
  const severityLabels = ['None', 'Mild', 'Moderate', 'Severe'];
  const severityColors = ['bg-gray-200', 'bg-yellow-300', 'bg-orange-400', 'bg-red-500'];

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">7X Accelerator</h1>
        <p className="text-gray-500 text-sm">60-Day Gut Remodeling & Cellulite Protocol</p>
      </div>

      <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1a1a1a] rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{content.phase.icon}</span>
              <div>
                <h2 className="font-bold text-orange-400 text-sm">{content.phase.name}</h2>
                <p className="text-[10px] text-gray-400">{content.phase.range}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500">{selectedDay}/60</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-700" style={{ width: `${(selectedDay / 60) * 100}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">{content.phase.desc}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
        <button onClick={() => setShowPhases(!showPhases)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">All Phases</h3>
          {showPhases ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showPhases && (
          <div className="px-4 pb-4 space-y-2">
            {GUT_PHASE_LIST.map((phase, i) => {
              const ranges = [[1,7],[8,21],[22,45],[46,60]];
              const isActive = selectedDay >= ranges[i][0] && selectedDay <= ranges[i][1];
              const isDone = selectedDay > ranges[i][1];
              return (
                <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${isActive ? 'border-orange-300/30 bg-orange-50' : isDone ? 'border-[#5B8C5A]/20 bg-[#E8F0E9]/30' : 'border-gray-100 bg-gray-50'}`}>
                  <span className="text-lg">{phase.icon}</span>
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${isActive ? 'text-orange-600' : isDone ? 'text-[#5B8C5A]' : 'text-gray-500'}`}>{phase.name}</p>
                    <p className="text-[10px] text-gray-400">{phase.range}</p>
                  </div>
                  {isDone && <Check size={14} className="text-[#5B8C5A]" />}
                  {isActive && <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm">Today's Progress</h3>
          <span className="text-xs font-bold text-gray-400">{taskCount}/4</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-[#5B8C5A] h-2 rounded-full transition-all duration-500" style={{ width: `${(taskCount / 4) * 100}%` }} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F5E6D3] to-[#E8F0E9] rounded-2xl p-5 mb-4 border border-[#D4A574]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Droplets size={18} className="text-[#D4A574]" />
            <h3 className="font-bold text-gray-900 text-sm">Morning Protocol</h3>
          </div>
          <button onClick={() => toggleTask('morning')} className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${completedTasks.morning ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
            {completedTasks.morning && <Check size={14} className="text-white" />}
          </button>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-[#D4A574]/10">{content.morningProtocol}</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 mb-4 border border-indigo-200/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Moon size={18} className="text-indigo-500" />
            <h3 className="font-bold text-gray-900 text-sm">Evening Protocol</h3>
          </div>
          <button onClick={() => toggleTask('evening')} className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${completedTasks.evening ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
            {completedTasks.evening && <Check size={14} className="text-white" />}
          </button>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-indigo-200/20">{content.eveningProtocol}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'recipe' ? null : 'recipe')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed size={18} className="text-[#5B8C5A]" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.recipe.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{content.recipe.category} · {content.recipe.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={(e) => { e.stopPropagation(); toggleTask('recipe'); }} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedTasks.recipe ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
              {completedTasks.recipe && <Check size={12} className="text-white" />}
            </button>
            {activeSection === 'recipe' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </button>
        {activeSection === 'recipe' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.recipe.desc}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <button onClick={() => setActiveSection(activeSection === 'exercise' ? null : 'exercise')} className="w-full p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell size={18} className="text-rose-500" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-sm">{content.exercise.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{content.exercise.target} · {content.exercise.time}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={(e) => { e.stopPropagation(); toggleTask('exercise'); }} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${completedTasks.exercise ? 'bg-[#5B8C5A] border-[#5B8C5A]' : 'border-gray-300'}`}>
              {completedTasks.exercise && <Check size={12} className="text-white" />}
            </button>
            {activeSection === 'exercise' ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </button>
        {activeSection === 'exercise' && (
          <div className="px-5 pb-5 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600 leading-relaxed">{content.exercise.desc}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb size={18} className="text-amber-500" />
          <h3 className="font-bold text-gray-900 text-sm">Gut Health Tip</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-amber-400 pl-3">{content.tip}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button onClick={() => setShowTracker(!showTracker)} className="w-full p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-red-500" />
            <h3 className="font-bold text-gray-900 text-sm">GI Symptom Tracker</h3>
          </div>
          {showTracker ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showTracker && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-500 mb-3">Tap to cycle through severity. Track daily to see improvements.</p>
            <div className="grid grid-cols-2 gap-2">
              {GI_SYMPTOMS.map(s => {
                const level = symptoms[s.id] || 0;
                return (
                  <button key={s.id} onClick={() => toggleSymptom(s.id)} className={`p-3 rounded-xl border-2 text-left transition-all ${level > 0 ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{s.icon}</span>
                      <div className={`w-3 h-3 rounded-full ${severityColors[level]}`} />
                    </div>
                    <p className="text-xs font-bold text-gray-700">{s.label}</p>
                    <p className="text-[10px] text-gray-400">{severityLabels[level]}</p>
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

export default GutHealth;
