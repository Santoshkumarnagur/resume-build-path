import NavBar from "@/components/resume/NavBar";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import TemplateAndColorPicker from "@/components/resume/TemplateAndColorPicker";
import ExportBar from "@/components/resume/ExportBar";
import ATSScorePanel from "@/components/resume/ATSScorePanel";
import { useResumeData } from "@/hooks/useResumeData";
import { useTemplate } from "@/hooks/useTemplate";
import { useATSScore } from "@/hooks/useATSScore";

const PreviewPage = () => {
  const { data } = useResumeData();
  const { template, setTemplate, accentColor, setAccentColor } = useTemplate();
  const atsResult = useATSScore(data);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Nav */}
      <div className="print:hidden">
        <NavBar />
      </div>

      <div className="flex flex-1 overflow-hidden print:block">
        {/* Left sidebar — ATS + controls */}
        <aside className="w-80 shrink-0 border-r border-border overflow-y-auto p-5 space-y-5 print:hidden">
          <ATSScorePanel result={atsResult} />

          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Template & Color
            </p>
            <TemplateAndColorPicker
              template={template}
              onTemplateChange={setTemplate}
              accentColor={accentColor}
              onColorChange={setAccentColor}
            />
          </div>

          <ExportBar data={data} />
        </aside>

        {/* Right — Resume preview */}
        <main className="flex-1 overflow-auto bg-muted/30 py-8 px-6 print:py-0 print:px-0 print:bg-white">
          <ResumePreviewPanel
            data={data}
            printMode={false}
            template={template}
            accentColor={accentColor}
          />
        </main>
      </div>
    </div>
  );
};

export default PreviewPage;
