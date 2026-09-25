export const HORMONAL_CYCLES = [
  { id: 1, name: "Cortisol Control", range: "Days 1-15", icon: "🧘", color: "from-blue-500 to-indigo-600", desc: "Tame the stress hormone that causes belly fat, cravings, and hormonal chaos." },
  { id: 2, name: "Thyroid & Metabolism", range: "Days 16-30", icon: "🦋", color: "from-emerald-500 to-teal-600", desc: "Reactivate your thyroid to restore your metabolic rate and energy levels." },
  { id: 3, name: "Hormonal Balance & Vitality", range: "Days 31-45", icon: "✨", color: "from-purple-500 to-pink-600", desc: "Harmonize estrogen, progesterone, and testosterone for total body transformation." },
];

const MORNING_SHOTS = [
  "Maca + cinnamon latte: 1 tsp maca powder + 1/4 tsp cinnamon in warm almond milk. Balances endocrine system.",
  "Ashwagandha golden milk: 1/4 tsp ashwagandha + 1/4 tsp turmeric + warm coconut milk + raw honey.",
  "Adaptogenic matcha: 1 tsp matcha + 1/4 tsp ashwagandha + warm oat milk. Calm energy, not jittery.",
  "Vitex berry tea: 1 tsp chasteberry steeped 10 min. The #1 herb for female hormonal balance.",
  "Black cohosh tea: steep 1 tsp for 8 min. Naturally modulates estrogen receptor activity.",
  "Spearmint tea: steep 5 min. Clinically shown to reduce androgens (excess male hormones) in women.",
  "Red clover tea: 1 tsp steeped 10 min. Contains isoflavones that gently support estrogen levels.",
  "DIM-boosting smoothie: broccoli sprouts + kale + lemon + ginger + water. Metabolizes excess estrogen.",
  "Rhodiola rosea tea: 1/2 tsp powder in warm water. Reduces cortisol by 30% in clinical studies.",
  "Evening primrose oil: 1 capsule with warm lemon water. GLA supports prostaglandin production.",
  "Shatavari + warm milk: 1/4 tsp shatavari powder. Ayurvedic female reproductive tonic.",
  "Holy basil (tulsi) tea steeped 7 min. Adaptogen that normalizes cortisol and blood sugar.",
  "Dong quai tea: 1/2 tsp steeped 10 min. Traditional Chinese 'female ginseng' for hormonal balance.",
  "Sage tea: 1 tsp dried sage steeped 5 min. Reduces hot flashes by 50% in 4 weeks (study-backed).",
  "Fenugreek + honey in warm water. Increases estrogen naturally and reduces menopausal symptoms.",
  "Reishi + cacao: 1/2 tsp reishi powder + 1 tsp raw cacao in warm almond milk. Immune + hormonal support.",
  "Nettle leaf infusion: steep 1 tbsp nettle in hot water 15 min. Mineral-dense, supports adrenals.",
  "Red raspberry leaf tea: 1 tsp steeped 10 min. Tones the uterus and balances estrogen/progesterone.",
  "Licorice root + peppermint tea. Licorice supports adrenal function, peppermint calms the system.",
  "Seed cycling shot: 1 tbsp ground flaxseed in warm water (days 1-14 of cycle). Supports estrogen metabolism.",
  "Omega boost: 1 tbsp ground pumpkin seeds + warm water (days 15-28 of cycle). Supports progesterone.",
  "Moringa + lemon: 1/2 tsp moringa powder in warm water + lemon. 7x more vitamin C than oranges.",
  "Cinnamon + ginger tea: regulates insulin (which controls ALL other hormones downstream).",
  "Black seed oil: 1 tsp in warm water. Thymoquinone reduces inflammation and balances hormones.",
  "Passionflower + chamomile blend: anxiolytic without sedation. Lowers cortisol gently.",
  "Turmeric + saffron latte: warm milk + 1/4 tsp turmeric + pinch of saffron. Mood + hormone support.",
  "Elderflower tea: steeped 5 min. Traditional remedy for hormonal skin issues and night sweats.",
  "Cranberry + ACV: 2oz pure cranberry juice + 1 tbsp ACV + water. Estrogen detox via liver support.",
  "Dandelion root coffee with maca: liver detox + endocrine support in one cup.",
  "Lemon balm + lavender tea: 1 tsp each steeped 7 min. Reduces cortisol and improves sleep quality.",
];

const ROUTINE_CHECKLISTS = [
  [
    { task: "Take morning adaptogen shot", icon: "🥤" },
    { task: "5-minute deep breathing exercise", icon: "🫁" },
    { task: "Eat protein within 1 hour of waking", icon: "🥚" },
    { task: "Avoid caffeine before 9 AM", icon: "☕" },
    { task: "15 min morning sunlight exposure", icon: "☀️" },
    { task: "Evening magnesium supplement", icon: "💊" },
  ],
  [
    { task: "Morning hormone-balancing shot", icon: "🥤" },
    { task: "Body scan meditation (5 min)", icon: "🧘" },
    { task: "Include healthy fats at breakfast", icon: "🥑" },
    { task: "Gentle stretching or yoga (10 min)", icon: "🤸" },
    { task: "No screens 1 hour before bed", icon: "📵" },
    { task: "Gratitude journaling (3 items)", icon: "📝" },
  ],
  [
    { task: "Drink adaptogenic morning shot", icon: "🥤" },
    { task: "Cold shower finish (30 sec)", icon: "🚿" },
    { task: "Eat cruciferous vegetable today", icon: "🥦" },
    { task: "30-minute walk in nature", icon: "🚶" },
    { task: "Seed cycling supplement", icon: "🌰" },
    { task: "Bed by 10 PM", icon: "🛌" },
  ],
  [
    { task: "Morning shot + lemon water", icon: "🥤" },
    { task: "4-7-8 breathing (3 rounds)", icon: "🫁" },
    { task: "Omega-3 rich meal (salmon/walnuts)", icon: "🐟" },
    { task: "Limit sugar to under 25g today", icon: "🍬" },
    { task: "Evening herbal tea ritual", icon: "🍵" },
    { task: "Apply lavender to wrists before sleep", icon: "💜" },
  ],
  [
    { task: "Take morning tonic", icon: "🥤" },
    { task: "Mindful eating at breakfast", icon: "🍽️" },
    { task: "Include fiber-rich foods (25g+)", icon: "🌾" },
    { task: "Strength training or resistance (20 min)", icon: "💪" },
    { task: "Reduce processed food today", icon: "🚫" },
    { task: "Epsom salt bath or foot soak", icon: "🛁" },
  ],
];

const HORMONAL_RECIPES = [
  { title: "Seed Cycling Power Bowl", desc: "Quinoa + pumpkin seeds + sunflower seeds + avocado + roasted sweet potato + tahini-lemon dressing.", time: "15 min", category: "Lunch" },
  { title: "Anti-Cortisol Smoothie", desc: "Banana + ashwagandha (1/4 tsp) + almond butter + spinach + almond milk + cinnamon.", time: "5 min", category: "Breakfast" },
  { title: "Thyroid-Boosting Salmon Bowl", desc: "Wild salmon + brown rice + seaweed + edamame + cucumber + ginger-tamari sauce.", time: "20 min", category: "Dinner" },
  { title: "Flaxseed Crusted Chicken", desc: "Chicken breast coated in ground flaxseed + herbs. Bake 25 min. Serve with roasted Brussels sprouts.", time: "30 min", category: "Dinner" },
  { title: "Hormone-Balancing Parfait", desc: "Greek yogurt + walnuts + fresh figs + ground flaxseed + drizzle of raw honey + cinnamon.", time: "5 min", category: "Breakfast" },
  { title: "Miso-Ginger Stir-Fry", desc: "Tofu + broccoli + bok choy + shiitake mushrooms in miso-ginger sauce. Serve over cauliflower rice.", time: "15 min", category: "Dinner" },
  { title: "Brazil Nut Energy Balls", desc: "Brazil nuts (selenium!) + dates + cacao + coconut oil + vanilla. Roll into balls. Freeze.", time: "10 min", category: "Snack" },
  { title: "Sardine & Avocado Toast", desc: "Whole grain toast + mashed avocado + sardines + lemon + red pepper flakes. Omega-3 powerhouse.", time: "5 min", category: "Lunch" },
  { title: "Turmeric Egg Scramble", desc: "Eggs scrambled with turmeric, spinach, mushrooms, and goat cheese. Serve with berries on the side.", time: "10 min", category: "Breakfast" },
  { title: "Chickpea Curry", desc: "Chickpeas in coconut milk + turmeric + cumin + ginger + spinach. Serve over brown rice.", time: "20 min", category: "Dinner" },
  { title: "Matcha Chia Pudding", desc: "Chia seeds + coconut milk + 1/2 tsp matcha + vanilla. Refrigerate overnight. Top with berries.", time: "5 min prep", category: "Breakfast" },
  { title: "Walnut-Crusted Cod", desc: "Cod fillet topped with crushed walnuts, Dijon, and herbs. Bake 15 min. Serve with sweet potato mash.", time: "25 min", category: "Dinner" },
  { title: "Seaweed Snack Plate", desc: "Nori sheets + cucumber + avocado + smoked salmon + sesame seeds. Roll and dip in tamari.", time: "10 min", category: "Snack" },
  { title: "Pumpkin Seed Pesto Pasta", desc: "Zucchini noodles with pesto made from pumpkin seeds, basil, olive oil, and lemon.", time: "15 min", category: "Lunch" },
  { title: "Adaptogenic Hot Chocolate", desc: "Raw cacao + ashwagandha + reishi + warm almond milk + honey. The ultimate hormone-supporting treat.", time: "5 min", category: "Snack" },
  { title: "Mediterranean Lentil Bowl", desc: "Lentils + roasted red peppers + feta + olives + arugula + lemon-olive oil dressing.", time: "15 min", category: "Lunch" },
  { title: "Baked Sweet Potato Boats", desc: "Sweet potatoes baked and filled with black beans, corn, avocado, and cilantro-lime crema.", time: "35 min", category: "Dinner" },
  { title: "Collagen Berry Bowl", desc: "Frozen berries + collagen peptides + banana + coconut milk blended thick. Top with hemp seeds + coconut.", time: "5 min", category: "Breakfast" },
  { title: "Sesame Ginger Edamame", desc: "Steamed edamame tossed with sesame oil, grated ginger, garlic, and a pinch of sea salt.", time: "5 min", category: "Snack" },
  { title: "Turkey & Veggie Sheet Pan", desc: "Turkey meatballs + sweet potato cubes + Brussels sprouts + red onion. Roast 25 min at 400°F.", time: "30 min", category: "Dinner" },
];

const SYMPTOM_CATEGORIES = [
  { id: "hot_flashes", label: "Hot Flashes", icon: "🌡️" },
  { id: "mood_swings", label: "Mood Swings", icon: "🎭" },
  { id: "energy", label: "Energy Level", icon: "⚡" },
  { id: "sleep", label: "Sleep Quality", icon: "😴" },
  { id: "libido", label: "Libido", icon: "❤️" },
  { id: "anxiety", label: "Anxiety", icon: "😰" },
  { id: "brain_fog", label: "Brain Fog", icon: "🌫️" },
  { id: "weight", label: "Weight Changes", icon: "⚖️" },
  { id: "skin", label: "Skin/Hair", icon: "✨" },
  { id: "digestion", label: "Digestion", icon: "🫄" },
];

const EDUCATIONAL_CONTENT = [
  { title: "Cortisol: The Belly Fat Hormone", content: "Cortisol is produced by your adrenal glands in response to stress. When chronically elevated, it tells your body to store fat specifically around your midsection (visceral fat). This isn't just cosmetic — visceral fat produces its own hormones that further disrupt your balance. The AlkaLean protocol's alkalizing shots reduce cortisol by lowering systemic inflammation, which is cortisol's primary trigger." },
  { title: "Why Estrogen Dominance Causes Weight Gain", content: "Estrogen dominance occurs when estrogen levels are too high relative to progesterone. This is epidemic in modern women due to xenoestrogens in plastics, pesticides, and personal care products. Symptoms include: weight gain in hips/thighs, bloating, PMS, heavy periods, and mood swings. Cruciferous vegetables (broccoli, cauliflower, kale) contain DIM and I3C which help your liver metabolize excess estrogen safely." },
  { title: "The Thyroid-Weight Connection", content: "Your thyroid controls your basal metabolic rate — how many calories you burn at rest. Even a slightly underactive thyroid can slow your metabolism by 200-300 calories per day. Key nutrients for thyroid function: iodine (seaweed, fish), selenium (Brazil nuts — just 2 per day!), zinc (pumpkin seeds), and iron (spinach). Avoid raw cruciferous in large amounts if thyroid is sluggish — cook them instead." },
  { title: "Insulin: The Master Hormone", content: "Insulin is released when you eat carbohydrates. When consistently elevated (insulin resistance), it blocks fat burning, increases cravings, and disrupts all other hormones. The best way to improve insulin sensitivity: walk after meals, eat protein first at every meal, reduce refined carbs, get adequate sleep, and take apple cider vinegar before carb-heavy meals." },
  { title: "Progesterone: The Calm Hormone", content: "Progesterone naturally declines after age 35 and drops sharply at menopause. Low progesterone causes: anxiety, insomnia, heavy periods, water retention, and inability to lose weight. Natural support: vitamin B6 (salmon, chicken), magnesium (dark chocolate, almonds), zinc (pumpkin seeds), and vitex berry (chasteberry) supplement." },
  { title: "How Sleep Destroys or Builds Hormones", content: "During deep sleep (stages 3 & 4), your body produces growth hormone — the most potent fat-burning hormone. Just ONE night of poor sleep reduces GH by 70% and increases ghrelin (hunger hormone) by 28%. Prioritize 7-9 hours. The most critical window is 10 PM to 2 AM — try to be asleep by 10 PM for maximum hormonal repair." },
  { title: "The Adrenal-Thyroid Connection", content: "Your adrenals and thyroid work as a team. Chronic stress exhausts the adrenals, which then steal pregnenolone (the 'mother hormone') from the thyroid pathway. This is why stressed women develop hypothyroid symptoms even with normal thyroid labs. Fix the adrenals first (adaptogens, stress management, sleep) and the thyroid often normalizes on its own." },
  { title: "Leptin Resistance: Why You're Always Hungry", content: "Leptin is supposed to tell your brain you're full. But when leptin levels stay chronically high (from excess body fat and inflammation), your brain stops responding — leptin resistance. Breaking the cycle: reduce inflammation (omega-3s, turmeric), improve sleep, reduce fructose intake, and do short-duration high-intensity exercise." },
  { title: "Testosterone in Women", content: "Women produce testosterone too — and it's crucial for muscle tone, bone density, confidence, and libido. Levels decline after 40. Signs of low T: fatigue, loss of muscle tone, low motivation, decreased libido. Natural support: strength training, adequate protein, zinc, vitamin D, and DHEA-boosting foods (wild yams, cruciferous vegetables)." },
  { title: "Xenoestrogens: The Hidden Hormone Disruptors", content: "Xenoestrogens are synthetic chemicals that mimic estrogen in your body. They're found in: plastic containers (BPA), canned food linings, conventional cosmetics, pesticides, and hormonal birth control residues in water. Reduce exposure: switch to glass containers, eat organic when possible, use natural beauty products, and filter your water. Your liver detoxifies xenoestrogens — support it with DIM, calcium D-glucarate, and cruciferous vegetables." },
];

export const getHormonalCycle = (day) => {
  if (day <= 15) return HORMONAL_CYCLES[0];
  if (day <= 30) return HORMONAL_CYCLES[1];
  return HORMONAL_CYCLES[2];
};

export const getHormonalDayContent = (day) => {
  const idx = day - 1;
  const shotIdx = idx % MORNING_SHOTS.length;
  const checklistIdx = idx % ROUTINE_CHECKLISTS.length;
  const recipeIdx = (idx * 3 + 7) % HORMONAL_RECIPES.length;
  const eduIdx = Math.floor(idx / 5) % EDUCATIONAL_CONTENT.length;

  return {
    cycle: getHormonalCycle(day),
    shot: MORNING_SHOTS[shotIdx],
    checklist: ROUTINE_CHECKLISTS[checklistIdx],
    recipe: HORMONAL_RECIPES[recipeIdx],
    education: EDUCATIONAL_CONTENT[eduIdx],
  };
};

export { SYMPTOM_CATEGORIES, HORMONAL_RECIPES, EDUCATIONAL_CONTENT };
