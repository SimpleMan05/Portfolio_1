import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, Building } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
}

const Certificates: React.FC = () => {
  const { theme, isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      image: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Professional certification for designing distributed systems on AWS"
    },
    {
      id: 2,
      title: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "2022",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Advanced cloud architecture and deployment strategies"
    },
    {
      id: 3,
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Advanced React development patterns and best practices"
    },
    {
      id: 4,
      title: "Docker Certified Associate",
      issuer: "Docker Inc.",
      date: "2021",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Container orchestration and deployment expertise"
    }
  ];

  useEffect(() => {
    if (theme === 'creative') {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % certificates.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [theme, certificates.length]);

  const nextCertificate = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

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
    <section id="certificates" className={`min-h-screen py-20 ${styles.bg}`}>
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
            Certificates
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            theme === 'professional' 
              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
              : 'bg-gradient-to-r from-purple-400 to-cyan-400'
          }`} />
        </motion.div>

        {theme === 'professional' ? (
          // Professional: Static cards sliding from right
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className={`${styles.card} rounded-lg overflow-hidden shadow-lg border ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Award className={`mr-2 ${styles.accent}`} size={20} />
                    <h3 className={`text-xl font-bold ${styles.text}`}>
                      {cert.title}
                    </h3>
                  </div>
                  <div className="flex items-center mb-2">
                    <Building className={`mr-2 ${styles.accent}`} size={16} />
                    <span className={`text-sm ${styles.accent}`}>{cert.issuer}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Calendar className={`mr-2 ${styles.accent}`} size={16} />
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>{cert.date}</span>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Creative: 3D rotating carousel
          <div className="relative h-96 flex items-center justify-center perspective-1000">
            <div className="relative w-80 h-80">
              {certificates.map((cert, index) => {
                const offset = (index - currentIndex + certificates.length) % certificates.length;
                const isActive = offset === 0;
                
                return (
                  <motion.div
                    key={cert.id}
                    className={`absolute inset-0 ${styles.card} rounded-lg overflow-hidden shadow-2xl border border-purple-500/30`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      rotateY: offset * (360 / certificates.length),
                      z: isActive ? 50 : 0,
                      scale: isActive ? 1.1 : 0.9,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    whileHover={isActive ? { scale: 1.15, z: 100 } : {}}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"
                        animate={{
                          background: [
                            'linear-gradient(to top, rgba(147, 51, 234, 0.8), transparent)',
                            'linear-gradient(to top, rgba(6, 182, 212, 0.8), transparent)',
                            'linear-gradient(to top, rgba(147, 51, 234, 0.8), transparent)',
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Award className="mr-2 text-purple-400" size={20} />
                        <h3 className="text-xl font-bold text-cyan-400">
                          {cert.title}
                        </h3>
                      </div>
                      <div className="flex items-center mb-2">
                        <Building className="mr-2 text-purple-400" size={16} />
                        <span className="text-sm text-purple-400">{cert.issuer}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <Calendar className="mr-2 text-purple-400" size={16} />
                        <span className="text-sm text-gray-400">{cert.date}</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        {cert.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevCertificate}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={nextCertificate}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        )}

        {/* Dots Indicator for Creative Mode */}
        {theme === 'creative' && (
          <div className="flex justify-center mt-8 space-x-2">
            {certificates.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-purple-400 to-cyan-400'
                    : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={currentIndex === index ? {
                  boxShadow: [
                    '0 0 0 0 rgba(168, 85, 247, 0.7)',
                    '0 0 0 10px rgba(168, 85, 247, 0)',
                  ],
                } : {}}
                transition={currentIndex === index ? {
                  duration: 2,
                  repeat: Infinity,
                } : {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;