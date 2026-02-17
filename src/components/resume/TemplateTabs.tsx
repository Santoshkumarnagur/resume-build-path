import type { TemplateName } from "@/hooks/useTemplate";

interface Props {
  value: TemplateName;
  onChange: (t: TemplateName) => void;
}

const tabs: { key: TemplateName; label: string }[] = [
  { key: "classic", label: "Classic" },
  { key: "modern", label: "Modern" },
  { key: "minimal", label: "Minimal" },
];

const TemplateTabs = ({ value, onChange }: Props) => (
  <div className="flex gap-1 p-1 rounded-md bg-secondary/50 border border-border">
    {tabs.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`px-4 py-1.5 rounded font-mono text-xs transition-colors ${
          value === key
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default TemplateTabs;
