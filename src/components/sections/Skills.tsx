import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Skill {
  id: number;
  name: string;
  logo: string;
  level: number;
}

const Skills: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const skills: Skill[] = [
    { id: 1, name: 'React', logo: '⚛️', level: 95 },
    { id: 2, name: 'TypeScript', logo: '🔷', level: 90 },
    { id: 3, name: 'Node.js', logo: '🟢', level: 88 },
    { id: 4, name: 'Python', logo: '🐍', level: 85 },
    { id: 5, name: 'PostgreSQL', logo: '🐘', level: 80 },
    { id: 6, name: 'Docker', logo: '🐳', level: 75 },
    { id: 7, name: 'AWS', logo: '☁️', level: 70 },
    { id: 8, name: 'GraphQL', logo: '💜', level: 78 },
  ];

  const skillsPerView = 4;
  const maxIndex = Math.max(0, skills.length - skillsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSkill = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSkill = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-white',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-800' : 'bg-gray-50',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-black',
        text: isDark ? 'text-cyan-400' : 'text-cyan-400',
        card: isDark ? 'bg-gray-800' : 'bg-gray-900',
        accent: 'text-purple-400',
      };
    }
  };

  const styles = getStyles();

  return (
    <section id="skills" className={`min-h-screen py-20 ${styles.bg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${styles.text} ${
            theme === 'professional' ? 'font-serif' : 'font-bold'
          }`}>
            Technical Skills
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
        </motion.div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-lg">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / skillsPerView)}%` }}
              transition={{ 
                type: theme === 'creative' ? 'spring' : 'tween',
                stiffness: 300,
                damping: 30,
                duration: 0.5 
              }}
              style={{ width: `${(skills.length / skillsPerView) * 100}%` }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className={`flex-shrink-0 p-6 rounded-lg ${styles.card} border ${
                    theme === 'professional'
                      ? isDark ? 'border-gray-700' : 'border-gray-200'
                      : 'border-purple-500/30'
                  }`}
                  style={{ width: `${100 / skillsPerView}%` }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: theme === 'creative' ? 10 : 0,
                  }}
                  animate={theme === 'creative' ? {
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0)',
                      '0 0 20px rgba(168, 85, 247, 0.3)',
                      '0 0 20px rgba(168, 85, 247, 0)',
                    ],
                  } : {}}
                  transition={theme === 'creative' ? {
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  } : { type: "spring", stiffness: 300 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={theme === 'creative' ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={theme === 'creative' ? {
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      } : {}}
                    >
                      {skill.logo}
                    </motion.div>
                    
                    <h3 className={`text-xl font-bold mb-4 ${styles.text}`}>
                      {skill.name}
                    </h3>
                    
                    {/* Skill Level Bar */}
                    <div className={`w-full h-2 rounded-full mb-2 ${
                      theme === 'professional'
                        ? isDark ? 'bg-gray-700' : 'bg-gray-200'
                        : 'bg-gray-700'
                    }`}>
                      <motion.div
                        className={`h-full rounded-full ${
                          theme === 'professional'
                            ? isDark ? 'bg-blue-400' : 'bg-blue-600'
                            : 'bg-gradient-to-r from-purple-400 to-cyan-400'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    
                    <span className={`text-sm ${styles.accent}`}>
                      {skill.level}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSkill}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full ${
              theme === 'professional'
                ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
            } shadow-lg hover:scale-110 transition-transform`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            onClick={nextSkill}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full ${
              theme === 'professional'
                ? isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
            } shadow-lg hover:scale-110 transition-transform`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? theme === 'professional'
                      ? isDark ? 'bg-blue-400' : 'bg-blue-600'
                      : 'bg-gradient-to-r from-purple-400 to-cyan-400'
                    : theme === 'professional'
                      ? isDark ? 'bg-gray-600' : 'bg-gray-300'
                      : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;