import { useMemo } from "react";
import type { ResumeData } from "./useResumeData";

export interface ATSResult {
  score: number;
  suggestions: string[];
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasMetric(text: string): boolean {
  return /\d+%|\d+[xX]|\d+k|\d+\+|\$\d+/.test(text);
}

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  // +15 summary 40-120 words
  const summaryWords = countWords(data.summary);
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else {
    suggestions.push("Write a stronger summary (40–120 words).");
  }

  // +10 at least 2 projects
  if (data.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push("Add at least 2 projects.");
  }

  // +10 at least 1 experience
  if (data.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 work experience entry.");
  }

  // +10 skills >= 8
  const skillCount = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  if (skillCount >= 8) {
    score += 10;
  } else {
    suggestions.push("Add more skills (target 8+).");
  }

  // +10 GitHub or LinkedIn
  if (data.github || data.linkedin) {
    score += 10;
  } else {
    suggestions.push("Add a GitHub or LinkedIn link.");
  }

  // +15 measurable impact
  const allBullets = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ];
  if (allBullets.some(hasMetric)) {
    score += 15;
  } else {
    suggestions.push("Add measurable impact (numbers) in bullets.");
  }

  // +10 education complete
  const eduComplete =
    data.education.length > 0 &&
    data.education.every(
      (e) => e.institution && e.degree && e.field && e.startDate && e.endDate
    );
  if (eduComplete) {
    score += 10;
  } else if (data.education.length === 0) {
    suggestions.push("Add your education details.");
  } else {
    suggestions.push("Complete all education fields.");
  }

  return {
    score: Math.min(score, 100),
    suggestions: suggestions.slice(0, 3),
  };
}

export function useATSScore(data: ResumeData): ATSResult {
  return useMemo(() => computeATSScore(data), [data]);
}
