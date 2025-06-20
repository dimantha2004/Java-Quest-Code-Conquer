import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Crown, Lock } from 'lucide-react';
import Card from '../components/UI/Card';
import { achievements } from '../data/achievements';
import { useUser } from '../hooks/useUser';

const Achievements: React.FC = () => {
  const { user } = useUser();

  const rarityConfig = {
    common: {
      color: 'text-gray-400',
      bg: 'bg-gray-400/10',
      border: 'border-gray-400/20',
      icon: Award
    },
    rare: {
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
      icon: Star
    },
    epic: {
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/20',
      icon: Trophy
    },
    legendary: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/20',
      icon: Crown
    }
  };

  const unlockedAchievements = user.achievements;
  const lockedAchievements = achievements.filter(
    achievement => !unlockedAchievements.find(ua => ua.id === achievement.id)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-4">
          Achievements
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Track your progress and unlock rewards as you master Java programming. 
          Each achievement represents a milestone in your coding journey.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">
                {unlockedAchievements.length}
              </div>
              <div className="text-gray-400">Unlocked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-400 mb-2">
                {achievements.length}
              </div>
              <div className="text-gray-400">Total</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-400 mb-2">
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </div>
              <div className="text-gray-400">Complete</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-400 mb-2">
                {unlockedAchievements.filter(a => a.rarity === 'legendary').length}
              </div>
              <div className="text-gray-400">Legendary</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-accent-400" />
            <span>Unlocked Achievements</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedAchievements.map((achievement, index) => {
              const config = rarityConfig[achievement.rarity];
              const IconComponent = config.icon;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Card className={`p-6 border-2 ${config.border} ${config.bg}`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${config.bg}`}>
                        <IconComponent className={`w-6 h-6 ${config.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-white">
                            {achievement.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">
                          {achievement.description}
                        </p>
                        
                        {achievement.unlockedAt && (
                          <div className="text-xs text-gray-500">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Lock className="w-6 h-6 text-gray-400" />
            <span>Locked Achievements</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map((achievement, index) => {
              const config = rarityConfig[achievement.rarity];
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <Card className="p-6 opacity-60">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-gray-700">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-300">
                            {achievement.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
                            {achievement.rarity}
                          </span>
                        </div>
                        
                        <p className="text-gray-500 text-sm">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Achievements;