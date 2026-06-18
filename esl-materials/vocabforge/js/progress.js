/**
 * VocabForge Progress & Gamification Engine
 * Manages XP, levels, hearts, streaks, achievements, and localStorage persistence.
 */

const Progress = (() => {
  // ─── Level Thresholds ───
  const LEVEL_THRESHOLDS = [
    0, 100, 250, 500, 1000,
    2000, 4000, 8000, 15000, 30000,
    50000, 80000, 120000, 170000, 230000,
    300000, 400000, 550000, 750000, 1000000
  ];

  const MAX_HEARTS = 5;
  const HEART_REGEN_MS = 30 * 60 * 1000; // 30 minutes in milliseconds
  const STORAGE_KEY = "vocabforge_progress";

  // ─── Achievement Definitions ───
  const ACHIEVEMENT_DEFS = [
    { id: "first_word",     icon: "🌟",  name: "First Word",       description: "Learn your first word" },
    { id: "ten_words",      icon: "📚",  name: "Bookworm",         description: "Learn 10 words" },
    { id: "twenty_five",    icon: "🎯",  name: "Sharp Mind",       description: "Learn 25 words" },
    { id: "fifty_words",    icon: "🏆",  name: "Half Century",     description: "Learn 50 words" },
    { id: "hundred_words",  icon: "👑",  name: "Word Master",      description: "Learn 100 words" },
    { id: "streak_3",       icon: "🔥",  name: "On Fire",          description: "Reach a 3-day streak" },
    { id: "streak_7",       icon: "⚡",  name: "Week Warrior",     description: "Reach a 7-day streak" },
    { id: "streak_30",      icon: "💎",  name: "Monthly Legend",   description: "Reach a 30-day streak" },
    { id: "perfect_10",     icon: "✨",  name: "Perfect Ten",      description: "Get 10 answers correct in a row" },
    { id: "accuracy_90",    icon: "🎯",  name: "Sharpshooter",     description: "Maintain 90% accuracy over 20+ answers" },
    { id: "accuracy_100",   icon: "💯",  name: "Flawless",         description: "Get 100% accuracy on 10+ answers" },
    { id: "level_5",        icon: "🚀",  name: "Rising Star",      description: "Reach level 5" },
    { id: "level_10",       icon: "🌙",  name: "Night Owl",        description: "Reach level 10" },
    { id: "level_20",       icon: "🏅",  name: "Grandmaster",      description: "Reach level 20" },
    { id: "review_50",      icon: "🔄",  name: "Review Pro",       description: "Review 50 words" },
    { id: "review_200",     icon: "📖",  name: "Review Champion",  description: "Review 200 words" },
    { id: "xp_1000",        icon: "⭐",  name: "XP Hunter",        description: "Earn 1,000 XP" },
    { id: "xp_10000",       icon: "🌠",  name: "XP Legend",        description: "Earn 10,000 XP" },
    { id: "hearts_full",    icon: "❤️",  name: "Heart Strong",     description: "Have all 5 hearts at once" },
    { id: "comeback",       icon: "💪",  name: "Comeback Kid",     description: "Answer correctly after 3 wrong in a row" }
  ];

  // ─── Default State ───
  function getDefaultState() {
    return {
      xp: 0,
      level: 1,
      hearts: MAX_HEARTS,
      streak: 0,
      bestStreak: 0,
      wordsLearned: [],
      wordsReviewed: [],
      correctAnswers: 0,
      wrongAnswers: 0,
      achievements: [],
      dailyStreak: 0,
      lastPlayDate: null,
      lastHeartLoss: null,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      totalAnswers: 0,
      sessionHistory: []
    };
  }

  // ─── Load / Save ───
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Merge with defaults so new fields are always present
        return { ...getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn("VocabForge: Could not load progress, resetting.", e);
    }
    return getDefaultState();
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("VocabForge: Could not save progress.", e);
    }
  }

  // ─── Level Calculation ───
  function getLevelFromXP(xp) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1; // levels are 1-indexed
      }
    }
    return 1;
  }

  function getXPForLevel(level) {
    if (level <= 1) return 0;
    return LEVEL_THRESHOLDS[Math.min(level - 1, LEVEL_THRESHOLDS.length - 1)];
  }

  function getXPForNextLevel(level) {
    if (level >= LEVEL_THRESHOLDS.length) return Infinity;
    return LEVEL_THRESHOLDS[level];
  }

  function getLevelProgress(xp, level) {
    const currentThreshold = getXPForLevel(level);
    const nextThreshold = getXPForNextLevel(level);
    if (nextThreshold === Infinity) return 100;
    const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

  // ─── Heart Regeneration ───
  function calculateRegeneratedHearts(state) {
    if (state.hearts >= MAX_HEARTS) return state.hearts;
    if (!state.lastHeartLoss) return state.hearts;

    const now = Date.now();
    const elapsed = now - state.lastHeartLoss;
    const heartsToRegen = Math.floor(elapsed / HEART_REGEN_MS);
    return Math.min(state.hearts + heartsToRegen, MAX_HEARTS);
  }

  function getHeartRegenTimeRemaining(state) {
    if (state.hearts >= MAX_HEARTS) return 0;
    if (!state.lastHeartLoss) return 0;

    const now = Date.now();
    const elapsed = now - state.lastHeartLoss;
    const remainder = elapsed % HEART_REGEN_MS;
    return HEART_REGEN_MS - remainder;
  }

  // ─── Daily Streak ───
  function updateDailyStreak(state) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (state.lastPlayDate === today) {
      // Already played today, no change
      return state;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (state.lastPlayDate === yesterday) {
      // Consecutive day
      state.dailyStreak += 1;
    } else {
      // Streak broken (or first play)
      state.dailyStreak = 1;
    }

    state.lastPlayDate = today;

    if (state.dailyStreak > state.bestStreak) {
      state.bestStreak = state.dailyStreak;
    }

    return state;
  }

  // ─── Core Actions ───

  /**
   * Add XP and check for level up.
   * Returns { leveledUp, newLevel, oldLevel }
   */
  function addXP(state, amount) {
    state.xp += amount;
    const oldLevel = state.level;
    state.level = getLevelFromXP(state.xp);
    save(state);
    return {
      leveledUp: state.level > oldLevel,
      newLevel: state.level,
      oldLevel: oldLevel
    };
  }

  /**
   * Lose a heart. Returns { heartsRemaining, canContinue }
   */
  function loseHeart(state) {
    if (state.hearts <= 0) {
      return { heartsRemaining: 0, canContinue: false };
    }
    state.hearts -= 1;
    state.lastHeartLoss = Date.now();
    save(state);
    return { heartsRemaining: state.hearts, canContinue: state.hearts > 0 };
  }

  /**
   * Gain a heart (e.g., from reward or regeneration).
   */
  function gainHeart(state) {
    if (state.hearts < MAX_HEARTS) {
      state.hearts += 1;
      save(state);
    }
    return state.hearts;
  }

  /**
   * Record an answer (correct or wrong).
   * Returns { xpGained, leveledUp, newLevel, achievementUnlocks }
   */
  function recordAnswer(state, correct, wordId) {
    const result = {
      xpGained: 0,
      leveledUp: false,
      newLevel: state.level,
      oldLevel: state.level,
      achievementUnlocks: []
    };

    // Update daily streak
    updateDailyStreak(state);

    if (correct) {
      state.correctAnswers += 1;
      state.consecutiveCorrect += 1;
      state.consecutiveWrong = 0;
      state.totalAnswers += 1;

      // XP: base 10, +5 bonus for streak of correct answers
      const streakBonus = Math.min(state.consecutiveCorrect - 1, 5) * 5;
      result.xpGained = 10 + streakBonus;

      // Track learned words
      if (wordId && !state.wordsLearned.includes(wordId)) {
        state.wordsLearned.push(wordId);
      }
      if (wordId && !state.wordsReviewed.includes(wordId)) {
        state.wordsReviewed.push(wordId);
      }

      // Update streak
      state.streak += 1;
      if (state.streak > state.bestStreak) {
        state.bestStreak = state.streak;
      }
    } else {
      state.wrongAnswers += 1;
      state.consecutiveWrong += 1;
      state.consecutiveCorrect = 0;
      state.totalAnswers += 1;
      state.streak = 0;

      // Track reviewed words even on wrong answers
      if (wordId && !state.wordsReviewed.includes(wordId)) {
        state.wordsReviewed.push(wordId);
      }
    }

    // Add XP
    const xpResult = addXP(state, result.xpGained);
    result.leveledUp = xpResult.leveledUp;
    result.newLevel = xpResult.newLevel;
    result.oldLevel = xpResult.oldLevel;

    // Check achievements
    result.achievementUnlocks = checkAchievements(state);

    // Record in session history
    state.sessionHistory.push({
      wordId: wordId,
      correct: correct,
      timestamp: Date.now(),
      xpGained: result.xpGained
    });

    // Keep history manageable (last 500 entries)
    if (state.sessionHistory.length > 500) {
      state.sessionHistory = state.sessionHistory.slice(-500);
    }

    save(state);
    return result;
  }

  // ─── Achievement Checking ───
  function checkAchievements(state) {
    const newlyUnlocked = [];
    const wordCount = state.wordsLearned.length;
    const accuracy = getAccuracy(state);

    const conditions = {
      first_word: () => wordCount >= 1,
      ten_words: () => wordCount >= 10,
      twenty_five: () => wordCount >= 25,
      fifty_words: () => wordCount >= 50,
      hundred_words: () => wordCount >= 100,
      streak_3: () => state.bestStreak >= 3,
      streak_7: () => state.bestStreak >= 7,
      streak_30: () => state.bestStreak >= 30,
      perfect_10: () => state.consecutiveCorrect >= 10,
      accuracy_90: () => accuracy >= 90 && state.totalAnswers >= 20,
      accuracy_100: () => accuracy === 100 && state.totalAnswers >= 10,
      level_5: () => state.level >= 5,
      level_10: () => state.level >= 10,
      level_20: () => state.level >= 20,
      review_50: () => state.wordsReviewed.length >= 50,
      review_200: () => state.wordsReviewed.length >= 200,
      xp_1000: () => state.xp >= 1000,
      xp_10000: () => state.xp >= 10000,
      hearts_full: () => state.hearts === MAX_HEARTS,
      comeback: () => state.consecutiveCorrect === 1 && state.consecutiveWrong === 0 &&
                   state.sessionHistory.length >= 2 &&
                   !state.sessionHistory[state.sessionHistory.length - 2].correct &&
                   state.sessionHistory.filter((h, i, arr) => {
                     if (i < arr.length - 3) return false;
                     return !h.correct;
                   }).length >= 3
    };

    for (const def of ACHIEVEMENT_DEFS) {
      if (!state.achievements.includes(def.id) && conditions[def.id] && conditions[def.id]()) {
        state.achievements.push(def.id);
        newlyUnlocked.push(def);
      }
    }

    if (newlyUnlocked.length > 0) {
      save(state);
    }

    return newlyUnlocked;
  }

  // ─── Statistics ───

  function getAccuracy(state) {
    if (state.totalAnswers === 0) return 0;
    return Math.round((state.correctAnswers / state.totalAnswers) * 100);
  }

  function getWordsPerDay(state) {
    if (!state.lastPlayDate || state.wordsReviewed.length === 0) return 0;

    const firstDate = state.sessionHistory.length > 0
      ? new Date(state.sessionHistory[0].timestamp).toISOString().split("T")[0]
      : state.lastPlayDate;

    const start = new Date(firstDate);
    const end = new Date(state.lastPlayDate);
    const daysDiff = Math.max(1, Math.ceil((end - start) / 86400000) + 1);

    return Math.round((state.wordsReviewed.length / daysDiff) * 10) / 10;
  }

  function getSessionStats(state) {
    const recent = state.sessionHistory.slice(-20);
    const recentCorrect = recent.filter(h => h.correct).length;
    const recentTotal = recent.length;

    return {
      totalXP: state.xp,
      level: state.level,
      levelProgress: getLevelProgress(state.xp, state.level),
      xpToNext: getXPForNextLevel(state.level) - state.xp,
      hearts: state.hearts,
      maxHearts: MAX_HEARTS,
      heartRegenMs: getHeartRegenTimeRemaining(state),
      currentStreak: state.streak,
      bestStreak: state.bestStreak,
      dailyStreak: state.dailyStreak,
      wordsLearned: state.wordsLearned.length,
      wordsReviewed: state.wordsReviewed.length,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      totalAnswers: state.totalAnswers,
      accuracy: getAccuracy(state),
      wordsPerDay: getWordsPerDay(state),
      achievementsUnlocked: state.achievements.length,
      totalAchievements: ACHIEVEMENT_DEFS.length,
      recentAccuracy: recentTotal > 0 ? Math.round((recentCorrect / recentTotal) * 100) : 0
    };
  }

  // ─── Reset ───
  function resetProgress() {
    const fresh = getDefaultState();
    save(fresh);
    return fresh;
  }

  // ─── Public API ───
  return {
    // Constants
    LEVEL_THRESHOLDS,
    MAX_HEARTS,
    HEART_REGEN_MS,
    ACHIEVEMENT_DEFS,

    // State management
    load,
    save,
    resetProgress,

    // Actions
    addXP,
    loseHeart,
    gainHeart,
    recordAnswer,
    checkAchievements,

    // Level helpers
    getLevelFromXP,
    getXPForLevel,
    getXPForNextLevel,
    getLevelProgress,

    // Heart helpers
    calculateRegeneratedHearts,
    getHeartRegenTimeRemaining,

    // Stats
    getAccuracy,
    getWordsPerDay,
    getSessionStats,

    // Daily streak
    updateDailyStreak
  };
})();

// Export for browser usage
if (typeof window !== "undefined") {
  window.Progress = Progress;
}

// Export for Node.js / module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Progress };
}
