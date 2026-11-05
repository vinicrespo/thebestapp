import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trophy, Check, Flame, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CHALLENGES = [
  {
    title: 'Zero Sugar Week',
    icon: '🍬',
    color: 'from-red-500 to-orange-500',
    desc: 'Cut all added sugar for 7 days. Read labels — sugar hides everywhere. Your gut and energy levels will thank you.',
    days: [
      { task: 'No added sugar today — check all labels', tip: 'Sugar hides in bread, sauces, yogurt, and granola bars. Read every label.' },
      { task: 'Replace one sweet craving with fruit', tip: 'Berries with almond butter hit the sweet spot without the insulin spike.' },
      { task: 'No sugary drinks — water, black coffee, or herbal tea only', tip: 'A single soda has 39g of sugar — that\'s 10 teaspoons.' },
      { task: 'Cook one meal from scratch with zero processed ingredients', tip: 'Whole foods = no hidden sugars. Bonus: you control the salt too.' },
      { task: 'Say no to dessert or sweets offered to you', tip: 'Building the habit of saying no rewires your brain\'s reward system.' },
      { task: 'Swap your usual snack for nuts, seeds, or veggies', tip: 'Almonds + dark chocolate (85%+) satisfy the craving without the crash.' },
      { task: 'Celebrate — you completed a full sugar-free week!', tip: 'Notice your energy? That\'s stable blood sugar. Your gut bacteria shifted in just 7 days.' },
    ],
  },
  {
    title: 'Hydration Hero',
    icon: '💧',
    color: 'from-blue-500 to-cyan-500',
    desc: 'Drink at least 80oz (2.4L) of water every single day. Proper hydration accelerates every process in your body.',
    days: [
      { task: 'Drink 16oz of water immediately after waking up', tip: 'Your body dehydrates overnight. Morning water kickstarts metabolism by 24%.' },
      { task: 'Finish 40oz before lunch', tip: 'Front-loading water means you won\'t be playing catch-up in the evening.' },
      { task: 'Add lemon or cucumber to at least 2 glasses', tip: 'Lemon water is alkalizing and aids liver detox. Cucumber adds electrolytes.' },
      { task: 'Replace one coffee or soda with water today', tip: 'Caffeine is a diuretic — each coffee needs an equal glass of water to compensate.' },
      { task: 'Drink a full glass before every meal', tip: 'Water before meals reduces appetite by 22% and improves digestion.' },
      { task: 'Hit 80oz before 6pm — no late-night catch-up', tip: 'Late water = bathroom trips at night = disrupted sleep = higher cortisol.' },
      { task: 'Full week of 80oz+ daily — hydration master!', tip: 'Consistent hydration improves skin elasticity, digestion, and fat metabolism.' },
    ],
  },
  {
    title: 'Movement Week',
    icon: '🏃',
    color: 'from-green-500 to-emerald-500',
    desc: '30 minutes of intentional movement every day. No gym needed — walks, stretching, dancing, anything that gets you moving.',
    days: [
      { task: '30-minute walk — any pace, any route', tip: 'Walking is the most underrated exercise. It burns fat, reduces stress, and aids digestion.' },
      { task: '15-minute stretch + 15-minute walk', tip: 'Stretching improves lymphatic drainage — your body\'s waste removal system.' },
      { task: 'Walk after your biggest meal today', tip: 'Post-meal walks reduce blood sugar spikes by 30% and improve nutrient absorption.' },
      { task: 'Try something new: yoga, dancing, or bodyweight exercises', tip: 'Variety prevents your body from adapting. New movements activate new muscle groups.' },
      { task: 'Take the stairs everywhere today + 20-minute walk', tip: 'Stair climbing burns 3x more calories than walking and strengthens legs.' },
      { task: '30 minutes of your favorite activity', tip: 'Exercise you enjoy = exercise you\'ll keep doing. Consistency beats intensity.' },
      { task: 'Active rest day — gentle stretching or slow walk', tip: 'Recovery is when your body rebuilds. Active rest improves circulation without strain.' },
    ],
  },
  {
    title: 'Sleep Reset',
    icon: '🌙',
    color: 'from-indigo-500 to-purple-500',
    desc: 'Optimize your sleep for 7 nights. Better sleep = more growth hormone = faster results. Non-negotiable for transformation.',
    days: [
      { task: 'Set a fixed bedtime and stick to it tonight', tip: 'Consistent sleep/wake times regulate your circadian rhythm within 3-4 days.' },
      { task: 'No screens 1 hour before bed', tip: 'Blue light suppresses melatonin by 50%. Read a book, stretch, or meditate instead.' },
      { task: 'Make your room pitch black and cool (65-68°F / 18-20°C)', tip: 'Darkness triggers melatonin production. Even small light sources disrupt deep sleep.' },
      { task: 'No caffeine after 2pm', tip: 'Caffeine has a 6-hour half-life. That 3pm coffee is still 50% active at 9pm.' },
      { task: 'Try 5 minutes of deep breathing before bed', tip: '4-7-8 breathing (inhale 4, hold 7, exhale 8) activates your parasympathetic nervous system.' },
      { task: 'No food 3 hours before bed', tip: 'Digestion raises core temperature and keeps your body working when it should be resting.' },
      { task: 'Rate your sleep quality — notice the difference?', tip: '7 nights of good sleep habits can reduce cortisol by 25% and improve fat burning.' },
    ],
  },
  {
    title: 'Gut Health Boost',
    icon: '🦠',
    color: 'from-amber-500 to-yellow-500',
    desc: 'A week dedicated to feeding your good gut bacteria and starving the bad ones. Your gut controls 70% of your immune system.',
    days: [
      { task: 'Add a fermented food to one meal (sauerkraut, kimchi, kefir)', tip: 'Fermented foods introduce billions of beneficial bacteria directly to your gut.' },
      { task: 'Eat 5+ different vegetables today', tip: 'Diversity is key — different fibers feed different beneficial bacteria strains.' },
      { task: 'No processed food today — whole foods only', tip: 'Preservatives and emulsifiers in processed food damage your gut lining.' },
      { task: 'Add prebiotic foods: garlic, onion, banana, or oats', tip: 'Prebiotics are food for your good bacteria. Without them, probiotics can\'t colonize.' },
      { task: 'Chew each bite 20+ times at one meal', tip: 'Digestion starts in the mouth. Thorough chewing reduces bloating and improves nutrient absorption.' },
      { task: 'Drink bone broth or add collagen to a meal', tip: 'Collagen peptides help repair the gut lining (intestinal permeability / "leaky gut").' },
      { task: 'Combine fiber + fermented food in one meal', tip: 'This combo is the gold standard for gut health: probiotics + their food in one sitting.' },
    ],
  },
  {
    title: 'Stress Detox',
    icon: '🧘',
    color: 'from-teal-500 to-cyan-500',
    desc: 'Cortisol is the #1 hidden blocker of fat loss. This week, systematically reduce stress triggers and build resilience.',
    days: [
      { task: 'Write down your top 3 stress triggers in your Journal', tip: 'Awareness is the first step. You can\'t fix what you haven\'t identified.' },
      { task: '10 minutes of meditation or deep breathing', tip: 'Just 10 minutes of meditation reduces cortisol by 15%. Use the breathing technique: 4-7-8.' },
      { task: 'Take a 20-minute nature walk — no phone', tip: 'Nature exposure reduces cortisol, blood pressure, and heart rate within 20 minutes.' },
      { task: 'Say no to one non-essential commitment today', tip: 'Over-commitment is a hidden stress source. Protecting your time protects your health.' },
      { task: 'Digital detox: no social media for 4 hours', tip: 'Social media triggers comparison anxiety and keeps your nervous system on alert.' },
      { task: 'Do something purely for enjoyment — no productivity', tip: 'Play, laughter, and joy are cortisol antidotes. Your body needs them to heal.' },
      { task: 'Reflect: which stress technique worked best this week?', tip: 'Make it a habit. One stress-management tool used daily is more powerful than all of them occasionally.' },
    ],
  },
  {
    title: 'Alkaline Kitchen',
    icon: '🥗',
    color: 'from-lime-500 to-green-500',
    desc: 'Cook alkaline-friendly meals all week. What you eat between shots determines how fast the protocol works.',
    days: [
      { task: 'Start the day with a green smoothie (spinach, banana, almond milk)', tip: 'Leafy greens are the most alkalizing foods. Blending makes nutrients more bioavailable.' },
      { task: 'Replace one acidic food with an alkaline alternative', tip: 'Swap white rice for quinoa, cow milk for almond milk, white bread for sweet potato.' },
      { task: 'Eat a fully plant-based lunch', tip: 'Vegetables, legumes, and whole grains are alkalizing. Meat and dairy are acidifying.' },
      { task: 'Prepare tomorrow\'s meals tonight (meal prep one day)', tip: 'Meal prep removes decision fatigue — the #1 reason people reach for fast food.' },
      { task: 'Add avocado or olive oil to two meals', tip: 'Healthy fats are alkalizing, reduce inflammation, and keep you full for hours.' },
      { task: 'Try a new recipe from the Bonus Recipes section', tip: 'Every recipe in the app is designed to complement your alkaline protocol.' },
      { task: 'Full week of alkaline eating — how do you feel?', tip: 'Most people notice reduced bloating, more energy, and clearer skin after just 7 days.' },
    ],
  },
];

const STORAGE_KEY = 'alkalean_weekly_challenge';

const getWeekNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.floor(((now - start) / 86400000 + start.getDay() + 1) / 7);
};

const getChallenge = () => CHALLENGES[getWeekNumber() % CHALLENGES.length];

const getChallengeProgress = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && data.week === getWeekNumber()) return data;
  } catch { /* ignore */ }
  return { week: getWeekNumber(), completed: [], streak: 0 };
};

const saveChallengeProgress = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

const getDayOfWeek = () => (new Date().getDay() + 6) % 7;

const WeeklyChallenge = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getChallengeProgress);
  const challenge = getChallenge();
  const today = getDayOfWeek();

  const handleToggleDay = (dayIdx) => {
    let newCompleted;
    if (progress.completed.includes(dayIdx)) {
      newCompleted = progress.completed.filter(d => d !== dayIdx);
    } else {
      newCompleted = [...progress.completed, dayIdx];
    }
    const updated = { ...progress, completed: newCompleted, week: getWeekNumber() };
    saveChallengeProgress(updated);
    setProgress(updated);
  };

  const completedCount = progress.completed.length;
  const isWeekComplete = completedCount === 7;
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-5 pb-24">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700">
        <ChevronLeft size={18} /> Back
      </button>

      <div className="mb-5">
        <div className="flex items-center space-x-2">
          <Trophy size={24} className="text-[#D4874D]" />
          <h1 className="text-2xl font-bold text-gray-900">Weekly Challenge</h1>
        </div>
        <p className="text-gray-500 text-sm mt-1">New challenge every week — build habits that stick</p>
      </div>

      {/* Challenge Card */}
      <div className={`bg-gradient-to-br ${challenge.color} rounded-2xl p-5 mb-5 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -mr-8 -mt-8" />
        <div className="relative z-10">
          <span className="text-4xl mb-3 block">{challenge.icon}</span>
          <h2 className="font-bold text-xl mb-1">{challenge.title}</h2>
          <p className="text-white/80 text-xs leading-relaxed">{challenge.desc}</p>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${(completedCount / 7) * 100}%` }} />
            </div>
            <span className="text-xs font-bold">{completedCount}/7</span>
          </div>
        </div>
      </div>

      {isWeekComplete && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 mb-5 border border-amber-200 text-center">
          <span className="text-4xl block mb-2">🏆</span>
          <h3 className="font-bold text-amber-800 text-lg mb-1">Challenge Complete!</h3>
          <p className="text-xs text-amber-600 leading-relaxed">You crushed it this week. A new challenge drops next Monday — keep the momentum going.</p>
        </div>
      )}

      {/* Week Overview */}
      <div className="grid grid-cols-7 gap-1.5 mb-5">
        {weekDays.map((day, i) => {
          const isCompleted = progress.completed.includes(i);
          const isToday = i === today;
          return (
            <div key={i} className="text-center">
              <p className={`text-[9px] font-bold mb-1.5 ${isToday ? 'text-[#6B3FA0]' : 'text-gray-400'}`}>{day}</p>
              <button
                onClick={() => handleToggleDay(i)}
                className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                  isCompleted ? 'bg-[#6B3FA0] text-white' :
                  isToday ? 'bg-[#F0ECF9] border-2 border-[#6B3FA0] text-[#6B3FA0]' :
                  'bg-gray-50 border border-gray-200 text-gray-300'
                }`}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="text-xs font-bold">{i + 1}</span>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Daily Tasks */}
      <h3 className="font-bold text-gray-900 text-sm mb-3">Daily Tasks</h3>
      <div className="space-y-2.5">
        {challenge.days.map((day, i) => {
          const isCompleted = progress.completed.includes(i);
          const isToday = i === today;
          return (
            <button
              key={i}
              onClick={() => handleToggleDay(i)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                isCompleted ? 'bg-[#F0ECF9] border-[#6B3FA0]/20' :
                isToday ? 'bg-white border-[#D4874D]/30 shadow-sm' :
                'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isCompleted ? 'bg-[#6B3FA0]' : isToday ? 'bg-[#D4874D]/10 border border-[#D4874D]/30' : 'bg-gray-100'
                }`}>
                  {isCompleted ? <Check size={14} className="text-white" strokeWidth={3} /> :
                   <span className={`text-xs font-bold ${isToday ? 'text-[#D4874D]' : 'text-gray-400'}`}>{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className={`text-sm font-semibold leading-snug ${isCompleted ? 'text-[#6B3FA0] line-through' : 'text-gray-900'}`}>
                      {day.task}
                    </p>
                    {isToday && !isCompleted && (
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-[#D4874D] text-white px-1.5 py-0.5 rounded-full flex-shrink-0">Today</span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{day.tip}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Challenge Preview */}
      <div className="mt-5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Next Week</p>
        <div className="flex items-center space-x-2">
          <span className="text-xl">{CHALLENGES[(getWeekNumber() + 1) % CHALLENGES.length].icon}</span>
          <p className="text-sm font-bold text-gray-700">{CHALLENGES[(getWeekNumber() + 1) % CHALLENGES.length].title}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChallenge;
