import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-lg px-6">
        <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
          AI Resume Builder
        </span>
        <h1 className="mt-8 mb-4 text-5xl font-bold text-foreground tracking-tight leading-tight">
          Build a Resume<br />That Gets Read.
        </h1>
        <p className="text-muted-foreground mb-10 text-lg">
          Structured. Clean. Crafted to pass ATS filters and impress humans.
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 transition-colors glow-border"
        >
          Start Building <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Home;
