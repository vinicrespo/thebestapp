import React, { useState, useEffect } from 'react';
import { getProgress } from '../../utils/storage';
import { ChevronLeft, Lock, ClipboardCheck, AlertTriangle, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 'consistency',
    category: 'Protocol Adherence',
    question: 'How consistently did you follow the daily alkaline shot protocol?',
    options: [
      { label: 'Every single day without missing', score: 0, flag: null },
      { label: 'Most days (25-29 out of 30)', score: 1, flag: 'consistency' },
      { label: 'About half the days', score: 3, flag: 'consistency' },
      { label: 'Less than half', score: 5, flag: 'consistency' },
    ],
  },
  {
    id: 'timing',
    category: 'Protocol Adherence',
    question: 'Did you take your shots at the recommended time (morning, empty stomach)?',
    options: [
      { label: 'Yes, always on an empty stomach in the morning', score: 0, flag: null },
      { label: 'Usually in the morning but sometimes after eating', score: 2, flag: 'timing' },
      { label: 'Random times throughout the day', score: 3, flag: 'timing' },
      { label: 'Mostly at night or after meals', score: 4, flag: 'timing' },
    ],
  },
  {
    id: 'water',
    category: 'Hydration',
    question: 'How much water did you drink daily during the protocol?',
    options: [
      { label: '64oz+ (8+ glasses) every day', score: 0, flag: null },
      { label: '4-7 glasses most days', score: 2, flag: 'water' },
      { label: '2-4 glasses', score: 4, flag: 'water' },
      { label: 'Barely any — mostly coffee, soda, or juice', score: 5, flag: 'water' },
    ],
  },
  {
    id: 'sleep',
    category: 'Recovery',
    question: 'How was your sleep quality during the 30 days?',
    options: [
      { label: '7-9 hours of quality sleep most nights', score: 0, flag: null },
      { label: '6-7 hours, decent quality', score: 1, flag: 'sleep' },
      { label: 'Less than 6 hours or very inconsistent', score: 3, flag: 'sleep' },
      { label: 'Poor sleep — insomnia, late nights, broken sleep', score: 5, flag: 'sleep' },
    ],
  },
  {
    id: 'diet',
    category: 'Nutrition',
    question: 'How would you describe your eating habits during the protocol?',
    options: [
      { label: 'Clean, whole foods — minimal processed food', score: 0, flag: null },
      { label: 'Mostly healthy with occasional treats', score: 1, flag: null },
      { label: 'Mixed — some healthy, some fast food and snacks', score: 3, flag: 'diet' },
      { label: 'No dietary changes — ate the same as before', score: 5, flag: 'diet' },
    ],
  },
  {
    id: 'sugar',
    category: 'Nutrition',
    question: 'How much sugar and processed food did you consume?',
    options: [
      { label: 'Very little — avoided sugar and processed foods', score: 0, flag: null },
      { label: 'Reduced but still had some weekly', score: 1, flag: null },
      { label: 'Regularly consumed sugar and processed food', score: 4, flag: 'sugar' },
      { label: 'High sugar intake daily (soda, candy, pastries)', score: 5, flag: 'sugar' },
    ],
  },
  {
    id: 'movement',
    category: 'Activity',
    question: 'How physically active were you during the 30 days?',
    options: [
      { label: '30+ minutes of daily movement (walks, exercise)', score: 0, flag: null },
      { label: 'Some activity 3-4 times per week', score: 1, flag: null },
      { label: 'Occasional walks, mostly sedentary', score: 3, flag: 'movement' },
      { label: 'Almost no physical activity', score: 4, flag: 'movement' },
    ],
  },
  {
    id: 'stress',
    category: 'Lifestyle',
    question: 'What were your stress levels like during the protocol?',
    options: [
      { label: 'Managed well — meditation, relaxation, balanced', score: 0, flag: null },
      { label: 'Normal stress, nothing extreme', score: 1, flag: null },
      { label: 'High stress — work, family, or personal issues', score: 3, flag: 'stress' },
      { label: 'Extremely stressed the entire month', score: 5, flag: 'stress' },
    ],
  },
  {
    id: 'alcohol',
    category: 'Lifestyle',
    question: 'Did you consume alcohol during the protocol?',
    options: [
      { label: 'No alcohol at all', score: 0, flag: null },
      { label: '1-2 drinks per week', score: 1, flag: null },
      { label: '3-5 drinks per week', score: 3, flag: 'alcohol' },
      { label: 'Daily or heavy drinking on weekends', score: 5, flag: 'alcohol' },
    ],
  },
  {
    id: 'expectations',
    category: 'Mindset',
    question: 'What kind of results were you expecting?',
    options: [
      { label: 'Gradual improvement — better energy, digestion, some weight loss', score: 0, flag: null },
      { label: 'Noticeable weight loss (5-10 lbs / 2-5 kg)', score: 1, flag: null },
      { label: 'Dramatic transformation (20+ lbs / 10+ kg)', score: 3, flag: 'expectations' },
      { label: 'I expected results without changing anything else', score: 5, flag: 'expectations' },
    ],
  },
];

const FEEDBACK = {
  consistency: {
    title: 'Protocol Consistency',
    icon: '📅',
    problem: 'Inconsistent protocol adherence significantly reduces results. The alkaline shots work through cumulative daily effect — skipping days resets the gut-repair cycle.',
    fix: 'Restart with the Extended Protocol (180 days). Set a daily alarm for your shot. Use the calendar tracker in the app to build accountability. Even on bad days, take the shot.',
  },
  timing: {
    title: 'Shot Timing',
    icon: '⏰',
    problem: 'Taking shots after meals or at random times reduces absorption by up to 60%. Your stomach acid neutralizes the alkaline compounds before they can work.',
    fix: 'Always take your shot first thing in the morning, at least 20 minutes before eating. This allows maximum absorption on an empty stomach.',
  },
  water: {
    title: 'Hydration Deficit',
    icon: '💧',
    problem: 'Insufficient water intake prevents your body from flushing toxins released during the detox process. Dehydration also slows metabolism by 3% per day.',
    fix: 'Aim for 64oz (2L) minimum daily. Start your day with 16oz right after your shot. Carry a water bottle everywhere. Track with the Hydration Tracker in the app.',
  },
  sleep: {
    title: 'Sleep Quality',
    icon: '🌙',
    problem: 'Poor sleep increases cortisol (stress hormone) by 37%, which directly causes belly fat storage and blocks fat burning. Growth hormone — essential for body repair — peaks during deep sleep.',
    fix: 'Follow the 7-Night Sleep Program in the app. Prioritize 7-8 hours. No screens 1 hour before bed. Room temperature 65-68°F (18-20°C).',
  },
  diet: {
    title: 'Dietary Habits',
    icon: '🍽️',
    problem: 'The alkaline protocol accelerates detox and metabolism, but it cannot overcome a poor diet. Processed foods, excessive carbs, and inflammatory ingredients counteract the protocol.',
    fix: 'Follow the meal suggestions in Bonus Recipes. Focus on whole foods: vegetables, lean protein, healthy fats. The protocol enhances good nutrition — it doesn\'t replace it.',
  },
  sugar: {
    title: 'Sugar & Processed Food',
    icon: '🍭',
    problem: 'High sugar intake causes insulin spikes that directly block fat burning. Sugar also feeds harmful gut bacteria, undoing the gut-repair work of the protocol.',
    fix: 'Eliminate added sugar for 2 weeks and observe the difference. Replace soda with sparkling water + lemon. Use the Shopping List in the app for clean alternatives.',
  },
  movement: {
    title: 'Physical Activity',
    icon: '🏃',
    problem: 'A sedentary lifestyle reduces the protocol\'s effectiveness. Movement stimulates lymphatic drainage, improves circulation, and accelerates the metabolic effects of the shots.',
    fix: 'Start with 20-minute daily walks — no gym required. Track your steps in Daily Habits (goal: 7K). Walking after meals improves digestion and blood sugar by 30%.',
  },
  stress: {
    title: 'Chronic Stress',
    icon: '😤',
    problem: 'Chronic stress keeps cortisol elevated 24/7, which causes the body to store fat (especially belly fat) regardless of diet or exercise. Cortisol also damages gut lining.',
    fix: 'Use the Journal in the app for daily stress release. Try 5 minutes of deep breathing before bed. The protocol works best when cortisol is managed.',
  },
  alcohol: {
    title: 'Alcohol Consumption',
    icon: '🍷',
    problem: 'Alcohol damages gut lining, disrupts sleep quality (even if you fall asleep faster), increases inflammation, and the liver prioritizes processing alcohol over burning fat.',
    fix: 'Reduce to 1-2 drinks per week maximum, or eliminate for the next 30 days. If you drink, choose red wine over beer/spirits and never on an empty stomach.',
  },
  expectations: {
    title: 'Unrealistic Expectations',
    icon: '🎯',
    problem: 'The protocol is designed for sustainable body transformation, not overnight miracles. Real biological change (gut repair, hormonal rebalancing, metabolic reset) takes 60-90 days.',
    fix: 'Focus on non-scale victories: better energy, improved digestion, clearer skin, better sleep. Continue with the Extended Protocol — most dramatic results appear in months 2-3.',
  },
};

const STORAGE_KEY = 'alkalean_diagnostic_quiz';

const DiagnosticQuiz = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

  useEffect(() => {
    setProgress(getProgress());
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) setSavedResult(saved);
    } catch { /* ignore */ }
  }, []);

  if (!progress) return null;

  const isUnlocked = progress.completedDays.length >= 30;

  if (!isUnlocked) {
    const remaining = 30 - progress.completedDays.length;
    return (
      <div className="p-5 pb-24">
        <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
          <ChevronLeft size={18} /> Back
        </button>
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={32} className="text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">Results Diagnostic</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xs">
            This diagnostic quiz is designed to help you identify what might be holding you back — but first, you need to complete the full 30-day protocol.
          </p>
          <div className="bg-[#F0ECF9] rounded-2xl p-5 w-full max-w-xs border border-[#6B3FA0]/10">
            <p className="text-3xl font-black text-[#6B3FA0] mb-1">{remaining}</p>
            <p className="text-xs font-bold text-[#6B3FA0]/70">days remaining to unlock</p>
            <div className="w-full bg-white rounded-full h-2.5 mt-3">
              <div
                className="bg-[#6B3FA0] h-2.5 rounded-full transition-all"
                style={{ width: `${(progress.completedDays.length / 30) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-2">{progress.completedDays.length}/30 days completed</p>
          </div>
          <p className="text-xs text-gray-400 mt-6 max-w-xs leading-relaxed">
            Complete your 30-day protocol first. If you haven't seen the results you expected, come back here and we'll help you figure out why.
          </p>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId, optionIndex) => {
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      const result = calculateResults(newAnswers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      setSavedResult(result);
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResults = (ans) => {
    let totalScore = 0;
    const flags = [];

    QUESTIONS.forEach(q => {
      const optIdx = ans[q.id];
      if (optIdx !== undefined) {
        const opt = q.options[optIdx];
        totalScore += opt.score;
        if (opt.flag && !flags.includes(opt.flag)) flags.push(opt.flag);
      }
    });

    let verdict;
    if (totalScore <= 5) verdict = 'on_track';
    else if (totalScore <= 15) verdict = 'minor_issues';
    else if (totalScore <= 25) verdict = 'significant_issues';
    else verdict = 'major_issues';

    return { totalScore, flags, verdict, date: new Date().toISOString() };
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQ(0);
    setShowResults(false);
    setSavedResult(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (showResults || savedResult) {
    const result = savedResult || calculateResults(answers);
    const verdictConfig = {
      on_track: {
        title: 'You\'re On Track!',
        icon: '🌟',
        color: 'from-emerald-50 to-green-50 border-emerald-200',
        textColor: 'text-emerald-700',
        message: 'Your habits during the protocol were excellent. Results from alkaline protocols are often gradual — improvements in gut health, energy, and skin may continue for weeks after completing. Keep going with the Extended Protocol!',
      },
      minor_issues: {
        title: 'Minor Adjustments Needed',
        icon: '💡',
        color: 'from-amber-50 to-yellow-50 border-amber-200',
        textColor: 'text-amber-700',
        message: 'You followed the protocol well but a few areas could be improved. Small changes in these areas can significantly boost your results in the next cycle.',
      },
      significant_issues: {
        title: 'Key Areas to Address',
        icon: '⚠️',
        color: 'from-orange-50 to-red-50 border-orange-200',
        textColor: 'text-orange-700',
        message: 'We found several factors that likely reduced your results. The good news: these are all fixable. Address these areas and restart with the Extended Protocol for dramatically different outcomes.',
      },
      major_issues: {
        title: 'Protocol Reset Recommended',
        icon: '🔄',
        color: 'from-red-50 to-rose-50 border-red-200',
        textColor: 'text-red-700',
        message: 'Multiple critical factors worked against you. This doesn\'t mean the protocol failed — it means your body didn\'t have the right conditions to respond. Fix these fundamentals and try again.',
      },
    };

    const v = verdictConfig[result.verdict];

    return (
      <div className="p-5 pb-24">
        <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
          <ChevronLeft size={18} /> Back
        </button>

        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ClipboardCheck size={24} className="text-[#6B3FA0] mr-2" /> Your Diagnostic
          </h1>
          <p className="text-gray-500 text-sm mt-1">Personalized analysis of your 30-day journey</p>
        </div>

        <div className={`bg-gradient-to-br ${v.color} rounded-2xl p-5 mb-5 border`}>
          <div className="text-center">
            <span className="text-4xl mb-3 block">{v.icon}</span>
            <h2 className={`font-bold text-lg ${v.textColor} mb-2`}>{v.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{v.message}</p>
          </div>
        </div>

        {result.flags.length > 0 && (
          <>
            <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
              <AlertTriangle size={16} className="text-amber-500 mr-2" /> Areas to Improve
            </h3>
            <div className="space-y-3 mb-5">
              {result.flags.map(flag => {
                const fb = FEEDBACK[flag];
                if (!fb) return null;
                return (
                  <div key={flag} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{fb.icon}</span>
                      <h4 className="font-bold text-gray-900 text-sm">{fb.title}</h4>
                    </div>
                    <div className="bg-red-50 rounded-xl p-3 mb-3 border border-red-100">
                      <p className="text-xs text-red-700 leading-relaxed"><strong>The problem:</strong> {fb.problem}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                      <p className="text-xs text-emerald-700 leading-relaxed"><strong>The fix:</strong> {fb.fix}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {result.flags.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 text-center">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">No Major Issues Found</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Your habits were solid. Body transformation is gradual — continue with the Extended Protocol and track your progress weekly. Most users see the biggest changes in months 2-3.</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/extended')}
            className="w-full bg-[#6B3FA0] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-[#5A2E8E] transition-colors"
          >
            <span>Continue with Extended Protocol</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={handleRetake}
            className="w-full bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];
  const progressPct = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <ClipboardCheck size={24} className="text-[#6B3FA0] mr-2" /> Results Diagnostic
        </h1>
        <p className="text-gray-500 text-sm mt-1">Let's find out what happened</p>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-[#6B3FA0] uppercase tracking-widest">{q.category}</span>
          <span className="text-xs font-bold text-gray-400">{currentQ + 1}/{QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div className="bg-[#6B3FA0] h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
        <h2 className="font-bold text-gray-900 text-base leading-relaxed mb-5">{q.question}</h2>
        <div className="space-y-2.5">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(q.id, i)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                answers[q.id] === i
                  ? 'border-[#6B3FA0] bg-[#F0ECF9]'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <span className={`text-sm ${answers[q.id] === i ? 'text-[#6B3FA0] font-semibold' : 'text-gray-700'}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
