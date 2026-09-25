export const SKIN_PHASES = [
  { id: 1, name: "Foundation", range: "Days 1-15", icon: "🌱", color: "from-green-400 to-emerald-500", desc: "Build the cellular foundation for skin elasticity. Hydrate deeply, prep collagen pathways." },
  { id: 2, name: "Collagen Activation", range: "Days 16-30", icon: "⚡", color: "from-amber-400 to-orange-500", desc: "Trigger type I and III collagen synthesis with targeted nutrients and stimulation techniques." },
  { id: 3, name: "Toning & Firming", range: "Days 31-45", icon: "💪", color: "from-rose-400 to-pink-500", desc: "Tighten loose skin through advanced exercises, facial yoga, and elastin-boosting protocols." },
  { id: 4, name: "Maintenance & Glow", range: "Days 46-60", icon: "✨", color: "from-violet-400 to-purple-500", desc: "Lock in results with maintenance routines. Your skin's renewal cycle is now optimized." },
];

const DAILY_ROUTINES = [
  [
    { step: "Splash face with cold water 10x", icon: "💧", time: "1 min" },
    { step: "Apply vitamin C serum (or lemon juice)", icon: "🍋", time: "1 min" },
    { step: "Dry brush body (upward strokes)", icon: "✨", time: "5 min" },
    { step: "Cold shower finish (30 sec)", icon: "🚿", time: "1 min" },
    { step: "Collagen-rich breakfast", icon: "🍳", time: "15 min" },
    { step: "Drink 2L water throughout the day", icon: "💧", time: "all day" },
  ],
  [
    { step: "Oil cleanse face with coconut oil", icon: "🥥", time: "2 min" },
    { step: "Apply rosehip oil to face & neck", icon: "🌹", time: "1 min" },
    { step: "Facial massage (upward strokes)", icon: "💆", time: "3 min" },
    { step: "Gua sha on jawline and cheeks", icon: "🪨", time: "5 min" },
    { step: "Bone broth or collagen drink", icon: "🍵", time: "5 min" },
    { step: "Body moisturize with shea butter", icon: "🧴", time: "3 min" },
  ],
  [
    { step: "Gentle exfoliation (sugar + oil)", icon: "✨", time: "3 min" },
    { step: "Apply hyaluronic acid (or aloe)", icon: "💎", time: "1 min" },
    { step: "Neck exercises (10 reps each)", icon: "🦢", time: "3 min" },
    { step: "Apply SPF 30+ sunscreen", icon: "☀️", time: "1 min" },
    { step: "Eat vitamin E rich foods today", icon: "🥑", time: "meals" },
    { step: "Evening mask (honey + turmeric)", icon: "🍯", time: "15 min" },
  ],
  [
    { step: "Warm compress on face (2 min)", icon: "🌡️", time: "2 min" },
    { step: "Apply retinol alternative (bakuchiol)", icon: "🌿", time: "1 min" },
    { step: "Lymphatic drainage face massage", icon: "💆", time: "5 min" },
    { step: "Dry brush arms and legs", icon: "🖌️", time: "3 min" },
    { step: "Eat zinc-rich foods (pumpkin seeds)", icon: "🎃", time: "meals" },
    { step: "Sleep on silk/satin pillowcase", icon: "🛏️", time: "night" },
  ],
  [
    { step: "Ice cube facial (wrap in cloth)", icon: "🧊", time: "2 min" },
    { step: "Vitamin C + E oil application", icon: "🍊", time: "1 min" },
    { step: "Face yoga: lion's breath (5x)", icon: "🦁", time: "2 min" },
    { step: "Foam roll thighs and arms", icon: "🧘", time: "5 min" },
    { step: "Eat gelatin/collagen with meals", icon: "🍮", time: "meals" },
    { step: "Apply body oil after shower", icon: "✨", time: "3 min" },
  ],
  [
    { step: "Double cleanse (oil then gentle wash)", icon: "🫧", time: "3 min" },
    { step: "Apply niacinamide serum", icon: "💧", time: "1 min" },
    { step: "Scalp massage (promotes growth)", icon: "💆", time: "3 min" },
    { step: "Belly skin massage with oil", icon: "🫄", time: "3 min" },
    { step: "Eat sulfur-rich foods (eggs, garlic)", icon: "🥚", time: "meals" },
    { step: "Evening collagen supplement", icon: "💊", time: "1 min" },
  ],
];

const COLLAGEN_RECIPES = [
  { title: "Collagen Berry Blast Smoothie", desc: "1 scoop collagen peptides + mixed berries + spinach + coconut milk + 1 tbsp chia seeds. Blend until smooth.", time: "5 min" },
  { title: "Bone Broth French Onion Soup", desc: "Caramelized onions in bone broth with thyme. Top with gruyère on toasted bread. Bake until bubbly.", time: "40 min" },
  { title: "Salmon Skin Chips", desc: "Season salmon skin with salt, pepper, and paprika. Bake at 400°F on parchment for 15 min until crispy. Collagen-packed snack.", time: "20 min" },
  { title: "Gelatin Gummy Bears", desc: "2 tbsp gelatin + 1 cup fruit juice + 1 tbsp honey. Heat gently, pour into molds, refrigerate 2 hours. Collagen treats!", time: "10 min prep" },
  { title: "Avocado Cacao Mousse", desc: "1 avocado + 2 tbsp raw cacao + 1 tbsp honey + 1 scoop collagen. Blend smooth. Vitamin E + collagen = skin repair.", time: "5 min" },
  { title: "Slow-Cooked Oxtail Stew", desc: "Oxtail + carrots + onion + celery + tomato paste + red wine. Slow cook 6-8 hours. Maximum collagen extraction.", time: "8 hrs" },
  { title: "Mango Collagen Popsicles", desc: "Blend mango + coconut cream + 1 scoop collagen peptides + lime juice. Pour into molds, freeze 4 hours.", time: "10 min prep" },
  { title: "Vitamin C Citrus Salad", desc: "Oranges + grapefruit + pomegranate seeds + mint + drizzle of honey. Vitamin C is essential for collagen synthesis.", time: "10 min" },
  { title: "Chicken Feet Broth", desc: "Simmer chicken feet with ACV, garlic, ginger for 12 hours. Strain. The richest natural collagen source available.", time: "12 hrs" },
  { title: "Collagen Coffee Creamer", desc: "Blend 1 scoop collagen + 2 tbsp coconut cream + 1 tsp MCT oil. Add to coffee. Frothy and skin-boosting.", time: "3 min" },
  { title: "Kiwi-Strawberry Skin Bowl", desc: "Greek yogurt + kiwi + strawberries + almonds + flaxseed + drizzle of honey. Vitamins C, E, and omega-3.", time: "5 min" },
  { title: "Turkey Bone Broth Risotto", desc: "Arborio rice cooked slowly in turkey bone broth with mushrooms, parmesan, and herbs. Rich in collagen.", time: "30 min" },
  { title: "Sweet Potato Collagen Pancakes", desc: "Mashed sweet potato + 2 eggs + 1 scoop collagen + cinnamon. Cook like pancakes. Top with berries.", time: "15 min" },
  { title: "Skin-Glow Green Juice", desc: "Cucumber + celery + spinach + lemon + ginger + parsley. Hydrating and packed with skin-loving nutrients.", time: "10 min" },
  { title: "Sardine Avocado Boats", desc: "Halved avocados filled with sardines, lemon juice, red onion, and capers. Omega-3 + collagen cofactors.", time: "5 min" },
];

const FACE_YOGA = [
  { title: "The Forehead Smoother", desc: "Place both hands on forehead, spread fingers between eyebrows and hairline. Gently sweep outward while looking down. Hold 10 sec. Repeat 5x.", target: "Forehead lines", time: "2 min" },
  { title: "Cheek Lifter", desc: "Open mouth into O shape, fold upper lip over teeth. Smile to lift cheeks. Place fingers on top of cheeks, release and repeat 10 times.", target: "Cheekbones", time: "3 min" },
  { title: "Jaw Definer", desc: "Tilt head back, push lower jaw forward. Hold 5 sec. Return. Repeat 15 times. Feel the stretch under the chin and along the jawline.", target: "Jawline & double chin", time: "3 min" },
  { title: "Eye Firmer", desc: "Place index fingers at outer corners of eyes, middle fingers at inner corners. Squint lower lids up while looking at ceiling. Hold 5 sec. Repeat 10x.", target: "Under-eye area", time: "2 min" },
  { title: "Neck Tightener", desc: "Look at ceiling, press tongue to roof of mouth. Swallow while keeping tongue pressed. Feel the neck muscles engage. Repeat 10 times.", target: "Neck & throat", time: "2 min" },
  { title: "Lion's Breath", desc: "Inhale deeply through nose. Open mouth wide, stick tongue out toward chin, exhale with 'HAAA' sound. Widens eyes. Repeat 5 times.", target: "Full face circulation", time: "1 min" },
  { title: "Fish Face", desc: "Suck cheeks in like a fish. Try to smile while holding. Hold 10 sec. Release. Repeat 10 times. Tones cheek muscles.", target: "Cheeks & lips", time: "2 min" },
  { title: "Brow Lifter", desc: "Place fingers just above eyebrows. Push down gently while trying to raise eyebrows against resistance. Hold 5 sec. Repeat 10x.", target: "Brow area", time: "2 min" },
  { title: "Smile Smoother", desc: "Close lips, smile as wide as possible. Hold 5 sec. Pucker lips tightly. Hold 5 sec. Alternate 15 times.", target: "Nasolabial folds", time: "3 min" },
  { title: "Platysma Toner", desc: "Open mouth, pull corners down into a grimace, tightening neck tendons. Hold 10 sec. Release. Repeat 10x.", target: "Neck bands", time: "2 min" },
];

const DIY_MASKS = [
  { title: "Honey & Turmeric Glow Mask", ingredients: ["2 tbsp raw honey", "1/2 tsp turmeric", "1 tsp yogurt"], instructions: "Mix into paste. Apply to face avoiding eyes. Leave 15-20 min. Rinse with warm water. Anti-inflammatory + antibacterial.", time: "20 min", benefit: "Brightening & anti-inflammatory" },
  { title: "Avocado Hydration Mask", ingredients: ["1/2 ripe avocado", "1 tbsp honey", "1 tsp olive oil"], instructions: "Mash avocado, mix in honey and oil. Apply thick layer. Leave 15 min. Rinse gently. Deep hydration for dry skin.", time: "15 min", benefit: "Deep hydration" },
  { title: "Coffee Cellulite Scrub", ingredients: ["1/2 cup used coffee grounds", "2 tbsp coconut oil", "1 tbsp brown sugar"], instructions: "Mix all ingredients. Massage into thighs, arms, belly in circular motions for 5 min. Rinse. Caffeine tightens skin temporarily.", time: "10 min", benefit: "Cellulite reduction" },
  { title: "Egg White Tightening Mask", ingredients: ["1 egg white", "1 tsp lemon juice", "1/2 tsp honey"], instructions: "Whisk egg white until frothy. Add lemon and honey. Apply to face. Let dry 15-20 min. Rinse with cool water. Instant tightening.", time: "20 min", benefit: "Pore tightening" },
  { title: "Oatmeal Soothing Mask", ingredients: ["2 tbsp ground oats", "1 tbsp honey", "1 tbsp yogurt"], instructions: "Combine into paste. Apply to face. Leave 15 min. Gently massage while rinsing for gentle exfoliation.", time: "15 min", benefit: "Soothing & calming" },
  { title: "Banana Anti-Aging Mask", ingredients: ["1 ripe banana", "1 tbsp coconut oil", "1/4 tsp vitamin E oil"], instructions: "Mash banana, mix in oils. Apply to face and neck. Leave 20 min. Rinse. Potassium + fats plump fine lines.", time: "20 min", benefit: "Anti-wrinkle" },
  { title: "Green Tea Antioxidant Mask", ingredients: ["1 tbsp matcha powder", "1 tbsp honey", "1 tsp aloe vera gel"], instructions: "Mix into smooth paste. Apply evenly. Leave 10-15 min. Rinse. EGCG protects against UV damage and aging.", time: "15 min", benefit: "Antioxidant protection" },
  { title: "Papaya Enzyme Peel", ingredients: ["2 tbsp ripe papaya (mashed)", "1 tsp honey", "1/2 tsp lemon juice"], instructions: "Blend papaya, add honey and lemon. Apply to face. Leave 10 min MAX (papain enzyme is strong). Rinse. Brightens and smooths.", time: "10 min", benefit: "Natural enzyme exfoliation" },
];

const BODY_AREAS = [
  { id: "face", label: "Face & Neck", icon: "😊" },
  { id: "arms", label: "Upper Arms", icon: "💪" },
  { id: "belly", label: "Belly", icon: "🫄" },
  { id: "thighs", label: "Thighs", icon: "🦵" },
  { id: "chest", label: "Chest Area", icon: "👙" },
  { id: "back", label: "Back", icon: "🔙" },
];

const DAILY_TIPS = [
  "Apply sunscreen even on cloudy days. UV damage is the #1 cause of premature aging and collagen breakdown.",
  "Eat red and orange vegetables today. Beta-carotene converts to vitamin A, which stimulates cell turnover.",
  "Sleep on your back tonight. Side and stomach sleeping creates 'sleep wrinkles' from compression.",
  "Drink bone broth as an afternoon snack. It's the most bioavailable source of type I and III collagen.",
  "Massage your face upward for 3 minutes. This fights gravity and boosts lymphatic drainage, reducing puffiness.",
  "Eat 2 Brazil nuts for selenium. Selenium protects skin elastin and is essential for glutathione production.",
  "Apply vitamin E oil to stretch marks before bed. It supports cell membrane repair and reduces scar tissue.",
  "Do arm circles (30 forward, 30 backward). This improves circulation to upper arm skin and reduces 'bat wings'.",
  "Eat wild-caught salmon today. Astaxanthin (what makes salmon pink) is 6,000x more powerful than vitamin C for skin.",
  "Practice belly breathing. When you breathe deeply, oxygen reaches your skin cells, improving elasticity from within.",
  "Avoid hot showers on your face. Hot water strips natural oils and damages the moisture barrier. Use lukewarm.",
  "Eat dark chocolate (70%+ cacao). Flavanols improve skin hydration and protect against UV damage.",
  "Apply aloe vera gel to any area that feels loose or dry. It contains 75+ active compounds that repair skin.",
  "Stand in the sun for 15 min (without burning). Vitamin D3 is essential for skin cell growth and repair.",
  "Eat bell peppers today. One red bell pepper has 169% of your daily vitamin C — more than any citrus fruit.",
  "Do 20 squats. Building muscle underneath loose skin is the most effective way to 'fill out' sagging areas.",
  "Apply coconut oil to elbows, knees, and feet before bed. Wear cotton gloves/socks to lock in moisture overnight.",
  "Reduce sugar today. Sugar causes glycation — it bonds to collagen fibers and makes them stiff and brittle.",
  "Eat walnuts. They contain omega-3, vitamin E, and zinc — three of the top five nutrients for skin elasticity.",
  "Try the 'ice cube trick': rub an ice cube over your face for 1 minute. It tightens pores and boosts circulation.",
  "Eat tomatoes cooked in olive oil. Cooking releases lycopene (a powerful skin protector) and fat aids absorption.",
  "Dry brush your body before every shower this week. It takes 3 minutes and the cumulative effect on skin texture is remarkable.",
  "Drink 1 extra glass of water today beyond your usual. Hydrated skin is 30% less likely to show wrinkles.",
  "Do face yoga before your morning skincare. Active muscles absorb serums more effectively.",
  "Eat leafy greens at every meal today. Chlorophyll increases oxygen delivery to skin cells.",
  "Apply your skincare products on slightly damp skin. Wet skin absorbs actives up to 10x more efficiently.",
  "Take a cold plunge or cold shower for 2 minutes. Cold exposure increases collagen production and tightens pores.",
  "Eat oysters or pumpkin seeds for zinc. Zinc controls oil production, heals wounds, and supports collagen synthesis.",
  "Practice neck rolls: 10 clockwise, 10 counterclockwise. The neck shows age faster than the face — don't neglect it.",
  "Apply a mask tonight. The ingredients penetrate deeper while you sleep due to increased blood flow to the skin.",
  "Eat eggs for the biotin (B7). Biotin strengthens the protein infrastructure of skin, hair, and nails.",
  "Stand up straighter. Good posture changes how skin drapes over your frame, making you look 5 lbs lighter instantly.",
  "Eat blueberries today. Their anthocyanins protect existing collagen from being broken down by free radicals.",
  "Do a 5-minute gua sha session on your face. The micro-circulation boost brings nutrients directly to skin cells.",
  "Replace your pillowcase with silk/satin. Cotton creates friction that accelerates wrinkle formation overnight.",
  "Eat bone marrow or add it to your broth. It's the most concentrated natural source of hyaluronic acid.",
  "Walk for 30 minutes. Exercise increases blood flow, delivering oxygen and nutrients to skin cells while removing waste.",
  "Apply rosehip oil to any scars or dark spots. Its high vitamin A content stimulates cell regeneration.",
  "Eat kiwi today. Two kiwis provide more vitamin C than an orange and contain a unique enzyme for collagen formation.",
  "Practice lymphatic tapping: gently tap along your jawline, under eyes, and down the sides of your neck. Reduces puffiness.",
  "Avoid touching your face today. Your hands transfer bacteria and oils that break down skin's protective barrier.",
  "Eat sweet potatoes. The beta-carotene acts as a natural sunscreen from the inside out when consumed regularly.",
  "Apply your body lotion within 3 minutes of showering. This 'window' is when skin absorbs moisture most effectively.",
  "Do planks for 30 seconds x 3 sets. Core engagement tightens belly skin by building the underlying muscle.",
  "Eat fermented foods for a skin glow. The gut-skin axis means a healthy microbiome = clearer, firmer skin.",
  "Mist your face with rose water throughout the day. It hydrates, tones, and provides anti-inflammatory benefits.",
  "Eat 1 tbsp ground flaxseed. The lignans and omega-3s specifically reduce skin inflammation and redness.",
  "Exfoliate gently today. Remove dead cells so your serums and oils can actually penetrate. Don't overdo it — once or twice a week.",
  "Eat pomegranate or drink its juice. Punicalagins protect against collagen degradation caused by UV exposure.",
  "Practice smiling. The muscles activated during a genuine smile increase blood flow to the cheeks and create a natural lift.",
  "Apply your leftover green tea bags (cooled) to your under-eyes for 10 minutes. Tannins reduce puffiness and dark circles.",
  "Eat sardines or anchovies for DMAE. This nutrient has been clinically shown to firm and tone facial skin.",
  "Hang your head upside down for 30 seconds (safely). The inverted blood flow delivers a fresh oxygen burst to facial skin.",
  "Eat almonds (23 = 1 serving). They provide 50% of your daily vitamin E, the most important fat-soluble skin antioxidant.",
  "Splash your face with cold water 20 times in the morning. This is a Japanese beauty secret for poreless, glowing skin.",
  "Eat seaweed/nori. Marine collagen precursors and minerals like zinc and selenium support skin elasticity from the inside.",
  "Do pelvic floor exercises (kegels). Core + pelvic floor strength = better posture = skin sits better on your frame.",
  "Apply castor oil to eyebrows and eyelashes before bed. Ricinoleic acid promotes follicle health and thickness.",
  "Eat beets today. Betaine in beets improves blood flow, giving you a natural rosy glow and improving skin cell oxygenation.",
  "Practice the Japanese water therapy: drink 4 glasses of water first thing in the morning, before brushing teeth. Detoxifies skin from within.",
];

export const getSkinPhase = (day) => {
  if (day <= 15) return SKIN_PHASES[0];
  if (day <= 30) return SKIN_PHASES[1];
  if (day <= 45) return SKIN_PHASES[2];
  return SKIN_PHASES[3];
};

export const getSkinDayContent = (day) => {
  const idx = day - 1;
  const routineIdx = idx % DAILY_ROUTINES.length;
  const recipeIdx = (idx * 3 + 2) % COLLAGEN_RECIPES.length;
  const exerciseIdx = (idx * 2 + 1) % FACE_YOGA.length;
  const maskIdx = Math.floor(idx / 7) % DIY_MASKS.length;
  const tipIdx = idx % DAILY_TIPS.length;

  return {
    phase: getSkinPhase(day),
    routine: DAILY_ROUTINES[routineIdx],
    recipe: COLLAGEN_RECIPES[recipeIdx],
    exercise: FACE_YOGA[exerciseIdx],
    mask: DIY_MASKS[maskIdx],
    tip: DAILY_TIPS[tipIdx],
  };
};

export { SKIN_PHASES as SKIN_PHASE_LIST, BODY_AREAS, COLLAGEN_RECIPES, FACE_YOGA, DIY_MASKS };
