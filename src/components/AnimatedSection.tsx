import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AnimationConfig } from '../types/config';

interface AnimatedSectionProps {
  children: React.ReactNode;
  config: AnimationConfig;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, config, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {},
      visible: {
        transition: {
          duration: config.duration,
          delay: config.delay,
        },
      },
    };

    switch (config.type) {
      case 'jump':
        return {
          hidden: {
            opacity: 0,
            y: 50,
            ...(config.direction === 'ltr' && { x: -50 }),
            ...(config.direction === 'rtl' && { x: 50 }),
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            ...baseVariants.visible,
          },
        };
      case 'fade':
        return {
          hidden: {
            opacity: 0,
            ...(config.direction === 'ltr' && { x: -50 }),
            ...(config.direction === 'rtl' && { x: 50 }),
          },
          visible: {
            opacity: 1,
            x: 0,
            ...baseVariants.visible,
          },
        };
      default:
        return baseVariants;
    }
  };

  if (config.type === 'none') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getAnimationVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};
