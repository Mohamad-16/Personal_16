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

      {/* Theme-aware animated code text overlay */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {[
          'function animationLoop() { requestAnimationFrame(animationLoop); }',
          'const sum = (a, b) => a + b; // TODO: memoize',
          'for (let i = 0; i < items.length; i++) { render(items[i]); }',
          'useEffect(() => { return () => cleanup(); }, [])',
          'export const fetchData = async (url) => (await fetch(url)).json()',
          'if (state === "loading") setStatus("ready")',
          'try { doThing(); } catch (e) { console.error(e) }',
          'Array.from(new Set(values)).sort()',
          'const theme = isDark ? "dark" : "light"',
          'return <motion.div animate={{ opacity: 1 }} />',
        ].map((code, idx) => {
          const left = Math.random() * 70 + 10; // keep inside content band
          const top = Math.random() * 80 + 5;
          const rotate = Math.random() * 8 - 4;
          const duration = 6 + Math.random() * 6;
          const color = isDarkMode
            ? ['#93c5fd', '#a78bfa', '#34d399', '#fbbf24', '#fda4af'][idx % 5]
            : ['#1f2937', '#334155', '#0f766e', '#7c3aed', '#b45309'][idx % 5];
          const opacity = isDarkMode ? 0.25 : 0.18;
          return (
            <motion.div
              key={idx}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                color,
                transform: `rotate(${rotate}deg)`,
                whiteSpace: 'nowrap',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: '12px',
                opacity,
                textShadow: isDarkMode ? '0 0 12px rgba(99, 102, 241, 0.15)' : '0 0 8px rgba(99, 102, 241, 0.06)'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity, y: [0, -6, 0] }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
            >
              {code}
            </motion.div>
          );
        })}
      </div>

      {/* Code-editor style side gutters that fade toward the content area */}
      <div className="pointer-events-none absolute inset-y-0 left-0">
        <div
          className="h-full"
          style={{
            width: 'calc((100vw - min(72rem, 100vw)) / 2)',
            backgroundImage: `linear-gradient(to right, ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: isDarkMode ? 0.35 : 0.25,
            maskImage: 'linear-gradient(to right, black 65%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, black 65%, transparent)'
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0">
        <div
          className="h-full"
          style={{
            width: 'calc((100vw - min(72rem, 100vw)) / 2)',
            backgroundImage: `linear-gradient(to right, ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: isDarkMode ? 0.35 : 0.25,
            maskImage: 'linear-gradient(to left, black 65%, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black 65%, transparent)'
          }}
        />
      </div>
    </div>
  );
};
