export const getDailyProtocol = (currentDay, profile) => {
    // 30 Completely Unique Daily Protocols
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

    // Dynamic injections based on health flags
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
    
    return `Based on your exact profile (Age: ${age}, Weight: ${weight} lbs), your optimal baseline for the Evening Tonic is ${finalDose} tsp of the natural adaptogen mix (Maca/Ashwagandha).`;
};
