import {
  capabilities,
  education,
  experiences,
  profile,
  works,
} from "./portfolioData";

/** A small, deterministic index. It does not generate or infer credentials. */
export function portfolioAnswer(query: string): string {
  const command = query.trim().toLowerCase();
  if (/\b(contact|email|social|linkedin|instagram|tiktok)\b/.test(command)) {
    return [
      profile.email,
      ...profile.socials.map((social) => `${social.label}: ${social.url}`),
    ].join("\n");
  }
  if (/\b(cv|resume|education)\b/.test(command)) {
    return `${education.degree}\n${education.institution}, ${education.period}\nGPA: ${education.gpa}\n\nCV: ${profile.resume}`;
  }
  if (/\b(experience|career|jobs)\b/.test(command)) {
    return experiences
      .map(
        (item) =>
          `${item.company}\n${item.role} | ${item.period}\n${item.detail}`,
      )
      .join("\n\n");
  }
  if (/\b(skills|tools|capabilities)\b/.test(command)) {
    return capabilities
      .map((group) => `${group.title}\n${group.items.join(" · ")}`)
      .join("\n\n");
  }
  const match = works.find(
    (work) =>
      command.includes(work.slug) ||
      command.includes(work.company.toLowerCase()) ||
      (command.includes("pln") && work.theme === "analytics") ||
      (command.includes("its") && work.theme === "creative"),
  );
  if (match)
    return `${match.company} — ${match.role}\n${match.summary}\n\nRead more: /work/${match.slug}`;
  if (/\b(work|projects|portfolio)\b/.test(command)) {
    return works
      .map(
        (work) =>
          `${work.number}. ${work.company} / ${work.category}\n${work.summary}\n/work/${work.slug}`,
      )
      .join("\n\n");
  }
  if (/\b(about|who|devy|hello|hi)\b/.test(command))
    return `${profile.name}\n${profile.disciplines.join(" · ")}\n\n${profile.introduction}`;
  return "Available commands:\n\nabout       A quick introduction\nwork        Four selected work overviews\nexperience  Roles and organisations\nskills      Tools and capabilities\ncontact     Email and social links\ncv          Education and CV download\nclear       Clear this window\n\nYou can also try sampoerna, pln, its, or team liquid.\nUse ↑ and ↓ to browse your command history.";
}
