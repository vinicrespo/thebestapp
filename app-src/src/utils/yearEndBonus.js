const YEAR_END_MONTHS = [
  { id: 1, name: "October: The Metabolism Month", icon: "🍂", color: "from-orange-500 to-amber-600", desc: "Supercharge your metabolism before the holiday season hits. Build the furnace that will burn through anything." },
  { id: 2, name: "November: The Resilience Month", icon: "🦃", color: "from-red-500 to-rose-600", desc: "Stay strong through Thanksgiving and social events. Learn to enjoy food without guilt or setbacks." },
  { id: 3, name: "December: The Glow-Up Finale", icon: "🎄", color: "from-emerald-500 to-green-600", desc: "Finish the year as the best version of yourself. Walk into New Year's Eve feeling unstoppable." },
];

const WEEKLY_THEMES = [
  "Kickstart Week — Reset your metabolism with precision alkalizing and movement",
  "Thermogenic Week — Activate fat-burning pathways with spices, cold exposure, and HIIT",
  "Gut Optimization — Focus on prebiotic/probiotic balance for maximum nutrient absorption",
  "Hormonal Reset — Balance cortisol, insulin, and thyroid with adaptogens and sleep",
  "Strength Building — Build lean muscle to increase resting metabolic rate",
  "Anti-Inflammatory Deep Dive — Eliminate inflammation that blocks fat burning",
  "Mindset & Motivation — Mental fitness is physical fitness. Rewire your habits.",
  "Holiday Survival Toolkit — Navigate social eating, alcohol, and stress like a pro",
  "Gratitude & Grace — Combine emotional wellness with physical transformation",
  "Detox & Declutter — Clean your body, pantry, and mind before the new year",
  "Final Push — 21 days of focused effort to finish strong",
  "Celebration Week — Reflect, celebrate, and set your vision for the new year",
  "Bonus: New Year Prep — Set up your 2027 health foundation",
];

const DAILY_MISSIONS = [
  { title: "Morning Metabolism Igniter", desc: "Take your alkalizing shot within 10 min of waking. Follow with 5 min of jumping jacks or dancing. The combo raises your metabolic rate for 4+ hours.", icon: "🔥" },
  { title: "Power Protein Breakfast", desc: "Eat 30g+ protein within 1 hour of waking. This stops cortisol from storing belly fat and stabilizes blood sugar all morning.", icon: "🥚" },
  { title: "10-Minute Cold Exposure", desc: "End your shower with 2 min of cold water OR do 10 min outside in minimal clothing (safely). Cold activates brown fat, burning 300+ extra calories.", icon: "🧊" },
  { title: "Mindful Meal Challenge", desc: "Eat one meal today in complete silence — no phone, no TV, no reading. Chew each bite 20 times. Notice how much less you eat and how much more you enjoy it.", icon: "🍽️" },
  { title: "Gratitude + Movement", desc: "Walk for 20 min while listing (out loud) everything you're grateful for. Gratitude reduces cortisol by 23%. Movement burns fat. The combo is powerful.", icon: "🚶" },
  { title: "Spice Bomb Day", desc: "Add cayenne, cinnamon, ginger, or turmeric to EVERY meal today. Each one is thermogenic — they literally make your body produce heat to burn calories.", icon: "🌶️" },
  { title: "Digital Detox Evening", desc: "No screens after 7 PM. Read, stretch, journal, or take a bath. Blue light after sunset suppresses melatonin by 50% and disrupts fat-burning sleep.", icon: "📵" },
  { title: "Hydration Supercharge", desc: "Drink 3L of water today (about 12 glasses). Add lemon, cucumber, or mint. Your body needs water to metabolize fat — dehydration slows fat loss by 30%.", icon: "💧" },
  { title: "Strength Training Day", desc: "Do 20 min of bodyweight exercises: squats, lunges, push-ups, planks. Muscle burns 3x more calories than fat, even while you sleep.", icon: "💪" },
  { title: "Intermittent Fast Day", desc: "Do a 16:8 fast today (eat only between 12 PM and 8 PM). This gives your digestive system a break and triggers autophagy — cellular cleanup and repair.", icon: "⏰" },
  { title: "Gut Love Day", desc: "Eat 3 different fermented foods today (yogurt, kimchi, sauerkraut, kefir, miso, kombucha). Your gut controls 70% of your immune system and affects your weight.", icon: "🦠" },
  { title: "Self-Care Sunday", desc: "Take 1 hour for yourself: Epsom salt bath, face mask, dry brushing, meditation. Stress hormones cause belly fat — relaxation is a weight loss tool.", icon: "🛁" },
  { title: "Recipe Experiment", desc: "Cook a new healthy recipe you've never tried. The novelty activates dopamine (the 'reward' chemical) without needing sugar or junk food.", icon: "👩‍🍳" },
  { title: "5,000 Extra Steps", desc: "Add 5,000 steps beyond your normal today. Take the stairs, walk during calls, park far away. NEAT (non-exercise activity) burns 300-500 extra calories daily.", icon: "👟" },
  { title: "Journal Your Why", desc: "Spend 10 minutes writing about WHY you want this transformation. Be specific. People with a written 'why' are 42% more likely to achieve their goals.", icon: "📝" },
  { title: "Veggie Volume Day", desc: "Eat 5+ servings of vegetables today. Fill half your plate with veggies at every meal. Volume + fiber = fullness without excess calories.", icon: "🥦" },
  { title: "Sleep Optimization", desc: "Be in bed by 9:30 PM tonight. Room temp at 67°F. No caffeine after noon. Growth hormone peaks between 10 PM-2 AM — this is when your body burns the most fat.", icon: "😴" },
  { title: "Social Accountability", desc: "Tell someone about your health goals today or share your progress. Social accountability increases follow-through by 65% (American Society of Training study).", icon: "🗣️" },
  { title: "Anti-Inflammatory Feast", desc: "Build every meal around anti-inflammatory foods: salmon, turmeric, berries, leafy greens, olive oil, nuts. Inflammation is the hidden cause of weight loss resistance.", icon: "🐟" },
  { title: "Body Appreciation", desc: "Stand in front of a mirror and name 5 things your body does well. Appreciation activates different neural pathways than criticism — it literally changes your hormonal response.", icon: "🪞" },
  { title: "Breathing Reset", desc: "Do 3 rounds of box breathing every 3 hours today (4 sec in, 4 hold, 4 out, 4 hold). This resets your autonomic nervous system and lowers cortisol all day.", icon: "🫁" },
  { title: "Prebiotic Power Day", desc: "Eat garlic, onions, leeks, asparagus, and bananas today. These specific fibers feed Bifidobacteria and Lactobacillus — the bacteria that keep you lean.", icon: "🧄" },
  { title: "Morning Pages", desc: "First thing in the morning, write 3 pages of stream-of-consciousness thoughts. Don't edit, don't judge. This clears mental clutter that leads to emotional eating.", icon: "✍️" },
  { title: "Stretching Marathon", desc: "Do 15 min of deep stretching: hip openers, hamstrings, shoulders, spine. Flexibility improves blood flow to muscles, enhancing fat burning and recovery.", icon: "🤸" },
  { title: "Omega-3 Boost", desc: "Eat salmon, sardines, walnuts, or take fish oil today. Omega-3s turn on fat-burning genes and turn off fat-storing genes. Literally.", icon: "🐠" },
  { title: "Declutter Your Pantry", desc: "Remove one unhealthy item from your kitchen today. Out of sight = out of mind = 90% fewer impulse decisions. Environment design beats willpower every time.", icon: "🗑️" },
  { title: "Nature Immersion", desc: "Spend 30 min in nature — forest, park, beach. Japanese research shows 'forest bathing' reduces cortisol by 16%, blood pressure by 6%, and boosts NK cells by 50%.", icon: "🌳" },
  { title: "Posture Day", desc: "Set 6 hourly alarms. At each one, reset your posture: shoulders back, chin level, core engaged. Better posture = deeper breathing = lower cortisol = less belly fat.", icon: "🧍" },
  { title: "Cook with Love", desc: "Prepare a meal from scratch using only whole, unprocessed ingredients. No packages, no labels. Just real food. Feel the difference in your energy.", icon: "❤️" },
  { title: "Visualization Practice", desc: "Close your eyes for 5 min and vividly imagine your goal body, your ideal health. Neuroplasticity research shows this activates the SAME neural pathways as physical action.", icon: "🧠" },
  { title: "Double Water Challenge", desc: "Drink a full glass of water before each meal AND between each meal. Total: 10+ glasses. Most 'hunger' between meals is misinterpreted thirst.", icon: "🥛" },
  { title: "Skin Care Ritual", desc: "Dry brush your entire body, take a contrast shower (hot/cold), apply natural body oil. Your skin is your largest organ — treat it like the miracle it is.", icon: "✨" },
  { title: "Sugar Audit", desc: "Read the label of everything you eat today. Note the total sugar grams. Most people unknowingly consume 70g+ when the recommended max is 25g.", icon: "🔍" },
  { title: "Dance Party", desc: "Put on your favorite playlist and dance for 15 minutes. No one's watching. Dancing burns 200-400 cal/hour and releases endorphins better than any pill.", icon: "💃" },
  { title: "Early Dinner Experiment", desc: "Eat your last meal by 6 PM tonight. This extends your overnight fast to 14+ hours and gives your digestive system time to fully process everything.", icon: "🌅" },
  { title: "Bone Broth Day", desc: "Sip bone broth 3 times today: morning, afternoon, evening. Collagen heals gut, tightens skin, reduces joint pain, and supports weight loss.", icon: "🍵" },
  { title: "Compliment Day", desc: "Give 3 sincere compliments today. Oxytocin released from positive social interaction reduces cortisol. Kindness is literally a weight loss strategy.", icon: "💝" },
  { title: "Cold Plunge Courage", desc: "Take the coldest shower you can handle for 3 minutes. Or if you have access, try a cold plunge. Your body will burn fat for HOURS afterward to rewarm.", icon: "❄️" },
  { title: "Fiber Focus", desc: "Hit 30g of fiber today from whole foods: beans, lentils, broccoli, apples, oats, chia seeds. Fiber feeds fat-burning bacteria and keeps you full.", icon: "🫘" },
  { title: "Plan Your Ideal Day", desc: "Tonight, write out tomorrow's schedule including: meals, movement, hydration, sleep time, and self-care. 'Planned' days have 3x better health outcomes than reactive days.", icon: "📋" },
  { title: "Functional Movement", desc: "Do household chores vigorously for 30 min: cleaning, organizing, gardening. NEAT activity is often more effective for fat loss than a gym session.", icon: "🧹" },
  { title: "Tea Meditation", desc: "Brew a cup of herbal tea. Sit quietly. Watch the steam. Smell the aroma. Sip slowly. This 10-minute ritual activates your parasympathetic system.", icon: "🍵" },
  { title: "Learn Something New", desc: "Watch a documentary or read an article about nutrition science. Knowledge is power — when you understand WHY something works, you're 4x more likely to do it.", icon: "📚" },
  { title: "Bedtime Routine Upgrade", desc: "Create a 20-min bedtime routine: dim lights, chamomile tea, light stretching, gratitude list, 4-7-8 breathing. Repeat nightly. Routines signal sleep to your brain.", icon: "🌙" },
  { title: "Raw Food Meal", desc: "Eat one completely raw meal today: big salad, smoothie, or veggie plate. Raw foods retain maximum enzymes and nutrients that cooking destroys.", icon: "🥗" },
  { title: "Progress Photo", desc: "Take a progress photo in the same lighting and pose as your Day 1 photo. Compare them side by side. The scale lies — photos tell the truth.", icon: "📸" },
  { title: "Celebration Ritual", desc: "Write down 3 health wins from this week, no matter how small. Celebrate them. Acknowledging progress creates positive neural associations with healthy behavior.", icon: "🎉" },
  { title: "Alkaline Day", desc: "Make every food choice today an alkaline one: greens, vegetables, fruits, nuts, seeds. Avoid: processed food, sugar, alcohol, dairy. Feel the energy difference.", icon: "🌿" },
  { title: "Meal Prep Power Hour", desc: "Spend 1 hour prepping healthy meals for the next 3 days. Wash, chop, cook. Having food ready eliminates 80% of poor food decisions.", icon: "🥘" },
  { title: "Reflection & Reset", desc: "Journal for 15 minutes: What worked this week? What didn't? What will you adjust? This weekly review is the #1 habit of people who maintain their results long-term.", icon: "📓" },
  { title: "Year-End Letter", desc: "Write a letter to your January 1st self. Describe who you've become, what you've achieved, how you feel. Seal it. Read it on New Year's Day.", icon: "✉️" },
  { title: "Legacy Day", desc: "Share one thing you've learned on this journey with someone who needs to hear it. Teaching others reinforces your own commitment and creates ripple effects.", icon: "🌊" },
  { title: "New Year's Vision Board", desc: "Create a simple vision board for 2027: goals, feelings, images that represent your healthiest self. Put it where you'll see it every morning.", icon: "🎯" },
  { title: "Gratitude Feast", desc: "Cook a meal using your favorite protocol recipes. Sit down and eat it slowly, appreciating every bite. You've earned this. You've transformed.", icon: "🙏" },
];

const MOTIVATIONAL_QUOTES = [
  "The last 3 months of the year are where champions are made. Everyone starts in January. You'll FINISH in December.",
  "Your body hears everything your mind says. Talk to yourself like someone you're rooting for.",
  "You're not behind. You're exactly where you need to be. The fact that you're still here says everything.",
  "The woman who walks into New Year's Eve won't be the same woman who started this journey. She's stronger.",
  "Small daily improvements over time lead to stunning results. You're proving that right now.",
  "The holidays don't have to mean setbacks. They can mean celebrations of how far you've come.",
  "You've already done the hardest part: you started. Now just keep showing up.",
  "Your metabolism doesn't take holidays. Neither does your commitment.",
  "Three months from now you'll thank yourself for not giving up today.",
  "The glow-up isn't just physical. It's the confidence, the energy, the joy. That's the real transformation.",
  "You're building a body that will carry you through decades. This isn't a diet — it's an investment.",
  "Every healthy choice is a vote for the person you want to become.",
  "The people who transform their lives don't have more willpower. They have better systems. You have the system.",
  "Your future self is watching you right now. Make her proud.",
];

export const getYearEndMonth = (day) => {
  if (day <= 31) return YEAR_END_MONTHS[0];
  if (day <= 61) return YEAR_END_MONTHS[1];
  return YEAR_END_MONTHS[2];
};

export const getYearEndWeek = (day) => {
  const weekIdx = Math.floor((day - 1) / 7) % WEEKLY_THEMES.length;
  return WEEKLY_THEMES[weekIdx];
};

export const getYearEndDayContent = (day) => {
  const idx = day - 1;
  const missionIdx = idx % DAILY_MISSIONS.length;
  const quoteIdx = idx % MOTIVATIONAL_QUOTES.length;

  return {
    month: getYearEndMonth(day),
    weekTheme: getYearEndWeek(day),
    mission: DAILY_MISSIONS[missionIdx],
    quote: MOTIVATIONAL_QUOTES[quoteIdx],
    dayNumber: day,
  };
};

export { YEAR_END_MONTHS, DAILY_MISSIONS, MOTIVATIONAL_QUOTES };
