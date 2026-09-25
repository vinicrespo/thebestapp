import React, { useState, useEffect } from 'react';
import { getJournal, saveJournalEntry } from '../../utils/storage';
import { BookOpen, ChevronLeft, Plus, X, Lightbulb, Pencil } from 'lucide-react';
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

const DAILY_PROMPTS = [
  { category: "Body Awareness", prompt: "Where do you feel the most tension in your body right now? Close your eyes and scan from head to toe.", icon: "🧘" },
  { category: "Gratitude", prompt: "Name 3 things your body did for you today that you're grateful for (walking, digesting, breathing...).", icon: "🙏" },
  { category: "Food Reflection", prompt: "What was the most nourishing thing you ate today? How did it make you feel 30 minutes after eating?", icon: "🥗" },
  { category: "Progress Check", prompt: "Compare how you feel today vs. one week ago. What's one thing that's improved, even slightly?", icon: "📈" },
  { category: "Emotional Eating", prompt: "Did you eat anything today out of emotion rather than hunger? No judgment — just notice and write about it.", icon: "💭" },
  { category: "Water & Hydration", prompt: "How much water did you drink today? Did you notice any difference in your skin, energy, or mood?", icon: "💧" },
  { category: "Sleep Quality", prompt: "Rate last night's sleep 1-10. What helped or hurt your sleep? What will you do differently tonight?", icon: "🌙" },
  { category: "Motivation", prompt: "Why did you start this journey? Write your 'why' as if you're explaining it to your future self.", icon: "🔥" },
  { category: "Self-Compassion", prompt: "Write yourself a kind message. What would you tell a friend who is on the same journey?", icon: "💗" },
  { category: "Movement", prompt: "How did your body move today? Even small movements count. How did movement affect your mood?", icon: "🏃" },
  { category: "Cravings", prompt: "What did you crave today? Instead of fighting cravings, what healthy swap could satisfy the same need?", icon: "🍫" },
  { category: "Energy Patterns", prompt: "When was your energy highest today? When was it lowest? Can you spot a pattern with what you ate?", icon: "⚡" },
  { category: "Wins", prompt: "List 3 wins from today — they can be tiny. Choosing water over soda counts. Getting out of bed counts.", icon: "🏆" },
  { category: "Stress", prompt: "What stressed you today? How did it affect your eating or body? What's one way you could release that stress?", icon: "😤" },
  { category: "Clothes Fit", prompt: "How do your clothes feel today? Any changes in how things fit? Don't focus on the scale — focus on the feel.", icon: "👗" },
  { category: "Digestion", prompt: "How is your digestion today? Any bloating, discomfort, or improvements? What did you eat that might be related?", icon: "🫃" },
  { category: "Future Self", prompt: "Imagine yourself 30 days from now. What does that version of you look like? What daily habits got you there?", icon: "🔮" },
  { category: "Skin & Glow", prompt: "Look at your face in the mirror. What do you notice about your skin today? Any changes in texture or glow?", icon: "✨" },
  { category: "Social Support", prompt: "Who supported you today? Who could you share your journey with? Support systems multiply results.", icon: "🤝" },
  { category: "Barriers", prompt: "What's the #1 thing holding you back right now? Write it down. Now write one small step to overcome it.", icon: "🧱" },
  { category: "Mindful Eating", prompt: "Did you eat at least one meal slowly and without screens today? What did you notice about the taste and texture?", icon: "🍽️" },
  { category: "Supplements", prompt: "How consistent have you been with AlkaLean this week? What effects have you noticed? Track your routine.", icon: "💊" },
  { category: "Measurements", prompt: "Beyond the scale: How do you FEEL? Rate your overall wellbeing 1-10 and explain why.", icon: "📊" },
  { category: "Morning Ritual", prompt: "What was the first thing you did this morning? How did it set the tone for your day?", icon: "🌅" },
  { category: "Evening Reflection", prompt: "As you wind down, what's one thing you'd do differently tomorrow? And one thing you'd repeat?", icon: "🌆" },
  { category: "Hormones", prompt: "How is your mood stability today? Any PMS-like symptoms, irritability, or unusual patterns? Track the cycle.", icon: "🌊" },
  { category: "Goal Setting", prompt: "What's your goal for this week? Make it specific, measurable, and achievable. Write it as 'I will...'", icon: "🎯" },
  { category: "Celebration", prompt: "What have you accomplished since starting this program? List everything — even the things that seem small.", icon: "🎉" },
  { category: "Forgiveness", prompt: "Did you 'slip up' recently? Write about it without guilt. One bad day doesn't erase your progress.", icon: "🕊️" },
  { category: "Inspiration", prompt: "What inspired you today? A quote, a person, a result? Save it here so you can revisit it on hard days.", icon: "💡" },
  { category: "Body Image", prompt: "Look at yourself with love. Write 3 things you appreciate about your body exactly as it is right now.", icon: "🪞" },
  { category: "Recipe Journal", prompt: "What was your favorite healthy meal this week? Write the recipe or ingredients so you can make it again.", icon: "📝" },
  { category: "Nature", prompt: "Did you spend any time outdoors today? How did sunlight, fresh air, or nature affect your mood and energy?", icon: "🌿" },
  { category: "Boundaries", prompt: "Did you say 'no' to anything unhealthy today — food, stress, negativity? Boundaries protect your progress.", icon: "🛡️" },
  { category: "Learning", prompt: "What's one new thing you learned about nutrition, health, or your body this week? How will you apply it?", icon: "📚" },
  { category: "Consistency", prompt: "On a scale of 1-10, how consistent were you this week? What's the ONE habit that needs the most attention?", icon: "📅" },
  { category: "Visualization", prompt: "Close your eyes for 60 seconds. Visualize your ideal body and health. Now describe what you saw in words.", icon: "🧠" },
  { category: "Patience", prompt: "Remind yourself: real change takes time. Write a letter to yourself about why you'll keep going, even when it's slow.", icon: "⏳" },
  { category: "Joy", prompt: "What brought you pure joy today? How can you include more of that in your routine? Joy reduces cortisol.", icon: "😄" },
  { category: "Detox", prompt: "What toxic habit, food, or thought did you let go of today? Detox isn't just physical — it's mental too.", icon: "🚿" },
];

const getDailyPrompt = () => {
  const start = new Date(2024, 0, 1);
  const now = new Date();
  const daysSinceStart = Math.floor((now - start) / 86400000);
  return DAILY_PROMPTS[daysSinceStart % DAILY_PROMPTS.length];
};

const Journal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [text, setText] = useState('');
  const [usePrompt, setUsePrompt] = useState(false);

  const todayPrompt = getDailyPrompt();

  useEffect(() => {
    setEntries(getJournal());
  }, []);

  const handleSubmit = () => {
    if (!mood && !text.trim()) return;
    saveJournalEntry({ mood, energy, text: text.trim(), prompt: usePrompt ? todayPrompt.prompt : null });
    setEntries(getJournal());
    setShowForm(false);
    setMood(null);
    setEnergy(null);
    setText('');
    setUsePrompt(false);
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

      <div className="flex items-center justify-between mb-5">
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

      {/* Daily Prompt Card */}
      {!showForm && (
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-5 mb-5 border border-rose-200/40">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl">{todayPrompt.icon}</span>
            <div>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Today's Prompt</p>
              <p className="text-xs text-gray-500">{todayPrompt.category}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-3 italic">"{todayPrompt.prompt}"</p>
          <button
            onClick={() => { setShowForm(true); setUsePrompt(true); }}
            className="flex items-center space-x-1.5 bg-white/80 text-rose-600 text-xs font-bold px-4 py-2 rounded-xl border border-rose-200/50 hover:bg-white transition-all"
          >
            <Pencil size={12} /> <span>Answer This Prompt</span>
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 animate-scale-in">
          <h3 className="font-bold text-gray-900 text-sm mb-4">How are you feeling today?</h3>

          {usePrompt && (
            <div className="bg-rose-50 rounded-xl p-3 mb-4 border border-rose-100">
              <div className="flex items-center space-x-1.5 mb-1">
                <Lightbulb size={14} className="text-rose-400" />
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">{todayPrompt.category}</span>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">{todayPrompt.prompt}</p>
            </div>
          )}

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
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              {usePrompt ? 'Your Response' : 'Notes (optional)'}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={usePrompt ? "Take a moment to reflect and write freely..." : "How does your body feel today? Any changes you've noticed? Write freely..."}
              rows={4}
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
            {entry.prompt && (
              <div className="bg-rose-50/50 rounded-lg px-3 py-2 mb-2 border border-rose-100/50">
                <p className="text-[10px] text-rose-400 italic">{entry.prompt}</p>
              </div>
            )}
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
