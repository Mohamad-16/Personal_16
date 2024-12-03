export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

export interface Project {
  title: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    email: string;
    location: string;
    about: string;
    social?: Array<{
      name: string;
      url: string;
    }>;
    resumeLink: string;
  };
  skills: Record<string, string[]>;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  languages: Language[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Mohamad Ibrahim M",
    title: "Web Developer",
    email: "mohamadrahimsha.m99@gmail.com",
    location: "",
    about: "My career aspiration is to thrive in a professional environment within a dynamic and expanding organisation, where I can wholeheartedly contribute to both the technical growth of the company and my own professional development.",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/mohamadrahimsha"
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mohamadrahimsha"
      }
    ],
    resumeLink:""
  },
  skills: {
    "Advanced": ["HTML", "CSS", "Tailwind CSS"],
    "Intermediate": ["JavaScript", "React", "Angular", "NodeJs", "MS Office", "Figma", "Adobe"],
    "Basic": ["dotNet"]
  },
  experience: [
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
  ],
  projects: [
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
      title: 'Survey Application',
      period: '07/2024 - Present',
      description: 'Developed an admin application for managing tree plantation and sapling activities for Green Earth Initiatives. Features included tracking sapling orders, scheduling plantations, and managing volunteers. Ensured data security and compliance with environmental regulations.',
      technologies:["dotNet","Postgres","React", "Tailwind CSS"]
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
  ],
  education: [
    {
      degree: "Bachelor of Engineering",
      institution: "Anna University - Paavai Engineering College",
      period: "2017 - 2021",
      score: "85%"
    },
    {
      degree: "HSC",
      institution: "State Board",
      period: "2016 - 2017",
      score: "60%"
    },
    {
      degree: "SSLC",
      institution: "State Board",
      period: "2014 - 2015",
      score: "87.46%"
    }
  ],
  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Intermediate" },
    { name: "Hindi", level: "Basic" }
  ]
};
