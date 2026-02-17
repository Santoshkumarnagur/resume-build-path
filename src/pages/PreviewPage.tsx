import NavBar from "@/components/resume/NavBar";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import TemplateTabs from "@/components/resume/TemplateTabs";
import { useResumeData } from "@/hooks/useResumeData";
import { useTemplate } from "@/hooks/useTemplate";

const PreviewPage = () => {
  const { data } = useResumeData();
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-background">
        <NavBar />
      </div>
      <div className="flex justify-center py-4">
        <TemplateTabs value={template} onChange={setTemplate} />
      </div>
      <div className="flex-1 py-8 px-4">
        <ResumePreviewPanel data={data} printMode template={template} />
      </div>
    </div>
  );
};

export default PreviewPage;
