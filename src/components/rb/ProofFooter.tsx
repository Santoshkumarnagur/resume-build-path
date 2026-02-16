import { useNavigate } from "react-router-dom";
import { useArtifacts } from "@/hooks/useArtifacts";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

interface ProofFooterProps {
  currentStep: number;
}

const ProofFooter = ({ currentStep }: ProofFooterProps) => {
  const navigate = useNavigate();
  const { steps, isStepComplete, isStepUnlocked } = useArtifacts();

  const canGoNext = isStepComplete(currentStep);
  const canGoPrev = currentStep > 1;
  const isLast = currentStep === 8;

  const handlePrev = () => {
    if (canGoPrev) {
      navigate(`/rb/${steps[currentStep - 2].slug}`);
    }
  };

  const handleNext = () => {
    if (isLast && canGoNext) {
      navigate("/rb/proof");
    } else if (canGoNext) {
      navigate(`/rb/${steps[currentStep].slug}`);
    }
  };

  return (
    <footer className="flex items-center justify-between px-6 py-3 border-t border-border bg-card">
      <button
        onClick={handlePrev}
        disabled={!canGoPrev}
        className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex items-center gap-1.5">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => isStepUnlocked(s.num) && navigate(`/rb/${s.slug}`)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              s.num === currentStep
                ? "bg-primary scale-125"
                : isStepComplete(s.num)
                ? "bg-success"
                : isStepUnlocked(s.num)
                ? "bg-muted-foreground/40"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="flex items-center gap-1.5 font-mono text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-30 disabled:text-muted-foreground"
      >
        {isLast ? (
          <>
            View Proof <Trophy className="w-4 h-4" />
          </>
        ) : (
          <>
            Next <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </footer>
  );
};

export default ProofFooter;
