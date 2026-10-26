'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  AlertCircle,
  Brain,
  Check,
  ChevronRight,
  Clock3,
  Crown,
  Flame,
  Home,
  Info,
  Medal,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Settings,
  SkipForward,
  Sparkles,
  Star,
  SunMedium,
  Target,
  Trophy,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import {
  LEVELS,
  brainQuestions,
  categories,
  type BrainQuestion,
  type Difficulty,
} from '@/lib/gameData';

type Screen =
  | 'menu'
  | 'levelSelect'
  | 'daily'
  | 'leaderboard'
  | 'achievements'
  | 'settings'
  | 'howToPlay'
  | 'play'
  | 'results';

type GameMode = 'level' | 'daily' | 'training';

type LeaderboardEntry = {
  name: string;
  score: number;
  xp: number;
  date: string;
};

type ResultSummary = {
  score: number;
  xp: number;
  coinsEarned: number;
  correct: number;
  incorrect: number;
  skipped: number;
  accuracy: number;
  timeTaken: number;
  achievementsUnlocked: string[];
  bestScore: number;
  level: number;
  mode: GameMode;
};

type Profile = {
  xp: number;
  coins: number;
  bestScore: number;
  unlockedLevel: number;
  streak: number;
  achievements: string[];
};

type Feedback = {
  type: 'correct' | 'wrong' | 'info';
  message: string;
};

type SessionState = {
  mode: GameMode;
  difficulty: Difficulty;
  level: number;
  questions: BrainQuestion[];
  currentIndex: number;
  score: number;
  xp: number;
  lives: number;
  streak: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeLeft: number;
  answered: boolean;
  isPaused: boolean;
  feedback: Feedback | null;
  startedAt: number;
};

const STORAGE_KEYS = {
  profile: 'brain-test-profile-v1',
  settings: 'brain-test-settings-v1',
  leaderboard: 'brain-test-leaderboard-v1',
};

const defaultProfile: Profile = {
  xp: 0,
  coins: 220,
  bestScore: 0,
  unlockedLevel: 1,
  streak: 0,
  achievements: [],
};

const defaultSettings = {
  soundOn: true,
  theme: 'dark' as 'light' | 'dark',
};

const difficultyTimeMap: Record<Difficulty, number> = {
  Easy: 25,
  Medium: 18,
  Hard: 14,
};

const categoryColors: Record<string, string> = {
  'Logic Puzzles': 'from-violet-500 to-indigo-500',
  'Tricky Questions': 'from-sky-500 to-cyan-500',
  'Mathematical Challenges': 'from-emerald-500 to-teal-500',
  'Memory Tests': 'from-amber-500 to-orange-500',
  'Pattern Recognition': 'from-pink-500 to-rose-500',
  'Visual Puzzles': 'from-fuchsia-500 to-purple-500',
  'Riddles and Brain Teasers': 'from-yellow-500 to-amber-500',
  'IQ-Style Challenges': 'from-blue-500 to-indigo-500',
  'Speed Challenges': 'from-red-500 to-orange-500',
  'Impossible Questions': 'from-slate-700 to-slate-900',
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

function getDailyQuestion(date: Date) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const index = seed % brainQuestions.length;
  return brainQuestions[index];
}

function getLevelQuestions(level: number, difficulty: Difficulty) {
  const byDifficulty = brainQuestions.filter((q) => q.difficulty === difficulty);
  const start = (level - 1) * 5;
  return byDifficulty.slice(start, start + 5);
}

function getTrainingQuestions() {
  const copy = [...brainQuestions];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 8);
}

function getRank(xp: number) {
  if (xp >= 4000) return 'Grand Master';
  if (xp >= 2400) return 'Brain Elite';
  if (xp >= 1200) return 'Logic Pro';
  if (xp >= 500) return 'Sharp Mind';
  if (xp >= 150) return 'Rising Genius';
  return 'Starter';
}

function getAchievementBadges(profile: Profile) {
  const badges = [
    { label: 'First Win', unlocked: profile.bestScore >= 250 },
    { label: 'Swift Solver', unlocked: profile.xp >= 900 },
    { label: 'Level Unlock', unlocked: profile.unlockedLevel >= 4 },
    { label: 'Legend', unlocked: profile.xp >= 2500 },
  ];
  return badges.filter((badge) => badge.unlocked).map((badge) => badge.label);
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [profile, setProfile] = useState<Profile>(() => readJSON(STORAGE_KEYS.profile, defaultProfile));
  const [settings, setSettings] = useState(() => readJSON(STORAGE_KEYS.settings, defaultSettings));
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    readJSON(STORAGE_KEYS.leaderboard, [
      { name: 'Nova', score: 1550, xp: 1180, date: new Date().toISOString() },
      { name: 'Ava', score: 1280, xp: 980, date: new Date().toISOString() },
      { name: 'Kai', score: 980, xp: 810, date: new Date().toISOString() },
    ])
  );
  const [session, setSession] = useState<SessionState | null>(null);
  const [resultData, setResultData] = useState<ResultSummary | null>(null);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.profile, profile);
  }, [profile]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.leaderboard, leaderboard);
  }, [leaderboard]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const currentQuestion = session?.questions[session.currentIndex] ?? null;
  const progressPercent = useMemo(() => {
    if (!session) return 0;
    return ((session.currentIndex + 1) / Math.max(1, session.questions.length)) * 100;
  }, [session]);

  useEffect(() => {
    if (!session || screen !== 'play' || session.isPaused || session.answered) return;

    if (session.timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = window.setTimeout(() => {
      setSession((current) => {
        if (!current || current.isPaused || current.answered) return current;
        return { ...current, timeLeft: Math.max(0, current.timeLeft - 1) };
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [screen, session]);

  const playTone = (kind: 'correct' | 'wrong' | 'button') => {
    if (!settings.soundOn) return;
    const AudioCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const ctx = new AudioCtor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const frequencies: Record<string, number> = {
      correct: 620,
      wrong: 200,
      button: 430,
    };

    oscillator.type = kind === 'wrong' ? 'sawtooth' : 'triangle';
    oscillator.frequency.value = frequencies[kind];
    gain.gain.value = 0.04;
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.12);
    setTimeout(() => ctx.close(), 180);
  };

  const finishGame = (finalSession: SessionState) => {
    const totalAnswered = finalSession.correct + finalSession.incorrect + finalSession.skipped;
    const accuracy = totalAnswered > 0 ? Math.round((finalSession.correct / totalAnswered) * 100) : 0;
    const coinsEarned = Math.max(30, Math.round(finalSession.score / 25));
    const earnedXP = finalSession.xp;
    const unlockedLevel = Math.max(profile.unlockedLevel, finalSession.level + 1);
    const achievements = getAchievementBadges({
      ...profile,
      xp: profile.xp + earnedXP,
      bestScore: Math.max(profile.bestScore, finalSession.score),
      unlockedLevel,
    });

    const nextProfile: Profile = {
      xp: profile.xp + earnedXP,
      coins: profile.coins + coinsEarned,
      bestScore: Math.max(profile.bestScore, finalSession.score),
      unlockedLevel,
      streak: Math.max(profile.streak, finalSession.streak),
      achievements: Array.from(new Set([...profile.achievements, ...achievements])),
    };
    setProfile(nextProfile);

    setLeaderboard((current) =>
      [...current, { name: 'You', score: finalSession.score, xp: nextProfile.xp, date: new Date().toISOString() }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    );

    setResultData({
      score: finalSession.score,
      xp: earnedXP,
      coinsEarned,
      correct: finalSession.correct,
      incorrect: finalSession.incorrect,
      skipped: finalSession.skipped,
      accuracy,
      timeTaken: Math.max(1, Math.round((Date.now() - finalSession.startedAt) / 1000)),
      achievementsUnlocked: achievements,
      bestScore: Math.max(profile.bestScore, finalSession.score),
      level: finalSession.level,
      mode: finalSession.mode,
    });
    setScreen('results');
  };

  const advanceAfterAnswer = (updatedSession: SessionState) => {
    const reachedEnd = updatedSession.currentIndex >= updatedSession.questions.length - 1;
    const lostAllLives = updatedSession.lives <= 0;

    if (reachedEnd || lostAllLives) {
      window.setTimeout(() => finishGame(updatedSession), 1000);
      return;
    }

    window.setTimeout(() => {
      setSession((current) => {
        if (!current) return current;
        return {
          ...current,
          currentIndex: current.currentIndex + 1,
          timeLeft: difficultyTimeMap[current.difficulty],
          answered: false,
          feedback: null,
        };
      });
    }, 1000);
  };

  const startGame = (mode: GameMode, level = 1, difficulty = selectedDifficulty) => {
    let questions: BrainQuestion[] = [];

    if (mode === 'training') {
      questions = getTrainingQuestions();
    } else if (mode === 'daily') {
      questions = [getDailyQuestion(new Date())];
    } else {
      questions = getLevelQuestions(level, difficulty);
    }

    const nextSession: SessionState = {
      mode,
      difficulty,
      level,
      questions,
      currentIndex: 0,
      score: 0,
      xp: 0,
      lives: 3,
      streak: 0,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      timeLeft: difficultyTimeMap[difficulty],
      answered: false,
      isPaused: false,
      feedback: null,
      startedAt: Date.now(),
    };

    setSession(nextSession);
    setScreen('play');
  };

  const handleAnswer = (answer: string) => {
    if (!session || session.answered || !currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const pointsEarned = isCorrect ? currentQuestion.points + session.streak * 20 + session.timeLeft * 3 : 0;
    const xpEarned = isCorrect ? Math.round(currentQuestion.points / 10) : 0;
    const updatedSession: SessionState = {
      ...session,
      score: isCorrect ? session.score + pointsEarned : session.score,
      xp: isCorrect ? session.xp + xpEarned : session.xp,
      streak: isCorrect ? session.streak + 1 : 0,
      correct: isCorrect ? session.correct + 1 : session.correct,
      incorrect: isCorrect ? session.incorrect : session.incorrect + 1,
      lives: isCorrect ? session.lives : Math.max(0, session.lives - 1),
      answered: true,
      feedback: {
        type: isCorrect ? 'correct' : 'wrong',
        message: isCorrect
          ? `Correct! +${pointsEarned} points and +${xpEarned} XP.`
          : `Not quite — the answer was ${currentQuestion.correctAnswer}.`,
      },
    };

    setSession(updatedSession);
    playTone(isCorrect ? 'correct' : 'wrong');
    advanceAfterAnswer(updatedSession);
  };

  const handleSkip = () => {
    if (!session || session.answered || !currentQuestion) return;

    const updatedSession: SessionState = {
      ...session,
      skipped: session.skipped + 1,
      lives: Math.max(0, session.lives - 1),
      streak: 0,
      answered: true,
      score: Math.max(0, session.score - 40),
      feedback: {
        type: 'info',
        message: `Skipped. The answer was ${currentQuestion.correctAnswer}.`,
      },
    };

    setSession(updatedSession);
    playTone('button');
    advanceAfterAnswer(updatedSession);
  };

  const handleHint = () => {
    if (!session || session.answered || !currentQuestion) return;

    setSession((current) => {
      if (!current) return current;
      return {
        ...current,
        score: Math.max(0, current.score - 25),
        feedback: {
          type: 'info',
          message: `Hint: ${currentQuestion.hint}`,
        },
      };
    });
    playTone('button');
  };

  const handleTimeout = () => {
    if (!session || session.answered || !currentQuestion) return;

    const updatedSession: SessionState = {
      ...session,
      incorrect: session.incorrect + 1,
      streak: 0,
      lives: Math.max(0, session.lives - 1),
      answered: true,
      feedback: {
        type: 'wrong',
        message: `Time's up! The correct answer was ${currentQuestion.correctAnswer}.`,
      },
    };

    setSession(updatedSession);
    playTone('wrong');
    advanceAfterAnswer(updatedSession);
  };

  const resetCurrentLevel = () => {
    if (!session) return;
    startGame(session.mode, session.level, session.difficulty);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),transparent_22%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),transparent_20%)] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),transparent_18%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.17),transparent_20%)] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {screen === 'menu' && (
          <div className="space-y-6">
            <header className="flex items-center justify-between rounded-[28px] border border-white/20 bg-white/75 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-xl shadow-lg shadow-violet-500/30">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-violet-500">Brain training</p>
                  <h1 className="text-2xl font-black">Brain Test Challenge</h1>
                </div>
              </div>

              <button
                onClick={() => setSettings((current) => ({ ...current, theme: current.theme === 'dark' ? 'light' : 'dark' }))}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {settings.theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {settings.theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </header>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[32px] border border-white/20 bg-white/75 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" /> daily reward available
                </div>

                <h2 className="mt-5 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                  Push your brain to the next level.
                </h2>

                <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
                  Solve logic puzzles, memory tests, tricky questions, pattern challenges, and impossible riddles to unlock new levels and climb the local leaderboard.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => startGame('level', selectedLevel, selectedDifficulty)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:-translate-y-1"
                  >
                    <Play className="h-4 w-4" /> Play Now
                  </button>
                  <button
                    onClick={() => startGame('daily')}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
                  >
                    <Star className="h-4 w-4" /> Daily Challenge
                  </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <StatCard label="Best Score" value={String(profile.bestScore)} icon={<Trophy className="h-4 w-4" />} />
                  <StatCard label="XP" value={String(profile.xp)} icon={<Zap className="h-4 w-4" />} />
                  <StatCard label="Rank" value={getRank(profile.xp)} icon={<Crown className="h-4 w-4" />} />
                </div>
              </div>

              <div className="space-y-4 rounded-[30px] border border-white/20 bg-white/75 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Quick menu</p>
                  <button
                    onClick={() => setScreen('settings')}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <Settings className="h-3.5 w-3.5" /> Settings
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <MenuButton label="Select Level" icon={<Target className="h-4 w-4" />} onClick={() => setScreen('levelSelect')} />
                  <MenuButton label="Brain Training" icon={<Brain className="h-4 w-4" />} onClick={() => startGame('training')} />
                  <MenuButton label="Leaderboard" icon={<Medal className="h-4 w-4" />} onClick={() => setScreen('leaderboard')} />
                  <MenuButton label="Achievements" icon={<Trophy className="h-4 w-4" />} onClick={() => setScreen('achievements')} />
                  <MenuButton label="How to Play" icon={<Info className="h-4 w-4" />} onClick={() => setScreen('howToPlay')} />
                  <MenuButton label="Daily Reward" icon={<Flame className="h-4 w-4" />} onClick={() => setScreen('daily')} />
                </div>

                <div className="rounded-[24px] bg-gradient-to-br from-amber-400 to-orange-500 p-[1px]">
                  <div className="rounded-[23px] bg-slate-950/90 p-4 text-white">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-200">
                      <span>Daily streak</span>
                      <span>{profile.streak} days</span>
                    </div>
                    <p className="mt-3 text-3xl font-black">+200 coins</p>
                    <p className="mt-2 text-sm text-slate-300">Return daily for bonus XP and streak rewards.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <div key={category.name} className="rounded-[26px] border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75">
                  <div className={`mb-3 inline-flex rounded-full bg-gradient-to-r ${categoryColors[category.name]} p-2 text-white`}>
                    <span className="text-lg">{category.emoji}</span>
                  </div>
                  <div className="text-lg font-bold">{category.name}</div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Challenge deck</span>
                    <span>{brainQuestions.filter((question) => question.category === category.name).length}</span>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {screen === 'levelSelect' && (
          <PanelShell title="Select Level" subtitle="Unlock deeper puzzles and harder categories" onBack={() => setScreen('menu')}>
            <div className="mb-5 flex flex-wrap gap-3">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                      : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {LEVELS.map((level) => (
                <button
                  key={level.level}
                  onClick={() => {
                    setSelectedLevel(level.level);
                    startGame('level', level.level, selectedDifficulty);
                  }}
                  disabled={level.level > profile.unlockedLevel}
                  className={`rounded-[26px] border p-5 text-left transition ${
                    level.level <= profile.unlockedLevel
                      ? 'border-violet-200 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 hover:-translate-y-1 dark:border-violet-500/30'
                      : 'cursor-not-allowed border-slate-200 bg-slate-100 opacity-50 dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Level {level.level}</p>
                      <h3 className="mt-2 text-2xl font-black">{level.title}</h3>
                    </div>
                    <div className="rounded-full bg-white px-2 py-1 text-xs font-bold text-violet-600 shadow-sm dark:bg-slate-800 dark:text-violet-200">
                      {level.difficulty}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {level.category} • {level.goal}
                  </p>
                </button>
              ))}
            </div>
          </PanelShell>
        )}

        {screen === 'howToPlay' && (
          <PanelShell title="How to Play" subtitle="Rules for your brain training session" onBack={() => setScreen('menu')}>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                'Answer multiple-choice questions before the timer runs out.',
                'Use hints wisely. They give you a clue but reduce your score.',
                'Skip when necessary, but it costs points and lives.',
                'Keep your streak alive to earn extra bonuses and player XP.',
                'Complete stages to unlock harder levels and tougher puzzles.',
                'Daily challenges reward consistency and streak bonuses.',
              ].map((rule) => (
                <div key={rule} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">{rule}</p>
                </div>
              ))}
            </div>
          </PanelShell>
        )}

        {screen === 'settings' && (
          <PanelShell title="Settings" subtitle="Customize your game session" onBack={() => setScreen('menu')}>
            <div className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <SettingRow
                label="Sound effects"
                value={settings.soundOn ? 'On' : 'Off'}
                onToggle={() => setSettings((current) => ({ ...current, soundOn: !current.soundOn }))}
                icon={settings.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              />
              <SettingRow
                label="Theme"
                value={settings.theme === 'dark' ? 'Dark mode' : 'Light mode'}
                onToggle={() => setSettings((current) => ({ ...current, theme: current.theme === 'dark' ? 'light' : 'dark' }))}
                icon={settings.theme === 'dark' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
              />
            </div>
          </PanelShell>
        )}

        {screen === 'achievements' && (
          <PanelShell title="Achievements" subtitle="Your unlocked milestones" onBack={() => setScreen('menu')}>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: 'First Win', unlocked: profile.bestScore >= 250 },
                { name: 'Swift Solver', unlocked: profile.xp >= 900 },
                { name: 'Level Unlock', unlocked: profile.unlockedLevel >= 4 },
                { name: 'Legend', unlocked: profile.xp >= 2500 },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={`rounded-[24px] border p-5 ${
                    badge.unlocked
                      ? 'border-amber-300 bg-gradient-to-br from-amber-400/20 to-yellow-500/10 dark:border-amber-500/50'
                      : 'border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${badge.unlocked ? 'bg-amber-500 text-white' : 'bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                      <Trophy className="h-5 w-5" />
                    </div>
                    <span className="font-bold">{badge.name}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {badge.unlocked ? 'Unlocked and ready for showcase.' : 'Keep playing to unlock this badge.'}
                  </p>
                </div>
              ))}
            </div>
          </PanelShell>
        )}

        {screen === 'leaderboard' && (
          <PanelShell title="Local Leaderboard" subtitle="Community scores saved on this device" onBack={() => setScreen('menu')}>
            <div className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              {leaderboard.map((entry, index) => (
                <div
                  key={`${entry.name}-${index}`}
                  className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 font-black text-white">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-bold">{entry.name}</p>
                      <p className="text-xs text-slate-500">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-violet-600 dark:text-violet-300">{entry.score}</p>
                    <p className="text-xs text-slate-500">{entry.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </PanelShell>
        )}

        {screen === 'daily' && (
          <PanelShell title="Daily Challenge" subtitle={`Puzzle for ${new Date().toLocaleDateString()}`} onBack={() => setScreen('menu')}>
            <div className="rounded-[28px] border border-violet-200 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-5 dark:border-violet-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-600">Special puzzle</p>
                  <h3 className="mt-2 text-2xl font-black">{getDailyQuestion(new Date()).question}</h3>
                </div>
                <div className="rounded-full bg-white p-3 text-violet-600 shadow-sm dark:bg-slate-900 dark:text-violet-200">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => startGame('daily')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 font-semibold text-white"
                >
                  Start Challenge <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </PanelShell>
        )}

        {screen === 'play' && session && currentQuestion && (
          <div className="space-y-5">
            <div className="flex flex-col gap-4 rounded-[28px] border border-white/20 bg-white/75 p-4 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-full bg-gradient-to-r ${categoryColors[currentQuestion.category]} px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white`}>
                  {currentQuestion.category}
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Level {session.level} • {session.difficulty}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-200">
                <Badge label="Score" value={String(session.score)} icon={<Star className="h-3.5 w-3.5" />} />
                <Badge label="XP" value={String(session.xp)} icon={<Zap className="h-3.5 w-3.5" />} />
                <Badge label="Lives" value={String(session.lives)} icon={<HeartIcon />} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[30px] border border-white/20 bg-white/80 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] dark:border-slate-700/80 dark:bg-slate-900/80 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" /> {session.timeLeft}s left
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSession((current) => (current ? { ...current, isPaused: !current.isPaused } : current))} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      <Pause className="h-3.5 w-3.5" /> Pause
                    </button>
                    <button onClick={() => setScreen('menu')} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      <Home className="h-3.5 w-3.5" /> Home
                    </button>
                  </div>
                </div>

                <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="mb-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>Question {session.currentIndex + 1} / {session.questions.length}</span>
                  <span>{Math.round((session.correct / Math.max(1, session.correct + session.incorrect + session.skipped)) * 100)}% accuracy</span>
                </div>

                <h2 className="text-2xl font-black leading-relaxed sm:text-3xl">{currentQuestion.question}</h2>

                {session.feedback && (
                  <div className={`mt-5 rounded-[22px] border px-4 py-3 text-sm font-medium ${
                    session.feedback.type === 'correct'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
                      : session.feedback.type === 'wrong'
                        ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200'
                        : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200'
                  }`}>
                    {session.feedback.message}
                  </div>
                )}

                <div className="mt-6 grid gap-3">
                  {currentQuestion.choices.map((option) => (
                    <button
                      key={option}
                      disabled={session.answered}
                      onClick={() => handleAnswer(option)}
                      className={`rounded-[20px] border px-4 py-3 text-left text-base font-medium transition ${
                        session.answered
                          ? option === currentQuestion.correctAnswer
                            ? 'border-emerald-300 bg-emerald-400/10 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
                            : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={handleHint} className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    <AlertCircle className="h-4 w-4" /> Hint (-25)
                  </button>
                  <button onClick={handleSkip} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <SkipForward className="h-4 w-4" /> Skip
                  </button>
                  <button onClick={resetCurrentLevel} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <RotateCcw className="h-4 w-4" /> Restart
                  </button>
                </div>
              </div>

              <aside className="space-y-4 rounded-[30px] border border-white/20 bg-white/80 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] dark:border-slate-700/80 dark:bg-slate-900/80">
                <div className="rounded-[24px] bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px]">
                  <div className="rounded-[23px] bg-slate-950/90 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-violet-200">Session</span>
                      <span className="text-xs font-semibold text-violet-200">{session.mode}</span>
                    </div>
                    <p className="mt-4 text-3xl font-black">{session.score}</p>
                    <p className="mt-1 text-xs text-slate-300">Points earned</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <MiniStat label="Correct" value={String(session.correct)} accent="emerald" />
                  <MiniStat label="Incorrect" value={String(session.incorrect)} accent="rose" />
                  <MiniStat label="Skipped" value={String(session.skipped)} accent="amber" />
                  <MiniStat label="Streak" value={String(session.streak)} accent="violet" />
                </div>

                {session.isPaused && (
                  <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                    Game paused. Press resume to continue.
                    <button
                      onClick={() => setSession((current) => (current ? { ...current, isPaused: false } : current))}
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-500 px-3 py-2 text-xs font-bold text-white"
                    >
                      Resume
                    </button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}

        {screen === 'results' && resultData && (
          <div className="mx-auto max-w-3xl rounded-[30px] border border-white/20 bg-white/80 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-violet-500">Level complete</p>
                <h2 className="mt-3 text-4xl font-black">Performance Summary</h2>
              </div>
              <div className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 p-3 text-white">
                <Trophy className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total score" value={String(resultData.score)} icon={<Star className="h-4 w-4" />} />
              <StatCard label="Accuracy" value={`${resultData.accuracy}%`} icon={<Target className="h-4 w-4" />} />
              <StatCard label="Coins" value={String(resultData.coinsEarned)} icon={<Zap className="h-4 w-4" />} />
              <StatCard label="XP" value={String(resultData.xp)} icon={<Sparkles className="h-4 w-4" />} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Results</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  <li>Correct: {resultData.correct}</li>
                  <li>Incorrect: {resultData.incorrect}</li>
                  <li>Skipped: {resultData.skipped}</li>
                  <li>Time taken: {resultData.timeTaken}s</li>
                </ul>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Achievements</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resultData.achievementsUnlocked.length > 0 ? (
                    resultData.achievementsUnlocked.map((achievement) => (
                      <span key={achievement} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-200">
                        {achievement}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No new achievements this round.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => startGame(resultData.mode, resultData.level, selectedDifficulty)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white">
                <Play className="h-4 w-4" /> Play Again
              </button>
              <button onClick={() => setScreen('menu')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <Home className="h-4 w-4" /> Return Home
              </button>
              {resultData.mode !== 'daily' && (
                <button
                  onClick={() => startGame('level', resultData.level + 1, selectedDifficulty)}
                  className="inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 px-5 py-3 font-semibold text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200"
                >
                  Next Level <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function PanelShell({ title, subtitle, onBack, children }: { title: string; subtitle: string; onBack: () => void; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl rounded-[30px] border border-white/20 bg-white/75 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-violet-500">Game menu</p>
          <h2 className="mt-2 text-3xl font-black">{title}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          <Home className="h-4 w-4" /> Home
        </button>
      </div>
      {children}
    </div>
  );
}

function MenuButton({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white p-3 text-left text-sm font-semibold text-slate-700 transition hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-200">
        {icon}
      </div>
      {label}
    </button>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
      <div className="mb-3 flex items-center justify-between text-slate-500 dark:text-slate-300">
        <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
        <div className="text-violet-500">{icon}</div>
      </div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
}

function Badge({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      {icon}
      <span>{label}</span>
      <span className="font-black text-violet-600 dark:text-violet-300">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent: 'emerald' | 'rose' | 'amber' | 'violet' }) {
  const accentMap = {
    emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-200',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-200',
    violet: 'bg-violet-500/10 text-violet-700 dark:text-violet-200',
  };

  return (
    <div className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
      <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${accentMap[accent]}`}>{value}</span>
    </div>
  );
}

function SettingRow({ label, value, icon, onToggle }: { label: string; value: string; icon: ReactNode; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-200">
          {icon}
        </div>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{value}</div>
        </div>
      </div>
      <button onClick={onToggle} className="rounded-full bg-slate-900 px-3 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
        Toggle
      </button>
    </div>
  );
}

function HeartIcon() {
  return <span className="text-base text-rose-500">❤</span>;
}
