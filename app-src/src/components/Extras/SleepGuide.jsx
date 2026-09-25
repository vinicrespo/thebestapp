import React, { useState, useEffect } from 'react';
import { SLEEP_TIPS } from '../../utils/protocol';
import { Moon, ChevronLeft, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NIGHTLY_PROGRAM = [
  {
    night: 1,
    title: "The Foundation Night",
    focus: "Room Temperature & Darkness",
    routine: [
      { step: "Set room temp to 65-68°F (18-20°C)", icon: "❄️" },
      { step: "Remove all light sources (cover LEDs, use blackout curtains)", icon: "🌑" },
      { step: "Put phone on Do Not Disturb by 9 PM", icon: "📵" },
      { step: "Drink chamomile tea at 9:30 PM", icon: "🍵" },
      { step: "Practice 4-7-8 breathing x 3 rounds", icon: "🫁" },
      { step: "In bed by 10 PM", icon: "🛌" },
    ],
    tip: "Tonight you're building the physical environment. Your body drops its core temperature by 2-3°F to initiate sleep — a cool, dark room accelerates this process by up to 40 minutes.",
  },
  {
    night: 2,
    title: "The Digital Sunset",
    focus: "Blue Light Elimination",
    routine: [
      { step: "Enable night mode on all devices at 7 PM", icon: "📱" },
      { step: "Stop ALL screens by 9 PM", icon: "🚫" },
      { step: "Read a physical book for 20 minutes", icon: "📖" },
      { step: "Warm Epsom salt foot soak (15 min)", icon: "🦶" },
      { step: "Apply lavender oil to wrists and temples", icon: "💜" },
      { step: "Body scan meditation in bed (5 min)", icon: "🧘" },
    ],
    tip: "Blue light from screens suppresses melatonin production by 55%. Your brain can't distinguish a phone screen from sunlight. Tonight you're retraining your circadian signal.",
  },
  {
    night: 3,
    title: "The Cortisol Crash",
    focus: "Stress Hormone Reduction",
    routine: [
      { step: "Write down 3 worries on paper (then close the notebook)", icon: "📝" },
      { step: "Gentle stretching: neck, shoulders, hips (10 min)", icon: "🤸" },
      { step: "Golden milk: warm milk + turmeric + cinnamon", icon: "🥛" },
      { step: "Progressive muscle relaxation: tense and release each muscle group", icon: "💪" },
      { step: "Listen to nature sounds or white noise", icon: "🌊" },
      { step: "Gratitude list: 5 things from today", icon: "🙏" },
    ],
    tip: "Cortisol should be at its lowest at bedtime. Writing worries transfers them from your amygdala (stress center) to paper — literally reducing brain activation in the worry circuits.",
  },
  {
    night: 4,
    title: "The Nutrition Night",
    focus: "Sleep-Promoting Foods",
    routine: [
      { step: "Last meal by 7 PM (3 hours before bed)", icon: "🍽️" },
      { step: "Include tryptophan food at dinner (turkey, eggs, cheese)", icon: "🦃" },
      { step: "Tart cherry juice: 2oz (natural melatonin source)", icon: "🍒" },
      { step: "Magnesium glycinate: 200mg with water", icon: "💊" },
      { step: "Banana with almond butter as evening snack", icon: "🍌" },
      { step: "Herbal tea ritual (no caffeine after 2 PM)", icon: "🍵" },
    ],
    tip: "Tryptophan → serotonin → melatonin. This is your body's natural sleep cascade. Eating the right foods at the right time provides the raw materials for this conversion.",
  },
  {
    night: 5,
    title: "The Recovery Night",
    focus: "Growth Hormone Optimization",
    routine: [
      { step: "30-minute walk after dinner", icon: "🚶" },
      { step: "Cold shower finish (60 seconds)", icon: "🚿" },
      { step: "Apply body lotion (skin repair overnight)", icon: "🧴" },
      { step: "Deep breathing: 5-5-5 pattern for 3 minutes", icon: "🫁" },
      { step: "Complete darkness — even cover alarm clock", icon: "⬛" },
      { step: "Sleep on your back if possible (spinal alignment)", icon: "🛏️" },
    ],
    tip: "Growth hormone peaks between 10 PM and 2 AM during deep sleep. It's responsible for fat burning, muscle repair, and skin cell regeneration. One bad night reduces GH by 70%.",
  },
  {
    night: 6,
    title: "The Mindfulness Night",
    focus: "Parasympathetic Activation",
    routine: [
      { step: "Yoga nidra or guided sleep meditation (15 min)", icon: "🧘" },
      { step: "Alternate nostril breathing (5 min)", icon: "👃" },
      { step: "Journal: 'What went well today?' (3 things)", icon: "📝" },
      { step: "Self-massage: jaw, temples, scalp (5 min)", icon: "💆" },
      { step: "Visualization: imagine your ideal tomorrow morning", icon: "🌅" },
      { step: "Set intention: 'I welcome deep, restorative sleep'", icon: "✨" },
    ],
    tip: "Your autonomic nervous system has two modes: sympathetic (fight/flight) and parasympathetic (rest/digest). Most people go to bed still in fight/flight. Tonight's ritual flips the switch.",
  },
  {
    night: 7,
    title: "The Master Protocol",
    focus: "Full Sleep Optimization Routine",
    routine: [
      { step: "Combine your 3 favorite techniques from this week", icon: "⭐" },
      { step: "Room: cool, dark, quiet, device-free", icon: "🏠" },
      { step: "Body: stretched, relaxed, clean, moisturized", icon: "🧖" },
      { step: "Mind: gratitude, intention, breathing done", icon: "🧠" },
      { step: "Nutrition: last meal 3hrs ago, magnesium taken", icon: "💊" },
      { step: "Timing: in bed by 10 PM, alarm set for 6-7 AM", icon: "⏰" },
    ],
    tip: "After 7 nights, you've built a complete sleep system. The most powerful part? Repetition. Your brain now associates this routine with sleep onset. Keep repeating your favorite elements nightly.",
  },
];

const STORAGE_KEY = 'alkalean_sleep_program';

const SleepGuide = () => {
  const navigate = useNavigate();
  const [selectedNight, setSelectedNight] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      setCompletedSteps(saved.steps || {});
      setSelectedNight(saved.night || 0);
    } catch { /* ignore */ }
  }, []);

  const toggleStep = (idx) => {
    const key = `${selectedNight}_${idx}`;
    const next = { ...completedSteps, [key]: !completedSteps[key] };
    setCompletedSteps(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ steps: next, night: selectedNight }));
  };

  const program = NIGHTLY_PROGRAM[selectedNight];
  const stepsCompleted = program.routine.filter((_, i) => completedSteps[`${selectedNight}_${i}`]).length;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Moon size={24} className="text-indigo-500 mr-2" /> Sleep Guide
        </h1>
        <p className="text-gray-500 text-sm mt-1">7-Night Sleep Transformation Program</p>
      </div>

      <div className="bg-gradient-to-b from-indigo-50 to-indigo-100/30 rounded-2xl p-5 mb-5 border border-indigo-200">
        <p className="text-sm text-indigo-800 leading-relaxed">
          <strong>Why sleep matters for weight loss:</strong> Your body does most of its fat burning, cell repair, and hormone balancing while you sleep. Poor sleep increases hunger hormones by 45% and slows metabolism by 20%.
        </p>
      </div>

      {/* Night Selector */}
      <div className="flex overflow-x-auto space-x-2 mb-5 pb-1 -mx-1 px-1">
        {NIGHTLY_PROGRAM.map((n, i) => {
          const nightSteps = n.routine.filter((_, j) => completedSteps[`${i}_${j}`]).length;
          const allDone = nightSteps === n.routine.length;
          return (
            <button
              key={i}
              onClick={() => setSelectedNight(i)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedNight === i
                  ? 'bg-indigo-500 text-white'
                  : allDone
                  ? 'bg-[#E8F0E9] text-[#5B8C5A] border border-[#5B8C5A]/20'
                  : 'bg-gray-50 text-gray-500 border border-gray-100'
              }`}
            >
              {allDone ? '✓' : ''} Night {i + 1}
            </button>
          );
        })}
      </div>

      {/* Night Card */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-5 mb-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400 rounded-full blur-3xl opacity-10 -mr-8 -mt-8" />
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-1">Night {selectedNight + 1} of 7</p>
          <h2 className="font-bold text-lg mb-1">{program.title}</h2>
          <p className="text-indigo-300 text-xs">Focus: {program.focus}</p>
        </div>
      </div>

      {/* Routine Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">Tonight's Routine</h3>
          <span className="text-xs font-bold text-gray-400">{stepsCompleted}/{program.routine.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
          <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(stepsCompleted / program.routine.length) * 100}%` }} />
        </div>
        <div className="space-y-2">
          {program.routine.map((item, i) => {
            const key = `${selectedNight}_${i}`;
            const done = completedSteps[key];
            return (
              <button key={i} onClick={() => toggleStep(i)} className={`w-full flex items-center space-x-3 p-3 rounded-xl border-2 transition-all text-left ${done ? 'bg-indigo-50 border-indigo-200/50' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
                <span className="text-lg">{item.icon}</span>
                <span className={`flex-1 text-sm ${done ? 'text-indigo-600 line-through' : 'text-gray-700'}`}>{item.step}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${done ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'}`}>
                  {done && <Check size={12} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Science Behind It */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 mb-5 border border-indigo-200/30">
        <h3 className="font-bold text-gray-900 text-sm mb-2">Why This Works</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{program.tip}</p>
      </div>

      {/* Classic Sleep Tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button onClick={() => setShowTips(!showTips)} className="w-full p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm">Quick Reference Tips</h3>
          {showTips ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {showTips && (
          <div className="px-4 pb-4 space-y-3">
            {SLEEP_TIPS.map((tip, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-xl flex-shrink-0">{tip.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepGuide;
