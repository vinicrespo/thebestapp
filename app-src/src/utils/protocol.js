export const getDailyProtocol = (currentDay, profile) => {
    let phase = "";
    let recipe = "";
    let tip = "";

    if (currentDay >= 1 && currentDay <= 7) {
        phase = "Gut Priming";
        recipe = "1/2 tsp Baking Soda + 1/2 Lemon in 8oz warm water.";
        tip = "Focus on hydration today. Water is essential for flushing out the loosened toxins from your gut lining.";
    } else if (currentDay >= 8 && currentDay <= 14) {
        phase = "Metabolic Ignition";
        recipe = "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Ginger extract in 8oz water.";
        tip = "Notice reduced cravings? Ginger amplifies the metabolic burn. Try taking this exactly 20 minutes before breakfast.";
    } else if (currentDay >= 15 && currentDay <= 21) {
        phase = "Fat Burning Peak";
        recipe = "1/2 tsp Baking Soda + 1/2 Lemon + 1/4 tsp Berberine/Ginger mix.";
        tip = "Energy levels should be peaking. The 'biological reset' is shifting your body from sugar-burning to fat-burning.";
    } else {
        phase = "Rejuvenation & Maintenance";
        recipe = "Maintenance Shot: 1/4 tsp Baking Soda + Lemon juice.";
        tip = "Skin firmness check! The NAD+ boosting effects should now be visible in your skin's elasticity.";
    }

    // Dynamic injections based on health flags
    if (profile?.healthFlags?.menopause) {
        tip += " 🌸 Menopause Support: Make sure to keep your room cool tonight to support estrogen rebalancing.";
    }
    if (profile?.healthFlags?.bloating) {
        tip += " 🍃 Digestion: If you feel bloating, sip peppermint tea 30 minutes after your shot.";
    }

    return { phase, recipe, tip };
};

export const getHormonalCalculator = (weight, age) => {
    // Fictional dynamic logic to make it personalized
    const baseDosage = weight > 160 ? 1 : 0.5;
    const ageMultiplier = age > 50 ? 1.5 : 1;
    const finalDose = (baseDosage * ageMultiplier).toFixed(2);
    
    return `Based on your profile (Age: ${age}, Weight: ${weight} lbs), your optimal baseline for the Evening Tonic is ${finalDose} tsp of natural adaptogens (Maca/Ashwagandha mix).`;
};
