const PROFILE_KEY = 'alkalean_profile_';
const PROGRESS_KEY = 'alkalean_progress_';
const JOURNAL_KEY = 'alkalean_journal_';
const HYDRATION_KEY = 'alkalean_hydration_';

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
  if (data) {
      const parsed = JSON.parse(data);
      if (!parsed.completedDays) parsed.completedDays = [];
      if (!parsed.dailyHabits) parsed.dailyHabits = { water: false, steps: false, supplements: false };
      if (!parsed.badges) parsed.badges = [];
      if (!parsed.phase) parsed.phase = 1;
      return parsed;
  }
  return {
    currentDay: 1,
    streak: 0,
    lastLoginDate: null,
    bodyLog: [],
    completedDays: [],
    dailyHabits: { water: false, steps: false, supplements: false },
    badges: [],
    phase: 1
  };
};

export const toggleDayCompletion = (day) => {
    const progress = getProgress();
    if (progress.completedDays.includes(day)) {
        progress.completedDays = progress.completedDays.filter(d => d !== day);
    } else {
        progress.completedDays.push(day);
        progress.lastLoginDate = new Date().toISOString();

        const sorted = [...progress.completedDays].sort((a, b) => a - b);
        let streak = 1;
        for (let i = sorted.length - 1; i > 0; i--) {
            if (sorted[i] - sorted[i-1] === 1) streak++;
            else break;
        }
        progress.streak = streak;

        checkBadges(progress);
    }

    updatePhase(progress);
    saveProgress(progress);
    return progress;
};

const checkBadges = (progress) => {
    const badges = progress.badges || [];
    const count = progress.completedDays.length;

    const badgeDefs = [
        { id: 'first_day', condition: count >= 1 },
        { id: 'week_1', condition: count >= 7 },
        { id: 'streak_3', condition: progress.streak >= 3 },
        { id: 'streak_7', condition: progress.streak >= 7 },
        { id: 'streak_14', condition: progress.streak >= 14 },
        { id: 'half_way', condition: count >= 15 },
        { id: 'week_3', condition: count >= 21 },
        { id: 'complete', condition: count >= 30 },
    ];

    badgeDefs.forEach(b => {
        if (b.condition && !badges.includes(b.id)) {
            badges.push(b.id);
        }
    });

    progress.badges = badges;
};

const updatePhase = (progress) => {
    const count = progress.completedDays.length;
    if (count >= 22) progress.phase = 4;
    else if (count >= 15) progress.phase = 3;
    else if (count >= 8) progress.phase = 2;
    else progress.phase = 1;
};

export const saveDailyHabits = (habits) => {
    const progress = getProgress();
    progress.dailyHabits = habits;
    saveProgress(progress);
};

export const getJournal = () => {
    const data = localStorage.getItem(JOURNAL_KEY + getCurrentEmail());
    return data ? JSON.parse(data) : [];
};

export const saveJournalEntry = (entry) => {
    const journal = getJournal();
    journal.unshift({ ...entry, date: new Date().toISOString() });
    localStorage.setItem(JOURNAL_KEY + getCurrentEmail(), JSON.stringify(journal));
};

export const getHydration = () => {
    const today = new Date().toISOString().split('T')[0];
    const data = localStorage.getItem(HYDRATION_KEY + getCurrentEmail());
    if (data) {
        const parsed = JSON.parse(data);
        if (parsed.date === today) return parsed;
    }
    return { date: today, glasses: 0 };
};

export const saveHydration = (glasses) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(HYDRATION_KEY + getCurrentEmail(), JSON.stringify({ date: today, glasses }));
};

export const hasSeenWelcome = () => {
    return localStorage.getItem('alkalean_welcomed_' + getCurrentEmail()) === 'true';
};

export const markWelcomeSeen = () => {
    localStorage.setItem('alkalean_welcomed_' + getCurrentEmail(), 'true');
};
