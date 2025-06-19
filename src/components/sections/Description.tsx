import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Description: React.FC = () => {
  const { theme, isDark } = useTheme();

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-white',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-800' : 'bg-gray-50',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-900' : 'bg-black',
        text: isDark ? 'text-cyan-300' : 'text-cyan-300',
        card: isDark ? 'bg-gray-800' : 'bg-gray-900',
      };
    }
  };

  const styles = getStyles();

  const getCreativeFontClass = () => {
    return theme === 'creative' ? 'font-kalam' : '';
  };

  return (
    <section id="description" className={`min-h-screen py-20 ${styles.bg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`w-80 h-80 rounded-full overflow-hidden ${
              theme === 'creative' 
                ? 'ring-4 ring-gradient-to-r from-pink-400 via-purple-400 to-cyan-400' 
                : 'ring-4 ring-gray-300'
            }`}>
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {theme === 'creative' && (
              <>
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -inset-6 rounded-full border-2 border-pink-400 opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.h1
              className={`text-5xl lg:text-7xl font-bold mb-6 ${styles.text} ${
                theme === 'professional' ? 'font-serif' : 'font-kalam'
              }`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {theme === 'creative' ? (
                <motion.span
                  className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                    textShadow: theme === 'creative' ? '0 0 30px rgba(236, 72, 153, 0.5)' : 'none',
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  John Doe
                </motion.span>
              ) : (
                'John Doe'
              )}
            </motion.h1>

            <motion.h2
              className={`text-2xl lg:text-3xl mb-8 ${
                theme === 'professional' 
                  ? isDark ? 'text-gray-400' : 'text-gray-600'
                  : 'text-pink-400'
              } ${getCreativeFontClass()}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              animate={theme === 'creative' ? {
                textShadow: [
                  '0 0 10px rgba(236, 72, 153, 0.5)',
                  '0 0 20px rgba(168, 85, 247, 0.5)',
                  '0 0 10px rgba(6, 182, 212, 0.5)',
                  '0 0 20px rgba(236, 72, 153, 0.5)',
                ],
              } : {}}
              transition={theme === 'creative' ? {
                duration: 4,
                repeat: Infinity,
              } : {}}
            >
              Full Stack Developer & Digital Creative
            </motion.h2>

            <motion.p
              className={`text-lg lg:text-xl leading-relaxed ${
                theme === 'professional'
                  ? isDark ? 'text-gray-300' : 'text-gray-700'
                  : isDark ? 'text-gray-300' : 'text-gray-300'
              } ${getCreativeFontClass()}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Passionate about creating digital experiences that blend functionality with aesthetics. 
              I love turning complex problems into simple, beautiful solutions that make a difference.
            </motion.p>

            {theme === 'creative' && (
              <motion.div
                className="mt-8 flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 mx-1 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                      boxShadow: [
                        '0 0 5px rgba(236, 72, 153, 0.5)',
                        '0 0 15px rgba(168, 85, 247, 0.8)',
                        '0 0 5px rgba(6, 182, 212, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Description;