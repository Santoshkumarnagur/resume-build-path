import { useState, useCallback } from "react";

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillCategories {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategories;
  github: string;
  linkedin: string;
}

const STORAGE_KEY = "rb_resume_data";

const emptyResume: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  github: "",
  linkedin: "",
};

const sampleResume: ResumeData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Full-stack software engineer with 4+ years of experience building scalable web applications. Passionate about clean architecture, developer tooling, and shipping products that users love.",
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S.",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2020",
    },
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Software Engineer",
      startDate: "2022",
      endDate: "Present",
      description:
        "Led development of a microservices platform serving 2M+ users. Reduced API latency by 40% through caching and query optimization.",
    },
    {
      company: "StartupXYZ",
      role: "Software Engineer",
      startDate: "2020",
      endDate: "2022",
      description:
        "Built the core product from 0 to 1 using React, Node.js, and PostgreSQL. Shipped 15+ features across 6 sprints.",
    },
  ],
  projects: [
    {
      name: "DevDash",
      description:
        "Open-source developer dashboard aggregating GitHub, Jira, and Slack metrics into a single view.",
      techStack: ["React", "TypeScript", "GraphQL"],
      liveUrl: "",
      githubUrl: "https://github.com/alexj/devdash",
    },
  ],
  skills: {
    technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL", "Python"],
    soft: ["Team Leadership", "Problem Solving", "Communication"],
    tools: ["Git", "Docker", "AWS", "CI/CD"],
  },
  github: "https://github.com/alexjohnson",
  linkedin: "https://linkedin.com/in/alexjohnson",
};

/** Migrate old flat format to new categorized format */
function migrateData(raw: any): ResumeData {
  const d = { ...emptyResume, ...raw };

  // Migrate skills from comma-separated string to categories
  if (typeof d.skills === "string") {
    const items = (d.skills as string).split(",").map((s: string) => s.trim()).filter(Boolean);
    d.skills = { technical: items, soft: [], tools: [] };
  } else if (d.skills && typeof d.skills === "object") {
    d.skills = {
      technical: Array.isArray(d.skills.technical) ? d.skills.technical : [],
      soft: Array.isArray(d.skills.soft) ? d.skills.soft : [],
      tools: Array.isArray(d.skills.tools) ? d.skills.tools : [],
    };
  }

  // Migrate projects
  if (Array.isArray(d.projects)) {
    d.projects = d.projects.map((p: any) => ({
      name: p.name ?? "",
      description: p.description ?? "",
      techStack: Array.isArray(p.techStack)
        ? p.techStack
        : typeof p.techStack === "string"
          ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
          : [],
      liveUrl: p.liveUrl ?? p.link ?? "",
      githubUrl: p.githubUrl ?? "",
    }));
  }

  return d as ResumeData;
}

export function useResumeData() {
  const loadFromStorage = (): ResumeData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? migrateData(JSON.parse(stored)) : emptyResume;
    } catch {
      return emptyResume;
    }
  };

  const [data, setDataState] = useState<ResumeData>(loadFromStorage);

  const setData = useCallback((updater: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    setDataState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const loadSample = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleResume));
    setDataState(sampleResume);
  }, []);

  const updateField = useCallback(
    <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [setData]
  );

  return { data, setData, updateField, loadSample };
}
