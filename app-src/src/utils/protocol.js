export const getDailyProtocol = (currentDay, profile) => {
    const protocols = [
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Day 1: Hydration is key today. Flush out loosened toxins from your gut lining." },
        { phase: "Gut Priming", recipe: "1 tbsp Apple Cider Vinegar in 8oz water before lunch.", tip: "Day 2: ACV naturally lowers blood sugar spikes and aids digestion." },
        { phase: "Gut Priming", recipe: "1/2 tsp Cinnamon in your morning coffee or tea.", tip: "Day 3: Cinnamon improves insulin sensitivity, reducing cravings." },
        { phase: "Gut Priming", recipe: "Ginger Tea (steep 3 slices of fresh ginger for 10 mins).", tip: "Day 4: Ginger soothes the gut lining and reduces systemic inflammation." },
        { phase: "Gut Priming", recipe: "1/4 tsp Turmeric + pinch of black pepper in warm water.", tip: "Day 5: Curcumin (in turmeric) is a potent anti-inflammatory for gut repair." },
        { phase: "Gut Priming", recipe: "Matcha Green Tea (1 tsp whisked in hot water).", tip: "Day 6: EGCG in matcha feeds beneficial bacteria while burning fat." },
        { phase: "Gut Priming", recipe: "Bone Broth (1 cup warm, salted to taste).", tip: "Day 7: The collagen repairs the 'leaky' gaps in your intestinal wall." },

        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Day 8: Ginger amplifies the metabolic burn. Take exactly 20 mins before breakfast." },
        { phase: "Metabolic Ignition", recipe: "Black Coffee + 1 tsp Coconut Oil.", tip: "Day 9: MCTs in coconut oil convert directly to ketone energy, bypassing fat storage." },
        { phase: "Metabolic Ignition", recipe: "Peppermint Tea after your largest meal.", tip: "Day 10: Relaxes the gastrointestinal tract and signals the brain that eating is done." },
        { phase: "Metabolic Ignition", recipe: "1 tbsp Chia Seeds soaked in 8oz lemon water.", tip: "Day 11: Acts as an internal 'scrubber' to remove waste from the digestive tract." },
        { phase: "Metabolic Ignition", recipe: "Pinch of Cayenne Pepper in 4oz water.", tip: "Day 12: Triggers thermogenesis, forcing your body to burn calories to cool down." },
        { phase: "Metabolic Ignition", recipe: "Oolong Tea (steep for 5 mins).", tip: "Day 13: Studies show Oolong increases fat oxidation by 12%." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Cumin powder in warm water.", tip: "Day 14: Cumin accelerates the breakdown of lipids (fats) in the liver." },

        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Day 15: Berberine acts like a natural metabolic switch. Energy should be peaking." },
        { phase: "Fat Burning Peak", recipe: "12-Hour Intermittent Fast (Water only after 8 PM).", tip: "Day 16: Give your digestive system a break to trigger cellular autophagy." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Himalayan Pink Salt in 16oz water.", tip: "Day 17: Replenishes essential trace minerals lost during rapid fat burning." },
        { phase: "Fat Burning Peak", recipe: "Grapefruit juice (freshly squeezed, 4oz).", tip: "Day 18: Naringenin in grapefruit helps the liver break down fat faster." },
        { phase: "Fat Burning Peak", recipe: "Green Tea with a squeeze of fresh lemon.", tip: "Day 19: Vitamin C increases the absorption of fat-burning catechins." },
        { phase: "Fat Burning Peak", recipe: "Dandelion Root Tea.", tip: "Day 20: A natural diuretic to flush out stubborn water retention." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Fenugreek seeds soaked overnight.", tip: "Day 21: Stabilizes morning blood sugar to prevent fat storage." },

        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Day 22: Skin firmness check! The NAD+ boosting effects should be visible now." },
        { phase: "Rejuvenation", recipe: "Aloe Vera Juice (2 tbsp in water).", tip: "Day 23: Soothes the digestive tract and promotes clear, glowing skin." },
        { phase: "Rejuvenation", recipe: "1 tsp Maca Powder in almond milk.", tip: "Day 24: An adaptogen that balances hormones and boosts libido." },
        { phase: "Rejuvenation", recipe: "Chamomile Tea before bed.", tip: "Day 25: Lowers cortisol (stress hormone) which causes belly fat retention." },
        { phase: "Rejuvenation", recipe: "1 tbsp Flaxseed (ground) in water or yogurt.", tip: "Day 26: High in lignans to balance estrogen dominance naturally." },
        { phase: "Rejuvenation", recipe: "Cranberry Juice (100% pure, 2oz).", tip: "Day 27: Prevents bad bacteria from adhering to the urinary and digestive tracts." },
        { phase: "Rejuvenation", recipe: "Rooibos Tea.", tip: "Day 28: Caffeine-free and packed with Aspalathin, reducing stress-related fat storage." },
        { phase: "Rejuvenation", recipe: "1/2 tsp Ashwagandha powder in warm milk/water.", tip: "Day 29: Deeply restores the adrenal glands and thyroid function." },
        { phase: "Rejuvenation", recipe: "Ultimate Reset: 1/2 tsp Baking Soda + Lemon + Ginger.", tip: "Day 30. Congratulations! You've achieved a full biological reset." }
    ];

    const idx = Math.min(Math.max(currentDay - 1, 0), protocols.length - 1);
    let { phase, recipe, tip } = protocols[idx];

    if (profile?.healthFlags?.menopause) {
        tip += " 🌸 Menopause Support: Keep your room cool tonight to support estrogen rebalancing.";
    }
    if (profile?.healthFlags?.bloating) {
        tip += " 🍃 Digestion: If you feel bloating, sip peppermint tea 30 mins after your shot.";
    }
    if (profile?.healthFlags?.thyroid) {
        tip += " 🦋 Thyroid: Ensure you're getting enough selenium (e.g., one Brazil nut today).";
    }

    return { phase, recipe, tip };
};

export const getHormonalCalculator = (weight, age) => {
    const baseDosage = weight > 160 ? 1.2 : 0.8;
    const ageMultiplier = age > 45 ? 1.5 : 1.1;
    const finalDose = (baseDosage * ageMultiplier).toFixed(1);

    return `Based on your profile (Age: ${age}, Weight: ${weight} lbs), your optimal baseline for the Evening Tonic is ${finalDose} tsp of the natural adaptogen mix (Maca/Ashwagandha).`;
};

export const getMotivationalQuote = () => {
    const quotes = [
        "You didn't come this far to only come this far.",
        "Your body is listening to everything your mind says. Stay positive.",
        "Small daily improvements are the key to staggering long-term results.",
        "The woman who started this journey would be so proud of you right now.",
        "You're not starting over. You're starting from experience.",
        "Every healthy choice you make is a love letter to your future self.",
        "Progress, not perfection. You're doing amazing.",
        "Your body can stand almost anything. It's your mind you have to convince.",
        "She believed she could, so she did.",
        "The best project you'll ever work on is you.",
        "Don't compare your chapter 1 to someone else's chapter 20.",
        "You are one decision away from a completely different life.",
        "Discipline is choosing between what you want now and what you want most.",
        "Healing isn't linear, but you're still moving forward.",
        "Your only limit is the story you tell yourself.",
        "Be patient with yourself. Transformation takes time.",
        "The secret of getting ahead is getting started. You already did.",
        "Nourish your body. It's the only place you have to live.",
        "You're not just losing weight. You're gaining your life back.",
        "Trust the process. Your body knows what to do.",
        "Today is a perfect day to start living the life you've imagined.",
        "A year from now, you'll wish you had started today. You did.",
        "You don't have to be extreme. Just be consistent.",
        "Celebrate every small victory. They add up fast.",
        "Your health is an investment, not an expense.",
        "The comeback is always stronger than the setback.",
        "You are proof that it's never too late.",
        "One shot, one day, one choice at a time.",
        "Slow progress is still progress. Keep going.",
        "You are braver than you believe and stronger than you seem.",
        "Fall in love with taking care of yourself.",
        "Your future self is thanking you right now.",
        "Good things come to those who sweat — and those who sip their shots.",
        "Every morning is a new chance to change your story.",
        "You deserve to feel good in your own skin.",
        "Strong women lift each other up. Share your journey.",
        "The hardest part was starting. You've already done that.",
        "Your glow-up is not just physical. It's spiritual.",
        "Some days you eat salads and go for walks. Some days you eat cupcakes. Balance.",
        "Age is just a number. Your body can transform at any stage.",
        "Don't wait until you've reached your goal to be proud of yourself.",
        "The energy you put into yourself comes back tenfold.",
        "You're building a healthier you, one day at a time.",
        "What you do every day matters more than what you do once in a while.",
        "Your metabolism is waking up. Can you feel it?",
        "Inhale confidence. Exhale doubt.",
        "You are the main character. Act like it.",
        "Consistency beats intensity. Every single time.",
        "Your body is your home. Make it a place you love.",
        "Today's effort is tomorrow's result. Keep going, beautiful."
    ];
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return quotes[dayOfYear % quotes.length];
};

export const BADGES = {
    first_day: { icon: "🌱", title: "First Step", desc: "Completed your first day" },
    week_1: { icon: "⭐", title: "One Week Strong", desc: "7 days completed" },
    streak_3: { icon: "🔥", title: "On Fire", desc: "3-day streak" },
    streak_7: { icon: "💪", title: "Unstoppable", desc: "7-day streak" },
    streak_14: { icon: "👑", title: "Queen of Consistency", desc: "14-day streak" },
    half_way: { icon: "🎯", title: "Halfway There", desc: "15 days completed" },
    week_3: { icon: "🦋", title: "Transformation", desc: "21 days completed" },
    complete: { icon: "🏆", title: "Protocol Complete", desc: "All 30 days done!" },
};

export const PHASES = [
    { id: 1, name: "Gut Priming", range: "Days 1-7", color: "from-emerald-500 to-green-600", icon: "🌿" },
    { id: 2, name: "Metabolic Ignition", range: "Days 8-14", color: "from-orange-500 to-amber-600", icon: "🔥" },
    { id: 3, name: "Fat Burning Peak", range: "Days 15-21", color: "from-red-500 to-rose-600", icon: "⚡" },
    { id: 4, name: "Rejuvenation", range: "Days 22-30", color: "from-violet-500 to-purple-600", icon: "🦋" },
];

export const SHOPPING_LIST = {
    essentials: [
        { item: "Baking Soda", note: "Pure, food-grade (e.g., Arm & Hammer)" },
        { item: "Lemons", note: "Fresh, organic preferred — you'll need about 15" },
        { item: "Apple Cider Vinegar", note: "With 'the mother' (Bragg's is great)" },
        { item: "Fresh Ginger Root", note: "About 4-5 inches total" },
        { item: "Ground Cinnamon", note: "Ceylon cinnamon is best" },
        { item: "Ground Turmeric", note: "Or fresh turmeric root" },
        { item: "Black Pepper", note: "Freshly ground — activates curcumin" },
        { item: "Himalayan Pink Salt", note: "Fine grain" },
    ],
    teas: [
        { item: "Matcha Green Tea Powder", note: "Ceremonial grade for best results" },
        { item: "Peppermint Tea Bags", note: "Pure peppermint, caffeine-free" },
        { item: "Oolong Tea", note: "Loose leaf or bags" },
        { item: "Chamomile Tea", note: "Pure chamomile flowers" },
        { item: "Dandelion Root Tea", note: "Roasted or raw" },
        { item: "Rooibos Tea", note: "Naturally caffeine-free" },
    ],
    superfoods: [
        { item: "Chia Seeds", note: "White or black — both work" },
        { item: "Ground Flaxseed", note: "Buy pre-ground or grind fresh" },
        { item: "Coconut Oil", note: "Virgin, cold-pressed" },
        { item: "Bone Broth", note: "Organic chicken or beef — or make your own" },
        { item: "Maca Powder", note: "Gelatinized is easier to digest" },
        { item: "Ashwagandha Powder", note: "KSM-66 extract preferred" },
        { item: "Fenugreek Seeds", note: "Whole seeds, to soak overnight" },
        { item: "Aloe Vera Juice", note: "Inner fillet, no preservatives" },
    ],
    optional: [
        { item: "Fresh Grapefruit", note: "For Day 18 recipe" },
        { item: "Cranberry Juice", note: "100% pure, unsweetened" },
        { item: "Cayenne Pepper", note: "Small amount goes a long way" },
        { item: "Ground Cumin", note: "For Day 14" },
        { item: "Shea Butter", note: "For the Youth Cream recipe" },
        { item: "Rosehip Oil", note: "Cold-pressed, for skin care" },
        { item: "Vitamin E Oil", note: "For skin care recipe" },
    ]
};

export const BONUS_RECIPES = [
    {
        id: 'green_smoothie',
        title: "Green Detox Smoothie",
        time: "5 min",
        category: "Breakfast",
        ingredients: ["1 cup spinach", "1/2 banana (frozen)", "1/2 cup almond milk", "1 tbsp chia seeds", "1/2 lemon juice", "Ice cubes"],
        instructions: "Blend all ingredients until smooth. Drink within 30 minutes for maximum nutrient absorption. Perfect to pair with your morning shot.",
        tip: "Spinach is rich in iron and magnesium — two minerals that support metabolism."
    },
    {
        id: 'turmeric_bowl',
        title: "Golden Turmeric Bowl",
        time: "15 min",
        category: "Lunch",
        ingredients: ["1 cup quinoa (cooked)", "1/2 avocado", "1 boiled egg", "Mixed greens", "1/4 tsp turmeric", "Olive oil + lemon dressing"],
        instructions: "Layer quinoa, greens, sliced avocado and egg in a bowl. Sprinkle turmeric and drizzle with olive oil and fresh lemon.",
        tip: "This bowl has healthy fats, protein and anti-inflammatory spices — everything your metabolism needs."
    },
    {
        id: 'salmon_dinner',
        title: "Lemon Herb Salmon",
        time: "25 min",
        category: "Dinner",
        ingredients: ["1 salmon fillet", "1 lemon (sliced)", "2 garlic cloves (minced)", "Fresh dill or rosemary", "Steamed broccoli", "Salt & pepper"],
        instructions: "Preheat oven to 400°F. Place salmon on foil, top with lemon, garlic and herbs. Bake 18-20 min. Serve with steamed broccoli.",
        tip: "Salmon's omega-3s help reduce inflammation and support hormonal balance."
    },
    {
        id: 'energy_bites',
        title: "No-Bake Energy Bites",
        time: "10 min",
        category: "Snack",
        ingredients: ["1 cup oats", "1/2 cup peanut butter", "1/3 cup honey", "1/4 cup dark chocolate chips", "2 tbsp ground flaxseed", "1 tsp vanilla"],
        instructions: "Mix all ingredients. Refrigerate 30 min. Roll into 1-inch balls. Store in the fridge for up to a week. Grab one when cravings hit.",
        tip: "These are a lifesaver when sugar cravings strike — sweet enough to satisfy without the crash."
    },
    {
        id: 'detox_soup',
        title: "Gut-Healing Vegetable Soup",
        time: "30 min",
        category: "Dinner",
        ingredients: ["2 cups bone broth", "1 zucchini (diced)", "1 carrot (diced)", "1/2 cup cabbage (shredded)", "1 celery stalk", "Fresh ginger (1 inch)", "Garlic, salt, pepper"],
        instructions: "Sauté garlic and ginger in olive oil. Add vegetables, then broth. Simmer 20 min until tender. Season to taste.",
        tip: "Bone broth + fiber-rich vegetables = the ultimate gut-healing combo."
    },
    {
        id: 'chia_pudding',
        title: "Overnight Chia Pudding",
        time: "5 min prep",
        category: "Breakfast",
        ingredients: ["3 tbsp chia seeds", "1 cup almond milk", "1 tsp vanilla", "1 tsp honey or maple syrup", "Fresh berries for topping"],
        instructions: "Mix chia seeds, milk, vanilla and sweetener in a jar. Refrigerate overnight. Top with berries in the morning.",
        tip: "Chia seeds expand 10x in liquid — you'll feel full for hours without overeating."
    },
    {
        id: 'cucumber_salad',
        title: "Anti-Bloat Cucumber Salad",
        time: "10 min",
        category: "Lunch",
        ingredients: ["1 large cucumber (sliced thin)", "1/4 red onion (sliced)", "2 tbsp apple cider vinegar", "1 tbsp olive oil", "Fresh dill", "Salt & pepper"],
        instructions: "Combine all ingredients in a bowl. Let marinate 10 minutes before serving. Great as a side dish with any protein.",
        tip: "Cucumber is 95% water and naturally reduces bloating. ACV aids digestion."
    }
];

export const SLEEP_TIPS = [
    { title: "The 10 PM Rule", desc: "Try to be in bed by 10 PM. Between 10 PM and 2 AM, your body produces the most growth hormone — which is essential for fat burning and cell repair.", icon: "🌙" },
    { title: "Blue Light Cut-Off", desc: "Stop using phones, tablets and TVs 1 hour before bed. Blue light suppresses melatonin, the hormone that tells your body it's time to sleep and recover.", icon: "📱" },
    { title: "Cool Room = Better Burn", desc: "Set your room temperature to 65-68°F (18-20°C). A cooler room activates brown fat, which burns calories to keep you warm while you sleep.", icon: "❄️" },
    { title: "Chamomile Ritual", desc: "Drink chamomile tea 30 minutes before bed. It lowers cortisol (the stress hormone that causes belly fat) and signals your nervous system to relax.", icon: "🍵" },
    { title: "The 4-7-8 Technique", desc: "Breathe in for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 3 times. This activates your parasympathetic nervous system and calms racing thoughts.", icon: "🫁" },
];

export const DID_YOU_KNOW = [
    "Your gut has over 100 million neurons — it's called your 'second brain.' When your gut is happy, your mood and cravings improve dramatically.",
    "Studies show that people who drink warm lemon water in the morning have 30% better digestion throughout the day.",
    "Baking soda (sodium bicarbonate) has been used medicinally since ancient Egypt. It naturally alkalizes stomach acid.",
    "Your body burns the most fat between 2-4 AM during deep sleep. That's why quality sleep is essential for weight loss.",
    "Cinnamon can lower blood sugar by up to 29% — that's why it's so effective at reducing sugar cravings.",
    "Walking 7,000 steps a day reduces your risk of early death by 50-70%, according to recent studies.",
    "Apple cider vinegar can help you feel 200-275 fewer calories per day by slowing stomach emptying.",
    "Turmeric is 10x more effective when combined with black pepper. The piperine increases absorption by 2,000%.",
    "Your metabolism doesn't slow down with age as much as scientists once thought. Recent studies show it stays stable until age 60.",
    "Drinking cold water can temporarily boost metabolism by 24-30% because your body burns energy warming it up.",
    "Ginger has been shown in studies to increase thermogenesis (heat production) by up to 20% after meals.",
    "The bacteria in your gut weigh about 3-5 pounds. Rebalancing them can change how your body stores fat.",
    "Women over 40 who strength train just 2x a week can reverse up to 10 years of muscle loss.",
    "Magnesium (found in dark chocolate!) helps over 300 enzyme reactions including those that regulate metabolism.",
    "Intermittent fasting doesn't just burn fat — it triggers autophagy, where your body 'cleans up' damaged cells.",
];
