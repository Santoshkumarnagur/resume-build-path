import { useArtifacts, type StepInfo } from "@/hooks/useArtifacts";
import { FileText, Lock } from "lucide-react";

interface StepWorkspaceProps {
  step: StepInfo;
}

const StepWorkspace = ({ step }: StepWorkspaceProps) => {
  const { isStepComplete, getArtifact } = useArtifacts();
  const complete = isStepComplete(step.num);
  const artifact = getArtifact(step.num);

  return (
    <main className="flex-1 flex flex-col overflow-auto">
      {/* Context Header */}
      <div className="px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
            STEP {step.num}
          </span>
          {complete && (
            <span className="font-mono text-xs text-success bg-success/10 px-2 py-0.5 rounded">
              COMPLETE
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{step.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8">
        {complete && artifact ? (
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Saved Artifact
              </span>
            </div>
            <pre className="font-mono text-sm text-surface-foreground whitespace-pre-wrap break-words">
              {artifact}
            </pre>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              {complete ? (
                <FileText className="w-7 h-7 text-primary" />
              ) : (
                <Lock className="w-7 h-7 text-muted-foreground" />
              )}
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {step.title}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Use the Build Panel on the right to paste your artifact for this step.
              Complete this step to unlock the next one.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default StepWorkspace;
