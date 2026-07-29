import React, { useState, useEffect } from 'react';
import { getProfile, getProgress, logDailyAction } from '../utils/storage';
import { getDailyProtocol } from '../utils/protocol';
import { CheckCircle2, Circle, Flame } from 'lucide-react';

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
      
      // Check if shot was taken today
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
    setProgress(getProgress()); // Update UI
  };

  if (!profile || !progress || !protocol) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Morning.</h1>
          <p className="text-gray-500">It's Day {progress.currentDay} of Your Reset.</p>
        </div>
        <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1.5 rounded-full text-orange-600 font-bold text-sm">
          <Flame size={16} className={progress.streak > 0 ? "text-orange-500" : "text-gray-400"} />
          <span>{progress.streak}</span>
        </div>
      </div>

      {/* Dynamic Recipe Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Today's Protocol</h2>
          <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
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
          <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-green-500 pl-3">
            {protocol.tip}
          </p>
        </div>

        <button 
          onClick={handleTakeShot}
          disabled={shotTaken}
          className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
            shotTaken 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-green-700 text-white shadow-lg shadow-green-700/30 hover:bg-green-800'
          }`}
        >
          {shotTaken ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          <span>{shotTaken ? 'Protocol Completed Today' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Mini Progress Log Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-2">Body Log</h3>
        <p className="text-sm text-gray-500 mb-4">Track your weight and energy to see the reset in real-time.</p>
        <button className="text-sm font-semibold text-green-700 underline underline-offset-2">
          Log Today's Vitals
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
