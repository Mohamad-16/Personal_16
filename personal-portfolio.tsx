import React, { useState } from 'react';
import { Moon, Sun, Mail, Download, ExternalLink, Code, BookOpen, Briefcase, User, ChevronDown } from 'lucide-react';

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

// Custom Card ComponentApp
const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const Portfolio = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.className = newTheme;
  };

  const skills = {
    "Advanced": ["HTML", "CSS", "Tailwind CSS"],
    "Intermediate": ["JavaScript", "React", "Angular", "NodeJs", "MS Office", "Figma", "Adobe"],
    "Basic": ["dotNet, Vue"]
  };

  const experiences = [
    {
      company: 'Hakuna Matata Pvt',
      role: 'Full Stack Developer',
      period: '12/2021 - Present',
      description: 'Actively contributed to numerous projects focused on issue resolution and optimization, including code upgrades and enhancements.'
    },
    {
      company: 'Doodleblue',
      role: 'Internship',
      period: '07/2021 - 11/2021',
      description: 'Served as an intern in the role of a front-end developer. Undertook comprehensive training in HTML, CSS, and JavaScript.'
    }
  ];

  const projects = [
    {
      title: 'Bank of India',
      period: '01/2022 - 10/2022',
      description: 'Successfully contributed to the development and implementation of various loan pages. Enhancing the user experience and functionality of the Bank of India project.',
      technologies: ["Angular", "Javascript", "Adobe Xd."]
    },
    {
      title: 'Happisales',
      period: '02/2023 - 03/2024',
      description: 'Played a pivotal role in new implementations and issue resolution. Significantly improving the overall performance and functionality of the project. Working with Vue JS (Front-end) and NodeJs (back-end).',
      technologies:["Vue JS", "Node JS", "Angular Material", "Postgres"]
    },
    {
      title: 'Max Healthcare',
      period: '03/2024 - 05/2024',
      description: 'Developed a full-featured healthcare management system for Max Healthcare, managing patient records, prescriptions, and other medical details. Implemented key features such as user authentication, data visualization, and secure data handling.',
      technologies:["Angular", "Angular Material", "Tailwind CSS"]
    },
    {
      title: 'Tree Plantation',
      period: '05/2024 - 06/2024',
      description: 'Developed an admin application for managing tree plantation and sapling activities for Green Earth Initiatives. Features included tracking sapling orders, scheduling plantations, and managing volunteers. Ensured data security and compliance with environmental regulations.',
      technologies:["Angular TS", "Tailwind CSS"]
    },
    {
      title: 'TVSE Auction India',
      period: '07/2024 - 09/2024',
      description: 'Developed an admin and customer web application for managing the acution and bidding activities for products. Features included the dynamic components using angular and angular material; Tailwind CSS configuration used for styling.',
      technologies:["Angular TS","Angular Material", "Tailwind CSS"]
    },
    {
      title: 'Survey Application',
      period: '09/2024 - 10/2024',
      description: 'Developed an admin application for managing tree plantation and sapling activities for Green Earth Initiatives. Features included tracking sapling orders, scheduling plantations, and managing volunteers. Ensured data security and compliance with environmental regulations.',
      technologies:["dotNet","Postgres","React", "Tailwind CSS"]
    },
    {
      title: 'Red FM',
      period: '12/2024 - 01/2025',
      description: 'Developed and maintained a dynamic web application for RED FM using React.js and Tailwind CSS, ensuring a seamless user experience across devices.Designed responsive UI components for key modules, including live radio streaming, program schedules, and event highlights, adhering to modern Collaborated closely with backend teams to integrate APIs, ensuring optimal data flow and performance.Optimized application performance by implementing best practices in state management and reducing load times.Worked with cross-functional teams to deliver features on time while maintaining code quality and adhering to Agile methodologies.',
      technologies:["React", "Tailwind CSS"]
    },
    {
      title: 'Dedalus',
      period: '2/2024 - Present',
      description: 'Developed and maintained a dynamic web application for Dedalus using Angular / Material and Tailwind CSS, ensuring a seamless user experience across devices. Implementing the ngRx concept for maitaining the global state management.',
      technologies:["Angular TS","Angular Material", "Tailwind CSS"]
    },
    {
      title: "Insect Detection in crops using CNN",
      period: "04/2021 - 05/2021",
      description: "Developed an insect detection system using Convolutional Neural Networks. The system effectively identifies different elements of insect species at different growth times.",
      technologies: ["CNN", "VGG19", "Region Proposal Network"]
    },
    {
      title: "Informative Hook Site",
      period: "08/2019 - 09/2019",
      description: "Developed a comprehensive website containing major information with optimized file size and enhanced storage efficiency.",
      technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Engineering",
      institution: "Anna University - Paavai Engineering College",
      period: "2017 - 2021",
      score: "85%"
    }
  ];

  const languages = [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Intermediate" },
    { name: "Hindi", level: "Basic" }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Mohamad Ibrahim M</h1>
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
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold">Web Developer</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
              My career aspiration is to thrive in a professional environment within a dynamic and expanding organisation,
              where I can wholeheartedly contribute to both the technical growth of the company and my own professional development.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <a href="mailto:mohamadrahimsha.m99@gmail.com" 
                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
              <a href="#" 
                 className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Code className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Skills & Expertise</h2>
            </div>
            {Object.entries(skills).map(([level, skillList], index) => (
              <Accordion key={index} title={`${level} Skills`}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skillList.map((skill, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {skill}
                    </div>
                  ))}
                </div>
              </Accordion>
            ))}
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6 border-l-4 border-blue-600">
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{exp.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
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
        <div className="container mx-auto max-w-4xl">
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
        <div className="container mx-auto max-w-4xl">
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
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="tel:790435047" className="p-2 hover:text-blue-600 dark:hover:text-blue-400">
              <ExternalLink className="w-5 h-5" />
            </a>
            <a href="mailto:mohamadrahimsha.m99@gmail.com" className="p-2 hover:text-blue-600 dark:hover:text-blue-400">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Mohamad Ibrahim M. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
