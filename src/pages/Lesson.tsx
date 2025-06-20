import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle,
  Play,
  Copy,
  Check
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { kingdoms } from '../data/kingdoms';
import { useUser } from '../hooks/useUser';

const Lesson: React.FC = () => {
  const { kingdomId, lessonId } = useParams();
  const { user, completeLesson, addXp, unlockAchievement } = useUser();
  const [codeCopied, setCodeCopied] = useState(false);

  const kingdom = kingdoms.find(k => k.id === kingdomId);
  const lesson = kingdom?.lessons.find(l => l.id === lessonId);
  
  if (!kingdom || !lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
        <Link to="/kingdoms">
          <Button>Back to Kingdoms</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = user.completedLessons.includes(lesson.id);
  const currentLessonIndex = kingdom.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = kingdom.lessons[currentLessonIndex + 1];
  const prevLesson = kingdom.lessons[currentLessonIndex - 1];

  const handleCompleteLesson = () => {
    if (!isCompleted) {
      const updatedUser = addXp(lesson.xpReward);
      completeLesson(lesson.id);
      
      // Check for achievements
      if (user.completedLessons.length === 0) {
        unlockAchievement('first-steps');
      }
    }
  };

  const copyCode = async () => {
    if (lesson.codeExample) {
      await navigator.clipboard.writeText(lesson.codeExample);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Link to={`/kingdoms/${kingdomId}`}>
            <Button variant="ghost" size="sm" icon={ArrowLeft}>
              Back to {kingdom.name}
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-600" />
          <div className="text-sm text-gray-400">
            Lesson {currentLessonIndex + 1} of {kingdom.lessons.length}
          </div>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white mb-2">
                {lesson.title}
              </h1>
              <p className="text-gray-400">
                {lesson.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{lesson.estimatedTime} min</span>
              </div>
              <div className="flex items-center space-x-2 text-accent-400">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{lesson.xpReward} XP</span>
              </div>
              {isCompleted && (
                <CheckCircle className="w-6 h-6 text-success-400" />
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Lesson Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-8">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: lesson.content.replace(/\n/g, '<br>').replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-primary-400">$1</code>')
              }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Code Example */}
      {lesson.codeExample && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-primary-400" />
                <span className="text-sm font-medium text-white">Code Example</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={codeCopied ? Check : Copy}
                onClick={copyCode}
              >
                {codeCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="p-6 bg-gray-900">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{lesson.codeExample}</code>
              </pre>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              {prevLesson ? (
                <Link to={`/kingdoms/${kingdomId}/lessons/${prevLesson.id}`}>
                  <Button variant="ghost" icon={ArrowLeft}>
                    Previous: {prevLesson.title}
                  </Button>
                </Link>
              ) : (
                <div className="w-48" />
              )}
            </div>

            <div className="flex items-center space-x-4">
              {!isCompleted && (
                <Button onClick={handleCompleteLesson} icon={CheckCircle}>
                  Complete Lesson (+{lesson.xpReward} XP)
                </Button>
              )}
              
              {isCompleted && nextLesson ? (
                <Link to={`/kingdoms/${kingdomId}/lessons/${nextLesson.id}`}>
                  <Button icon={ArrowRight} iconPosition="right">
                    Next: {nextLesson.title}
                  </Button>
                </Link>
              ) : isCompleted && !nextLesson ? (
                <Link to={`/kingdoms/${kingdomId}`}>
                  <Button variant="success" icon={CheckCircle}>
                    Kingdom Complete!
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Lesson;