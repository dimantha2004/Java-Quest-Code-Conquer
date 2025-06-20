import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Boxes, 
  GitBranch, 
  Database, 
  Shield, 
  Zap, 
  Lock,
  CheckCircle,
  Clock
} from 'lucide-react';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';
import { kingdoms } from '../data/kingdoms';
import { useUser } from '../hooks/useUser';

const iconMap = {
  BookOpen,
  Boxes,
  GitBranch,
  Database,
  Shield,
  Zap
};

const difficultyColors = {
  beginner: 'text-green-400 bg-green-400/10',
  intermediate: 'text-yellow-400 bg-yellow-400/10',
  advanced: 'text-red-400 bg-red-400/10'
};

const Kingdoms: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
          Code Kingdoms
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Choose your learning path and embark on an epic journey through the realms of Java programming. 
          Each kingdom holds secrets and challenges that will forge you into a master developer.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kingdoms.map((kingdom, index) => {
          const IconComponent = iconMap[kingdom.icon as keyof typeof iconMap];
          const isCompleted = user.completedKingdoms.includes(kingdom.id);
          const progress = (user.completedLessons.filter(id => 
            kingdom.lessons.some(lesson => lesson.id === id)
          ).length / Math.max(kingdom.lessons.length, 1)) * 100;

          return (
            <motion.div
              key={kingdom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={kingdom.isUnlocked ? `/kingdoms/${kingdom.id}` : '#'}>
                <Card 
                  hover={kingdom.isUnlocked}
                  className={`p-6 h-full relative overflow-hidden ${
                    !kingdom.isUnlocked ? 'opacity-60' : ''
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4">
                      <IconComponent className="w-24 h-24" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${
                          kingdom.isUnlocked 
                            ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                            : 'bg-gray-700'
                        }`}>
                          {kingdom.isUnlocked ? (
                            <IconComponent className="w-6 h-6 text-white" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            difficultyColors[kingdom.difficulty]
                          }`}>
                            {kingdom.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <CheckCircle className="w-6 h-6 text-success-400" />
                      )}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {kingdom.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {kingdom.description}
                    </p>

                    {/* Progress */}
                    {kingdom.isUnlocked && kingdom.lessons.length > 0 && (
                      <div className="mb-4">
                        <ProgressBar 
                          progress={progress}
                          showLabel
                          label="Progress"
                          size="sm"
                        />
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          <span>{kingdom.lessons.length} lessons</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{Math.ceil(kingdom.lessons.reduce((acc, lesson) => acc + lesson.estimatedTime, 0) / 60)}h</span>
                        </div>
                      </div>
                      <div className="text-accent-400 font-medium">
                        {kingdom.totalXp} XP
                      </div>
                    </div>

                    {/* Status */}
                    {!kingdom.isUnlocked && (
                      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <Lock className="w-4 h-4" />
                          <span>Complete previous kingdoms to unlock</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Your Learning Journey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                {user.completedKingdoms.length}
              </div>
              <div className="text-gray-400">Kingdoms Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">
                {user.completedLessons.length}
              </div>
              <div className="text-gray-400">Lessons Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-400 mb-2">
                {user.totalXp}
              </div>
              <div className="text-gray-400">Total Experience</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Kingdoms;