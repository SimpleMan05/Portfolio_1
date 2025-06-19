import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LandingPageProps {
  onThemeSelect: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const LandingPage: React.FC<LandingPageProps> = ({ onThemeSelect }) => {
  const { setTheme, isDark, toggleDarkMode } = useTheme();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const createWaterRipple = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    const id = Date.now() + Math.random();
    const timestamp = Date.now();

    setRipples(prev => [...prev, { id, x, y, timestamp }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (isDragging) {
      createWaterRipple(e);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    createWaterRipple(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleThemeSelect = (selectedTheme: 'professional' | 'creative') => {
    setTheme(selectedTheme);
    setIsAnimating(true);
    setTimeout(() => {
      onThemeSelect();
    }, 1500);
  };

  return (
    <div 
      className={`min-h-screen relative overflow-hidden cursor-pointer transition-colors duration-500 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => {
        setIsDragging(true);
        createWaterRipple(e);
      }}
      onTouchMove={createWaterRipple}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Water Ripple Effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: [0, 3, 6, 8],
            opacity: [0.8, 0.6, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1]
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-cyan-400 opacity-60" 
               style={{
                 background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                 boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)'
               }} />
        </motion.div>
      ))}

      {/* Secondary ripple waves */}
      {ripples.map(ripple => (
        <motion.div
          key={`secondary-${ripple.id}`}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ 
            scale: [0, 2, 4, 5],
            opacity: [0.6, 0.4, 0.2, 0]
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          <div className="w-full h-full rounded-full border border-purple-400 opacity-40" 
               style={{
                 background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 60%)',
               }} />
        </motion.div>
      ))}

      {/* Dark/Light Toggle */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          toggleDarkMode();
        }}
        className={`fixed top-8 right-8 z-50 p-3 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      {/* Welcome Text */}
      <motion.div
        className="absolute top-16 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className={`text-4xl md:text-6xl font-bold text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Welcome, this is my portfolio
        </h1>
      </motion.div>

      {/* Split Layout Container */}
      <motion.div
        className="flex h-screen"
        animate={isAnimating ? { 
          scale: [1, 1.1, 0.8],
          opacity: [1, 0.8, 0]
        } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Professional Side */}
        <motion.div
          // className={`w-1/2 flex flex-col items-center justify-center relative ${
          //   isDark ? 'bg-gray-800' : 'bg-gray-100'
          // }`}
          className="w-1/2 flex flex-col items-center justify-center relative bg-cover bg-no-repeat bg-fixed bg-center "
          style={{
            backgroundImage: isDark
              ? `url('/src/assets/images/brain(1).jpg')`
              : `url('/src/assets/images/brain(3).webp')`,
          }}
          initial={{ filter: 'grayscale(100%)' }}
          animate={isAnimating ? {
            x: [0, -100, -window.innerWidth],
            rotateY: [0, -10, -45]
          } : { filter: 'grayscale(100%)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleThemeSelect('professional');
            }}
            className={`px-12 py-6 text-2xl font-serif border-2 transition-all duration-300 hover:scale-105 ${
              isDark 
                ? 'border-gray-300 text-gray-800 hover:bg-gray-300 hover:text-gray-800' 
                : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Professional
          </motion.button>
        </motion.div>

        {/* Creative Side */}
        <motion.div
          // className="w-1/2 flex flex-col items-center justify-center relative bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600"
          // style={{
          //   backgroundImage: "url('src/assets/images/professional-bg.jpg')" // <- Your image path here
          // }}
          className="w-1/2 flex flex-col items-center justify-center relative bg-cover bg-no-repeat bg-fixed bg-center"
          style={{
            backgroundImage: isDark
              ? `url('/src/assets/images/brain(1).jpg')`
              : `url('/src/assets/images/brain(3).webp')`,
          }}
          initial={{ filter: 'brightness(1)' }}
          animate={isAnimating ? {
            x: [0, 100, window.innerWidth],
            rotateY: [0, 10, 45]
          } : { filter: 'brightness(1)' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleThemeSelect('creative');
            }}
            className="px-12 py-6 text-2xl font-bold border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
            style={{ fontFamily: 'Kalam, cursive' }}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            Creative
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Central Brain Image */}
      {/* <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
      >
        <div className={`p-8 rounded-full backdrop-blur-sm ${
          isDark ? 'bg-white/10' : 'bg-black/10'
        }`}>
          <Brain 
            size={120} 
            className={`${isDark ? 'text-white' : 'text-gray-800'} filter drop-shadow-2xl`} 
          />
        </div>
      </motion.div> */}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mouse trail effect when dragging */}
      {isDragging && (
        <motion.div
          className="absolute pointer-events-none w-4 h-4 rounded-full bg-cyan-400 opacity-60"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Brain, Sun, Moon } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';

// interface LandingPageProps {
//   onThemeSelect: () => void;
// }

// const LandingPage: React.FC<LandingPageProps> = ({ onThemeSelect }) => {
//   const { setTheme, isDark, toggleDarkMode } = useTheme();
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleThemeSelect = (selectedTheme: 'professional' | 'creative') => {
//     setTheme(selectedTheme);
//     setIsAnimating(true);
//     setTimeout(() => {
//       onThemeSelect();
//     }, 1500);
//   };

//   return (
//     <div 
//       className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
//         isDark ? 'bg-gray-900' : 'bg-white'
//       }`}
//     >
//       {/* Dark/Light Toggle */}
//       <motion.button
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleDarkMode();
//         }}
//         className={`fixed top-8 right-8 z-50 p-3 rounded-full transition-colors duration-300 ${
//           isDark ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
//         }`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         {isDark ? <Sun size={24} /> : <Moon size={24} />}
//       </motion.button>

//       {/* Centered Welcome Text */}
//       <motion.div
//         className="absolute inset-0 z-30 flex justify-center items-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1, delay: 0.5 }}
//       >
//         <h1 className={`text-4xl md:text-6xl font-bold text-center px-4 ${
//           isDark ? 'text-white' : 'text-gray-800'
//         }`}>
//           Welcome, this is my portfolio
//         </h1>
//       </motion.div>

//       {/* Split Layout Container */}
//       <motion.div
//         className="flex h-screen"
//         animate={isAnimating ? { 
//           scale: [1, 1.1, 0.8],
//           opacity: [1, 0.8, 0]
//         } : {}}
//         transition={{ duration: 1.5, ease: "easeInOut" }}
//       >
//         {/* Professional Side */}
//         <motion.div
//           className={`w-1/2 flex flex-col items-center justify-center relative bg-gray-100 bg-cover bg-center`}
//           style={{
//             backgroundImage: "url('./professional-bg.jpg')" // <- Your image path here
//           }}
//           animate={isAnimating ? {
//             x: [0, -100, -window.innerWidth],
//             rotateY: [0, -10, -45]
//           } : {}}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         >
//           <motion.button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleThemeSelect('professional');
//             }}
//             className="px-12 py-6 text-2xl font-serif border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Professional
//           </motion.button>
//         </motion.div>

//         {/* Creative Side */}
//         <motion.div
//           className="w-1/2 flex flex-col items-center justify-center relative bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/creative-bg.jpg')" // <- Your image path here
//           }}
//           animate={isAnimating ? {
//             x: [0, 100, window.innerWidth],
//             rotateY: [0, 10, 45]
//           } : {}}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         >
//           <motion.button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleThemeSelect('creative');
//             }}
//             className="px-12 py-6 text-2xl font-bold border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
//             style={{ fontFamily: 'Kalam, cursive' }}
//             whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Creative
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* Central Brain Image */}
//       <motion.div
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ duration: 1.5, delay: 0.2, type: "spring", stiffness: 100 }}
//         whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
//       >
//         <div className={`p-8 rounded-full backdrop-blur-sm ${
//           isDark ? 'bg-white/10' : 'bg-black/10'
//         }`}>
//           <Brain 
//             size={120} 
//             className={`${isDark ? 'text-white' : 'text-gray-800'} filter drop-shadow-2xl`} 
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LandingPage;
