import { useMemo } from "react";
import type { ResumeData } from "./useResumeData";

export interface ATSResult {
  score: number;
  label: "Needs Work" | "Getting There" | "Strong Resume";
  color: "red" | "amber" | "green";
  suggestions: Array<{ text: string; points: number }>;
}

const ACTION_VERBS = [
  "built","led","designed","improved","developed","created","managed","launched",
  "implemented","delivered","optimized","reduced","increased","achieved","drove",
  "architected","scaled","automated","deployed","shipped","spearheaded","established",
  "collaborated","mentored","executed","streamlined","engineered","migrated",
];

function hasActionVerb(text: string): boolean {
  const lower = text.toLowerCase();
  return ACTION_VERBS.some((v) => new RegExp(`\\b${v}\\b`).test(lower));
}

function totalSkills(data: ResumeData): number {
  const cats = data.skillCategories;
  const fromCats = (cats?.technical?.length ?? 0) + (cats?.soft?.length ?? 0) + (cats?.tools?.length ?? 0);
  if (fromCats > 0) return fromCats;
  return data.skills.split(",").map((s) => s.trim()).filter(Boolean).length;
}

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: Array<{ text: string; points: number }> = [];

  // +10 name
  if (data.name.trim()) {
    score += 10;
  } else {
    suggestions.push({ text: "Add your full name (+10 points)", points: 10 });
  }

  // +10 email
  if (data.email.trim()) {
    score += 10;
  } else {
    suggestions.push({ text: "Add your email address (+10 points)", points: 10 });
  }

  // +10 summary > 50 chars
  if (data.summary.trim().length > 50) {
    score += 10;
  } else {
    suggestions.push({ text: "Write a professional summary (50+ chars) (+10 points)", points: 10 });
  }

  // +15 at least 1 experience with description
  if (data.experience.length >= 1 && data.experience.some((e) => e.description.trim())) {
    score += 15;
  } else {
    suggestions.push({ text: "Add at least 1 work experience with bullet points (+15 points)", points: 15 });
  }

  // +10 at least 1 education
  if (data.education.length >= 1) {
    score += 10;
  } else {
    suggestions.push({ text: "Add your education details (+10 points)", points: 10 });
  }

  // +10 at least 5 skills
  if (totalSkills(data) >= 5) {
    score += 10;
  } else {
    suggestions.push({ text: "Add at least 5 skills (+10 points)", points: 10 });
  }

  // +10 at least 1 project
  if (data.projects.length >= 1) {
    score += 10;
  } else {
    suggestions.push({ text: "Add at least 1 project (+10 points)", points: 10 });
  }

  // +5 phone
  if (data.phone.trim()) {
    score += 5;
  } else {
    suggestions.push({ text: "Add your phone number (+5 points)", points: 5 });
  }

  // +5 LinkedIn
  if (data.linkedin.trim()) {
    score += 5;
  } else {
    suggestions.push({ text: "Add your LinkedIn URL (+5 points)", points: 5 });
  }

  // +5 GitHub
  if (data.github.trim()) {
    score += 5;
  } else {
    suggestions.push({ text: "Add your GitHub URL (+5 points)", points: 5 });
  }

  // +10 action verbs in summary or experience descriptions
  const allText = [data.summary, ...data.experience.map((e) => e.description)].join(" ");
  if (hasActionVerb(allText)) {
    score += 10;
  } else {
    suggestions.push({ text: "Use action verbs in summary/experience (built, led, designed…) (+10 points)", points: 10 });
  }

  const capped = Math.min(score, 100);
  const label: ATSResult["label"] =
    capped >= 71 ? "Strong Resume" : capped >= 41 ? "Getting There" : "Needs Work";
  const color: ATSResult["color"] =
    capped >= 71 ? "green" : capped >= 41 ? "amber" : "red";

  // Sort suggestions by point value descending, show top 5
  const sorted = suggestions.sort((a, b) => b.points - a.points).slice(0, 5);

  return { score: capped, label, color, suggestions: sorted };
}

export function useATSScore(data: ResumeData): ATSResult {
  return useMemo(() => computeATSScore(data), [data]);
}
