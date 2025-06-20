import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'Award',
    rarity: 'common'
  },
  {
    id: 'kingdom-conqueror',
    title: 'Kingdom Conqueror',
    description: 'Complete your first kingdom',
    icon: 'Crown',
    rarity: 'rare'
  },
  {
    id: 'bug-slayer',
    title: 'Bug Slayer',
    description: 'Fix 10 bugs in Bug Battle challenges',
    icon: 'Bug',
    rarity: 'rare'
  },
  {
    id: 'code-master',
    title: 'Code Master',
    description: 'Reach level 10',
    icon: 'Star',
    rarity: 'epic'
  },
  {
    id: 'java-legend',
    title: 'Java Legend',
    description: 'Complete all kingdoms',
    icon: 'Trophy',
    rarity: 'legendary'
  },
  {
    id: 'streak-warrior',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    rarity: 'rare'
  },
  {
    id: 'project-builder',
    title: 'Project Builder',
    description: 'Complete 5 projects',
    icon: 'Building',
    rarity: 'epic'
  }
];