import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import Description from './sections/Description';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Certificates from './sections/Certificates';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Comments from './sections/Comments';

const Portfolio: React.FC = () => {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    // Update document title based on theme
    document.title = `John Doe - ${theme === 'professional' ? 'Professional' : 'Creative'} Portfolio`;
  }, [theme]);

  const getBackgroundClass = () => {
    if (theme === 'professional') {
      return isDark ? 'bg-gray-900' : 'bg-white';
    } else {
      return isDark ? 'bg-gray-900' : 'bg-black';
    }
  };

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-500 ${getBackgroundClass()}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Description />
        <Education />
        <Skills />
        <Certificates />
        <Projects />
        <Testimonials />
        <Contact />
        <Comments />
      </motion.main>

      {/* Creative Mode: Floating Elements */}
      {theme === 'creative' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Portfolio;