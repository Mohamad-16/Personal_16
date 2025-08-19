import React from 'react';
import { motion } from 'framer-motion';

const ExperienceIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20">
      {/* floating laptop */}
      <motion.div
        className="absolute left-6 bottom-4"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="140" height="90" viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="90" height="60" rx="6" fill="#1f2937" stroke="#6d28d9" />
          <rect x="18" y="18" width="74" height="44" rx="4" fill="#0ea5e9" opacity="0.25" />
          <rect x="0" y="70" width="120" height="10" rx="3" fill="#111827" stroke="#6d28d9" />
        </svg>
      </motion.div>

      {/* sliding code lines */}
      {[0,1,2,3,4].map((i) => (
        <motion.div
          key={i}
          className="absolute right-4 h-2 rounded-full bg-white/40"
          style={{ top: 16 + i * 12, width: 120 - i * 12 }}
          animate={{ opacity: [0.2, 0.8, 0.2], x: [0, -8, 0] }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export default ExperienceIllustration;


