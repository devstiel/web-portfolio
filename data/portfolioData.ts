/** Public content sourced from data/content. Keep shared claims here. */
export const profile = {
  name: "Devy Relliani Saffiyah",
  shortName: "Devy Relliani",
  email: "devy.reliani.s@gmail.com",
  disciplines: ["Product QA", "Business analysis", "Creative work"],
  introduction:
    "I’m Devy, a Computer Science graduate with a creative streak. My work takes me from testing digital products to making sense of data and bringing creative teams together.",
  about: [
    "“What happens if the user does this instead?” That’s the kind of question I like working through. I’m interested in how people use things, where they get stuck, and the details that make an experience feel right.",
    "That curiosity has taken me into product QA, business analysis, and creative work. Sometimes I’m translating a requirement into test cases. Other times, I’m organising a report or helping a team turn an idea into something people can see.",
    "I studied Computer Science at ITS. Along the way, I led creative teams, worked on robotics communications, and illustrated a holiday campaign for Team Liquid. I like having both the analytical and creative sides of my brain at the table.",
  ],
  resume: "/devy-relliani-saffiyah-cv.pdf",
  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/devy-relliani-saffiyah/",
    },
    { label: "Instagram", url: "https://www.instagram.com/devstiel/" },
    { label: "TikTok", url: "https://www.tiktok.com/@devstiel_" },
  ],
};

export interface Work {
  slug: string;
  number: string;
  company: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  theme: "qa" | "analytics" | "creative" | "illustration";
  tools: string[];
  facts: { value: string; label: string }[];
  sections: { title: string; paragraphs: string[] }[];
  note: string;
}

export const works: Work[] = [
  {
    slug: "sampoerna-product-qa",
    number: "01",
    company: "Sampoerna",
    category: "Product quality assurance",
    year: "2026",
    theme: "qa",
    title: "Looking beyond the happy path.",
    summary:
      "Turning product requirements into test cases for AYO Kasir and MyAYO, and helping teams make informed release decisions.",
    role: "Product Quality Assurance Intern",
    period: "May 2026 — Present",
    tools: ["Requirements analysis", "Test cases", "SIT", "Confluence", "n8n"],
    facts: [
      { value: "2", label: "Digital products" },
      { value: "SIT", label: "Business demonstrations" },
      { value: "n8n", label: "Automation workshop" },
    ],
    sections: [
      {
        title: "The work",
        paragraphs: [
          "At PT Hanjaya Mandala Sampoerna Tbk, I work on quality assurance for AYO Kasir and MyAYO, digital products used across retail and general-trade channels. My work covers new features and defect fixes through the sprint lifecycle.",
        ],
      },
      {
        title: "From requirements to release conversations",
        paragraphs: [
          "I translate product requirement documents from IT Product and Commercial teams into structured test cases, then execute tests during the sprint. I also authored a B2C QA testing guideline in Confluence to help standardise testing practices.",
          "I facilitate System Integration Testing demonstrations with the Business Team and First Layer Support. These sessions bring test outcomes into the release conversation and help connect requirements with what teams need in the field.",
        ],
      },
      {
        title: "Sharing what I learn",
        paragraphs: [
          "Alongside delivery work, I led an n8n AI automation workshop for QA engineers. It was an opportunity to share practical automation knowledge with the wider team.",
        ],
      },
    ],
    note: "This overview describes my role and deliverables. Internal test cases, product screens, and release information are not reproduced here.",
  },
  {
    slug: "pln-business-analysis",
    number: "02",
    company: "PLN UP3 Bekasi",
    category: "Business analysis",
    year: "2025",
    theme: "analytics",
    title: "Making the numbers easier to use.",
    summary:
      "Bringing EV-charging transactions and operational data together for performance reporting and business planning.",
    role: "Business Analyst Intern",
    period: "September — December 2025",
    tools: [
      "Microsoft Excel",
      "Performance reporting",
      "Data analysis",
      "Strategic planning",
    ],
    facts: [
      { value: "39,349", label: "Transactions in the reporting scope" },
      { value: "27", label: "Charging units" },
      { value: "12", label: "Locations" },
    ],
    sections: [
      {
        title: "The work",
        paragraphs: [
          "At PT PLN (Persero) UP3 Bekasi, I developed an executive performance-reporting suite for the EV-charging network. The reporting brought together 39,349 transactions across 27 charging units at 12 locations.",
        ],
      },
      {
        title: "Giving operational data a structure",
        paragraphs: [
          "I analysed customer records in Microsoft Excel to assess transformer placement and meter-reading accuracy, translating the findings into recommendations for operational planning and performance monitoring.",
          "The EV-charging reporting covered 916,225 kWh and Rp2.26 billion in recorded revenue. These figures describe the data being analysed, rather than revenue or energy use generated by my work.",
        ],
      },
      {
        title: "Contributing to the longer view",
        paragraphs: [
          "I also supported the 2026–2030 strategic roadmap. My contribution was to structure revenue, network reliability, service quality, and infrastructure data into annual priorities and management targets.",
        ],
      },
    ],
    note: "The cover is a typographic summary of the reporting scope, not a screenshot of an internal PLN report.",
  },
  {
    slug: "its-social-media",
    number: "03",
    company: "ITS Public Communication Unit",
    category: "Creative & team leadership",
    year: "2024–25",
    theme: "creative",
    title: "Many voices. A shared direction.",
    summary:
      "Leading a team of 21 social media specialists across five platforms, from content planning to performance reviews.",
    role: "Lead Social Media Specialist · Contract",
    period: "December 2024 — December 2025",
    tools: [
      "Content strategy",
      "Creative direction",
      "Google Sheets",
      "Team coordination",
    ],
    facts: [
      { value: "21", label: "Specialists on the team" },
      { value: "5", label: "Social platforms" },
      { value: "16.75%", label: "Year-over-year audience growth" },
    ],
    sections: [
      {
        title: "The work",
        paragraphs: [
          "At Unit Komunikasi Publik ITS, I led 21 social media specialists across five platforms. The role combined creative direction, day-to-day coordination, and using performance data to inform what we made next.",
        ],
      },
      {
        title: "Making room for consistent creative work",
        paragraphs: [
          "I developed content and campaign strategies and oversaw the production of more than 584 digital assets. I also built content planning frameworks, SOPs, and daily monitoring systems in Google Sheets.",
          "Structured performance reports and regular coordination with internal stakeholders helped us evaluate the work and maintain consistent brand communication.",
        ],
      },
      {
        title: "What the team delivered",
        paragraphs: [
          "Our work contributed to 16.75% year-over-year audience growth and a combined following of more than 230,000. High-engagement initiatives reached up to 2.3 million views on a single post, with 1.1 million total TikTok likes.",
          "These are shared team outcomes. My contribution was leading the specialists, shaping the strategy, reviewing delivery, and keeping the planning and reporting organised.",
        ],
      },
    ],
    note: "This is an overview of my leadership role. The cover is an editorial treatment; individual campaign assets are not displayed.",
  },
  {
    slug: "team-liquid-holiday",
    number: "04",
    company: "Team Liquid",
    category: "Commissioned illustration",
    year: "2021",
    theme: "illustration",
    title: "A little holiday spirit, drawn by hand.",
    summary:
      "A commissioned Christmas card and wallpaper collection for Team Liquid’s League of Legends team.",
    role: "Commissioned illustrator",
    period: "December 2021",
    tools: [
      "Hand illustration",
      "Creative concept",
      "Digital assets",
      "Cross-platform delivery",
    ],
    facts: [
      { value: "LCS", label: "League of Legends team" },
      { value: "2", label: "Light and night variants" },
      { value: "3", label: "PC, mobile & social formats" },
    ],
    sections: [
      {
        title: "The commission",
        paragraphs: [
          "I delivered a commissioned holiday campaign for Team Liquid’s League of Legends team. The brief called for a cohesive creative concept that would connect with its gaming audience.",
        ],
      },
      {
        title: "One idea, several formats",
        paragraphs: [
          "I developed a hand-illustrated Christmas card and digital wallpapers for PC, mobile, and social media. Light and night variants gave the campaign a consistent visual direction across different uses.",
          "The work involved translating stakeholder requirements into the concept, producing the illustrations, and delivering the set of assets within a short deadline.",
        ],
      },
      {
        title: "The deliverables",
        paragraphs: [
          "The finished commission included the Christmas card and wallpaper assets across the requested platforms. This project is one example of the illustration work that sits alongside my technical and analytical background.",
        ],
      },
    ],
    note: "The cover is a typographic introduction to the commission. The original Team Liquid campaign illustrations are not displayed here.",
  },
];

export const experiences = [
  {
    company: "Sampoerna",
    role: "Product Quality Assurance Intern",
    period: "May 2026 — Present",
    detail:
      "Product testing, requirements analysis, and release-readiness conversations for AYO Kasir and MyAYO.",
  },
  {
    company: "PLN UP3 Bekasi",
    role: "Business Analyst Intern",
    period: "Sep — Dec 2025",
    detail:
      "EV-charging performance reporting, operational data analysis, and support for the 2026–2030 strategic roadmap.",
  },
  {
    company: "ITS Public Communication Unit",
    role: "Lead Social Media Specialist · Contract",
    period: "Dec 2024 — Dec 2025",
    detail:
      "Content strategy and delivery with 21 specialists across five social platforms.",
  },
  {
    company: "ICHIRO ITS Robotics Team",
    role: "Deputy Marketing Manager",
    period: "Aug 2024 — Aug 2025",
    detail:
      "Led a five-member marketing team, campaign communications, and sponsor-facing content supporting relationships with 13 sponsors.",
  },
  {
    company: "Ini Lho ITS!",
    role: "Creative Lead",
    period: "May 2023 — May 2024",
    detail:
      "Led a 24-member creative team, overseeing 1,396+ digital assets and a unified visual identity for student outreach.",
  },
];

export const education = {
  institution: "Institut Teknologi Sepuluh Nopember",
  degree: "B.Sc. in Computer Science",
  period: "2022 — 2026",
  gpa: "3.74 / 4.00",
  scholarships: [
    "Beswan Djarum Scholarship · 2024/25",
    "ITS Endowment Fund Leadership Scholarship · 2025/26",
  ],
};

export const capabilities = [
  {
    title: "Product & quality",
    items: [
      "Requirements gathering",
      "Test planning & execution",
      "User research",
      "Agile / Scrum",
      "Jira & Confluence",
    ],
  },
  {
    title: "Analysis & planning",
    items: [
      "Microsoft Excel",
      "Performance reporting",
      "Google Analytics 4",
      "Product roadmapping",
      "BPMN",
    ],
  },
  {
    title: "Creative & collaboration",
    items: [
      "Content strategy",
      "Creative direction",
      "Stakeholder communication",
      "Team leadership",
      "Illustration",
    ],
  },
];

export const certifications = [
  "Google Analytics Certification · Google, 2026",
  "Become a Product Manager · Udemy, 2026",
  "Introduction to SAP S/4HANA with GBI 4.2 · SAP University Alliances, 2024",
];

export const siteMetadata = {
  title: "Devy Relliani — Product, analysis & creative work",
  description:
    "The portfolio of Devy Relliani Saffiyah. Selected work in product QA at Sampoerna, business analysis at PLN, creative leadership at ITS, and illustration for Team Liquid.",
  author: profile.name,
};
