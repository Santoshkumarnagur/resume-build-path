import type { ResumeData } from "@/hooks/useResumeData";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
  printMode?: boolean;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <h2 className={`text-xs font-semibold uppercase tracking-widest border-b pb-1 mb-2 ${
      // printMode uses black, live preview uses muted
      "text-muted-foreground border-border"
    }`}>
      {title}
    </h2>
    {children}
  </div>
);

const ResumePreviewPanel = ({ data, printMode }: Props) => {
  const base = printMode
    ? "bg-white text-black p-10 max-w-[800px] mx-auto font-sans"
    : "bg-card border border-border rounded-lg p-8 font-sans text-foreground";

  const hasContent =
    data.name || data.summary || data.education.length || data.experience.length || data.projects.length || data.skills;

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
      <div className="mb-6 text-center">
        {data.name && <h1 className={`text-2xl font-bold ${textPrimary}`}>{data.name}</h1>}
        <div className={`flex items-center justify-center gap-4 mt-2 text-xs ${textSecondary} flex-wrap`}>
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
        <div className={`flex items-center justify-center gap-4 mt-1 text-xs ${textSecondary}`}>
          {data.github && (
            <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.github}</span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.linkedin}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <Section title="Summary">
          <p className={`text-sm leading-relaxed ${textSecondary}`}>{data.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <Section title="Experience">
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

      {/* Education */}
      {data.education.length > 0 && (
        <Section title="Education">
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

      {/* Projects */}
      {data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className={`text-sm font-semibold ${textPrimary}`}>{proj.name}</p>
              {proj.techStack && <p className={`text-xs font-mono ${textSecondary}`}>{proj.techStack}</p>}
              {proj.description && <p className={`text-xs mt-1 ${textSecondary}`}>{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {data.skills && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {data.skills.split(",").map((skill, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-0.5 rounded ${
                  printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
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
