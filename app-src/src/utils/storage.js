const PROFILE_KEY = 'alkalean_profile_';
const PROGRESS_KEY = 'alkalean_progress_';

const getCurrentEmail = () => {
    return localStorage.getItem('alkalean_email') || 'default';
};

export const saveProfile = (data) => {
  localStorage.setItem(PROFILE_KEY + getCurrentEmail(), JSON.stringify(data));
};

export const getProfile = () => {
  const data = localStorage.getItem(PROFILE_KEY + getCurrentEmail());
  return data ? JSON.parse(data) : null;
};

export const saveProgress = (data) => {
  localStorage.setItem(PROGRESS_KEY + getCurrentEmail(), JSON.stringify(data));
};

export const getProgress = () => {
  const data = localStorage.getItem(PROGRESS_KEY + getCurrentEmail());
  return data ? JSON.parse(data) : { 
    currentDay: 1, 
    streak: 0, 
    lastLoginDate: null, 
    bodyLog: [],
    completedDays: [], // Array of numbers e.g., [1, 2, 3]
    dailyHabits: { water: false, steps: false, supplements: false }
  };
};

export const toggleDayCompletion = (day) => {
    const progress = getProgress();
    if (progress.completedDays.includes(day)) {
        progress.completedDays = progress.completedDays.filter(d => d !== day);
    } else {
        progress.completedDays.push(day);
        
        // Update streak if it's the highest day they've done today
        progress.lastLoginDate = new Date().toISOString();
        if (progress.completedDays.length > progress.streak) {
            progress.streak = progress.completedDays.length;
        }
    }
    saveProgress(progress);
    return progress;
};

export const saveDailyHabits = (habits) => {
    const progress = getProgress();
    progress.dailyHabits = habits;
    saveProgress(progress);
};

export const saveBodyLog = (weight, energy) => {
    const progress = getProgress();
    progress.bodyLog.push({
        date: new Date().toISOString().split('T')[0],
        weight,
        energy
    });
    saveProgress(progress);
};
