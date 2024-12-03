import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillStatsProps {
  skills: Record<string, string[]>;
  config: any;
}

export const SkillStats: React.FC<SkillStatsProps> = ({ skills, config }) => {
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
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${
                skill.category === 'Advanced'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : skill.category === 'Intermediate'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500'
                  : 'bg-gradient-to-r from-yellow-500 to-green-500'
              }`}
            />
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {skill.category}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
