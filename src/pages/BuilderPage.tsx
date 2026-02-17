import NavBar from "@/components/resume/NavBar";
import BuilderForm from "@/components/resume/BuilderForm";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import ATSScorePanel from "@/components/resume/ATSScorePanel";
import TemplateTabs from "@/components/resume/TemplateTabs";
import { useResumeData } from "@/hooks/useResumeData";
import { useATSScore } from "@/hooks/useATSScore";
import { useTemplate } from "@/hooks/useTemplate";

const BuilderPage = () => {
  const { data, updateField, loadSample } = useResumeData();
  const atsResult = useATSScore(data);
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Form */}
        <div className="flex-[7] overflow-auto p-6 border-r border-border">
          <BuilderForm data={data} updateField={updateField} loadSample={loadSample} />
        </div>
        {/* Right — Live Preview + ATS */}
        <div className="flex-[5] overflow-auto p-6 bg-surface space-y-6">
          <ATSScorePanel result={atsResult} data={data} />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Live Preview
              </h2>
              <TemplateTabs value={template} onChange={setTemplate} />
            </div>
            <ResumePreviewPanel data={data} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
