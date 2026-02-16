import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-lg px-6">
        <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
          KodNest Premium Build System
        </span>
        <h1 className="mt-6 mb-3 text-4xl font-bold text-foreground tracking-tight">
          AI Resume Builder
        </h1>
        <p className="text-muted-foreground mb-8">
          Project 3 — Build Track. Complete 8 steps to build and ship your AI-powered resume builder.
        </p>
        <button
          onClick={() => navigate("/rb/01-problem")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors glow-border"
        >
          Start Building <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
