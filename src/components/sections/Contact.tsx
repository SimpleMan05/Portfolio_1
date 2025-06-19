import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Contact: React.FC = () => {
  const { theme, isDark } = useTheme();

  const contactMethods = [
    {
      id: 1,
      icon: Mail,
      label: 'Email',
      value: 'john.doe@email.com',
      href: 'mailto:john.doe@email.com',
      color: theme === 'professional' ? '#3B82F6' : '#8B5CF6'
    },
    {
      id: 2,
      icon: Github,
      label: 'GitHub',
      value: '@johndoe',
      href: 'https://github.com/johndoe',
      color: theme === 'professional' ? '#374151' : '#06D6A0'
    },
    {
      id: 3,
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'John Doe',
      href: 'https://linkedin.com/in/johndoe',
      color: theme === 'professional' ? '#0077B5' : '#F72585'
    },
    {
      id: 4,
      icon: Twitter,
      label: 'Twitter',
      value: '@johndoe',
      href: 'https://twitter.com/johndoe',
      color: theme === 'professional' ? '#1DA1F2' : '#4CC9F0'
    },
    {
      id: 5,
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: theme === 'professional' ? '#10B981' : '#7209B7'
    },
    {
      id: 6,
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San+Francisco,CA',
      color: theme === 'professional' ? '#EF4444' : '#F77F00'
    }
  ];

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
    <section id="contact" className={`min-h-screen py-20 ${styles.bg} relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Let's Connect
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
          <p className={`mt-6 text-lg ${
            theme === 'professional'
              ? isDark ? 'text-gray-300' : 'text-gray-600'
              : 'text-gray-300'
          }`}>
            Ready to start your next project? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            
            return (
              <motion.a
                key={method.id}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : '_self'}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`group relative ${styles.card} rounded-lg p-6 shadow-lg border ${
                  theme === 'professional'
                    ? isDark ? 'border-gray-700' : 'border-gray-200'
                    : 'border-purple-500/30'
                } transition-all duration-300 hover:scale-105 block`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={theme === 'creative' ? {
                  boxShadow: `0 20px 40px ${method.color}30`,
                  borderColor: method.color,
                } : {
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Icon */}
                <motion.div
                  className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto ${
                    theme === 'professional'
                      ? isDark ? 'bg-gray-700' : 'bg-white'
                      : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20'
                  } group-hover:scale-110 transition-transform duration-300`}
                  style={{ 
                    backgroundColor: theme === 'creative' ? `${method.color}20` : undefined,
                    border: theme === 'creative' ? `2px solid ${method.color}` : undefined
                  }}
                  whileHover={theme === 'creative' ? {
                    rotate: [0, -10, 10, 0],
                    scale: 1.2,
                  } : { scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon 
                    size={32} 
                    style={{ color: method.color }}
                    className={theme === 'creative' ? 'drop-shadow-glow' : ''}
                  />
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-lg font-bold mb-2 ${styles.text} group-hover:${styles.accent} transition-colors`}>
                    {method.label}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-400' : 'text-gray-600'
                      : 'text-gray-400'
                  } group-hover:text-opacity-80 transition-colors`}>
                    {method.value}
                  </p>
                </div>

                {/* Creative Mode: Animated Border */}
                {theme === 'creative' && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${method.color}20, transparent)`,
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                {/* Hover Sound Effect for Creative Mode */}
                {theme === 'creative' && (
                  <motion.div
                    className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${method.color}30, transparent)`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className={`px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 ${
              theme === 'professional'
                ? isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white'
            }`}
            whileHover={{ 
              scale: 1.05,
              boxShadow: theme === 'creative' 
                ? '0 0 30px rgba(168, 85, 247, 0.5)' 
                : '0 10px 30px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = 'mailto:john.doe@email.com'}
          >
            Start a Conversation
          </motion.button>
        </motion.div>
      </div>

      {/* Background Decoration for Creative Mode */}
      {theme === 'creative' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Contact;