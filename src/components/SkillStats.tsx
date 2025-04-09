import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillStatsProps {
  skills: Record<string, string[]>;
  config?: any;
}

const SkillStats: React.FC<SkillStatsProps> = ({ skills, config }) => {
  // Convert skills object to array with levels
  const skillsArray: Skill[] = Object.entries(skills).flatMap(([category, items]) => {
    const level = category === 'Advanced' ? 90 : category === 'Intermediate' ? 70 : 50;
    return items.map(name => ({
      name,
      level,
      category
    }));
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillsArray.map((skill, index) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-text font-medium">{skill.name}</span>
            <span className="text-text-light text-sm">{skill.level}%</span>
          </div>
          <div className="relative h-2 bg-background-dark rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`absolute h-full rounded-full ${
                skill.category === 'Advanced'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : skill.category === 'Intermediate'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500'
                  : 'bg-gradient-to-r from-yellow-500 to-green-500'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <span className="text-xs text-text-light">{skill.category}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillStats;
