import React, { useState, useEffect } from 'react';
import { getJournal, saveJournalEntry } from '../../utils/storage';
import { BookOpen, ChevronLeft, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Great' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '💪', label: 'Strong' },
];

const ENERGY_OPTIONS = [
  { emoji: '⚡', label: 'High' },
  { emoji: '🔋', label: 'Normal' },
  { emoji: '🪫', label: 'Low' },
];

const Journal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    setEntries(getJournal());
  }, []);

  const handleSubmit = () => {
    if (!mood && !text.trim()) return;
    saveJournalEntry({ mood, energy, text: text.trim() });
    setEntries(getJournal());
    setShowForm(false);
    setMood(null);
    setEnergy(null);
    setText('');
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen size={24} className="text-rose-400 mr-2" /> My Journal
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track how you feel on this journey</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#5B8C5A] text-white p-3 rounded-full shadow-lg shadow-[#5B8C5A]/20"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 animate-scale-in">
          <h3 className="font-bold text-gray-900 text-sm mb-4">How are you feeling today?</h3>

          <div className="mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Mood</label>
            <div className="flex space-x-2">
              {MOOD_OPTIONS.map(m => (
                <button
                  key={m.label}
                  onClick={() => setMood(m)}
                  className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border-2 transition-all ${
                    mood?.label === m.label ? 'border-[#5B8C5A] bg-[#E8F0E9]' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <span className="text-xl mb-0.5">{m.emoji}</span>
                  <span className="text-[9px] font-bold text-gray-500">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Energy Level</label>
            <div className="flex space-x-2">
              {ENERGY_OPTIONS.map(e => (
                <button
                  key={e.label}
                  onClick={() => setEnergy(e)}
                  className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border-2 transition-all ${
                    energy?.label === e.label ? 'border-[#5B8C5A] bg-[#E8F0E9]' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <span className="text-xl mb-0.5">{e.emoji}</span>
                  <span className="text-[9px] font-bold text-gray-500">{e.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Notes (optional)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How does your body feel today? Any changes you've noticed? Write freely..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B8C5A] resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#5B8C5A] text-white font-semibold py-3 rounded-xl hover:bg-[#4A7A49] transition-colors"
          >
            Save Entry
          </button>
        </div>
      )}

      {entries.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📖</div>
          <p className="text-gray-500 text-sm mb-1">Your journal is empty</p>
          <p className="text-gray-400 text-xs">Tap + to write your first entry</p>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400">{formatDate(entry.date)}</span>
              <div className="flex space-x-1.5">
                {entry.mood && <span className="text-lg">{entry.mood.emoji}</span>}
                {entry.energy && <span className="text-lg">{entry.energy.emoji}</span>}
              </div>
            </div>
            {entry.text && (
              <p className="text-sm text-gray-700 leading-relaxed">{entry.text}</p>
            )}
            {!entry.text && entry.mood && (
              <p className="text-sm text-gray-400 italic">Feeling {entry.mood.label.toLowerCase()}{entry.energy ? `, energy: ${entry.energy.label.toLowerCase()}` : ''}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
