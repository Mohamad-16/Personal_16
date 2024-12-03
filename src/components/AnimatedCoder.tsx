import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCoderProps {
  isDarkMode: boolean;
}

export const AnimatedCoder: React.FC<AnimatedCoderProps> = ({ isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientLight = 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500';
  const gradientDark = 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400';
  const gradient = isDarkMode ? gradientDark : gradientLight;

  const symbolVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotateY: [0, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    blink: {
      opacity: [1, 0, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.4,
      },
    }),
  };

  return (
    <div 
      className="relative flex items-center justify-center py-4 w-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <div className="flex items-center space-x-4">
          <motion.div
            variants={symbolVariants}
            animate="animate"
            className={`text-4xl font-bold ${gradient} bg-clip-text text-transparent transform-gpu perspective-1000`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            &lt;
          </motion.div>
          <motion.div
            variants={symbolVariants}
            animate="animate"
            className={`text-4xl font-bold ${gradient} bg-clip-text text-transparent transform-gpu perspective-1000`}
            style={{ 
              transformStyle: 'preserve-3d',
              animationDelay: '0.5s'
            }}
          >
            ∞
          </motion.div>
          <motion.div
            variants={symbolVariants}
            animate="animate"
            className={`text-4xl font-bold ${gradient} bg-clip-text text-transparent transform-gpu perspective-1000`}
            style={{ 
              transformStyle: 'preserve-3d',
              animationDelay: '1s'
            }}
          >
            &gt;
          </motion.div>
        </div>
      ) : (
        <div className={`text-4xl font-bold ${gradient} cursor-pointer bg-clip-text text-transparent flex`}>
          {"Welcome".split('').map((letter, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};
