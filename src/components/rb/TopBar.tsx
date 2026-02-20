import { useArtifacts } from "@/hooks/useArtifacts";

interface TopBarProps {
  currentStep?: number;
  isShipped?: boolean;
}

const TopBar = ({ currentStep, isShipped }: TopBarProps) => {
  const { isStepComplete } = useArtifacts();

  const getStatus = () => {
    if (isShipped) return "Shipped";
    if (!currentStep) return "In Progress";
    if (isStepComplete(currentStep)) return "Complete";
    return "In Progress";
  };

  const status = getStatus();

  const statusColor =
    status === "Shipped"
      ? "bg-success/20 text-success border-success/30"
      : status === "Complete"
      ? "bg-success/20 text-success border-success/30"
      : status === "In Progress"
      ? "bg-warning/20 text-warning border-warning/30"
      : "bg-primary/20 text-primary border-primary/30";

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
      <div className="font-mono text-sm font-semibold tracking-wide text-foreground">
        AI Resume Builder
      </div>
      <div className="font-mono text-xs text-muted-foreground">
        {currentStep
          ? `Project 3 — Step ${currentStep} of 8`
          : "Project 3 — Proof of Build"}
      </div>
      <span className={`text-xs font-mono px-3 py-1 rounded-full border ${statusColor}`}>
        {status}
      </span>
    </header>
  );
};

export default TopBar;
