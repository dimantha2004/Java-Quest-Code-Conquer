import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, BookOpen, Trophy, Users, Zap, Target } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useUser } from '../hooks/useUser';

const Home: React.FC = () => {
  const { user } = useUser();

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn Java through engaging, story-driven lessons with real-world examples',
      color: 'text-blue-400'
    },
    {
      icon: Target,
      title: 'Coding Challenges',
      description: 'Test your skills with gamified coding challenges and earn XP',
      color: 'text-green-400'
    },
    {
      icon: Trophy,
      title: 'Achievements System',
      description: 'Unlock achievements and track your progress as you master Java',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with fellow learners and share your coding journey',
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Built-in Code Editor',
      description: 'Write and test Java code directly in your browser with instant feedback',
      color: 'text-red-400'
    },
    {
      icon: Sword,
      title: 'Bug Battles',
      description: 'Sharpen your debugging skills by fixing broken code in epic battles',
      color: 'text-orange-400'
    }
  ];

  const stats = [
    { label: 'Current Level', value: user.level, color: 'text-primary-400' },
    { label: 'Total XP', value: user.totalXp, color: 'text-secondary-400' },
    { label: 'Achievements', value: user.achievements.length, color: 'text-accent-400' },
    { label: 'Lessons Completed', value: user.completedLessons.length, color: 'text-success-400' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
            Java Quest
          </h1>
          <p className="relative text-xl md:text-2xl text-gray-300 mt-2">
            Code & Conquer
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          Embark on an epic RPG-style journey to master Java fundamentals and Object-Oriented Programming. 
          Battle bugs, unlock achievements, and become a legendary developer!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kingdoms">
            <Button size="lg" icon={Sword}>
              Begin Your Quest
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="lg" icon={Trophy}>
              View Progress
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Stats Section */}
      {user.totalXp > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Journey</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.section>
      )}

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Master Java Through Adventure
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our gamified learning platform combines the excitement of RPG games with comprehensive Java education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card hover className="p-6 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-700 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card gradient className="p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already started their Java journey. 
            Your quest to become a coding legend begins now!
          </p>
          <Link to="/kingdoms">
            <Button size="lg" icon={Sword} className="px-8">
              Start Learning Now
            </Button>
          </Link>
        </Card>
      </motion.section>
    </div>
  );
};

export default Home;