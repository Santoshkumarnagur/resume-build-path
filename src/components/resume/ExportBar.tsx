import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Copy, Check, AlertTriangle } from "lucide-react";
import type { ResumeData } from "@/hooks/useResumeData";
import { resumeToPlainText } from "@/lib/resumeToText";
import { toast } from "@/hooks/use-toast";

interface Props {
  data: ResumeData;
}

const ExportBar = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);

  const hasName = data.name.trim().length > 0;
  const hasEntry = data.experience.length > 0 || data.projects.length > 0;
  const showWarning = !hasName || !hasEntry;

  const handlePrint = () => {
    window.print();
    toast({ title: "PDF export ready!", description: "Check your downloads." });
  };

  const handleCopy = async () => {
    const text = resumeToPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 print:hidden">
      <div className="flex items-center gap-3">
        <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </Button>
        <Button onClick={handleCopy} variant="outline" size="sm" className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Resume as Text"}
        </Button>
      </div>
      {showWarning && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <AlertTriangle className="w-3.5 h-3.5 text-warning" />
          Your resume may look incomplete.
        </p>
      )}
    </div>
  );
};

export default ExportBar;
