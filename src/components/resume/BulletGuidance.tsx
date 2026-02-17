import { Info } from "lucide-react";

const ACTION_VERBS = [
  "built", "developed", "designed", "implemented", "led", "improved",
  "created", "optimized", "automated", "managed", "launched", "deployed",
  "integrated", "reduced", "increased", "architected", "engineered",
  "delivered", "established", "maintained", "migrated", "refactored",
  "scaled", "shipped", "streamlined", "tested", "wrote",
];

function hasActionVerb(text: string): boolean {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  return ACTION_VERBS.includes(firstWord);
}

function hasNumeric(text: string): boolean {
  return /\d+%|\d+[xX]|\d+k|\d+\+|\$\d+|\b\d{2,}\b/.test(text);
}

interface Props {
  text: string;
}

const BulletGuidance = ({ text }: Props) => {
  if (!text.trim()) return null;

  const hints: string[] = [];
  if (!hasActionVerb(text)) hints.push("Start with a strong action verb.");
  if (!hasNumeric(text)) hints.push("Add measurable impact (numbers).");

  if (hints.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 mt-1">
      {hints.map((h, i) => (
        <span key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 font-mono">
          <Info className="w-3 h-3 shrink-0" />
          {h}
        </span>
      ))}
    </div>
  );
};

export default BulletGuidance;
