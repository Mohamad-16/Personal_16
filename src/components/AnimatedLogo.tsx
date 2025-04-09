import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  isDarkMode?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', isDarkMode = false }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className={`relative w-16 h-16 ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-1 rounded-lg bg-background"
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-2 rounded-lg bg-secondary"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-3 rounded-lg bg-background"
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
