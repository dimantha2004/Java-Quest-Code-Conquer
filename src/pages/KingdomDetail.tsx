import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle,
  Lock,
  Play
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import { kingdoms } from '../data/kingdoms';
import { useUser } from '../hooks/useUser';

const KingdomDetail: React.FC = () => {
  const { kingdomId } = useParams();
  const { user } = useUser();
  
  const kingdom = kingdoms.find(k => k.id === kingdomId);
  
  if (!kingdom) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Kingdom Not Found</h1>
        <Link to="/kingdoms">
          <Button>Back to Kingdoms</Button>
        </Link>
      </div>
    );
  }

  const completedLessons = kingdom.lessons.filter(lesson => 
    user.completedLessons.includes(lesson.id)
  );
  const progress = kingdom.lessons.length > 0 ? (completedLessons.length / kingdom.lessons.length) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/kingdoms">
            <Button variant="ghost" icon={ArrowLeft}>
              Back to Kingdoms
            </Button>
          </Link>
        </div>

        <Card gradient className="p-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {kingdom.name}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
              {kingdom.description}
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <BookOpen className="w-5 h-5" />
                <span>{kingdom.lessons.length} lessons</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="w-5 h-5" />
                <span>{kingdom.totalXp} total XP</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-5 h-5" />
                <span>{Math.ceil(kingdom.lessons.reduce((acc, lesson) => acc + lesson.estimatedTime, 0) / 60)} hours</span>
              </div>
            </div>

            {kingdom.lessons.length > 0 && (
              <div className="max-w-md mx-auto mt-6">
                <ProgressBar
                  progress={progress}
                  showLabel
                  label="Kingdom Progress"
                  size="lg"
                />
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Lessons</h2>
        
        {kingdom.lessons.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p>Lessons for this kingdom are currently being prepared.</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {kingdom.lessons.map((lesson, index) => {
              const isCompleted = user.completedLessons.includes(lesson.id);
              const isLocked = index > 0 && !user.completedLessons.includes(kingdom.lessons[index - 1].id);
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Card className={`p-6 ${isLocked ? 'opacity-50' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-success-500 text-white' 
                            : isLocked 
                              ? 'bg-gray-700 text-gray-500'
                              : 'bg-primary-500 text-white'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.estimatedTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="w-4 h-4" />
                              <span>{lesson.xpReward} XP</span>
                            </div>
                          </div>
                        </div>
                        
                        {!isLocked ? (
                          <Link to={`/kingdoms/${kingdomId}/lessons/${lesson.id}`}>
                            <Button 
                              variant={isCompleted ? "success" : "primary"} 
                              size="sm"
                            >
                              {isCompleted ? "Review" : "Start"}
                            </Button>
                          </Link>
                        ) : (
                          <Button variant="ghost" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default KingdomDetail;