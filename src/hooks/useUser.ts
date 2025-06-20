import { useState, useEffect } from 'react';
import { User } from '../types';
import { achievements } from '../data/achievements';

const STORAGE_KEY = 'java-quest-user';

const defaultUser: User = {
  id: '1',
  name: 'Code Apprentice',
  level: 1,
  xp: 0,
  totalXp: 0,
  avatar: '🧙‍♂️',
  achievements: [],
  completedKingdoms: [],
  completedLessons: [],
  completedChallenges: [],
  currentStreak: 0,
  bestStreak: 0
};

export const useUser = () => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  const addXp = (xpAmount: number) => {
    const newTotalXp = user.totalXp + xpAmount;
    const newLevel = Math.floor(newTotalXp / 100) + 1;
    const newXp = newTotalXp % 100;
    
    const updatedUser = {
      ...user,
      xp: newXp,
      totalXp: newTotalXp,
      level: newLevel
    };
    
    saveUser(updatedUser);
    return updatedUser;
  };

  const completeLesson = (lessonId: string) => {
    if (!user.completedLessons.includes(lessonId)) {
      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, lessonId]
      };
      saveUser(updatedUser);
    }
  };

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !user.achievements.find(a => a.id === achievementId)) {
      const updatedUser = {
        ...user,
        achievements: [...user.achievements, { ...achievement, unlockedAt: new Date() }]
      };
      saveUser(updatedUser);
      return achievement;
    }
    return null;
  };

  const resetProgress = () => {
    saveUser(defaultUser);
  };

  return {
    user,
    addXp,
    completeLesson,
    unlockAchievement,
    resetProgress,
    saveUser
  };
};