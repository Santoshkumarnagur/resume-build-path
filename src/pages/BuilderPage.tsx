import NavBar from "@/components/resume/NavBar";
import BuilderForm from "@/components/resume/BuilderForm";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import { useResumeData } from "@/hooks/useResumeData";

const BuilderPage = () => {
  const { data, updateField, loadSample } = useResumeData();

  return (
    <div className="flex flex-col h-screen bg-background">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Form */}
        <div className="flex-[7] overflow-auto p-6 border-r border-border">
          <BuilderForm data={data} updateField={updateField} loadSample={loadSample} />
        </div>
        {/* Right — Live Preview */}
        <div className="flex-[5] overflow-auto p-6 bg-surface">
          <div className="sticky top-0">
            <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Live Preview
            </h2>
            <ResumePreviewPanel data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
