import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ExperienceIllustration from './ExperienceIllustration';

interface ExperienceGraphicProps {
  src?: string;
  className?: string;
}

const ExperienceGraphic: React.FC<ExperienceGraphicProps> = ({
  src = '/custom-experience.svg',
  className = 'w-full h-auto',
}) => {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [hasTried, setHasTried] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadSvg = async () => {
      try {
        const response = await fetch(src, { cache: 'no-store' });
        setHasTried(true);
        if (response.ok) {
          const text = await response.text();
          if (isMounted) setSvgMarkup(text);
        }
      } catch {
        setHasTried(true);
      }
    };
    loadSvg();
    return () => {
      isMounted = false;
    };
  }, [src]);

  if (!svgMarkup) {
    // Fallback to the existing illustration while SVG is missing/unavailable
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        <ExperienceIllustration />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
};

export default ExperienceGraphic;
