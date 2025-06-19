import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const { theme, isDark } = useTheme();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp Inc.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "Working with John was an absolute pleasure. His attention to detail and innovative solutions exceeded our expectations. The project was delivered on time and within budget.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "John's technical expertise and problem-solving skills are exceptional. He transformed our complex requirements into an elegant, scalable solution.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Director",
      company: "Creative Studio",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "The collaboration was seamless. John perfectly balanced functionality with beautiful design, creating something that both users and stakeholders love.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Founder",
      company: "InnovateNow",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      content: "Outstanding work! John's ability to understand business needs and translate them into technical solutions is remarkable. Highly recommended!",
      rating: 5
    }
  ];

  const getStyles = () => {
    if (theme === 'professional') {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-50',
        text: isDark ? 'text-white' : 'text-gray-800',
        card: isDark ? 'bg-gray-700' : 'bg-white',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
      };
    } else {
      return {
        bg: isDark ? 'bg-gray-800' : 'bg-gray-900',
        text: isDark ? 'text-cyan-400' : 'text-cyan-400',
        card: isDark ? 'bg-gray-900' : 'bg-black',
        accent: 'text-purple-400',
      };
    }
  };

  const styles = getStyles();

  return (
    <section id="testimonials" className={`min-h-screen py-20 ${styles.bg}`}>
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
            What People Say
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`relative ${styles.card} rounded-lg p-8 shadow-lg border ${
                theme === 'professional'
                  ? isDark ? 'border-gray-600' : 'border-gray-200'
                  : 'border-purple-500/30'
              }`}
              initial={{ 
                opacity: 0, 
                y: theme === 'creative' ? 100 : 50,
                scale: theme === 'creative' ? 0.8 : 1
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              transition={{ 
                duration: theme === 'creative' ? 1 : 0.6, 
                delay: index * 0.2,
                type: theme === 'creative' ? 'spring' : 'tween',
                stiffness: theme === 'creative' ? 100 : undefined,
                damping: theme === 'creative' ? 15 : undefined
              }}
              viewport={{ once: true }}
              whileHover={theme === 'creative' ? {
                scale: 1.05,
                y: -10,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                transition: { type: 'spring', stiffness: 300 }
              } : {
                scale: 1.02,
                y: -5,
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              {/* Quote Icon */}
              <div className={`absolute top-4 left-4 opacity-20`}>
                <Quote size={40} className={styles.accent} />
              </div>

              {/* Rating Stars */}
              <div className="flex justify-end mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star 
                      size={20} 
                      className={`${
                        theme === 'professional'
                          ? 'text-yellow-400'
                          : 'text-yellow-400'
                      } fill-current`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <blockquote className={`text-lg mb-6 ${
                theme === 'professional'
                  ? isDark ? 'text-gray-300' : 'text-gray-700'
                  : 'text-gray-300'
              } ${theme === 'professional' ? 'font-serif italic' : ''}`}>
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <motion.div
                  className="relative mr-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {theme === 'creative' && (
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-50"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.div>
                <div>
                  <h4 className={`font-bold ${styles.text}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm ${styles.accent}`}>
                    {testimonial.role}
                  </p>
                  <p className={`text-sm ${
                    theme === 'professional'
                      ? isDark ? 'text-gray-400' : 'text-gray-600'
                      : 'text-gray-400'
                  }`}>
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Creative Mode: Animated Border */}
              {theme === 'creative' && (
                <motion.div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.1), transparent, rgba(6, 182, 212, 0.1), transparent)',
                    backgroundSize: '400% 400%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements for Creative Mode */}
        {theme === 'creative' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;