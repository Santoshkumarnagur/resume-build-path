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
      const tech = proj.techStackTags?.length ? proj.techStackTags.join(", ") : proj.techStack;
      if (tech) lines.push(`  Tech: ${tech}`);
      if (proj.description) lines.push(`  ${proj.description}`);
      if (proj.link) lines.push(`  ${proj.link}`);
      if (proj.githubUrl && proj.githubUrl !== proj.link) lines.push(`  ${proj.githubUrl}`);
    });
    lines.push("");
  }

  if (data.skillCategories?.technical?.length || data.skillCategories?.soft?.length || data.skillCategories?.tools?.length) {
    lines.push("SKILLS");
    if (data.skillCategories.technical.length) lines.push(`Technical: ${data.skillCategories.technical.join(", ")}`);
    if (data.skillCategories.soft.length) lines.push(`Soft Skills: ${data.skillCategories.soft.join(", ")}`);
    if (data.skillCategories.tools.length) lines.push(`Tools: ${data.skillCategories.tools.join(", ")}`);
    lines.push("");
  } else if (data.skills) {
    lines.push("SKILLS", data.skills, "");
  }

  const links = [data.github, data.linkedin].filter(Boolean);
  if (links.length > 0) {
    lines.push("LINKS", ...links, "");
  }

  return lines.join("\n").trim();
}
