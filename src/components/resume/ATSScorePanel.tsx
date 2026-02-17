import type { ATSResult } from "@/hooks/useATSScore";
import { AlertTriangle } from "lucide-react";

interface Props {
  result: ATSResult;
}

const getColor = (score: number) => {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
};

const getTrackColor = (score: number) => {
  if (score >= 70) return "stroke-green-400/80";
  if (score >= 40) return "stroke-yellow-400/80";
  return "stroke-red-400/80";
};

const ATSScorePanel = ({ result }: Props) => {
  const { score, suggestions } = result;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
        ATS Readiness Score
      </h3>

      {/* Circular gauge */}
      <div className="flex justify-center mb-5">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              className={getTrackColor(score)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold font-mono ${getColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Suggestions
          </p>
          {suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-muted-foreground font-mono bg-secondary/50 rounded-md px-3 py-2"
            >
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-yellow-400/80" />
              {s}
            </div>
          ))}
        </div>
      )}

      {score >= 70 && suggestions.length === 0 && (
        <p className="text-xs text-green-400/80 font-mono text-center">
          Looking great — your resume is ATS-ready!
        </p>
      )}
    </div>
  );
};

export default ATSScorePanel;
