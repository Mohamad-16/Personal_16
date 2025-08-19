import React from 'react';
import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiVuedotjs,
  SiTypescript,
  SiFigma,
  SiDotnet,
  SiPostgresql,
} from 'react-icons/si';
import { Code } from 'lucide-react';

type IconRenderer = React.ComponentType<{ className?: string }>;

const iconMap: Record<string, IconRenderer> = {
  HTML: SiHtml5,
  CSS: SiCss3,
  'Tailwind CSS': SiTailwindcss,
  JavaScript: SiJavascript,
  React: SiReact,
  Angular: SiAngular,
  'Node.js': SiNodedotjs,
  'Node JS': SiNodedotjs,
  Vue: SiVuedotjs,
  'Vue.js': SiVuedotjs,
  'Vue JS': SiVuedotjs,
  TypeScript: SiTypescript,
  'Type Script': SiTypescript,
  Figma: SiFigma,
  '.NET': SiDotnet,
  dotNet: SiDotnet,
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
};

type LocalSkillCarouselProps = {
  skills: Record<string, string[]>;
  speedMs?: number; // full loop duration
};

const gradientClasses = [
  'from-fuchsia-500 via-purple-500 to-indigo-500',
  'from-blue-500 via-cyan-500 to-emerald-500',
  'from-amber-500 via-orange-500 to-rose-500',
  'from-teal-500 via-emerald-500 to-lime-500',
  'from-pink-500 via-rose-500 to-red-500',
];

const SkillTile: React.FC<{ name: string; index: number }> = ({ name, index }) => {
  const Icon = iconMap[name] || Code;
  const gradient = gradientClasses[index % gradientClasses.length];

  return (
    <div className="shrink-0">
      <div className={`p-[1px] rounded-xl bg-gradient-to-br ${gradient}`}>
        <div className="rounded-xl bg-white/10 dark:bg-black/40 backdrop-blur px-4 py-3 flex items-center gap-3 min-w-[150px]">
          <div className={`rounded-lg p-2 bg-gradient-to-br ${gradient} text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      </div>
    </div>
  );
};

const SkillCarousel = ({ skills, speedMs = 40000 }: LocalSkillCarouselProps) => {
  const flatSkills: string[] = Array.from(new Set(Object.values(skills).flat()));
  const items = [...flatSkills, ...flatSkills];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-4 w-max"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speedMs / 1000, ease: 'linear', repeat: Infinity }}
      >
        {items.map((skill, idx) => (
          <SkillTile key={`${skill}-${idx}`} name={skill} index={idx} />
        ))}
      </motion.div>
    </div>
  );
};

export default SkillCarousel;


