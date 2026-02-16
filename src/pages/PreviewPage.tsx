import NavBar from "@/components/resume/NavBar";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import { useResumeData } from "@/hooks/useResumeData";

const PreviewPage = () => {
  const { data } = useResumeData();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-background">
        <NavBar />
      </div>
      <div className="flex-1 py-12 px-4">
        <ResumePreviewPanel data={data} printMode />
      </div>
    </div>
  );
};

export default PreviewPage;
