export const getDailyProtocol = (currentDay, profile) => {
    // We will cycle through phases every 7 days up to 30 days.
    const protocols = [
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Hydration is key today. Flush out loosened toxins from your gut lining." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Notice a change in digestion? Your stomach acid is resetting." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Avoid artificial sweeteners today. Don't feed the bad bacteria (Firmicutes)." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Try a 15-minute walk after dinner to stimulate peristalsis." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Chew your food completely. Digestion starts in the mouth, easing the gut's load." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "Eat one serving of fermented food today (kefir, sauerkraut)." },
        { phase: "Gut Priming", recipe: "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.", tip: "End of Week 1! Your gut environment is now much less hospitable to fat-storing bacteria." },

        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Ginger amplifies the metabolic burn. Take exactly 20 mins before breakfast." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Notice reduced cravings for sugar? This is the ginger stabilizing your insulin." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Keep your room cool tonight. A drop in temperature helps activate brown fat." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Drink a glass of water before every meal today to stretch the stomach receptors." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Incorporate a lean protein in your breakfast to maximize the thermic effect." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Feeling warm? That's thermogenesis at work burning stored calories." },
        { phase: "Metabolic Ignition", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract.", tip: "Week 2 complete. Your metabolic rate has shifted significantly." },

        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Berberine acts like a natural metabolic switch. Energy should be peaking." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Try 12-hour intermittent fasting tonight (e.g., 8 PM to 8 AM) to let the shot work." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Your body is now using fat as its primary fuel source instead of glucose." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Notice your clothes fitting looser? Focus on how you feel rather than the scale." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Reduce salt intake today to flush out excess retained water." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "Eat slowly today. It takes 20 minutes for satiety signals to reach your brain." },
        { phase: "Fat Burning Peak", recipe: "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.", tip: "End of Week 3. The 'biological reset' is deeply locked in." },

        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Skin firmness check! The NAD+ boosting effects should be visible now." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Try dry brushing before your shower today to stimulate lymphatic drainage." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Finish your shower with 30 seconds of cold water to tighten skin." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Bone broth or a collagen-rich meal today supports your skin's F3 matrix." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Your estrogen levels are stabilizing, which naturally reduces belly fat storage." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Protect your new gut microbiome. Continue avoiding excess refined sugars." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Almost at 30 days! Your body has completely remodeled its energy pathways." },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Reflect on Day 1. How much has your energy, digestion, and body changed?" },
        { phase: "Rejuvenation", recipe: "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.", tip: "Day 30. Congratulations! You've achieved a full biological reset. Keep up the maintenance." }
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
