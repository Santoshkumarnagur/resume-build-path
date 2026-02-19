import NavBar from "@/components/resume/NavBar";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import TemplateAndColorPicker from "@/components/resume/TemplateAndColorPicker";
import ExportBar from "@/components/resume/ExportBar";
import { useResumeData } from "@/hooks/useResumeData";
import { useTemplate } from "@/hooks/useTemplate";


const PreviewPage = () => {
  const { data } = useResumeData();
  const { template, setTemplate, accentColor, setAccentColor } = useTemplate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-background print:hidden">
        <NavBar />
      </div>
      <div className="flex justify-center py-4 print:hidden">
        <TemplateAndColorPicker
          template={template}
          onTemplateChange={setTemplate}
          accentColor={accentColor}
          onColorChange={setAccentColor}
        />
      </div>
      <div className="flex justify-center py-3 print:hidden">
        <ExportBar data={data} />
      </div>
      <div className="flex-1 py-8 px-4 print:py-0 print:px-0">
        <ResumePreviewPanel data={data} printMode template={template} accentColor={accentColor} />
      </div>
    </div>
  );
};

export default PreviewPage;
