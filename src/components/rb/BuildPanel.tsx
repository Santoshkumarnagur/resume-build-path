import { useState } from "react";
import { useArtifacts } from "@/hooks/useArtifacts";
import { Check, Copy, ExternalLink, AlertCircle, Camera } from "lucide-react";

interface BuildPanelProps {
  stepNum: number;
  onArtifactSaved: () => void;
}

const BuildPanel = ({ stepNum, onArtifactSaved }: BuildPanelProps) => {
  const { getArtifact, saveArtifact } = useArtifacts();
  const [text, setText] = useState(getArtifact(stepNum) || "");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "worked" | "error">("idle");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWorked = () => {
    if (!text.trim()) return;
    saveArtifact(stepNum, text);
    setStatus("worked");
    onArtifactSaved();
  };

  return (
    <aside className="flex flex-col h-full border-l border-border bg-card">
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Build Panel
        </h3>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-3 overflow-auto">
        <label className="font-mono text-xs text-muted-foreground">
          Copy This Into Lovable
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your artifact content here..."
          className="flex-1 min-h-[200px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
        />

        <button
          onClick={handleCopy}
          disabled={!text.trim()}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-md border border-border bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-colors disabled:opacity-40"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>

        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-md bg-primary text-primary-foreground font-mono text-xs hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Build in Lovable
        </a>

        <div className="flex gap-2 mt-2">
          <button
            onClick={handleWorked}
            disabled={!text.trim()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border border-success/30 bg-success/10 text-success font-mono text-xs hover:bg-success/20 transition-colors disabled:opacity-40"
          >
            <Check className="w-3.5 h-3.5" />
            It Worked
          </button>
          <button
            onClick={() => setStatus("error")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border border-destructive/30 bg-destructive/10 text-destructive font-mono text-xs hover:bg-destructive/20 transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Error
          </button>
          <button
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border bg-secondary text-secondary-foreground font-mono text-xs hover:bg-secondary/80 transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {status === "worked" && (
          <p className="text-xs font-mono text-success mt-1">✓ Artifact saved for Step {stepNum}</p>
        )}
        {status === "error" && (
          <p className="text-xs font-mono text-destructive mt-1">Log the error and retry</p>
        )}
      </div>
    </aside>
  );
};

export default BuildPanel;
