import React, { useState, useEffect } from 'react';
import { getProgress } from '../../utils/storage';
import { ChevronLeft, Lock, ClipboardCheck, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
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
    problem: 'Inconsistent protocol adherence significantly reduces results. The alkaline shots work through cumulative daily effect — skipping days resets the gut-repair cycle. Even missing 2-3 days in a row can set your progress back by a full week.',
    fix: 'Restart with the Extended Protocol (180 days). Set a daily alarm for your shot. Use the calendar tracker in the app to build accountability. Even on bad days, take the shot — consistency beats perfection.',
  },
  timing: {
    title: 'Shot Timing',
    icon: '⏰',
    problem: 'Taking shots after meals or at random times reduces absorption by up to 60%. Your stomach acid neutralizes the alkaline compounds before they can reach the gut lining where they work.',
    fix: 'Always take your shot first thing in the morning, at least 20 minutes before eating or drinking anything else (water is fine). This allows maximum absorption on an empty stomach.',
  },
  water: {
    title: 'Hydration Deficit',
    icon: '💧',
    problem: 'Insufficient water intake prevents your body from flushing toxins released during the detox process. Dehydration slows metabolism by up to 3% per day and makes your kidneys work harder, diverting energy from fat burning.',
    fix: 'Aim for 64oz (2L) minimum daily. Start your day with 16oz right after your shot. Carry a water bottle everywhere. Track with the Hydration Tracker in the app. Add lemon or cucumber for flavor.',
  },
  sleep: {
    title: 'Sleep Quality',
    icon: '🌙',
    problem: 'Poor sleep increases cortisol (stress hormone) by 37%, which directly causes belly fat storage and blocks fat burning. Growth hormone — essential for cellular repair and metabolism — peaks during deep sleep phases that only happen after 6+ hours.',
    fix: 'Follow the 7-Night Sleep Program in the app. Prioritize 7-8 hours. No screens 1 hour before bed. Room temperature 65-68°F (18-20°C). Magnesium before bed can help improve sleep quality.',
  },
  diet: {
    title: 'Dietary Habits',
    icon: '🍽️',
    problem: 'The alkaline protocol accelerates detox and metabolism, but it cannot overcome a poor diet. Processed foods, excessive carbs, and inflammatory ingredients create an acidic environment that directly counteracts the alkaline compounds in your shots.',
    fix: 'Follow the meal suggestions in Bonus Recipes. Focus on whole foods: vegetables, lean protein, healthy fats. Reduce bread, pasta, and fried food. The protocol enhances good nutrition — it doesn\'t replace it.',
  },
  sugar: {
    title: 'Sugar & Processed Food',
    icon: '🍭',
    problem: 'High sugar intake causes insulin spikes that directly block fat burning for 4-6 hours after consumption. Sugar also feeds harmful gut bacteria (Candida, Firmicutes), undoing the gut-repair work of the protocol and causing bloating.',
    fix: 'Eliminate added sugar for 2 weeks and observe the difference. Replace soda with sparkling water + lemon. Check labels — sugar hides in sauces, bread, yogurt, and "healthy" granola bars. Use the Shopping List for clean alternatives.',
  },
  movement: {
    title: 'Physical Activity',
    icon: '🏃',
    problem: 'A sedentary lifestyle reduces the protocol\'s effectiveness by 40-50%. Movement stimulates lymphatic drainage (your body\'s waste removal system has no pump — it relies on muscle movement), improves circulation, and accelerates metabolic effects.',
    fix: 'Start with 20-minute daily walks — no gym required. Track your steps in Daily Habits (goal: 7K). Walking after meals specifically improves digestion and reduces blood sugar spikes by 30%.',
  },
  stress: {
    title: 'Chronic Stress',
    icon: '😤',
    problem: 'Chronic stress keeps cortisol elevated 24/7, which signals your body to store fat (especially visceral belly fat) as a survival mechanism, regardless of diet or exercise. Cortisol also damages gut lining and reduces nutrient absorption.',
    fix: 'Use the Journal in the app for daily stress release. Try 5 minutes of deep breathing before bed. Walk in nature when possible. The protocol works best when cortisol is managed — stress management is not optional, it\'s essential.',
  },
  alcohol: {
    title: 'Alcohol Consumption',
    icon: '🍷',
    problem: 'Alcohol damages gut lining (undoing the repair from your shots), disrupts deep sleep cycles (even if you fall asleep faster), spikes inflammation for 48-72 hours, and your liver prioritizes processing alcohol over burning fat — pausing fat metabolism completely.',
    fix: 'Reduce to 1-2 drinks per week maximum, or eliminate for the next 30 days. Never drink on an empty stomach. If you drink, choose dry red wine over beer/spirits and compensate with extra water the next day.',
  },
  expectations: {
    title: 'Body Adaptation Timeline',
    icon: '🎯',
    problem: 'Your body is likely still adapting. The first 30 days primarily repair gut lining and rebalance pH levels — this is invisible work that creates the foundation for visible changes. Many people don\'t realize that their internal health improved significantly even when the scale hasn\'t moved yet.',
    fix: 'Track non-scale victories: energy levels, digestion quality, bloating reduction, skin clarity, sleep quality, mood stability. Continue with the Extended Protocol — 78% of users report their most dramatic visible results between days 45-90.',
  },
  gut_adaptation: {
    title: 'Gut Microbiome Reset',
    icon: '🦠',
    problem: 'Your gut microbiome takes 60-90 days to fully rebalance. In the first 30 days, the harmful bacteria die off (which can even cause temporary bloating or fatigue), while beneficial bacteria are still establishing colonies. The visible results come after this internal reset completes.',
    fix: 'Continue the Extended Protocol to give your gut time to fully rebalance. Add fermented foods (sauerkraut, kimchi, kefir) to accelerate colonization. Avoid antibiotics unless medically necessary — they reset gut progress.',
  },
  metabolic_resistance: {
    title: 'Metabolic Adaptation',
    icon: '🔥',
    problem: 'If you\'ve dieted before, your metabolism may have slowed down as a protective response (metabolic adaptation). Your body learned to be efficient with fewer calories, which means it resists change harder in the first cycle. This is common and reversible.',
    fix: 'The Extended Protocol is specifically designed to gradually reset metabolic rate over 180 days. Don\'t reduce calories drastically — eat enough whole foods to signal your body it\'s safe to burn fat. Strength exercises (even bodyweight) help rebuild metabolic rate.',
  },
  inflammation: {
    title: 'Hidden Inflammation',
    icon: '🔴',
    problem: 'Chronic low-grade inflammation blocks fat loss even when everything else is right. Sources include processed foods, poor sleep, stress, food sensitivities (gluten, dairy, soy), and environmental toxins. Inflammation makes cells resistant to the signals that trigger fat burning.',
    fix: 'Try eliminating dairy and gluten for 2 weeks to test for sensitivities. Increase omega-3 intake (fatty fish, flaxseed, walnuts). The anti-inflammatory compounds in your daily shots need time — continue the Extended Protocol for cumulative anti-inflammatory effect.',
  },
  hormonal_lag: {
    title: 'Hormonal Rebalancing',
    icon: '⚖️',
    problem: 'Hormones like leptin (satiety), ghrelin (hunger), insulin, and thyroid hormones take 8-12 weeks to recalibrate. During the first 30 days, your body is receiving the signal to change, but the hormonal cascade hasn\'t completed yet. This is like turning a large ship — the wheel turned, but the ship hasn\'t finished changing direction.',
    fix: 'Continue the Extended Protocol — the Hormonal Balance upgrade works synergistically with the daily shots. Prioritize sleep (hormones reset overnight) and reduce sugar (insulin blocks all other hormonal signals). Months 2-3 is when hormonal rebalancing produces visible results.',
  },
  toxin_overload: {
    title: 'Detox Backlog',
    icon: '🧹',
    problem: 'Years of accumulated toxins stored in fat cells don\'t clear in 30 days. When your body starts burning fat, these stored toxins are released into your bloodstream, which can temporarily slow down further fat loss as your liver works overtime to process them.',
    fix: 'Support your liver: lemon water in the morning, cruciferous vegetables (broccoli, cauliflower), and adequate water (toxins leave through urine and sweat). Light exercise and sauna sessions accelerate detox. The Extended Protocol\'s daily shots continuously support this process.',
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

    const fallbackReasons = ['gut_adaptation', 'metabolic_resistance', 'inflammation', 'hormonal_lag', 'toxin_overload', 'expectations'];

    if (flags.length < 2) {
      const shuffled = fallbackReasons.sort(() => 0.5 - Math.random());
      for (const r of shuffled) {
        if (!flags.includes(r)) {
          flags.push(r);
          if (flags.length >= 3) break;
        }
      }
    }

    if (flags.length === 0) {
      flags.push('gut_adaptation', 'hormonal_lag', 'expectations');
    }

    let verdict;
    if (totalScore <= 5) verdict = 'almost_there';
    else if (totalScore <= 15) verdict = 'adjustments_needed';
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
      almost_there: {
        title: 'Your Body Is Still Adapting',
        icon: '⏳',
        color: 'from-blue-50 to-indigo-50 border-blue-200',
        textColor: 'text-blue-700',
        message: 'Your habits were solid — but 30 days is only the foundation phase. Your gut lining has been repaired and your pH levels are rebalancing, but the visible transformation happens in the next 60 days. Here\'s what we identified that can accelerate your results:',
      },
      adjustments_needed: {
        title: 'We Found What\'s Slowing You Down',
        icon: '🔍',
        color: 'from-amber-50 to-yellow-50 border-amber-200',
        textColor: 'text-amber-700',
        message: 'You followed the protocol but a few key areas reduced its effectiveness. The protocol did work internally — gut repair, pH balance, toxin mobilization — but these factors prevented the visible results from showing. Fix them and the next 30 days will be dramatically different:',
      },
      significant_issues: {
        title: 'Key Factors Blocked Your Results',
        icon: '⚠️',
        color: 'from-orange-50 to-red-50 border-orange-200',
        textColor: 'text-orange-700',
        message: 'We identified several factors that actively worked against your protocol. The alkaline shots did their job internally, but your body couldn\'t respond fully because of these blockers. The good news: every single one is fixable. Address these and continue with the Extended Protocol for a complete reset:',
      },
      major_issues: {
        title: 'Your Body Needs a Full Reset',
        icon: '🔄',
        color: 'from-red-50 to-rose-50 border-red-200',
        textColor: 'text-red-700',
        message: 'Multiple critical factors prevented the protocol from working at full capacity. This doesn\'t mean the protocol failed — it means your body didn\'t have the right environment to respond. Think of it like planting seeds in dry soil: the seeds are good, but the conditions need to change first. Here\'s exactly what to fix:',
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

        <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center">
          <AlertTriangle size={16} className="text-amber-500 mr-2" /> What We Found
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
