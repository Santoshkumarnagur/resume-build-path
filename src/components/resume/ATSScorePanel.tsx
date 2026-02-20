import type { ATSResult } from "@/hooks/useATSScore";
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface Props {
  result: ATSResult;
  compact?: boolean;
}

const colorMap = {
  red: {
    text: "text-destructive",
    stroke: "stroke-destructive",
    bg: "bg-destructive/10",
    icon: "text-destructive",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
  },
  amber: {
    text: "text-warning",
    stroke: "stroke-warning",
    bg: "bg-warning/10",
    icon: "text-warning",
    badge: "bg-warning/10 text-warning border-warning/20",
  },
  green: {
    text: "text-success",
    stroke: "stroke-success",
    bg: "bg-success/10",
    icon: "text-success",
    badge: "bg-success/10 text-success border-success/20",
  },
};

const ATSScorePanel = ({ result, compact = false }: Props) => {
  const { score, label, color, suggestions } = result;
  const c = colorMap[color];

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`rounded-xl border border-border bg-card ${compact ? "p-4" : "p-6"}`}>
      <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-5">
        ATS Readiness Score
      </h3>

      {/* Circular gauge */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Track */}
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              className={c.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold font-mono leading-none ${c.text}`}>{score}</span>
            <span className="text-[10px] font-mono text-muted-foreground mt-1">/ 100</span>
          </div>
        </div>

        {/* Label badge */}
        <div className={`mt-3 px-3 py-1 rounded-full border text-xs font-semibold font-mono ${c.badge}`}>
          {color === "green" ? (
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" />{label}</span>
          ) : color === "amber" ? (
            <span className="flex items-center gap-1.5"><TrendingUp className="w-3 h-3" />{label}</span>
          ) : (
            <span className="flex items-center gap-1.5"><AlertCircle className="w-3 h-3" />{label}</span>
          )}
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
            Improvements
          </p>
          <div className="space-y-1.5">
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-lg bg-secondary/40 px-3 py-2 text-xs font-mono text-muted-foreground"
              >
                <span className={`mt-0.5 shrink-0 font-bold ${c.text}`}>+{s.points}</span>
                <span>{s.text.replace(/ \(\+\d+ points\)/, "")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {score === 100 && (
        <p className="text-xs text-success font-mono text-center mt-2">
          🎉 Perfect score — your resume is fully ATS-optimized!
        </p>
      )}
    </div>
  );
};

export default ATSScorePanel;
