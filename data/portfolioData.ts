/* ============================
   Portfolio Data & Types
   ============================ */

/* ---- Type Definitions ---- */

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  status: string;
  statusType: 'available' | 'busy' | 'learning';
  level: number;
  xp: number;
  maxXp: number;
  currentMission: string;
  currentlyLearning: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface AboutData {
  bio: string[];
  personalityTags: string[];
  currentMission: string;
  sideQuests: string[];
  funFacts: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tools: string[];
  type: 'work' | 'internship' | 'organization' | 'freelance';
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'qa' | 'tools' | 'soft';
  level: number;
  maxLevel: number;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Project {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'qa' | 'mobile' | 'other';
  description: string;
  techStack: string[];
  status: 'completed' | 'in-progress' | 'archived';
  difficulty: number; // 1-5
  links: {
    github?: string;
    live?: string;
    caseStudy?: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  author: string;
}

/* ---- Placeholder Data ---- */

export const siteMetadata: SiteMetadata = {
  title: "devyrelliani.exe — Portfolio",
  description: "Software Engineer & QA Specialist portfolio — retro-inspired, gamified, and built with Next.js.",
  url: "https://devyrelliani.vercel.app",
  author: "Devy Relliani",
};

export const personalInfo: PersonalInfo = {
  name: "Devy Relliani",
  role: "Software Engineer & QA Specialist",
  tagline: "Crafting quality software, one quest at a time.",
  status: "Available for projects",
  statusType: 'available',
  level: 23,
  xp: 7200,
  maxXp: 10000,
  currentMission: "Building scalable web applications with modern frameworks",
  currentlyLearning: "Cloud Architecture & DevOps pipelines",
};

export const stats: Stat[] = [
  { label: "Years Active", value: "3+", icon: "⏳" },
  { label: "Projects Shipped", value: "15", icon: "📦" },
  { label: "Tech Stack", value: "20+", icon: "🛠️" },
  { label: "Certifications", value: "5", icon: "📜" },
];

export const aboutData: AboutData = {
  bio: [
    "Hello, world! I'm a passionate software engineer and QA specialist based in Jakarta, Indonesia. I love building clean, reliable, and user-friendly digital experiences.",
    "My journey in tech started with tinkering on HTML pages as a teenager, and it evolved into a full-blown obsession with writing quality code and breaking things (professionally, of course).",
    "When I'm not squashing bugs or shipping features, you can find me exploring pixel art, sipping matcha lattes, or leveling up my skills through online courses and side projects.",
  ],
  personalityTags: [
    "☕ Coffee-powered",
    "🧪 Quality Advocate",
    "🎮 Casual Gamer",
    "📚 Lifelong Learner",
    "🌸 Aesthetic Enthusiast",
    "🐱 Cat Person",
    "🧩 Problem Solver",
    "🎨 Detail-Oriented",
  ],
  currentMission: "Master cloud-native development and contribute to open-source testing tools.",
  sideQuests: [
    "☐ Build a personal CLI tool",
    "☑ Complete AWS Cloud Practitioner cert",
    "☐ Contribute to an open-source project",
    "☐ Learn Rust fundamentals",
    "☑ Redesign portfolio website (this one!)",
  ],
  funFacts: [
    "I've written more test cases than lines of production code",
    "My first 'website' was a Neopets fan page",
    "I can type at 95 WPM on a mechanical keyboard",
    "I name all my projects after space missions",
    "I once debugged a production issue at 3 AM in pajamas",
  ],
};

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Software Engineer",
    company: "NovaTech Solutions",
    period: "Jan 2024 — Present",
    description: "Full-stack development for enterprise SaaS products, focusing on performance optimization and CI/CD pipeline improvements.",
    achievements: [
      "Reduced page load time by 40% through code splitting and lazy loading",
      "Implemented automated E2E testing pipeline, catching 30% more bugs pre-release",
      "Led migration from legacy REST APIs to GraphQL, improving data fetch efficiency",
    ],
    tools: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Jest"],
    type: "work",
  },
  {
    id: "exp-2",
    role: "QA Engineer Intern",
    company: "PixelForge Studio",
    period: "Jun 2023 — Dec 2023",
    description: "Quality assurance and test automation for a mobile gaming platform with 500K+ monthly active users.",
    achievements: [
      "Designed and executed 200+ test cases across 3 product releases",
      "Built Selenium-based regression test suite, reducing manual QA time by 60%",
      "Identified critical payment flow bug that prevented $50K in potential revenue loss",
    ],
    tools: ["Selenium", "Cypress", "Jira", "Python", "Postman", "TestRail"],
    type: "internship",
  },
  {
    id: "exp-3",
    role: "Frontend Developer",
    company: "Freelance / Contract",
    period: "Mar 2022 — May 2023",
    description: "Designed and developed responsive websites and web applications for small businesses and startups.",
    achievements: [
      "Delivered 8 client projects on time with 100% satisfaction rate",
      "Built reusable component library used across multiple client projects",
      "Achieved 95+ Lighthouse performance scores on all delivered sites",
    ],
    tools: ["Next.js", "Vue.js", "Figma", "SCSS", "Firebase", "Vercel"],
    type: "freelance",
  },
  {
    id: "exp-4",
    role: "Tech Lead",
    company: "University Dev Club",
    period: "Aug 2021 — Feb 2022",
    description: "Led a team of 12 student developers to build internal university tools and organize tech workshops.",
    achievements: [
      "Organized 6 workshops on web development fundamentals (100+ attendees)",
      "Shipped university event management platform used by 2000+ students",
      "Mentored 5 junior members who went on to land tech internships",
    ],
    tools: ["React", "Express", "MongoDB", "Git", "Notion", "Discord"],
    type: "organization",
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: 9, maxLevel: 10, icon: "⚛️", rarity: "epic" },
  { name: "Next.js", category: "frontend", level: 8, maxLevel: 10, icon: "▲", rarity: "epic" },
  { name: "TypeScript", category: "frontend", level: 8, maxLevel: 10, icon: "📘", rarity: "rare" },
  { name: "HTML/CSS", category: "frontend", level: 9, maxLevel: 10, icon: "🎨", rarity: "rare" },
  { name: "Vue.js", category: "frontend", level: 6, maxLevel: 10, icon: "💚", rarity: "uncommon" },
  { name: "Tailwind CSS", category: "frontend", level: 7, maxLevel: 10, icon: "🌊", rarity: "uncommon" },

  // Backend
  { name: "Node.js", category: "backend", level: 7, maxLevel: 10, icon: "🟢", rarity: "rare" },
  { name: "Express", category: "backend", level: 7, maxLevel: 10, icon: "🚂", rarity: "uncommon" },
  { name: "PostgreSQL", category: "backend", level: 6, maxLevel: 10, icon: "🐘", rarity: "uncommon" },
  { name: "MongoDB", category: "backend", level: 6, maxLevel: 10, icon: "🍃", rarity: "uncommon" },
  { name: "Python", category: "backend", level: 5, maxLevel: 10, icon: "🐍", rarity: "common" },
  { name: "REST APIs", category: "backend", level: 8, maxLevel: 10, icon: "🔗", rarity: "rare" },

  // QA / Testing
  { name: "Cypress", category: "qa", level: 8, maxLevel: 10, icon: "🧪", rarity: "epic" },
  { name: "Jest", category: "qa", level: 8, maxLevel: 10, icon: "🃏", rarity: "rare" },
  { name: "Selenium", category: "qa", level: 7, maxLevel: 10, icon: "🌐", rarity: "rare" },
  { name: "Postman", category: "qa", level: 7, maxLevel: 10, icon: "📬", rarity: "uncommon" },
  { name: "Test Planning", category: "qa", level: 8, maxLevel: 10, icon: "📋", rarity: "rare" },
  { name: "Bug Tracking", category: "qa", level: 9, maxLevel: 10, icon: "🐛", rarity: "epic" },

  // Tools
  { name: "Git", category: "tools", level: 9, maxLevel: 10, icon: "📂", rarity: "rare" },
  { name: "Docker", category: "tools", level: 5, maxLevel: 10, icon: "🐳", rarity: "uncommon" },
  { name: "VS Code", category: "tools", level: 9, maxLevel: 10, icon: "💻", rarity: "common" },
  { name: "Figma", category: "tools", level: 6, maxLevel: 10, icon: "🎯", rarity: "uncommon" },
  { name: "Jira", category: "tools", level: 7, maxLevel: 10, icon: "📊", rarity: "uncommon" },
  { name: "Vercel", category: "tools", level: 7, maxLevel: 10, icon: "▲", rarity: "uncommon" },

  // Soft Skills
  { name: "Communication", category: "soft", level: 8, maxLevel: 10, icon: "💬", rarity: "rare" },
  { name: "Teamwork", category: "soft", level: 9, maxLevel: 10, icon: "🤝", rarity: "epic" },
  { name: "Problem Solving", category: "soft", level: 8, maxLevel: 10, icon: "🧩", rarity: "rare" },
  { name: "Time Management", category: "soft", level: 7, maxLevel: 10, icon: "⏰", rarity: "uncommon" },
  { name: "Adaptability", category: "soft", level: 8, maxLevel: 10, icon: "🔄", rarity: "rare" },
  { name: "Leadership", category: "soft", level: 7, maxLevel: 10, icon: "👑", rarity: "rare" },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Project Aurora",
    category: "fullstack",
    description: "A full-stack task management platform with real-time collaboration, built for remote teams. Features Kanban boards, time tracking, and team analytics.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Docker"],
    status: "completed",
    difficulty: 4,
    links: {
      github: "https://github.com/username/aurora",
      live: "https://aurora-app.vercel.app",
    },
  },
  {
    id: "proj-2",
    title: "BugHunter CLI",
    category: "qa",
    description: "A command-line tool for automated API testing and bug reporting. Generates structured test reports and integrates with Jira for ticket creation.",
    techStack: ["Node.js", "TypeScript", "Commander.js", "Axios", "Jest"],
    status: "completed",
    difficulty: 3,
    links: {
      github: "https://github.com/username/bughunter",
    },
  },
  {
    id: "proj-3",
    title: "PixelFolio",
    category: "frontend",
    description: "This very portfolio website! A gamified, retro-inspired personal portfolio built with Next.js and CSS Modules. No UI libraries used.",
    techStack: ["Next.js", "React", "TypeScript", "CSS Modules"],
    status: "completed",
    difficulty: 3,
    links: {
      github: "https://github.com/username/pixelfolio",
      live: "https://devyrelliani.vercel.app",
    },
  },
  {
    id: "proj-4",
    title: "ShopStream",
    category: "fullstack",
    description: "An e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built for a local retail client.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    status: "completed",
    difficulty: 5,
    links: {
      github: "https://github.com/username/shopstream",
      live: "https://shopstream-demo.vercel.app",
      caseStudy: "#",
    },
  },
  {
    id: "proj-5",
    title: "TestForge",
    category: "qa",
    description: "An automated testing framework that generates test cases from API specifications. Supports OpenAPI/Swagger and outputs Cypress/Jest test files.",
    techStack: ["Python", "FastAPI", "Jinja2", "Docker"],
    status: "in-progress",
    difficulty: 4,
    links: {
      github: "https://github.com/username/testforge",
    },
  },
  {
    id: "proj-6",
    title: "WeatherQuest",
    category: "frontend",
    description: "A gamified weather app that turns daily forecasts into adventure quests. Features animated weather icons and location-based recommendations.",
    techStack: ["Vue.js", "OpenWeatherMap API", "SCSS", "PWA"],
    status: "completed",
    difficulty: 2,
    links: {
      github: "https://github.com/username/weatherquest",
      live: "https://weatherquest.vercel.app",
    },
  },
  {
    id: "proj-7",
    title: "Campus Connect",
    category: "fullstack",
    description: "A university event management platform with RSVPs, notifications, and event analytics. Used by 2000+ students across campus.",
    techStack: ["React", "Express", "MongoDB", "Socket.io", "Firebase"],
    status: "archived",
    difficulty: 3,
    links: {
      github: "https://github.com/username/campus-connect",
    },
  },
  {
    id: "proj-8",
    title: "MobileTest Suite",
    category: "mobile",
    description: "A cross-platform mobile testing toolkit with device simulation, gesture recording, and accessibility auditing.",
    techStack: ["React Native", "Appium", "TypeScript", "Detox"],
    status: "in-progress",
    difficulty: 4,
    links: {
      github: "https://github.com/username/mobile-test-suite",
    },
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/username", handle: "@username", icon: "⌂" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/username", handle: "/in/username", icon: "▦" },
  { platform: "Instagram", url: "https://instagram.com/username", handle: "@username", icon: "◈" },
  { platform: "Email", url: "mailto:hello@example.com", handle: "hello@example.com", icon: "✉" },
  { platform: "Behance", url: "https://behance.net/username", handle: "/username", icon: "◆" },
  { platform: "Twitter/X", url: "https://x.com/username", handle: "@username", icon: "✧" },
];

export const navItems = [
  { label: "Dashboard", href: "#dashboard", icon: "◉" },
  { label: "About", href: "#about", icon: "◫" },
  { label: "Experience", href: "#experience", icon: "◧" },
  { label: "Skills", href: "#skills", icon: "◈" },
  { label: "Projects", href: "#projects", icon: "◩" },
  { label: "Contact", href: "#contact", icon: "✉" },
];

/* Skill category metadata for the inventory tabs */
export const skillCategories = [
  { key: "frontend", label: "Frontend", icon: "🖥️" },
  { key: "backend", label: "Backend", icon: "⚙️" },
  { key: "qa", label: "QA / Testing", icon: "🧪" },
  { key: "tools", label: "Tools", icon: "🔧" },
  { key: "soft", label: "Soft Skills", icon: "💡" },
] as const;

/* Project category metadata for filtering */
export const projectCategories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "fullstack", label: "Fullstack" },
  { key: "qa", label: "QA" },
  { key: "mobile", label: "Mobile" },
  { key: "other", label: "Other" },
] as const;
