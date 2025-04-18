import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  isDarkMode: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {isDarkMode ? (
        // Space background with stars
        <div className="absolute inset-0 bg-gray-900">
          {/* Generate multiple stars with random positions */}
          {[...Array(100)].map((_, i) => {
            const size = Math.random() * 2 + 1;
            const animationDuration = Math.random() * 3 + 2;
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      ) : (
        // Sea wave background
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Multiple wave layers with different animations */}
            {[1, 2, 3].map((layer, index) => (
              <motion.path
                key={layer}
                d="M0,160 C320,300,420,240,740,160 C1060,80,1380,140,1440,160V800H0V160Z"
                fill="url(#seaGradient)"
                initial={{ y: 0 }}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 5 + index * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
                style={{
                  opacity: 0.1 - index * 0.02,
                }}
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
};
