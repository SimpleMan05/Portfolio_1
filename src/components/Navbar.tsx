import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, GraduationCap, Award, Code, Star, Mail, MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, isDark, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('description');

  const sections = [
    { id: 'description', name: 'About', icon: User },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'projects', name: 'Projects', icon: Home },
    { id: 'testimonials', name: 'Testimonials', icon: Star },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'comments', name: 'Comments', icon: MessageCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNavbarStyles = () => {
    if (theme === 'professional') {
      return isDark 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200';
    } else {
      return isDark
        ? 'bg-gray-900/95 border-pink-500/50'
        : 'bg-black/95 border-cyan-400/50';
    }
  };

  const getTextStyles = () => {
    if (theme === 'professional') {
      return isDark ? 'text-gray-300' : 'text-gray-700';
    } else {
      return isDark ? 'text-cyan-300' : 'text-cyan-300';
    }
  };

  const getActiveStyles = () => {
    if (theme === 'professional') {
      return isDark
        ? 'text-white bg-gray-700'
        : 'text-white bg-gray-800';
    } else {
      return 'text-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 shadow-lg shadow-pink-500/50';
    }
  };

  const getCreativeFontClass = () => {
    return theme === 'creative' ? 'font-kalam' : '';
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${getNavbarStyles()}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive ? getActiveStyles() : getTextStyles()
                  } hover:scale-105 ${getCreativeFontClass()}`}
                  whileHover={{ 
                    scale: 1.05,
                    ...(theme === 'creative' && {
                      textShadow: '0 0 10px currentColor',
                      filter: 'drop-shadow(0 0 5px currentColor)'
                    })
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={theme === 'creative' && isActive ? {
                    boxShadow: [
                      '0 0 20px rgba(236, 72, 153, 0.5)',
                      '0 0 30px rgba(168, 85, 247, 0.5)',
                      '0 0 20px rgba(6, 182, 212, 0.5)',
                      '0 0 30px rgba(236, 72, 153, 0.5)',
                    ],
                  } : {}}
                  transition={theme === 'creative' && isActive ? {
                    duration: 2,
                    repeat: Infinity,
                  } : {}}
                >
                  <Icon size={18} />
                  <span className={`text-sm font-medium ${theme === 'creative' ? 'font-bold' : ''}`}>
                    {section.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              theme === 'professional'
                ? isDark
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                : isDark
                  ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-black hover:from-pink-300 hover:via-purple-300 hover:to-cyan-300'
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:from-pink-400 hover:via-purple-400 hover:to-cyan-400'
            } ${getCreativeFontClass()}`}
            whileHover={{ 
              scale: 1.1,
              ...(theme === 'creative' && {
                rotate: [0, -10, 10, 0],
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
              })
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;