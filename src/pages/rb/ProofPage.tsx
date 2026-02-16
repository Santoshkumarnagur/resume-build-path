import { useState } from "react";
import { useArtifacts } from "@/hooks/useArtifacts";
import TopBar from "@/components/rb/TopBar";
import { Check, X, Copy, ExternalLink } from "lucide-react";

const ProofPage = () => {
  const { steps, isStepComplete } = useArtifacts();
  const [lovableLink, setLovableLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [copied, setCopied] = useState(false);

  const allComplete = steps.every((s) => isStepComplete(s.num));

  const handleCopySubmission = () => {
    const submission = `AI Resume Builder — Build Track Submission
---
Lovable Link: ${lovableLink}
GitHub Link: ${githubLink}
Deploy Link: ${deployLink}
Steps Completed: ${steps.filter((s) => isStepComplete(s.num)).length}/8
`;
    navigator.clipboard.writeText(submission);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />
      <div className="flex-1 overflow-auto p-8 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-foreground mb-1">Proof of Build</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Review your progress and submit your final links.
        </p>

        {/* Step Status Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {steps.map((s) => {
            const complete = isStepComplete(s.num);
            return (
              <div
                key={s.num}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  complete
                    ? "border-success/30 bg-success/5"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono ${
                    complete
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {complete ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="font-mono text-xs text-muted-foreground">Step {s.num}</span>
                  <p className="text-sm font-medium text-foreground">{s.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submission Links */}
        <div className="space-y-4 mb-8">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Submission Links
          </h2>
          {[
            { label: "Lovable Link", value: lovableLink, setter: setLovableLink, placeholder: "https://lovable.dev/projects/..." },
            { label: "GitHub Link", value: githubLink, setter: setGithubLink, placeholder: "https://github.com/..." },
            { label: "Deploy Link", value: deployLink, setter: setDeployLink, placeholder: "https://your-app.lovable.app" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block font-mono text-xs text-muted-foreground mb-1.5">
                {field.label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {field.value && (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleCopySubmission}
          disabled={!allComplete}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed glow-border"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Final Submission"}
        </button>
        {!allComplete && (
          <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
            Complete all 8 steps to enable submission
          </p>
        )}
      </div>
    </div>
  );
};

export default ProofPage;
