import NavBar from "@/components/resume/NavBar";
import { FileText } from "lucide-react";

const ResumeProofPage = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <NavBar />
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
          <FileText className="w-7 h-7 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Proof of Build</h1>
        <p className="text-sm text-muted-foreground font-mono">
          Artifact submission will be available here once scoring and export features are implemented.
        </p>
      </div>
    </div>
  </div>
);

export default ResumeProofPage;
