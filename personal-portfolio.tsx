import React, { useState } from 'react';
import { Moon, Sun, Mail, Download, ExternalLink, Code, BookOpen, Briefcase, User, ChevronDown } from 'lucide-react';
import { portfolioData } from './src/data/portfolioData';
import SkillCarousel from './src/components/SkillCarousel';
import ExperienceIllustration from './src/components/ExperienceIllustration';
const SkillCarouselAny: any = SkillCarousel;

// Custom Accordion Component
const Accordion = ({ title, children, defaultOpen = false }) => {
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
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const Portfolio = () => {
  const [theme, setTheme] = useState('light');
  const { personal, skills, experience, projects, education, languages } = portfolioData;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{personal.name}</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold">{personal.title}</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
              {personal.about}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <a href={`mailto:${personal.email}`} 
                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
              <a href={personal.resumeLink} 
                 className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 target="_blank"
                 rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Code className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Skills & Expertise</h2>
            </div>
            <div className="space-y-6">
              {/* @ts-ignore: relax prop typing for runtime */}
              <SkillCarouselAny skills={skills} />
            </div>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="mb-6">
              <ExperienceIllustration />
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{exp.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Code className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.period}</p>
                  <p className="mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{edu.institution}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{edu.period}</p>
                  <p className="mt-2">Score: {edu.score}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <ExternalLink className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Languages</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-medium">{lang.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{lang.level}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {personal.social?.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            ))}
            <a href={`mailto:${personal.email}`} className="p-2 hover:text-blue-600 dark:hover:text-blue-400">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 {personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
