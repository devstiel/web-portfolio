'use client';

import Link from 'next/link';
import { FormEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './RetroTerminal.module.css';
import {
  aboutData,
  experiences,
  navItems,
  personalInfo,
  projectCategories,
  projects,
  skillCategories,
  skills,
  socialLinks,
} from '@/data/portfolioData';
import WindowFrame from '@/components/WindowFrame/WindowFrame';
import RetroSound from '@/utils/sound';

type LogType = 'input' | 'output' | 'system' | 'error';

interface LogLine {
  id: string;
  type: LogType;
  text: string;
  prompt?: string;
}

interface CommandDefinition {
  name: string;
  usage: string;
  description: string;
  aliases?: string[];
}

interface RetroTerminalProps {
  landing?: boolean;
  standalone?: boolean;
  className?: string;
}

const PROMPT = 'devy@portfolio:~$';
const CHAT_PROMPT = 'nova_bot:~$';
const HISTORY_LIMIT = 50;
const MAX_LOG_LINES = 120;

const COMMANDS: CommandDefinition[] = [
  { name: 'help', usage: 'help [command]', description: 'List commands or inspect one command.', aliases: ['?', 'man'] },
  { name: 'about', usage: 'about', description: 'Show a concise profile summary.', aliases: ['profile', 'whoami', 'me', 'role', 'status'] },
  { name: 'experience', usage: 'experience [type|all]', description: 'List work history by type.', aliases: ['xp'] },
  { name: 'skills', usage: 'skills [category|all]', description: 'Render a skills progress matrix.' },
  { name: 'projects', usage: 'projects [category|all]', description: 'List project quests.', aliases: ['ls'] },
  { name: 'project', usage: 'project <id|title>', description: 'Inspect one project.' },
  { name: 'search', usage: 'search <query>', description: 'Search skills, projects, experience, and socials.', aliases: ['find'] },
  { name: 'chat', usage: 'chat [query]', description: 'Boot NOVA.bot interactive companion or ask a quick query.', aliases: ['ask', 'bot'] },
  { name: 'qa', usage: 'qa', description: 'Run a QA-focused portfolio diagnostic.', aliases: ['test'] },
  { name: 'contact', usage: 'contact', description: 'Print contact channels.', aliases: ['socials'] },
  { name: 'goto', usage: 'goto <section>', description: 'Scroll to a homepage section.', aliases: ['cd', 'nav'] },
  { name: 'open', usage: 'open <target>', description: 'Open social links or page sections.' },
  { name: 'copy', usage: 'copy <email|github|linkedin|contact>', description: 'Copy contact details.' },
  { name: 'theme', usage: 'theme [dark|light|toggle]', description: 'Switch the interface theme.' },
  { name: 'sound', usage: 'sound [on|off|toggle|status]', description: 'Control retro SFX.' },
  { name: 'history', usage: 'history', description: 'Show recent commands.' },
  { name: 'clear', usage: 'clear', description: 'Clear the terminal buffer.', aliases: ['cls'] },
  { name: 'exit', usage: 'exit', description: 'Put the shell in standby mode.' },
];

const QUICK_COMMANDS = ['about', 'skills qa', 'projects qa', 'chat', 'search cypress', 'contact'];

const INITIAL_LOGS: LogLine[] = [
  { id: 'boot-1', type: 'system', text: 'Portfolio shell ready.' },
  {
    id: 'boot-2',
    type: 'output',
    text: `${personalInfo.name}\n${personalInfo.role}\n${personalInfo.status}`,
  },
  { id: 'boot-3', type: 'system', text: 'Type "help" for commands or "chat" for NOVA.bot.' },
];

const makeId = () => Math.random().toString(36).slice(2, 10);

const normalizeToken = (value: string) => value.trim().toLowerCase();

const categoryKeys = skillCategories.map((category) => category.key);
const projectCategoryKeys = projectCategories.map((category) => category.key);
const experienceTypes = ['all', ...Array.from(new Set(experiences.map((experience) => experience.type)))];
const sectionOptions = navItems.map((item) => item.href.replace('#', ''));
const sectionAliases: Record<string, string> = {
  home: 'dashboard',
  root: 'dashboard',
  cli: 'dashboard',
  terminal: 'dashboard',
  dashboard: 'dashboard',
  hud: 'character-hud',
};

navItems.forEach((item) => {
  sectionAliases[item.label.toLowerCase()] = item.href.replace('#', '');
  sectionAliases[item.href.replace('#', '').toLowerCase()] = item.href.replace('#', '');
});

function getSectionTarget(target: string) {
  return sectionAliases[normalizeToken(target)];
}

const commandLookup = new Map<string, string>();
COMMANDS.forEach((command) => {
  commandLookup.set(command.name, command.name);
  command.aliases?.forEach((alias) => commandLookup.set(alias, command.name));
});

const commandNames = COMMANDS.map((command) => command.name).sort();

function parseCommand(value: string): string[] {
  return value.match(/"[^"]*"|'[^']*'|\S+/g)?.map((token) => token.replace(/^['"]|['"]$/g, '')) ?? [];
}

function formatHelp(commandQuery?: string) {
  if (commandQuery) {
    const commandName = commandLookup.get(normalizeToken(commandQuery));
    const command = COMMANDS.find((item) => item.name === commandName);

    if (!command) {
      return `No manual entry for "${commandQuery}". Run "help" to list commands.`;
    }

    return `${command.name.toUpperCase()}
  Usage       : ${command.usage}
  Description : ${command.description}
  Aliases     : ${command.aliases?.join(', ') || 'none'}`;
  }

  return `Available Commands
${COMMANDS.map((command) => `  ${command.usage.padEnd(30)} ${command.description}`).join('\n')}

Shortcuts
  Tab       complete command or argument
  Up/Down   browse command history
  Ctrl+L    clear terminal buffer
  Ctrl+C    cancel current input
  Esc       clear current input`;
}

const TerminalOutput = memo(function TerminalOutput({
  text,
  type = 'output',
  live = false,
}: {
  text: string;
  type?: LogType;
  live?: boolean;
}) {
  const typeClass = type === 'output' ? '' : styles[type];
  const isQuerying = text.includes('Querying databanks...');

  if (isQuerying) {
    const baseText = text.replace('Querying databanks...', 'Querying databanks');
    return (
      <pre className={`${styles.terminalOutput} ${typeClass} ${live ? styles.liveOutput : ''}`}>
        {baseText}<span className={styles.queryingText} />
      </pre>
    );
  }

  return (
    <pre className={`${styles.terminalOutput} ${typeClass} ${live ? styles.liveOutput : ''}`}>
      {text}
    </pre>
  );
});

const TerminalLogEntries = memo(function TerminalLogEntries({ logs }: { logs: LogLine[] }) {
  return (
    <>
      {logs.map((log, index) => {
        const isLastOutput = index === logs.length - 1 && log.type !== 'input';

        return (
          <div key={log.id} className={styles.logEntry}>
            {log.type === 'input' ? (
              <div className={styles.terminalLine}>
                <span className={styles.terminalPrompt}>{log.prompt || PROMPT}</span>
                <span>{log.text}</span>
              </div>
            ) : isLastOutput ? (
              <TerminalOutput key={log.id} text={log.text} type={log.type} live />
            ) : (
              <TerminalOutput text={log.text} type={log.type} />
            )}
          </div>
        );
      })}
    </>
  );
});

function getSocialLink(platform: string) {
  const target = platform.toLowerCase();
  return socialLinks.find((link) => link.platform.toLowerCase().replace('/x', '') === target);
}

function formatSkills(categoryArg?: string) {
  const category = normalizeToken(categoryArg ?? 'qa');
  const selectedSkills =
    category === 'all'
      ? skills
      : skills.filter((skill) => skill.category === category);

  if (selectedSkills.length === 0) {
    return `No skills found for "${categoryArg}". Try: ${['all', ...categoryKeys].join(', ')}`;
  }

  return `Skill Inventory: ${category.toUpperCase()}\n${selectedSkills
    .map((skill) => {
      const filled = Math.round((skill.level / skill.maxLevel) * 10);
      const percent = Math.round((skill.level / skill.maxLevel) * 100);
      const bar = '#'.repeat(filled) + '-'.repeat(10 - filled);
      return `  ${skill.name.padEnd(16)} [${bar}] ${String(percent).padStart(3)}% ${skill.rarity.toUpperCase()}`;
    })
    .join('\n')}`;
}

function formatAbout() {
  return `${personalInfo.name}
  Role       : ${personalInfo.role}
  Status     : ${personalInfo.status}
  Tagline    : ${personalInfo.tagline}
  Location   : Jakarta, Indonesia

Bio
${aboutData.bio.map((paragraph, index) => `  ${index + 1}. ${paragraph}`).join('\n')}

Traits
  ${aboutData.personalityTags.join('  ')}`;
}

function formatExperience(typeArg?: string) {
  const type = normalizeToken(typeArg ?? 'all');
  const selectedExperience =
    type === 'all'
      ? experiences
      : experiences.filter((experience) => experience.type === type);

  if (selectedExperience.length === 0) {
    return `No experience entries for "${typeArg}". Try: ${experienceTypes.join(', ')}`;
  }

  return `Experience Archive: ${type.toUpperCase()}
${selectedExperience
  .map((experience) => {
    const achievements = experience.achievements.slice(0, 2).map((achievement) => `     - ${achievement}`).join('\n');
    return `  ${experience.role} @ ${experience.company}
     Period : ${experience.period}
     Type   : ${experience.type}
     Tools  : ${experience.tools.join(', ')}
${achievements}`;
  })
  .join('\n\n')}`;
}

function formatProjects(categoryArg?: string) {
  const category = normalizeToken(categoryArg ?? 'all');
  const selectedProjects =
    category === 'all'
      ? projects
      : projects.filter((project) => project.category === category);

  if (selectedProjects.length === 0) {
    return `No projects found for "${categoryArg}". Try: ${projectCategoryKeys.join(', ')}`;
  }

  return `Project Quest Index: ${category.toUpperCase()}\n${selectedProjects
    .map((project) => {
      const statusChar = project.status === 'completed' ? '[x]' : project.status === 'in-progress' ? '[~]' : '[-]';
      const difficulty = '*'.repeat(project.difficulty) + '.'.repeat(5 - project.difficulty);
      return `  ${statusChar} ${project.id.padEnd(8)} ${project.title.padEnd(24)} ${project.category.toUpperCase().padEnd(10)} ${difficulty}`;
    })
    .join('\n')}`;
}

function formatProjectDetail(query: string) {
  const normalizedQuery = normalizeToken(query);
  const project = projects.find((item) => {
    const slug = item.title.toLowerCase().replace(/\s+/g, '-');
    return item.id === normalizedQuery || slug.includes(normalizedQuery) || item.title.toLowerCase().includes(normalizedQuery);
  });

  if (!project) {
    return `Project not found: "${query}". Run "projects" to list available IDs.`;
  }

  const links = Object.entries(project.links)
    .filter(([, url]) => Boolean(url))
    .map(([label, url]) => `  - ${label.padEnd(9)}: ${url}`)
    .join('\n');

  return `${project.title}
  ID         : ${project.id}
  Category   : ${project.category}
  Status     : ${project.status}
  Difficulty : ${'*'.repeat(project.difficulty)}${'.'.repeat(5 - project.difficulty)}
  Stack      : ${project.techStack.join(', ')}
  Summary    : ${project.description}
${links ? `  Links\n${links}` : '  Links      : Not configured'}`;
}

function formatContact() {
  return `Contact Channels\n${socialLinks
    .map((link) => `  - ${link.platform.padEnd(10)}: ${link.handle} (${link.url})`)
    .join('\n')}`;
}

function formatQaDiagnostic() {
  const qaSkills = skills.filter((skill) => skill.category === 'qa');
  const qaProjects = projects.filter((project) => project.category === 'qa');
  const averageQa = Math.round(
    qaSkills.reduce((total, skill) => total + (skill.level / skill.maxLevel) * 100, 0) / Math.max(qaSkills.length, 1)
  );
  const topQaSkill = [...qaSkills].sort((a, b) => b.level - a.level)[0]?.name ?? 'N/A';

  return `QA Diagnostic Report
  Automation readiness : ${averageQa}%
  QA skills indexed    : ${qaSkills.length}
  QA project quests    : ${qaProjects.length}
  Highest signal       : ${topQaSkill}

Recommended commands
  skills qa
  projects qa
  project proj-2
  search automation`;
}

function formatSearch(query: string) {
  const normalizedQuery = normalizeToken(query);
  if (!normalizedQuery) {
    return 'Missing search query. Example: search cypress';
  }

  const matchingSkills = skills.filter((skill) =>
    [skill.name, skill.category, skill.rarity].some((value) => value.toLowerCase().includes(normalizedQuery))
  );
  const matchingProjects = projects.filter((project) =>
    [project.title, project.category, project.status, project.description, ...project.techStack].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )
  );
  const matchingExperience = experiences.filter((experience) =>
    [experience.role, experience.company, experience.type, experience.description, ...experience.tools].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )
  );
  const matchingSocials = socialLinks.filter((link) =>
    [link.platform, link.handle, link.url].some((value) => value.toLowerCase().includes(normalizedQuery))
  );

  const sections = [
    matchingSkills.length
      ? `Skills\n${matchingSkills.map((skill) => `  - ${skill.name} (${skill.category}, ${skill.rarity}, ${skill.level * 10}%)`).join('\n')}`
      : '',
    matchingProjects.length
      ? `Projects\n${matchingProjects.map((project) => `  - ${project.id}: ${project.title} (${project.category}, ${project.status})`).join('\n')}`
      : '',
    matchingExperience.length
      ? `Experience\n${matchingExperience.map((experience) => `  - ${experience.role} @ ${experience.company} (${experience.type})`).join('\n')}`
      : '',
    matchingSocials.length
      ? `Socials\n${matchingSocials.map((link) => `  - ${link.platform}: ${link.handle}`).join('\n')}`
      : '',
  ].filter(Boolean);

  return sections.length ? `Search Results: "${query}"\n\n${sections.join('\n\n')}` : `No matches for "${query}".`;
}

function hasTopic(input: string, topics: string[]) {
  return topics.some((topic) => input.includes(topic));
}

function getOptimizedChatbotResponse(rawInput: string): string | null {
  const input = normalizeToken(rawInput);

  if (input === '__legacy__') {
    return null;
  }

  if (!input || hasTopic(input, ['help', 'command', 'option', 'what can'])) {
    return `NOVA:
  I can answer concise portfolio questions.

Topics
  skills      top technical strengths
  projects    selected project work
  qa          testing and automation focus
  experience  career timeline
  contact     email and social channels
  exit        return to standard shell`;
  }

  if (hasTopic(input, ['qa', 'test', 'automation', 'quality', 'cypress', 'selenium', 'postman'])) {
    return `NOVA:
${formatQaDiagnostic()}

Tip: run "skills qa" or "projects qa" for detailed indexes.`;
  }

  if (hasTopic(input, ['skill', 'capabilit', 'expert', 'tech', 'stack'])) {
    const topSkills = [...skills]
      .sort((a, b) => b.level / b.maxLevel - a.level / a.maxLevel)
      .slice(0, 6)
      .map((skill) => `  - ${skill.name}: ${Math.round((skill.level / skill.maxLevel) * 100)}% (${skill.category})`)
      .join('\n');

    return `NOVA:
  Devy's strongest signals are QA automation, frontend engineering,
  and reliable delivery tooling.

Top skills
${topSkills}

Try: skills qa, skills frontend, skills tools`;
  }

  if (hasTopic(input, ['project', 'quest', 'work', 'portfolio'])) {
    const featuredProjects = projects
      .slice(0, 4)
      .map((project) => `  - ${project.id}: ${project.title} (${project.category}, ${project.status})`)
      .join('\n');

    return `NOVA:
  Featured project index loaded.

${featuredProjects}

Try: projects qa, project proj-2, search automation`;
  }

  if (hasTopic(input, ['experience', 'job', 'career', 'timeline'])) {
    const careerLines = experiences
      .slice(0, 4)
      .map((experience) => `  - ${experience.role} @ ${experience.company} (${experience.period})`)
      .join('\n');

    return `NOVA:
  Career timeline summary:

${careerLines}

Try: experience all`;
  }

  if (hasTopic(input, ['contact', 'email', 'reach', 'social', 'hire', 'message'])) {
    return `NOVA:
${formatContact()}

Tip: run "copy email" or "open linkedin".`;
  }

  if (hasTopic(input, ['who', 'about', 'devy', 'profile'])) {
    return `NOVA:
  ${personalInfo.name}
  ${personalInfo.role}
  ${personalInfo.status}

  ${personalInfo.tagline}

Try: about, experience, skills qa`;
  }

  return `NOVA:
  I could not map "${rawInput}" to a portfolio topic.

Try one of: skills, projects, qa, experience, contact.
Type "exit" to return to the standard shell.`;
}

function getChatbotResponse(rawInput: string): string {
  const input = normalizeToken(rawInput);
  const optimizedResponse = getOptimizedChatbotResponse(rawInput);

  if (optimizedResponse) {
    return optimizedResponse;
  }

  if (
    input.includes('skill') ||
    input.includes('capabilit') ||
    input.includes('expert') ||
    input.includes('techno') ||
    input.includes('stack')
  ) {
    return `NOVA: "Devy specializes in High-Fidelity Test Automation and Fullstack Web Engineering!
  Here is the core skill tree:

  ┌────────────────────────────────────────────────────────┐
  │ 🧪 QA AUTOMATION (Level: MASTER)                       │
  │   - Cypress, Playwright, Selenium                      │
  │   - API Testing (RestAssured, Postman)                 │
  │   - Mobile Testing (Appium)                            │
  ├────────────────────────────────────────────────────────┤
  │ 💻 WEB DEVELOPMENT (Level: ADVANCED)                   │
  │   - React, Next.js, TypeScript, NodeJS                 │
  │   - CSS Grid/Flexbox, Premium Retro UI Aesthetics      │
  ├────────────────────────────────────────────────────────┤
  │ ⚙️ SYSTEM OPERATIONS (Level: CAPABLE)                    │
  │   - CI/CD Pipelines (GitHub Actions, GitLab)           │
  │   - Docker, Kubernetes, AWS Cloud Infrastructure       │
  └────────────────────────────────────────────────────────┘

  Type 'skills' in the main console for a detailed progress matrix!"`;
  }

  if (
    input.includes('project') ||
    input.includes('quest') ||
    input.includes('work') ||
    input.includes('portfoli')
  ) {
    return `NOVA: "Devy has conquered numerous engineering quests! Highlight projects:

  📁 PROJ-1: retro_portfolio_shell (Active Quest)
     - Immersive interactive pixel CLI cockpit console & audio triggers.
     - Stack: Next.js, TS, Tailwind/Vanilla CSS, Web Audio API.

  📁 PROJ-2: cypress_automation_framework (Completed Quest)
     - Scalable modern E2E automation dashboard for SaaS diagnostics.
     - Stack: Cypress, Cucumber BDD, GitLab CI/CD, Page Object Model.

  📁 PROJ-3: serverless_api_gateways (Completed Quest)
     - High-throughput AWS microservices backend pipeline.
     - Stack: Node.js, AWS Lambda, DynamoDB, Serverless Framework.

  Type 'projects' in the main console to inspect all active quests!"`;
  }

  if (
    input.includes('experience') ||
    input.includes('job') ||
    input.includes('career') ||
    input.includes('history')
  ) {
    return `NOVA: "Devy's career logs are highly reliable! A quick overview:

  🌟 Senior QA & Automation Engineer (2023 - Present)
     - Engineered comprehensive automated E2E & API test suites.
     - Reduced regression cycle durations by 40% using parallelized runs.

  🌟 Software Engineer in Test (2021 - 2023)
     - Built customized internal testing tools and unified CI pipelines.
     - Architected standard QA diagnostic dashboards for dev teams.

  Type 'experience' in the main console to print the full timeline!"`;
  }

  if (
    input.includes('contact') ||
    input.includes('email') ||
    input.includes('reach') ||
    input.includes('social') ||
    input.includes('hire') ||
    input.includes('message')
  ) {
    return `NOVA: "Connecting to communications module... Ready! 📡
  You can reach Devy through the following channels:

  📧 Email    : devy.relliani@gmail.com (Use 'copy email' to copy!)
  🐙 GitHub   : https://github.com/devyrelliani
  💼 LinkedIn : https://linkedin.com/in/devyrelliani
  📸 Instagram: @devyrelliani

  Feel free to shoot an email or drop a message on LinkedIn. Devy is always open to collaborative quests!"`;
  }

  if (
    input.includes('joke') ||
    input.includes('funny') ||
    input.includes('laugh') ||
    input.includes('humor')
  ) {
    const jokes = [
      `"How many QA engineers does it take to change a lightbulb?
       They just note that the room is dark. They don't fix issues, they log them! 💡"`,
      `"A QA engineer walks into a bar. 
       Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. Orders a sfdeljknesv.
       
       The real customer walks in, asks where the bathroom is, and the bar burns down. 🍻"`,
      `"Why do programmers prefer dark mode?
       Because light attracts bugs! 🪲"`,
      `"There are 10 types of people in the world: 
       Those who understand binary, and those who don't. 👾"`,
      `"['hip', 'hip'] (Array(2) command)... Close it!
       HIP HIP HURRAY! 🥳"`,
    ];
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return `NOVA: ${jokes[randomIndex]}`;
  }

  if (
    input.includes('who') ||
    input.includes('about') ||
    input.includes('devy') ||
    input.includes('profile')
  ) {
    return `NOVA: "Devy Relliani is a dual-class Software Engineer & QA Automation Specialist!
  With a deep focus on building premium web experiences and bulletproof automated test coverage.
  
  Equipped with high-end tools: Next.js, Cypress, TypeScript, Playwright, and Docker.
  Currently on an active quest to engineer elegant interfaces and high-performance automation frameworks! 🚀"`;
  }

  if (
    input.includes('help') ||
    input.includes('commands') ||
    input.includes('option') ||
    input.includes('what can')
  ) {
    return `NOVA: "Here are the topics I can talk about:
  
  - 'skills'      : Devy's expert skill trees & technical stack.
  - 'projects'    : Selected engineering & automation quests.
  - 'experience'  : Professional career logs and timelines.
  - 'contact'     : Channels to reach Devy.
  - 'jokes'       : Custom 8-bit programmer & QA jokes.
  - 'exit'        : Exit companion mode and return to standard shell.

  What would you like to explore?"`;
  }

  return `NOVA: "Scanning input... '${rawInput}' parsed. 
  I couldn't quite map that keyword to my databanks. 

  Would you like to hear about Devy's [skills], [projects], [experience], or maybe a [joke]?
  Type 'exit' to return to standard command prompt."`;
}

function getCompletion(input: string) {
  const raw = input;
  const endsWithSpace = /\s$/.test(raw);
  const tokens = raw.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return { completion: 'help', matches: commandNames };
  }

  if (tokens.length === 1 && !endsWithSpace) {
    const partial = normalizeToken(tokens[0]);
    const matches = commandNames.filter((name) => name.startsWith(partial));
    const completion = matches.length === 1 ? `${matches[0]} ` : null;
    return { completion, matches };
  }

  const command = commandLookup.get(normalizeToken(tokens[0])) ?? normalizeToken(tokens[0]);
  const partial = endsWithSpace ? '' : normalizeToken(tokens[tokens.length - 1]);
  const prefix = tokens.slice(0, endsWithSpace ? tokens.length : -1).join(' ');

  const argOptions: Record<string, string[]> = {
    help: commandNames,
    skills: ['all', ...categoryKeys],
    projects: projectCategoryKeys,
    project: projects.map((project) => project.id),
    experience: experienceTypes,
    goto: [...sectionOptions, 'home', 'cli', 'hud'],
    open: [...sectionOptions, 'home', 'github', 'linkedin', 'email', 'instagram', 'behance', 'twitter'],
    copy: ['contact', 'email', 'github', 'linkedin'],
    theme: ['dark', 'light', 'toggle'],
    sound: ['on', 'off', 'toggle', 'status'],
    chat: ['skills', 'projects', 'qa', 'experience', 'contact', 'exit'],
  };

  const matches = (argOptions[command] ?? []).filter((option) => option.startsWith(partial));
  const completion = matches.length === 1 ? `${prefix} ${matches[0]}`.trim() : null;
  return { completion, matches };
}

export default function RetroTerminal({ landing = false, standalone = false, className = '' }: RetroTerminalProps) {
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(!landing);
  const [isActiveMode, setIsActiveMode] = useState(!landing);
  const [chatSessionActive, setChatSessionActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);
  const keySoundAtRef = useRef(0);

  const playKeySound = useCallback(() => {
    const now = performance.now();
    if (now - keySoundAtRef.current < 45) {
      return;
    }

    keySoundAtRef.current = now;
    RetroSound.playKey();
  }, []);

  const completionState = useMemo(() => getCompletion(inputValue), [inputValue]);
  const commandHint = useMemo(() => {
    if (chatSessionActive) {
      if (!inputValue.trim()) {
        return 'Try chatbot topics: skills, projects, qa, experience, contact, exit';
      }
      return 'Press Enter to chat. Type "exit" or "back" to return to standard shell.';
    }

    if (!inputValue.trim()) {
      return 'Try: about, skills qa, projects qa, search cypress, goto projects, chat';
    }

    if (completionState.completion) {
      return `Tab completes: ${completionState.completion}`;
    }

    if (completionState.matches.length > 1) {
      return `Matches: ${completionState.matches.slice(0, 6).join(', ')}`;
    }

    return 'Enter runs command. Tab checks completion.';
  }, [completionState, inputValue, chatSessionActive]);

  const revealShell = useCallback((playSound = false) => {
    if (playSound) {
      RetroSound.playClick();
    }

    setIsIntroComplete(true);
    setIsActiveMode(true);
    [180, 680].forEach((delay) => {
      window.setTimeout(() => {
        inputRef.current?.focus();
        if (bufferRef.current) {
          bufferRef.current.scrollTo({
            top: bufferRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    if (!landing) {
      inputRef.current?.focus();
    }
  }, [landing]);

  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [logs]);

  const appendLogs = useCallback((newLogs: LogLine[]) => {
    setLogs((current) => [...current, ...newLogs].slice(-MAX_LOG_LINES));
  }, []);

  const openTarget = useCallback((target: string) => {
    const normalizedTarget = normalizeToken(target);
    const sectionTarget = getSectionTarget(normalizedTarget);

    if (sectionTarget) {
      const section = document.getElementById(sectionTarget);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return `Opening #${sectionTarget}...`;
      }

      window.location.href = standalone ? `/#${sectionTarget}` : `#${sectionTarget}`;
      return `Opening #${sectionTarget}...`;
    }

    const socialTarget = normalizedTarget === 'twitter' ? 'Twitter' : normalizedTarget;
    const link = getSocialLink(socialTarget);

    if (!link) {
      return `Open target not found: "${target}". Try: home, projects, contact, github, linkedin, email.`;
    }

    if (link.url.startsWith('mailto:')) {
      window.location.href = link.url;
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }

    return `Opening ${link.platform}: ${link.handle}`;
  }, [standalone]);

  const handleLLMQuery = useCallback(
    async (inputText: string, inputLog: LogLine) => {
      const loadingId = makeId();
      appendLogs([
        inputLog,
        {
          id: loadingId,
          type: 'system',
          text: 'NOVA: Querying databanks... 🔍',
        },
      ]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputText }),
        });

        if (!response.ok) {
          throw new Error('API server returned error');
        }

        const data = await response.json();
        const answerText = data.text;

        setLogs((current) =>
          current.map((log) =>
            log.id === loadingId
              ? { id: loadingId, type: 'output', text: answerText }
              : log
          )
        );
        RetroSound.playKey();
      } catch (err) {
        // Fallback to our high-fidelity offline system databanks if API fails
        const fallbackText = getChatbotResponse(inputText);
        setLogs((current) =>
          current.map((log) =>
            log.id === loadingId
              ? { id: loadingId, type: 'output', text: fallbackText }
              : log
          )
        );
        RetroSound.playKey();
      }
    },
    [appendLogs]
  );

  const runCommand = useCallback(
    async (rawCommand: string) => {
      const commandText = rawCommand.trim();
      if (!commandText) return;

      const nextHistory =
        commandHistory[commandHistory.length - 1] === commandText
          ? commandHistory
          : [...commandHistory, commandText].slice(-HISTORY_LIMIT);

      setCommandHistory(nextHistory);
      setHistoryIndex(null);
      setInputValue('');

      const tokens = parseCommand(commandText);
      const commandName = commandLookup.get(normalizeToken(tokens[0])) ?? normalizeToken(tokens[0]);
      const args = tokens.slice(1);

      const isCurrentlyChat = chatSessionActive;
      if (commandName !== 'chat') {
        setChatSessionActive(false);
      }

      const inputLog: LogLine = {
        id: makeId(),
        type: 'input',
        text: commandText,
        prompt: isCurrentlyChat ? CHAT_PROMPT : PROMPT,
      };

      if (commandName === 'clear') {
        setLogs([]);
        RetroSound.playClick();
        return;
      }

      let output = '';
      let outputType: LogType = 'output';

      switch (commandName) {
        case 'help':
          output = formatHelp(args[0]);
          break;
        case 'about':
          output = formatAbout();
          break;
        case 'experience':
          output = formatExperience(args[0]);
          break;
        case 'skills':
          output = formatSkills(args[0]);
          break;
        case 'projects':
          output = formatProjects(args[0]);
          break;
        case 'project':
          output = args.length > 0 ? formatProjectDetail(args.join(' ')) : 'Missing project query. Example: project proj-2';
          outputType = args.length > 0 && !output.startsWith('Project not found') ? 'output' : 'error';
          break;
        case 'search':
          output = formatSearch(args.join(' '));
          outputType = output.startsWith('No matches') || output.startsWith('Missing') ? 'error' : 'output';
          break;
        case 'chat':
          if (args.length > 0) {
            void handleLLMQuery(args.join(' '), inputLog);
            return;
          } else {
            setChatSessionActive(true);
            RetroSound.playLevelUp();
            output = `Initializing NOVA.bot Interactive Companion...
===================================================
NOVA: "Ready. Ask about Devy's skills, QA work, projects,
       experience, or contact channels.

       What would you like to explore?"

[ Topics: skills | projects | qa | experience | contact | exit ]`;
          }
          break;
        case 'qa':
          output = formatQaDiagnostic();
          break;
        case 'contact':
          output = formatContact();
          break;
        case 'goto': {
          const sectionTarget = args[0] ? getSectionTarget(args[0]) : undefined;
          if (!sectionTarget) {
            output = `Missing or unknown section. Try: ${sectionOptions.join(', ')}`;
            outputType = 'error';
            break;
          }

          const section = document.getElementById(sectionTarget);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = `/#${sectionTarget}`;
          }

          output = `Navigating to #${sectionTarget}`;
          outputType = 'system';
          break;
        }
        case 'open':
          output = args.length > 0 ? openTarget(args[0]) : 'Missing target. Example: open github';
          outputType = args.length > 0 && !output.includes('not found') ? 'system' : 'error';
          break;
        case 'copy': {
          const target = normalizeToken(args[0] ?? 'contact');
          const linkMap: Record<string, string | undefined> = {
            contact: formatContact(),
            email: getSocialLink('email')?.handle,
            github: getSocialLink('github')?.url,
            linkedin: getSocialLink('linkedin')?.url,
          };
          const valueToCopy = linkMap[target];

          if (!valueToCopy) {
            output = `Copy target not found: "${target}". Try: contact, email, github, linkedin.`;
            outputType = 'error';
            break;
          }

          try {
            await navigator.clipboard.writeText(valueToCopy);
            output = `Copied ${target} to clipboard.`;
            outputType = 'system';
          } catch {
            output = `Clipboard unavailable. Value:\n${valueToCopy}`;
          }
          break;
        }
        case 'theme': {
          const requestedTheme = normalizeToken(args[0] ?? 'toggle');
          const doc = document.documentElement;
          const current = doc.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
          const nextTheme =
            requestedTheme === 'light' || requestedTheme === 'dark'
              ? requestedTheme
              : current === 'dark'
                ? 'light'
                : 'dark';

          doc.classList.add('theme-toggling');
          doc.setAttribute('data-theme', nextTheme);
          window.setTimeout(() => doc.classList.remove('theme-toggling'), 350);

          try {
            localStorage.setItem('portfolio-theme', nextTheme);
          } catch {
            // localStorage can be unavailable in private contexts.
          }

          window.dispatchEvent(new CustomEvent('theme-changed', { detail: nextTheme }));
          RetroSound.playToggle();
          output = `Theme set to ${nextTheme.toUpperCase()}.`;
          outputType = 'system';
          break;
        }
        case 'sound': {
          const requestedMode = normalizeToken(args[0] ?? 'status');
          const currentlyMuted = RetroSound.getMuted();

          if (requestedMode === 'on' && currentlyMuted) {
            RetroSound.toggleMute();
          } else if (requestedMode === 'off' && !currentlyMuted) {
            RetroSound.toggleMute();
          } else if (requestedMode === 'toggle') {
            RetroSound.toggleMute();
          }

          output = `Retro SFX: ${RetroSound.getMuted() ? 'OFF' : 'ON'}`;
          outputType = 'system';
          break;
        }
        case 'history':
          output = nextHistory.length
            ? nextHistory.map((item, index) => `  ${String(index + 1).padStart(2, '0')}  ${item}`).join('\n')
            : 'No command history yet.';
          break;
        case 'exit':
          output = 'Closing console terminal...';
          outputType = 'system';
          RetroSound.playQuestComplete();
          if (landing) {
            window.setTimeout(() => {
              setIsActiveMode(false);
              setIsIntroComplete(false);
              setInputValue('');
            }, 900);
          } else {
            window.setTimeout(() => {
              window.location.href = '/#dashboard';
            }, 900);
          }
          break;
        default:
          output = `Command not found: ${tokens[0]}. Run "help" for available commands.`;
          outputType = 'error';
      }

      appendLogs([
        inputLog,
        {
          id: makeId(),
          type: outputType,
          text: output,
        },
      ]);

      RetroSound.playClick();
    },
    [appendLogs, commandHistory, landing, openTarget, chatSessionActive, handleLLMQuery]
  );

  const handleTerminalClick = () => {
    if (landing && !isIntroComplete) {
      revealShell(true);
      return;
    }

    if (!isActiveMode) {
      setIsActiveMode(true);
      RetroSound.playClick();
    }

    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleChatInput = useCallback(
    async (rawInput: string) => {
      const inputText = rawInput.trim();
      if (!inputText) return;

      const inputLog: LogLine = {
        id: makeId(),
        type: 'input',
        text: inputText,
        prompt: CHAT_PROMPT,
      };

      setInputValue('');

      const normalizedInput = normalizeToken(inputText);

      if (
        normalizedInput === 'exit' ||
        normalizedInput === 'quit' ||
        normalizedInput === 'back' ||
        normalizedInput === 'bye' ||
        normalizedInput === 'return'
      ) {
        setChatSessionActive(false);
        RetroSound.playClick();
        appendLogs([
          inputLog,
          {
            id: makeId(),
            type: 'system',
            text: 'NOVA: "Companion mode deactivated. Returning to standard shell..."',
          },
        ]);
        return;
      }

      if (normalizedInput === 'clear' || normalizedInput === 'cls') {
        setLogs([]);
        RetroSound.playClick();
        return;
      }

      void handleLLMQuery(inputText, inputLog);
    },
    [appendLogs, handleLLMQuery]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (chatSessionActive) {
      void handleChatInput(inputValue);
    } else {
      void runCommand(inputValue);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInputValue('');
        return;
      }

      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const { completion, matches } = getCompletion(inputValue);

      if (completion) {
        setInputValue(completion);
        RetroSound.playKey();
        return;
      }

      if (matches.length > 1) {
        appendLogs([
          {
            id: makeId(),
            type: 'system',
            text: `Matches: ${matches.join(', ')}`,
          },
        ]);
      }
      return;
    }

    if (event.key === 'Escape') {
      setInputValue('');
      setHistoryIndex(null);
      return;
    }

    if (event.key.toLowerCase() === 'c' && event.ctrlKey) {
      event.preventDefault();
      appendLogs([
        { id: makeId(), type: 'input', text: `${inputValue} ^C` },
        { id: makeId(), type: 'system', text: 'Input cancelled.' },
      ]);
      setInputValue('');
      setHistoryIndex(null);
      return;
    }

    if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
      event.preventDefault();
      setLogs([]);
    }
  };

  return (
    <section
      className={`${styles.terminalWrapper} ${landing ? styles.landingMode : ''} ${isIntroComplete ? styles.shellReady : ''} ${isActiveMode ? styles.isActive : ''} ${className}`}
      onClick={handleTerminalClick}
      aria-label="Interactive portfolio terminal"
    >
      <WindowFrame title="portfolio_shell.sh" variant="terminal" className={styles.compactFrame}>
        <div className={styles.shellHeader}>
          <span className={styles.statusPill}>ONLINE</span>
          <span>{logs.length} lines</span>
          <span>{commandHistory.length} commands</span>
          {landing && isActiveMode && isIntroComplete && (
            <button
              type="button"
              className={styles.deactivateHeaderBtn}
              onClick={(e) => {
                e.stopPropagation();
                setIsActiveMode(false);
                RetroSound.playClick();
              }}
              title="Deactivate CLI focus to enable homepage scrolling"
            >
              [ ✖ QUIT CLI ]
            </button>
          )}
        </div>

        <div
          className={styles.terminalContent}
          ref={bufferRef}
          id="terminal-content"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          style={{ overflowY: isActiveMode ? 'auto' : 'hidden' }}
        >
          <div className={styles.scanlineOverlay} />

          {!isActiveMode && isIntroComplete && (
            <div 
              className={styles.inactiveOverlay}
              onClick={(e) => {
                e.stopPropagation();
                setIsActiveMode(true);
                RetroSound.playClick();
                setTimeout(() => inputRef.current?.focus(), 50);
              }}
            >
              <div className={styles.inactivePrompt}>
                <span className={styles.glowGreen}>[ CONSOLE IN STANDBY ]</span>
                <p className={styles.standbyTextSmall}>Shell focus suspended. Click anywhere inside screen to reactivate keyboard and scroll.</p>
                <button type="button" className={styles.activateConsoleBtn}>
                  ▸ RESUME CLI MODE
                </button>
              </div>
            </div>
          )}

          {landing && (
            <div className={styles.terminalSplash}>
              <span className={styles.introGreeting}>
                <span className={styles.greenDot} /> PORTFOLIO CONSOLE
              </span>

              <div className={styles.terminalAsciiSplash}>
{`  ╔════════════════════════════╗
  ║    DEVY_PORTFOLIO.SYS v1.2 ║
  ║    ─────────────────────── ║
  ║    QA • DEV • AI COMPANION ║
  ╚════════════════════════════╝`}
              </div>

              <p className={styles.splashSubtitle}>
                Interactive command cockpit. Boot this console to inspect skill logs, run automated diagnostic tests, or launch the AI companion (NOVA.bot).
              </p>

              <div className={styles.splashButtonsRow}>
                <button
                  type="button"
                  className={styles.startConsoleButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    revealShell(true);
                  }}
                >
                  [ ⌨️ STANDARD CLI ]
                </button>

                <button
                  type="button"
                  className={`${styles.startConsoleButton} ${styles.chatbotLaunchBtn}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    revealShell(true);
                    setChatSessionActive(true);
                    RetroSound.playLevelUp();
                    setLogs([
                      { id: 'boot-1', type: 'system', text: 'Portfolio shell booted.' },
                      { id: 'boot-2', type: 'system', text: 'AI Companion sector loaded successfully.' },
                      {
                        id: makeId(),
                        type: 'output',
                        text: `Initializing NOVA.bot Interactive Companion...
===================================================
NOVA: "Greetings, voyager! 👾 I am NOVA, your retro guide.
       I can assist with real-time logs about Devy's skills,
       projects, experience, contact avenues, or even tell you
       a custom 8-bit developer joke! 

       What would you like to explore?"

[ Topics: skills | projects | experience | contact | jokes | exit ]`,
                        prompt: CHAT_PROMPT,
                      },
                    ]);
                  }}
                >
                  [ 🤖 AI CHATBOT ]
                </button>
              </div>
            </div>
          )}

          <div className={`${styles.shellBody} ${isIntroComplete ? styles.shellBodyReady : ''}`}>
            <div className={styles.terminalAscii}>
{`  ╔════════════════════════════╗
  ║   PORTFOLIO CLI CONSOLE    ║
  ║   ─────────────────────    ║
  ║   QA • DEV • SYSTEM OPS    ║
  ╚════════════════════════════╝`}
            </div>

            <TerminalLogEntries logs={logs} />

            <form onSubmit={handleSubmit} className={styles.terminalForm}>
              <label className={styles.terminalPrompt} htmlFor="terminal-input">
                {chatSessionActive ? CHAT_PROMPT : PROMPT}
              </label>
              <input
                id="terminal-input"
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  playKeySound();
                }}
                onKeyDown={handleInputKeyDown}
                className={styles.terminalInput}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal command prompt"
              />
            </form>

            <div className={styles.commandHint} role="status" aria-live="polite">
              <span>{commandHint}</span>
            </div>
          </div>
        </div>

        <div className={styles.quickActions} aria-label="Terminal action shortcuts">
          {/* Button 1: HELP */}
          <button
            type="button"
            className={styles.quickAction}
            onClick={(event) => {
              event.stopPropagation();
              if (chatSessionActive) {
                void handleChatInput('help');
              } else {
                void runCommand('help');
              }
            }}
          >
            ❓ HELP
          </button>

          {/* Button 2: AI CHAT MODE */}
          <button
            type="button"
            className={`${styles.quickAction} ${chatSessionActive ? styles.activeAction : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              if (!chatSessionActive) {
                void runCommand('chat');
              }
            }}
          >
            🤖 AI CHAT MODE
          </button>

          {/* Button 3: CLI MODE */}
          <button
            type="button"
            className={`${styles.quickAction} ${!chatSessionActive ? styles.activeAction : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              if (chatSessionActive) {
                setChatSessionActive(false);
                RetroSound.playClick();
                appendLogs([
                  {
                    id: makeId(),
                    type: 'system',
                    text: 'NOVA: "Companion mode deactivated. Returning to standard shell..."',
                  },
                ]);
              }
            }}
          >
            ⌨️ CLI MODE
          </button>

          {landing && isActiveMode && isIntroComplete && (
            <button
              type="button"
              className={`${styles.quickAction} ${styles.quitAction}`}
              onClick={(event) => {
                event.stopPropagation();
                setIsActiveMode(false);
                RetroSound.playClick();
              }}
            >
              [ ✖ QUIT CLI ]
            </button>
          )}
        </div>

        <div className={styles.terminalStatusBar}>
          <span>Tab complete</span>
          <span>↑↓ history</span>
          <span>Ctrl+L clear</span>
          <span>Ctrl+C cancel</span>
        </div>
      </WindowFrame>
    </section>
  );
}
