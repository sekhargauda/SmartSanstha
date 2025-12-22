// frontend/src/types/index.ts

export interface ArticleCard {
  uid: string;
  article: string;
  expl: string;
  flipped?: boolean;
  matched?: boolean;
}

export interface ConstitutionPart {
  id: string;
  partNumber: number;
  title: string;
  description: string;
  articles: string[];
  totalArticles: number;
  category: 'fundamental-rights' | 'directive-principles' | 'union' | 'states' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estMinutes: number;
  icon: string;
  isAvailable: boolean;
  route: string;
}

export interface UserProgress {
  gamesPlayed: number;
  articlesRead: number;
  quizzesTaken: number;
  totalScore: number;
  achievements: Achievement[];
  currentStreak: number;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface IMeterEffect {
  freedom: number;
  order: number;
}

export interface IToken {
  id: string;
  label: string;
  meter: IMeterEffect;
  explanation: string;
}

export interface IRandomEvent {
  chance: number;
  effect: IMeterEffect;
  desc: string;
}

export interface IScenario {
  id: string;
  title: string;
  description: string;
  tokens: IToken[];
  randomEvents?: IRandomEvent[];
}