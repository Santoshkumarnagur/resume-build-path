import type { ResumeData, Education, Experience, Project } from "@/hooks/useResumeData";
import { Plus, Trash2, Sparkles } from "lucide-react";

interface Props {
  data: ResumeData;
  updateField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
  loadSample: () => void;
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono";

const SectionHeader = ({ title, onAdd }: { title: string; onAdd?: () => void }) => (
  <div className="flex items-center justify-between mt-6 mb-3">
    <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{title}</h3>
    {onAdd && (
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono transition-colors"
      >
        <Plus className="w-3 h-3" /> Add
      </button>
    )}
  </div>
);

const BuilderForm = ({ data, updateField, loadSample }: Props) => {
  const addEducation = () =>
    updateField("education", [
      ...data.education,
      { institution: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);

  const updateEducation = (i: number, patch: Partial<Education>) =>
    updateField(
      "education",
      data.education.map((e, idx) => (idx === i ? { ...e, ...patch } : e))
    );

  const removeEducation = (i: number) =>
    updateField("education", data.education.filter((_, idx) => idx !== i));

  const addExperience = () =>
    updateField("experience", [
      ...data.experience,
      { company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);

  const updateExperience = (i: number, patch: Partial<Experience>) =>
    updateField(
      "experience",
      data.experience.map((e, idx) => (idx === i ? { ...e, ...patch } : e))
    );

  const removeExperience = (i: number) =>
    updateField("experience", data.experience.filter((_, idx) => idx !== i));

  const addProject = () =>
    updateField("projects", [
      ...data.projects,
      { name: "", description: "", techStack: "", link: "" },
    ]);

  const updateProject = (i: number, patch: Partial<Project>) =>
    updateField(
      "projects",
      data.projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p))
    );

  const removeProject = (i: number) =>
    updateField("projects", data.projects.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-1">
      {/* Load Sample */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={loadSample}
          className="flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" /> Load Sample Data
        </button>
      </div>

      {/* Personal Info */}
      <SectionHeader title="Personal Info" />
      <div className="grid grid-cols-2 gap-3">
        <input className={inputCls} placeholder="Full Name" value={data.name} onChange={(e) => updateField("name", e.target.value)} />
        <input className={inputCls} placeholder="Email" value={data.email} onChange={(e) => updateField("email", e.target.value)} />
        <input className={inputCls} placeholder="Phone" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />
        <input className={inputCls} placeholder="Location" value={data.location} onChange={(e) => updateField("location", e.target.value)} />
      </div>

      {/* Summary */}
      <SectionHeader title="Summary" />
      <textarea
        className={`${inputCls} min-h-[80px]`}
        placeholder="Professional summary..."
        value={data.summary}
        onChange={(e) => updateField("summary", e.target.value)}
      />

      {/* Education */}
      <SectionHeader title="Education" onAdd={addEducation} />
      {data.education.map((edu, i) => (
        <div key={i} className="p-3 rounded-md border border-border bg-surface mb-2">
          <div className="flex justify-end">
            <button type="button" onClick={() => removeEducation(i)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input className={inputCls} placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(i, { institution: e.target.value })} />
            <input className={inputCls} placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, { degree: e.target.value })} />
            <input className={inputCls} placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(i, { field: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <input className={inputCls} placeholder="Start" value={edu.startDate} onChange={(e) => updateEducation(i, { startDate: e.target.value })} />
              <input className={inputCls} placeholder="End" value={edu.endDate} onChange={(e) => updateEducation(i, { endDate: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      {/* Experience */}
      <SectionHeader title="Experience" onAdd={addExperience} />
      {data.experience.map((exp, i) => (
        <div key={i} className="p-3 rounded-md border border-border bg-surface mb-2">
          <div className="flex justify-end">
            <button type="button" onClick={() => removeExperience(i)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input className={inputCls} placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, { company: e.target.value })} />
            <input className={inputCls} placeholder="Role" value={exp.role} onChange={(e) => updateExperience(i, { role: e.target.value })} />
            <input className={inputCls} placeholder="Start" value={exp.startDate} onChange={(e) => updateExperience(i, { startDate: e.target.value })} />
            <input className={inputCls} placeholder="End" value={exp.endDate} onChange={(e) => updateExperience(i, { endDate: e.target.value })} />
          </div>
          <textarea
            className={`${inputCls} min-h-[60px] mt-2`}
            placeholder="Description..."
            value={exp.description}
            onChange={(e) => updateExperience(i, { description: e.target.value })}
          />
        </div>
      ))}

      {/* Projects */}
      <SectionHeader title="Projects" onAdd={addProject} />
      {data.projects.map((proj, i) => (
        <div key={i} className="p-3 rounded-md border border-border bg-surface mb-2">
          <div className="flex justify-end">
            <button type="button" onClick={() => removeProject(i)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <input className={inputCls} placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(i, { name: e.target.value })} />
            <input className={inputCls} placeholder="Tech Stack" value={proj.techStack} onChange={(e) => updateProject(i, { techStack: e.target.value })} />
          </div>
          <textarea
            className={`${inputCls} min-h-[60px] mt-2`}
            placeholder="Description..."
            value={proj.description}
            onChange={(e) => updateProject(i, { description: e.target.value })}
          />
          <input className={`${inputCls} mt-2`} placeholder="Link" value={proj.link} onChange={(e) => updateProject(i, { link: e.target.value })} />
        </div>
      ))}

      {/* Skills */}
      <SectionHeader title="Skills" />
      <input
        className={inputCls}
        placeholder="TypeScript, React, Node.js, ..."
        value={data.skills}
        onChange={(e) => updateField("skills", e.target.value)}
      />

      {/* Links */}
      <SectionHeader title="Links" />
      <div className="grid grid-cols-2 gap-3">
        <input className={inputCls} placeholder="GitHub URL" value={data.github} onChange={(e) => updateField("github", e.target.value)} />
        <input className={inputCls} placeholder="LinkedIn URL" value={data.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
      </div>
    </div>
  );
};

export default BuilderForm;
