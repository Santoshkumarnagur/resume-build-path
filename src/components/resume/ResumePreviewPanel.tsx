import type { ResumeData } from "@/hooks/useResumeData";
import type { TemplateName } from "@/hooks/useTemplate";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";

interface Props {
  data: ResumeData;
  printMode?: boolean;
  template?: TemplateName;
}

const templateStyles: Record<TemplateName, {
  wrapper: string;
  printWrapper: string;
  headerAlign: string;
  sectionBorder: string;
  skillStyle: string;
}> = {
  classic: {
    wrapper: "font-serif",
    printWrapper: "font-serif",
    headerAlign: "text-center",
    sectionBorder: "border-b pb-1 mb-2",
    skillStyle: "px-2 py-0.5 rounded",
  },
  modern: {
    wrapper: "font-sans",
    printWrapper: "font-sans",
    headerAlign: "text-left",
    sectionBorder: "border-b-2 pb-1 mb-2",
    skillStyle: "px-2.5 py-1 rounded-full",
  },
  minimal: {
    wrapper: "font-mono text-[13px]",
    printWrapper: "font-mono text-[13px]",
    headerAlign: "text-center",
    sectionBorder: "mb-2",
    skillStyle: "px-2 py-0.5",
  },
};

const Section = ({
  title,
  children,
  sectionBorder,
}: {
  title: string;
  children: React.ReactNode;
  sectionBorder: string;
}) => (
  <div className="mb-5">
    <h2
      className={`text-xs font-semibold uppercase tracking-widest text-muted-foreground border-border ${sectionBorder}`}
    >
      {title}
    </h2>
    {children}
  </div>
);

const ResumePreviewPanel = ({ data, printMode, template = "classic" }: Props) => {
  const ts = templateStyles[template];

  const base = printMode
    ? `bg-white text-black p-10 max-w-[800px] mx-auto ${ts.printWrapper}`
    : `bg-card border border-border rounded-lg p-8 text-foreground ${ts.wrapper}`;

  const hasSkills = data.skills || data.skillCategories?.technical?.length || data.skillCategories?.soft?.length || data.skillCategories?.tools?.length;
  const hasContent =
    data.name || data.summary || data.education.length || data.experience.length || data.projects.length || hasSkills;

  if (!hasContent) {
    return (
      <div className={`${base} flex items-center justify-center min-h-[600px]`}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <FileTextIcon className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            Fill in the form to see your resume here
          </p>
        </div>
      </div>
    );
  }

  const textPrimary = printMode ? "text-black" : "text-foreground";
  const textSecondary = printMode ? "text-gray-600" : "text-muted-foreground";

  return (
    <div className={base}>
      {/* Header */}
      <div className={`mb-6 ${ts.headerAlign}`}>
        {data.name && <h1 className={`text-2xl font-bold ${textPrimary}`}>{data.name}</h1>}
        <div className={`flex items-center ${ts.headerAlign === "text-center" ? "justify-center" : "justify-start"} gap-4 mt-2 text-xs ${textSecondary} flex-wrap`}>
          {data.email && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.email}</span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.phone}</span>
          )}
          {data.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.location}</span>
          )}
        </div>
        <div className={`flex items-center ${ts.headerAlign === "text-center" ? "justify-center" : "justify-start"} gap-4 mt-1 text-xs ${textSecondary}`}>
          {data.github && (
            <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.github}</span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.linkedin}</span>
          )}
        </div>
      </div>

      {data.summary && (
        <Section title="Summary" sectionBorder={ts.sectionBorder}>
          <p className={`text-sm leading-relaxed ${textSecondary}`}>{data.summary}</p>
        </Section>
      )}

      {data.experience.length > 0 && (
        <Section title="Experience" sectionBorder={ts.sectionBorder}>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-semibold ${textPrimary}`}>{exp.role}</p>
                <span className={`text-xs font-mono ${textSecondary}`}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className={`text-xs ${textSecondary}`}>{exp.company}</p>
              {exp.description && <p className={`text-xs mt-1 ${textSecondary}`}>{exp.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education" sectionBorder={ts.sectionBorder}>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-semibold ${textPrimary}`}>{edu.degree} in {edu.field}</p>
                <span className={`text-xs font-mono ${textSecondary}`}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className={`text-xs ${textSecondary}`}>{edu.institution}</p>
            </div>
          ))}
        </Section>
      )}

      {data.projects.length > 0 && (
        <Section title="Projects" sectionBorder={ts.sectionBorder}>
          {data.projects.map((proj, i) => (
            <div key={i} className={`mb-3 p-3 rounded-md ${printMode ? "border border-gray-200" : "border border-border bg-secondary/20"}`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-semibold ${textPrimary}`}>{proj.name}</p>
                <div className="flex items-center gap-2">
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`${textSecondary} hover:${textPrimary}`}>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className={`${textSecondary} hover:${textPrimary}`}>
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              {(proj.techStackTags?.length > 0 || proj.techStack) && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {(proj.techStackTags?.length > 0 ? proj.techStackTags : proj.techStack.split(",").map(s => s.trim()).filter(Boolean)).map((t, j) => (
                    <span key={j} className={`text-[10px] ${ts.skillStyle} ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {proj.description && <p className={`text-xs mt-1.5 ${textSecondary}`}>{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills - grouped by category */}
      {(data.skillCategories?.technical?.length > 0 || data.skillCategories?.soft?.length > 0 || data.skillCategories?.tools?.length > 0 || data.skills) && (
        <Section title="Skills" sectionBorder={ts.sectionBorder}>
          {data.skillCategories?.technical?.length > 0 && (
            <div className="mb-2">
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${textSecondary}`}>Technical</p>
              <div className="flex flex-wrap gap-1">
                {data.skillCategories.technical.map((s, i) => (
                  <span key={i} className={`text-xs ${ts.skillStyle} ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.skillCategories?.soft?.length > 0 && (
            <div className="mb-2">
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${textSecondary}`}>Soft Skills</p>
              <div className="flex flex-wrap gap-1">
                {data.skillCategories.soft.map((s, i) => (
                  <span key={i} className={`text-xs ${ts.skillStyle} ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.skillCategories?.tools?.length > 0 && (
            <div className="mb-2">
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${textSecondary}`}>Tools & Technologies</p>
              <div className="flex flex-wrap gap-1">
                {data.skillCategories.tools.map((s, i) => (
                  <span key={i} className={`text-xs ${ts.skillStyle} ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {/* Fallback for flat skills if no categories */}
          {!data.skillCategories?.technical?.length && !data.skillCategories?.soft?.length && !data.skillCategories?.tools?.length && data.skills && (
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((skill, i) => (
                <span key={i} className={`text-xs ${ts.skillStyle} ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`}>{skill.trim()}</span>
              ))}
            </div>
          )}
        </Section>
      )}
    </div>
  );
};

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

export default ResumePreviewPanel;
