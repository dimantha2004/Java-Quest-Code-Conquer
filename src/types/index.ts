export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  totalXp: number;
  avatar: string;
  achievements: Achievement[];
  completedKingdoms: string[];
  completedLessons: string[];
  completedChallenges: string[];
  currentStreak: number;
  bestStreak: number;
}

export interface Kingdom {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  isUnlocked: boolean;
  progress: number;
  totalXp: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample?: string;
  challenges: Challenge[];
  xpReward: number;
  estimatedTime: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  startingCode: string;
  solution: string;
  testCases: TestCase[];
  xpReward: number;
  hints: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  estimatedTime: number;
  xpReward: number;
  requirements: string[];
  starterCode?: string;
}