import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  className?: string;
  isDarkMode: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className = '', isDarkMode }) => {
  const glowVariants = {
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
      initial="initial"
      animate="animate"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
        </linearGradient>
        <pattern id="stars" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.5" fill="white" opacity="0.5" />
          <circle cx="12" cy="8" r="0.3" fill="white" opacity="0.3" />
          <circle cx="20" cy="4" r="0.4" fill="white" opacity="0.4" />
          <circle cx="28" cy="12" r="0.3" fill="white" opacity="0.3" />
          <circle cx="8" cy="16" r="0.5" fill="white" opacity="0.5" />
          <circle cx="24" cy="20" r="0.4" fill="white" opacity="0.4" />
          <circle cx="16" cy="24" r="0.3" fill="white" opacity="0.3" />
          <circle cx="4" cy="28" r="0.4" fill="white" opacity="0.4" />
        </pattern>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <motion.g
        variants={glowVariants}
        filter="url(#glow)"
      >
        <rect width="32" height="32" rx="8" fill={isDarkMode ? '#1F2937' : '#e5e7eb'} />
        {isDarkMode && (
          <rect width="32" height="32" rx="8" fill="url(#stars)" opacity="0.8">
            <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite" />
          </rect>
        )}
        {!isDarkMode && (
          <rect width="32" height="32" rx="8" fill="url(#seaGradient)">
            <animate attributeName="y" values="0;2;0" dur="4s" repeatCount="indefinite" />
          </rect>
        )}
        <text
          x="16"
          y="24"
          fontFamily="Arial Black, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="url(#logoGradient)"
          textAnchor="middle"
          style={{ textTransform: 'uppercase' }}
        >
          M
        </text>
      </motion.g>
    </motion.svg>
  );
};
