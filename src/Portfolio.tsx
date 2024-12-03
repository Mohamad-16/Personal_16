import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Mail, Download, ExternalLink, Code, BookOpen, Briefcase, User, ChevronDown, Globe } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { ConfigPanel } from './components/ConfigPanel';
import { AnimatedCoder } from './components/AnimatedCoder';
import { SkillStats } from './components/SkillStats';
import { PortfolioConfig, defaultConfig } from './types/config';
import { portfolioData } from './data/portfolioData';

// Interfaces
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  config: PortfolioConfig;
}

// Custom Accordion Component
const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border rounded-lg mb-2">
      <button
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

// Custom Card Component
const Card: React.FC<CardProps> = ({ children, className = '', config }) => {
  const cardStyle = {
    borderRadius: `${config.style.borderRadius}px`,
    boxShadow: config.style.boxShadow ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' : 'none',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 ${className}`} style={cardStyle}>
      {children}
    </div>
  );
};

const Portfolio = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    document.documentElement.className = config.style.darkMode ? 'dark' : 'light';
  }, [config.style.darkMode]);

  return (
    <div className={`min-h-screen ${config.style.darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{portfolioData.personal.name}</h1>
          <button
            onClick={() => setConfig(prev => ({ ...prev, style: { ...prev.style, darkMode: !prev.style.darkMode } }))}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {config.style.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Animated Coder Symbol */}
      <AnimatedSection config={config.animation} className="pt-24">
        <AnimatedCoder isDarkMode={config.style.darkMode} />
      </AnimatedSection>

      {/* Hero Section */}
      <AnimatedSection config={config.animation} className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card config={config} className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <User className="w-8 h-8" />
                <h2 className="text-3xl font-bold">{portfolioData.personal.title}</h2>
              </div>
              <p className="text-center text-lg mb-8">
                {portfolioData.personal?.about}
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Me</span>
                </a>
                <a
                  href={portfolioData.personal?.resumeLink}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Skills & Expertise</h2>
              </div>
              <select
                value={config.style.skillsView}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  style: { ...prev.style, skillsView: e.target.value as 'card' | 'stats' }
                }))}
                className="px-3 py-1 rounded-md border dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="card">Card View</option>
                <option value="stats">Stats View</option>
              </select>
            </div>
            {config.style.skillsView === 'stats' ? (
              <SkillStats skills={portfolioData.skills} config={config} />
            ) : (
              <div className="space-y-6">
                {Object.entries(portfolioData.skills).map(([level, skillList], sectionIndex) => (
                  <motion.div
                    key={level}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: sectionIndex * 0.2 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-semibold">{level} Skills</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {skillList.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: (sectionIndex * skillList.length + idx) * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-4 rounded-lg text-center transition-all cursor-pointer ${
                            level === 'Advanced'
                              ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20'
                              : level === 'Intermediate'
                              ? 'bg-gradient-to-br from-green-500/10 to-blue-500/10 hover:from-green-500/20 hover:to-blue-500/20'
                              : 'bg-gradient-to-br from-yellow-500/10 to-green-500/10 hover:from-yellow-500/20 hover:to-green-500/20'
                          }`}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-2 border-blue-500 pl-4 hover:pl-6 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company} | {exp.period}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{exp.description}</p>
                  {exp.technologies && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 + idx * 0.1 }}
                          className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
              <Code className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{project.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="px-2 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="border-l-2 border-green-500 pl-4 hover:pl-6 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution} | {edu.period}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">Score: {edu.score}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>

      {/* Languages Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Languages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                >
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{lang.level}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>

      {/* Footer Section */}
      <AnimatedSection config={config.animation} className="py-8 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              {portfolioData.personal.social?.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Config Panel */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <Code className="w-5 h-5" />
        </button>
      </div>
      
      <ConfigPanel
        config={config}
        setConfig={setConfig}
        showConfig={showConfig}
        setShowConfig={setShowConfig}
      />
    </div>
  );
};

export default Portfolio;
