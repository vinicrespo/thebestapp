import React, { useState, useEffect } from 'react';
import { getProfile, getProgress, logDailyAction } from '../utils/storage';
import { getDailyProtocol } from '../utils/protocol';
import { CheckCircle2, Circle, Flame, Calendar as CalendarIcon, Check } from 'lucide-react';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [protocol, setProtocol] = useState(null);
  const [shotTaken, setShotTaken] = useState(false);

  useEffect(() => {
    const prof = getProfile();
    const prog = getProgress();
    setProfile(prof);
    setProgress(prog);
    
    if (prof && prog) {
      setProtocol(getDailyProtocol(prog.currentDay, prof));
      
      if (prog.lastLoginDate) {
        const lastDate = new Date(prog.lastLoginDate);
        const today = new Date();
        if (lastDate.toDateString() === today.toDateString()) {
          setShotTaken(true);
        }
      }
    }
  }, []);

  const handleTakeShot = () => {
    if (shotTaken) return;
    logDailyAction();
    setShotTaken(true);
    setProgress(getProgress()); 
  };

  if (!profile || !progress || !protocol) return <div className="p-6">Loading...</div>;

  // Calendar render logic
  const renderCalendar = () => {
    const totalDays = 30;
    const days = [];
    
    for (let i = 1; i <= totalDays; i++) {
      let isCompleted = false;
      let isToday = false;
      
      if (i < progress.currentDay) {
        isCompleted = true; // Past days are assumed completed if user advanced
      } else if (i === progress.currentDay) {
        isToday = true;
        isCompleted = shotTaken;
      }

      days.push(
        <div 
          key={i} 
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            isCompleted 
              ? 'bg-purple-900 text-white' 
              : isToday 
                ? 'border-2 border-orange-500 text-orange-500' 
                : 'bg-gray-100 text-gray-400'
          }`}
        >
          {isCompleted ? <Check size={14} strokeWidth={3} /> : i}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 flex items-center">
            <CalendarIcon size={18} className="text-purple-900 mr-2" />
            30-Day Protocol Map
          </h3>
          <span className="text-xs font-bold text-gray-400 uppercase">Day {progress.currentDay} / 30</span>
        </div>
        <div className="grid grid-cols-7 gap-y-3 gap-x-2 place-items-center">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning.</h1>
          <p className="text-gray-500">Day {progress.currentDay} Protocol Ready.</p>
        </div>
        <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1.5 rounded-full text-orange-600 font-bold text-sm shadow-sm">
          <Flame size={16} className={progress.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-400"} />
          <span>{progress.streak}</span>
        </div>
      </div>

      {renderCalendar()}

      {/* Dynamic Recipe Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Today's Protocol</h2>
          <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-1 rounded uppercase tracking-wider">
            {protocol.phase}
          </span>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
          <p className="text-sm font-medium text-gray-800 leading-relaxed">
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
          onClick={handleTakeShot}
          disabled={shotTaken}
          className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
            shotTaken 
              ? 'bg-purple-50 text-purple-900 border border-purple-200' 
              : 'bg-purple-900 text-white shadow-lg shadow-purple-900/30 hover:bg-purple-950'
          }`}
        >
          {shotTaken ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          <span>{shotTaken ? 'Protocol Completed Today' : 'Mark as Completed'}</span>
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
