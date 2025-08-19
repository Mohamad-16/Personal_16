import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Mail, Download, Code, BookOpen, Briefcase, User, ChevronDown, Globe } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { ConfigPanel } from './components/ConfigPanel';
import { AnimatedCoder } from './components/AnimatedCoder';
import AnimatedLogo from './components/AnimatedLogo';
import { AnimatedBackground } from './components/AnimatedBackground';
import { DownloadModal } from './components/DownloadModal';
import Notification from './components/Notification';
import { PortfolioConfig, defaultConfig } from './types/config';
import { portfolioData } from './data/portfolioData';
import SkillStats from './components/SkillStats';
import SkillCarousel from './components/SkillCarousel';
import ExperienceGraphic from './components/ExperienceGraphic';

// Interfaces
// (Removed unused AccordionProps interface)

interface CardProps {
  children: React.ReactNode;
  className?: string;
  config: PortfolioConfig;
}

// (Removed unused Accordion component)

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

const CustomDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-36 py-2 px-3 rounded-md flex gap-1 items-center justify-between bg-transparent border border-gray-300 dark:border-gray-600 text-text focus:outline-none focus:border-primary cursor-pointer transition-colors hover:border-primary"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 text-text-light transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1f2937] rounded-md shadow-lg border border-border"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-text hover:bg-background-dark dark:hover:bg-background transition-colors ${
                value === option.value ? 'bg-background-dark dark:bg-background' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);
  const [showConfig, setShowConfig] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  useEffect(() => {
    document.documentElement.className = config.style.darkMode ? 'dark' : 'light';
  }, [config.style.darkMode]);

  const CV_FILENAME = 'Mohamad Ibrahim M.pdf';

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const handleDownloadConfirm = async () => {
    try {
      // Create a new response for each operation
      const response = await fetch(`/${encodeURIComponent(CV_FILENAME)}`);
      if (!response.ok) {
        throw new Error('CV file not found');
      }

      // Clone the response for download
      const downloadResponse = response.clone();
      
      // Get the content type
      const contentType = response.headers.get('content-type');
      console.log('File content type:', contentType);

      // Create blob from the cloned response
      const blob = await downloadResponse.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create an invisible link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = CV_FILENAME;
      
      // Append to body and click
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      setShowDownloadModal(false);
      setNotification({
        message: 'CV downloaded successfully!',
        type: 'success',
        isVisible: true,
      });
    } catch (error) {
      console.error('Download error:', error);
      setNotification({
        message: 'Error downloading CV. Please try again.',
        type: 'error',
        isVisible: true,
      });
    }
  };

  const handleDownloadCancel = () => {
    setShowDownloadModal(false);
    setNotification({
      message: 'Download cancelled',
      type: 'error',
      isVisible: true,
    });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className={`min-h-screen ${config.style.darkMode ? 'dark bg-gray-900/50 text-white' : 'bg-white/50 text-gray-900'}`}>
      <AnimatedBackground isDarkMode={config.style.darkMode} />
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <AnimatedLogo className="w-8 h-8" isDarkMode={config.style.darkMode} />
            <h1 className="text-xl font-bold">{portfolioData.personal.name}</h1>
          </div>
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
        <div className="container mx-auto max-w-6xl">
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
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Skills & Expertise</h2>
              </div>
              <CustomDropdown
                value={config.style.skillsView}
                onChange={(value) => setConfig(prev => ({
                  ...prev,
                  style: { ...prev.style, skillsView: value as 'card' | 'stats' }
                }))}
                options={[
                  { value: 'card', label: 'Card View' },
                  { value: 'stats', label: 'Stats View' }
                ]}
              />
            </div>
            {config.style.skillsView === 'stats' ? (
              <SkillStats skills={portfolioData.skills} config={config} />
            ) : (
              <SkillCarousel skills={portfolioData.skills} />
            )}
          </Card>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection config={config.animation} className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card config={config} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="mb-6">
              {/* <ExperienceGraphic /> */}
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
        <div className="container mx-auto max-w-6xl">
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
        <div className="container mx-auto max-w-6xl">
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
        <div className="container mx-auto max-w-6xl">
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
        <div className="container mx-auto max-w-6xl">
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

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={handleDownloadCancel}
        onConfirm={handleDownloadConfirm}
        pdfUrl="/Mohamad Ibrahim M.pdf"
      />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Portfolio;
