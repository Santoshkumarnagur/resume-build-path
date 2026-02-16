import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import TopBar from "@/components/rb/TopBar";
import BuildPanel from "@/components/rb/BuildPanel";
import ProofFooter from "@/components/rb/ProofFooter";
import StepWorkspace from "@/components/rb/StepWorkspace";
import { useArtifacts } from "@/hooks/useArtifacts";

const SLUG_MAP: Record<string, number> = {
  "01-problem": 1,
  "02-market": 2,
  "03-architecture": 3,
  "04-hld": 4,
  "05-lld": 5,
  "06-build": 6,
  "07-test": 7,
  "08-ship": 8,
};

const StepPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { steps, isStepUnlocked } = useArtifacts();
  const [, setTick] = useState(0);

  const stepNum = slug ? SLUG_MAP[slug] : undefined;
  if (!stepNum) return <Navigate to="/rb/01-problem" replace />;

  const step = steps[stepNum - 1];
  if (!isStepUnlocked(stepNum)) return <Navigate to={`/rb/${steps[0].slug}`} replace />;

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar currentStep={stepNum} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[7] flex flex-col overflow-hidden">
          <StepWorkspace step={step} />
        </div>
        <div className="flex-[3] flex flex-col overflow-hidden">
          <BuildPanel stepNum={stepNum} onArtifactSaved={() => setTick((t) => t + 1)} />
        </div>
      </div>
      <ProofFooter currentStep={stepNum} />
    </div>
  );
};

export default StepPage;
