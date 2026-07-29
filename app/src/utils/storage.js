const PROFILE_KEY = 'alkalean_profile';
const PROGRESS_KEY = 'alkalean_progress';

export const saveProfile = (data) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
};

export const getProfile = () => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveProgress = (data) => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
};

export const getProgress = () => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : { currentDay: 1, streak: 0, lastLoginDate: null, bodyLog: [] };
};

export const checkDayReset = () => {
  const progress = getProgress();
  if (!progress.lastLoginDate) return progress;
  
  const lastDate = new Date(progress.lastLoginDate);
  const today = new Date();
  
  // If a full day has passed (comparing dates ignoring time)
  if (lastDate.toDateString() !== today.toDateString()) {
      progress.currentDay += 1;
      
      // Calculate streak
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
          progress.streak += 1;
      } else if (diffDays > 1) {
          progress.streak = 0; // Lost streak
      }
      
      // Only increment day, do not update lastLoginDate until user explicitly logs an action
      saveProgress(progress);
  }
  return progress;
};

export const logDailyAction = () => {
    const progress = getProgress();
    progress.lastLoginDate = new Date().toISOString();
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
