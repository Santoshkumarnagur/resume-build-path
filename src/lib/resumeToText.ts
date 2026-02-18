import type { ResumeData } from "@/hooks/useResumeData";

export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];

  if (data.name) lines.push(data.name, "");

  const contact = [data.email, data.phone, data.location].filter(Boolean).join(" | ");
  if (contact) lines.push(contact, "");

  if (data.summary) {
    lines.push("SUMMARY", data.summary, "");
  }

  if (data.education.length > 0) {
    lines.push("EDUCATION");
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field} — ${edu.institution} (${edu.startDate} – ${edu.endDate})`);
    });
    lines.push("");
  }

  if (data.experience.length > 0) {
    lines.push("EXPERIENCE");
    data.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`);
      if (exp.description) lines.push(`  ${exp.description}`);
    });
    lines.push("");
  }

  if (data.projects.length > 0) {
    lines.push("PROJECTS");
    data.projects.forEach((proj) => {
      lines.push(proj.name);
      if (proj.techStack.length > 0) lines.push(`  Tech: ${proj.techStack.join(", ")}`);
      if (proj.description) lines.push(`  ${proj.description}`);
      if (proj.liveUrl) lines.push(`  Live: ${proj.liveUrl}`);
      if (proj.githubUrl) lines.push(`  GitHub: ${proj.githubUrl}`);
    });
    lines.push("");
  }

  const allSkills = [
    ...data.skills.technical,
    ...data.skills.soft,
    ...data.skills.tools,
  ];
  if (allSkills.length > 0) {
    lines.push("SKILLS", allSkills.join(", "), "");
  }

  const links = [data.github, data.linkedin].filter(Boolean);
  if (links.length > 0) {
    lines.push("LINKS", ...links, "");
  }

  return lines.join("\n").trim();
}
