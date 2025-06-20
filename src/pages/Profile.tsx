import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Star, 
  Flame, 
  BookOpen, 
  Target,
  Award,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';
import { useUser } from '../hooks/useUser';

const Profile: React.FC = () => {
  const { user } = useUser();

  const levelProgress = (user.xp / 100) * 100;
  const nextLevelXp = 100 - user.xp;

  const stats = [
    {
      icon: Star,
      label: 'Current Level',
      value: user.level,
      color: 'text-primary-400',
      bg: 'bg-primary-400/10'
    },
    {
      icon: TrendingUp,
      label: 'Total XP',
      value: user.totalXp,
      color: 'text-secondary-400',
      bg: 'bg-secondary-400/10'
    },
    {
      icon: Trophy,
      label: 'Achievements',
      value: user.achievements.length,
      color: 'text-accent-400',
      bg: 'bg-accent-400/10'
    },
    {
      icon: BookOpen,
      label: 'Lessons Completed',
      value: user.completedLessons.length,
      color: 'text-success-400',
      bg: 'bg-success-400/10'
    },
    {
      icon: Target,
      label: 'Challenges Solved',
      value: user.completedChallenges.length,
      color: 'text-warning-400',
      bg: 'bg-warning-400/10'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: user.currentStreak,
      color: 'text-error-400',
      bg: 'bg-error-400/10'
    }
  ];

  const recentAchievements = user.achievements
    .sort((a, b) => new Date(b.unlockedAt || 0).getTime() - new Date(a.unlockedAt || 0).getTime())
    .slice(0, 3);

  const rarityColors = {
    common: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    rare: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    epic: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    legendary: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card gradient className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-4xl">
              {user.avatar}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-primary-400" />
                  <span>Level {user.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-accent-400" />
                  <span>{user.achievements.length} Achievements</span>
                </div>
              </div>
              
              <div className="max-w-md mx-auto md:mx-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Progress to Level {user.level + 1}</span>
                  <span className="text-sm text-primary-400">{user.xp}/100 XP</span>
                </div>
                <ProgressBar progress={levelProgress} size="md" />
                <p className="text-xs text-gray-400 mt-1">
                  {nextLevelXp} XP needed for next level
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-4 text-center">
                <div className={`inline-flex p-3 rounded-lg ${stat.bg} mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-6 h-6 text-accent-400" />
              <h2 className="text-2xl font-bold text-white">Recent Achievements</h2>
            </div>
            
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${rarityColors[achievement.rarity]}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${rarityColors[achievement.rarity]}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {achievement.unlockedAt && (
                      <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Learning Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Flame className="w-6 h-6 text-error-400" />
            <h2 className="text-2xl font-bold text-white">Learning Streak</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-error-400 mb-2">
                {user.currentStreak}
              </div>
              <div className="text-gray-400">Current Streak</div>
              <div className="text-sm text-gray-500 mt-1">
                Keep it up! 🔥
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">
                {user.bestStreak}
              </div>
              <div className="text-gray-400">Best Streak</div>
              <div className="text-sm text-gray-500 mt-1">
                Personal record 🏆
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;