import { useState, useEffect } from "react";
import { useArtifacts } from "@/hooks/useArtifacts";
import { useChecklist, CHECKLIST_ITEMS } from "@/hooks/useChecklist";
import TopBar from "@/components/rb/TopBar";
import {
  Check,
  X,
  Copy,
  ExternalLink,
  CheckSquare,
  Square,
  Shield,
  AlertTriangle,
} from "lucide-react";

const SUBMISSION_KEY = "rb_final_submission";

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function loadSubmission() {
  try {
    const stored = localStorage.getItem(SUBMISSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { lovableLink: "", githubLink: "", deployLink: "" };
}

const ProofPage = () => {
  const { steps, isStepComplete } = useArtifacts();
  const { checked, toggle, allPassed, passedCount, total } = useChecklist();

  const [submission, setSubmission] = useState<{
    lovableLink: string;
    githubLink: string;
    deployLink: string;
  }>(loadSubmission);

  const [errors, setErrors] = useState<{
    lovableLink?: string;
    githubLink?: string;
    deployLink?: string;
  }>({});

  const [copied, setCopied] = useState(false);

  // Persist submission links to localStorage on change
  useEffect(() => {
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
  }, [submission]);

  const allStepsComplete = steps.every((s) => isStepComplete(s.num));
  const stepsComplete = steps.filter((s) => isStepComplete(s.num)).length;

  const allLinksValid =
    isValidUrl(submission.lovableLink) &&
    isValidUrl(submission.githubLink) &&
    isValidUrl(submission.deployLink);

  const isShipped = allStepsComplete && allPassed && allLinksValid;

  const updateLink = (
    key: "lovableLink" | "githubLink" | "deployLink",
    value: string
  ) => {
    setSubmission((prev) => ({ ...prev, [key]: value }));
    if (value && !isValidUrl(value)) {
      setErrors((prev) => ({ ...prev, [key]: "Must be a valid https:// URL" }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleCopySubmission = () => {
    const text = [
      "------------------------------------------",
      "AI Resume Builder — Final Submission",
      "",
      `Lovable Project: ${submission.lovableLink}`,
      `GitHub Repository: ${submission.githubLink}`,
      `Live Deployment: ${submission.deployLink}`,
      "",
      "Core Capabilities:",
      "- Structured resume builder",
      "- Deterministic ATS scoring",
      "- Template switching",
      "- PDF export with clean formatting",
      "- Persistence + validation checklist",
      "------------------------------------------",
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const canCopy = isShipped;

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar isShipped={isShipped} />

      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto w-full px-6 py-8 space-y-8">

          {/* Shipped confirmation */}
          {isShipped && (
            <div className="rounded-xl border border-success/30 bg-success/5 px-6 py-5 flex items-center gap-4">
              <Shield className="w-6 h-6 text-success shrink-0" />
              <div>
                <p className="font-mono text-sm font-semibold text-success">
                  Project 3 Shipped Successfully.
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  All steps complete · All tests passed · All links verified
                </p>
              </div>
            </div>
          )}

          {/* ── Section A: Step Completion Overview ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                A — Step Completion Overview
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {stepsComplete}/{steps.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {steps.map((s) => {
                const complete = isStepComplete(s.num);
                return (
                  <div
                    key={s.num}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      complete
                        ? "border-success/25 bg-success/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                        complete
                          ? "bg-success text-success-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {complete ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-muted-foreground leading-none mb-0.5">
                        Step {s.num}
                      </p>
                      <p className="text-xs font-medium text-foreground truncate">
                        {s.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {!allStepsComplete && (
              <p className="mt-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-warning" />
                {steps.length - stepsComplete} step
                {steps.length - stepsComplete !== 1 ? "s" : ""} remaining
              </p>
            )}
          </section>

          {/* ── Section B: Checklist Tests ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                B — Test Checklist
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {passedCount}/{total} passed
              </span>
            </div>
            <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
              {CHECKLIST_ITEMS.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/30 transition-colors"
                >
                  {checked[i] ? (
                    <CheckSquare className="w-4 h-4 text-success shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span
                    className={`text-xs font-mono ${
                      checked[i] ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </span>
                  {checked[i] && (
                    <span className="ml-auto text-[10px] font-mono text-success shrink-0">
                      ✓ passed
                    </span>
                  )}
                </button>
              ))}
            </div>
            {!allPassed && (
              <p className="mt-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-warning" />
                {total - passedCount} test
                {total - passedCount !== 1 ? "s" : ""} not yet passed
              </p>
            )}
          </section>

          {/* ── Section C: Artifact Collection ── */}
          <section>
            <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              C — Artifact Collection
            </h2>
            <div className="space-y-4">
              {(
                [
                  {
                    key: "lovableLink" as const,
                    label: "Lovable Project Link",
                    placeholder: "https://lovable.dev/projects/...",
                  },
                  {
                    key: "githubLink" as const,
                    label: "GitHub Repository Link",
                    placeholder: "https://github.com/username/repo",
                  },
                  {
                    key: "deployLink" as const,
                    label: "Deployed URL",
                    placeholder: "https://your-app.lovable.app",
                  },
                ] as const
              ).map((field) => {
                const value = submission[field.key];
                const err = errors[field.key];
                const valid = value && isValidUrl(value);

                return (
                  <div key={field.key}>
                    <label className="block font-mono text-xs text-muted-foreground mb-1.5">
                      {field.label}
                      <span className="text-destructive ml-1">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <input
                          type="url"
                          value={value}
                          onChange={(e) => updateLink(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={`w-full rounded-md border bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-colors ${
                            err
                              ? "border-destructive focus:ring-destructive"
                              : valid
                              ? "border-success/50 focus:ring-success"
                              : "border-border focus:ring-ring"
                          }`}
                        />
                        {valid && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-success" />
                        )}
                      </div>
                      {valid && (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {err && (
                      <p className="mt-1 text-[11px] font-mono text-destructive">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Shipped Status Summary ── */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Shipped Status
            </h2>
            <div className="space-y-2.5">
              {[
                {
                  label: "All 8 steps completed",
                  met: allStepsComplete,
                  detail: `${stepsComplete}/8`,
                },
                {
                  label: "All 10 checklist tests passed",
                  met: allPassed,
                  detail: `${passedCount}/10`,
                },
                {
                  label: "All 3 proof links provided",
                  met: allLinksValid,
                  detail: allLinksValid ? "3/3 valid" : `${[submission.lovableLink, submission.githubLink, submission.deployLink].filter(isValidUrl).length}/3 valid`,
                },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${
                      row.met
                        ? "bg-success/20 text-success"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {row.met ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-foreground flex-1">
                    {row.label}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {row.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
              <div
                className={`px-3 py-1.5 rounded-full border text-xs font-mono font-semibold ${
                  isShipped
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-warning/30 bg-warning/10 text-warning"
                }`}
              >
                {isShipped ? "Shipped" : "In Progress"}
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                {isShipped
                  ? "All conditions met — ready to submit."
                  : "Complete all conditions above to mark as Shipped."}
              </p>
            </div>
          </section>

          {/* ── Copy Final Submission ── */}
          <section className="pb-8">
            <button
              onClick={handleCopySubmission}
              disabled={!canCopy}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-mono text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-border bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied to clipboard" : "Copy Final Submission"}
            </button>
            {!canCopy && (
              <p className="text-xs text-muted-foreground text-center mt-2 font-mono">
                All three conditions must be met to copy the submission
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProofPage;
