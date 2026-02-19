import type { ResumeData } from "@/hooks/useResumeData";
import type { TemplateName } from "@/hooks/useTemplate";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";

interface Props {
  data: ResumeData;
  printMode?: boolean;
  template?: TemplateName;
  accentColor?: string;
}

/* ── Shared helpers ────────────────────────────────── */

const SkillPills = ({
  tags,
  pillCls,
}: {
  tags: string[];
  pillCls: string;
}) => (
  <div className="flex flex-wrap gap-1">
    {tags.map((s, i) => (
      <span key={i} className={pillCls}>{s}</span>
    ))}
  </div>
);

const AllSkills = ({
  data,
  pillCls,
  labelCls,
}: {
  data: ResumeData;
  pillCls: string;
  labelCls: string;
}) => {
  const cats = data.skillCategories;
  const hasCats = cats?.technical?.length || cats?.soft?.length || cats?.tools?.length;

  if (hasCats) {
    return (
      <>
        {cats!.technical?.length > 0 && (
          <div className="mb-2">
            <p className={labelCls}>Technical</p>
            <SkillPills tags={cats!.technical} pillCls={pillCls} />
          </div>
        )}
        {cats!.soft?.length > 0 && (
          <div className="mb-2">
            <p className={labelCls}>Soft Skills</p>
            <SkillPills tags={cats!.soft} pillCls={pillCls} />
          </div>
        )}
        {cats!.tools?.length > 0 && (
          <div className="mb-2">
            <p className={labelCls}>Tools & Technologies</p>
            <SkillPills tags={cats!.tools} pillCls={pillCls} />
          </div>
        )}
      </>
    );
  }

  if (data.skills) {
    return <SkillPills tags={data.skills.split(",").map((s) => s.trim()).filter(Boolean)} pillCls={pillCls} />;
  }

  return null;
};

const hasAnySkills = (data: ResumeData) =>
  data.skills ||
  data.skillCategories?.technical?.length ||
  data.skillCategories?.soft?.length ||
  data.skillCategories?.tools?.length;

const TechTags = ({ proj, pillCls }: { proj: ResumeData["projects"][number]; pillCls: string }) => {
  const tags = proj.techStackTags?.length
    ? proj.techStackTags
    : proj.techStack
      ? proj.techStack.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.map((t, j) => (
        <span key={j} className={pillCls}>{t}</span>
      ))}
    </div>
  );
};

const LinkIcons = ({ proj, cls }: { proj: ResumeData["projects"][number]; cls: string }) => (
  <div className="flex items-center gap-2">
    {proj.link && (
      <a href={proj.link} target="_blank" rel="noopener noreferrer" className={cls}>
        <ExternalLink className="w-3 h-3" />
      </a>
    )}
    {proj.githubUrl && (
      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className={cls}>
        <Github className="w-3 h-3" />
      </a>
    )}
  </div>
);

/* ── Empty state ───────────────────────────────────── */

const EmptyState = ({ className }: { className: string }) => (
  <div className={`${className} flex items-center justify-center min-h-[600px]`}>
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-400">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
        </svg>
      </div>
      <p className="text-sm text-gray-400 font-mono">Fill in the form to see your resume here</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════
   CLASSIC TEMPLATE — Single column, serif, horizontal rules
   ══════════════════════════════════════════════════════ */

const ClassicTemplate = ({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) => {
  const a = `hsl(${accent})`;
  const txt = printMode ? "text-black" : "text-foreground";
  const txt2 = printMode ? "text-gray-600" : "text-muted-foreground";
  const pill = `text-xs px-2 py-0.5 rounded ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`;
  const label = `text-[10px] font-semibold uppercase tracking-wider mb-1 ${txt2}`;

  const SectionHead = ({ title }: { title: string }) => (
    <div className="mb-2 border-b pb-1" style={{ borderColor: a }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: a }}>{title}</h2>
    </div>
  );

  return (
    <div className="font-serif">
      {/* Header */}
      <div className="text-center mb-6">
        {data.name && <h1 className={`text-2xl font-bold ${txt}`}>{data.name}</h1>}
        <div className={`flex items-center justify-center gap-4 mt-2 text-xs ${txt2} flex-wrap`}>
          {data.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.email}</span>}
          {data.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.phone}</span>}
          {data.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.location}</span>}
        </div>
        <div className={`flex items-center justify-center gap-4 mt-1 text-xs ${txt2}`}>
          {data.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{data.github}</span>}
          {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{data.linkedin}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-5"><SectionHead title="Summary" /><p className={`text-sm leading-relaxed ${txt2}`}>{data.summary}</p></div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-5">
          <SectionHead title="Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-semibold ${txt}`}>{exp.role}</p>
                <span className={`text-xs font-mono ${txt2}`}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className={`text-xs ${txt2}`}>{exp.company}</p>
              {exp.description && <p className={`text-xs mt-1 ${txt2}`}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-5">
          <SectionHead title="Education" />
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-semibold ${txt}`}>{edu.degree} in {edu.field}</p>
                <span className={`text-xs font-mono ${txt2}`}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className={`text-xs ${txt2}`}>{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-5">
          <SectionHead title="Projects" />
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-semibold ${txt}`}>{proj.name}</p>
                <LinkIcons proj={proj} cls={txt2} />
              </div>
              <TechTags proj={proj} pillCls={pill} />
              {proj.description && <p className={`text-xs mt-1 ${txt2}`}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {hasAnySkills(data) && (
        <div className="mb-5"><SectionHead title="Skills" /><AllSkills data={data} pillCls={pill} labelCls={label} /></div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MODERN TEMPLATE — Two-column, colored sidebar
   ══════════════════════════════════════════════════════ */

const ModernTemplate = ({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) => {
  const a = `hsl(${accent})`;
  const txt = printMode ? "text-black" : "text-foreground";
  const txt2 = printMode ? "text-gray-600" : "text-muted-foreground";
  const pill = `text-xs px-2.5 py-1 rounded-full ${printMode ? "bg-gray-100 text-gray-700" : "bg-secondary text-secondary-foreground"}`;
  const sidebarPill = "text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/90";
  const label = `text-[10px] font-semibold uppercase tracking-wider mb-1 ${txt2}`;
  const sidebarLabel = "text-[10px] font-semibold uppercase tracking-wider mb-1 text-white/70";

  const SectionHead = ({ title }: { title: string }) => (
    <div className="mb-2 border-b-2 pb-1" style={{ borderColor: a }}>
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: a }}>{title}</h2>
    </div>
  );

  return (
    <div className="font-sans flex min-h-[700px]">
      {/* Sidebar */}
      <div className="w-[35%] p-5 text-white rounded-l-lg" style={{ backgroundColor: a }}>
        {data.name && <h1 className="text-lg font-bold mb-4 text-white">{data.name}</h1>}

        {/* Contact */}
        <div className="space-y-1.5 text-[11px] text-white/90 mb-5">
          {data.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{data.email}</div>}
          {data.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{data.phone}</div>}
          {data.location && <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{data.location}</div>}
          {data.github && <div className="flex items-center gap-1.5"><Github className="w-3 h-3" /><span className="break-all">{data.github}</span></div>}
          {data.linkedin && <div className="flex items-center gap-1.5"><Linkedin className="w-3 h-3" /><span className="break-all">{data.linkedin}</span></div>}
        </div>

        {/* Skills in sidebar */}
        {hasAnySkills(data) && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70 mb-2">Skills</p>
            <AllSkills data={data} pillCls={sidebarPill} labelCls={sidebarLabel} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {data.summary && (
          <div className="mb-5"><SectionHead title="Summary" /><p className={`text-sm leading-relaxed ${txt2}`}>{data.summary}</p></div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-5">
            <SectionHead title="Experience" />
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className={`text-sm font-semibold ${txt}`}>{exp.role}</p>
                  <span className={`text-xs font-mono ${txt2}`}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <p className={`text-xs ${txt2}`}>{exp.company}</p>
                {exp.description && <p className={`text-xs mt-1 ${txt2}`}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-5">
            <SectionHead title="Education" />
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className={`text-sm font-semibold ${txt}`}>{edu.degree} in {edu.field}</p>
                  <span className={`text-xs font-mono ${txt2}`}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className={`text-xs ${txt2}`}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-5">
            <SectionHead title="Projects" />
            {data.projects.map((proj, i) => (
              <div key={i} className={`mb-3 p-3 rounded-md ${printMode ? "border border-gray-200" : "border border-border"}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${txt}`}>{proj.name}</p>
                  <LinkIcons proj={proj} cls={txt2} />
                </div>
                <TechTags proj={proj} pillCls={pill} />
                {proj.description && <p className={`text-xs mt-1.5 ${txt2}`}>{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MINIMAL TEMPLATE — Clean, no borders, generous whitespace
   ══════════════════════════════════════════════════════ */

const MinimalTemplate = ({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) => {
  const txt = printMode ? "text-black" : "text-foreground";
  const txt2 = printMode ? "text-gray-500" : "text-muted-foreground";
  const pill = `text-xs px-2 py-0.5 ${printMode ? "bg-gray-50 text-gray-600" : "bg-secondary/50 text-secondary-foreground"}`;
  const label = `text-[10px] font-medium uppercase tracking-wider mb-1 ${txt2}`;

  const SectionHead = ({ title }: { title: string }) => (
    <h2 className={`text-[11px] font-medium uppercase tracking-[0.2em] mb-3 ${txt2}`}>{title}</h2>
  );

  return (
    <div className="font-sans text-[13px]">
      {/* Header */}
      <div className="mb-8">
        {data.name && <h1 className={`text-2xl font-light tracking-wide ${txt}`}>{data.name}</h1>}
        <div className={`flex items-center gap-4 mt-2 text-xs ${txt2} flex-wrap`}>
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        <div className={`flex items-center gap-4 mt-1 text-xs ${txt2}`}>
          {data.github && <span>{data.github}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-7"><SectionHead title="Summary" /><p className={`text-sm leading-relaxed ${txt2}`}>{data.summary}</p></div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-7">
          <SectionHead title="Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-medium ${txt}`}>{exp.role}</p>
                <span className={`text-xs ${txt2}`}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className={`text-xs ${txt2}`}>{exp.company}</p>
              {exp.description && <p className={`text-xs mt-1.5 leading-relaxed ${txt2}`}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-7">
          <SectionHead title="Education" />
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <p className={`text-sm font-medium ${txt}`}>{edu.degree} in {edu.field}</p>
                <span className={`text-xs ${txt2}`}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className={`text-xs ${txt2}`}>{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-7">
          <SectionHead title="Projects" />
          {data.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${txt}`}>{proj.name}</p>
                <LinkIcons proj={proj} cls={txt2} />
              </div>
              <TechTags proj={proj} pillCls={pill} />
              {proj.description && <p className={`text-xs mt-1.5 leading-relaxed ${txt2}`}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {hasAnySkills(data) && (
        <div className="mb-7"><SectionHead title="Skills" /><AllSkills data={data} pillCls={pill} labelCls={label} /></div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   Main wrapper
   ══════════════════════════════════════════════════════ */

const ResumePreviewPanel = ({ data, printMode, template = "classic", accentColor = "168 60% 40%" }: Props) => {
  const hasContent =
    data.name || data.summary || data.education.length || data.experience.length || data.projects.length || hasAnySkills(data);

  const base = printMode
    ? "bg-white text-black p-10 max-w-[800px] mx-auto"
    : "bg-card border border-border rounded-lg p-8 text-foreground";

  if (!hasContent) return <EmptyState className={base} />;

  const inner = template === "modern"
    ? <ModernTemplate data={data} accent={accentColor} printMode={printMode} />
    : template === "minimal"
      ? <MinimalTemplate data={data} accent={accentColor} printMode={printMode} />
      : <ClassicTemplate data={data} accent={accentColor} printMode={printMode} />;

  return <div className={template === "modern" ? (printMode ? "bg-white max-w-[800px] mx-auto overflow-hidden" : "bg-card border border-border rounded-lg overflow-hidden text-foreground") : base}>{inner}</div>;
};

export default ResumePreviewPanel;
