import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  grade?: string;
}

const Education: React.FC = () => {
  const { theme, isDark } = useTheme();

  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      period: "2020 - 2022",
      description: "Specialized in Machine Learning and Human-Computer Interaction",
      grade: "GPA: 3.9/4.0"
    },
    {
      id: 2,
      degree: "Bachelor of Software Engineering",
      institution: "MIT",
      location: "Cambridge, MA",
      period: "2016 - 2020",
      description: "Focus on Full-stack Development and Database Systems",
      grade: "Magna Cum Laude"
    },
    {
      id: 3,
      degree: "High School Diploma",
      institution: "Lincoln High School",
      location: "Boston, MA",
      period: "2012 - 2016",
      description: "Valedictorian, Computer Science Club President",
      grade: "GPA: 4.0/4.0"
    }
  ];

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-50',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-700' : 'bg-white',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
        line: isDark ? 'border-blue-400' : 'border-blue-600',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-900',
        text: isDark ? 'text-cyan-400' : 'text-cyan-400',
        card: isDark ? 'bg-gray-900' : 'bg-black',
        accent: 'text-purple-400',
        line: 'border-gradient-to-b from-purple-400 to-cyan-400',
      };
    }
  };

  const styles = getStyles();

  return (
    <section id="education" className={`min-h-screen py-20 ${styles.bg}`}>
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
            Education
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
            theme === 'professional'
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-b from-purple-400 to-cyan-400'
          } rounded-full`} />

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100 
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: theme === 'creative' ? 'spring' : 'tween'
              }}
              viewport={{ once: true }}
            >
              {/* Timeline Dot */}
              <motion.div
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 ${
                  theme === 'professional'
                    ? isDark ? 'bg-blue-400 border-gray-800' : 'bg-blue-600 border-gray-50'
                    : 'bg-gradient-to-r from-purple-400 to-cyan-400 border-gray-900'
                } z-10`}
                whileHover={{ scale: 1.5 }}
                animate={theme === 'creative' ? {
                  boxShadow: [
                    '0 0 0 0 rgba(168, 85, 247, 0.7)',
                    '0 0 0 10px rgba(168, 85, 247, 0)',
                  ],
                } : {}}
                transition={theme === 'creative' ? {
                  duration: 2,
                  repeat: Infinity,
                } : {}}
              />

              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  className={`p-6 rounded-lg shadow-lg ${styles.card} border ${
                    theme === 'professional'
                      ? isDark ? 'border-gray-600' : 'border-gray-200'
                      : 'border-purple-500/30'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: theme === 'creative' 
                      ? '0 20px 40px rgba(168, 85, 247, 0.3)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center mb-3">
                    <Award className={`mr-2 ${styles.accent}`} size={20} />
                    <h3 className={`text-xl font-bold ${styles.text}`}>
                      {item.degree}
                    </h3>
                  </div>
                  
                  <h4 className={`text-lg font-semibold mb-2 ${styles.accent}`}>
                    {item.institution}
                  </h4>
                  
                  <div className={`flex items-center mb-2 text-sm ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-400' : 'text-gray-600'
                      : 'text-gray-400'
                  }`}>
                    <MapPin size={16} className="mr-2" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className={`flex items-center mb-3 text-sm ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-400' : 'text-gray-600'
                      : 'text-gray-400'
                  }`}>
                    <Calendar size={16} className="mr-2" />
                    <span>{item.period}</span>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-300' : 'text-gray-700'
                      : 'text-gray-300'
                  }`}>
                    {item.description}
                  </p>
                  
                  {item.grade && (
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'professional'
                        ? isDark ? 'bg-blue-400/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                        : 'bg-gradient-to-r from-purple-400/20 to-cyan-400/20 text-purple-400'
                    }`}>
                      {item.grade}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;