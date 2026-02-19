import { Check } from "lucide-react";
import type { TemplateName } from "@/hooks/useTemplate";
import { ACCENT_COLORS } from "@/hooks/useTemplate";

interface Props {
  template: TemplateName;
  onTemplateChange: (t: TemplateName) => void;
  accentColor: string;
  onColorChange: (hsl: string) => void;
}

const templates: { key: TemplateName; label: string; description: string }[] = [
  { key: "classic", label: "Classic", description: "Single column, serif headings, horizontal rules" },
  { key: "modern", label: "Modern", description: "Two-column with colored sidebar" },
  { key: "minimal", label: "Minimal", description: "Clean, no borders, generous whitespace" },
];

/* Mini layout sketches rendered as tiny SVGs */
const TemplateThumbnail = ({ type, active, accent }: { type: TemplateName; active: boolean; accent: string }) => {
  const accentCss = `hsl(${accent})`;
  return (
    <div className="w-[120px] h-[156px] rounded-md border-2 overflow-hidden bg-white relative"
      style={{ borderColor: active ? accentCss : "hsl(var(--border))" }}
    >
      {active && (
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentCss }}
        >
          <Check className="w-2.5 h-2.5 text-white" />
        </div>
      )}
      <svg viewBox="0 0 120 156" className="w-full h-full">
        {type === "classic" && (
          <>
            {/* Name centered */}
            <rect x="30" y="10" width="60" height="6" rx="1" fill="#333" />
            <rect x="35" y="20" width="50" height="3" rx="1" fill="#999" />
            {/* HR */}
            <line x1="10" y1="30" x2="110" y2="30" stroke={accentCss} strokeWidth="1" />
            {/* Summary */}
            <rect x="10" y="36" width="100" height="3" rx="1" fill="#ccc" />
            <rect x="10" y="42" width="85" height="3" rx="1" fill="#ccc" />
            {/* HR */}
            <line x1="10" y1="52" x2="110" y2="52" stroke={accentCss} strokeWidth="1" />
            {/* Experience */}
            <rect x="10" y="58" width="40" height="4" rx="1" fill={accentCss} />
            <rect x="10" y="66" width="90" height="3" rx="1" fill="#ccc" />
            <rect x="10" y="72" width="80" height="3" rx="1" fill="#ccc" />
            {/* HR */}
            <line x1="10" y1="82" x2="110" y2="82" stroke={accentCss} strokeWidth="1" />
            {/* Education */}
            <rect x="10" y="88" width="35" height="4" rx="1" fill={accentCss} />
            <rect x="10" y="96" width="70" height="3" rx="1" fill="#ccc" />
            {/* Skills */}
            <line x1="10" y1="106" x2="110" y2="106" stroke={accentCss} strokeWidth="1" />
            <rect x="10" y="112" width="20" height="4" rx="1" fill={accentCss} />
            <rect x="10" y="120" width="14" height="6" rx="3" fill="#eee" />
            <rect x="28" y="120" width="18" height="6" rx="3" fill="#eee" />
            <rect x="50" y="120" width="16" height="6" rx="3" fill="#eee" />
          </>
        )}
        {type === "modern" && (
          <>
            {/* Left sidebar */}
            <rect x="0" y="0" width="40" height="156" fill={accentCss} opacity="0.15" />
            <rect x="5" y="12" width="30" height="5" rx="1" fill={accentCss} />
            <rect x="5" y="22" width="28" height="2.5" rx="1" fill="#999" />
            <rect x="5" y="28" width="25" height="2.5" rx="1" fill="#999" />
            <rect x="5" y="34" width="27" height="2.5" rx="1" fill="#999" />
            {/* Sidebar skills */}
            <rect x="5" y="48" width="22" height="3.5" rx="1" fill={accentCss} />
            <rect x="5" y="56" width="12" height="5" rx="2.5" fill="#ddd" />
            <rect x="19" y="56" width="16" height="5" rx="2.5" fill="#ddd" />
            <rect x="5" y="64" width="14" height="5" rx="2.5" fill="#ddd" />
            {/* Right content */}
            <rect x="48" y="12" width="62" height="5" rx="1" fill="#333" />
            <rect x="48" y="22" width="60" height="3" rx="1" fill="#ccc" />
            <rect x="48" y="28" width="55" height="3" rx="1" fill="#ccc" />
            {/* Section */}
            <rect x="48" y="40" width="30" height="4" rx="1" fill={accentCss} />
            <rect x="48" y="48" width="60" height="3" rx="1" fill="#ccc" />
            <rect x="48" y="54" width="55" height="3" rx="1" fill="#ccc" />
            <rect x="48" y="60" width="50" height="3" rx="1" fill="#ccc" />
            {/* Section 2 */}
            <rect x="48" y="72" width="30" height="4" rx="1" fill={accentCss} />
            <rect x="48" y="80" width="58" height="3" rx="1" fill="#ccc" />
            <rect x="48" y="86" width="52" height="3" rx="1" fill="#ccc" />
          </>
        )}
        {type === "minimal" && (
          <>
            {/* Name left */}
            <rect x="10" y="14" width="55" height="6" rx="1" fill="#333" />
            <rect x="10" y="24" width="45" height="3" rx="1" fill="#999" />
            {/* Sections with spacing, no rules */}
            <rect x="10" y="40" width="28" height="3.5" rx="1" fill="#666" />
            <rect x="10" y="48" width="95" height="3" rx="1" fill="#ddd" />
            <rect x="10" y="54" width="85" height="3" rx="1" fill="#ddd" />
            <rect x="10" y="68" width="35" height="3.5" rx="1" fill="#666" />
            <rect x="10" y="76" width="90" height="3" rx="1" fill="#ddd" />
            <rect x="10" y="82" width="80" height="3" rx="1" fill="#ddd" />
            <rect x="10" y="96" width="20" height="3.5" rx="1" fill="#666" />
            <rect x="10" y="104" width="70" height="3" rx="1" fill="#ddd" />
            <rect x="10" y="118" width="25" height="3.5" rx="1" fill="#666" />
            <rect x="10" y="126" width="14" height="5" rx="2.5" fill="#eee" />
            <rect x="28" y="126" width="18" height="5" rx="2.5" fill="#eee" />
            <rect x="50" y="126" width="16" height="5" rx="2.5" fill="#eee" />
          </>
        )}
      </svg>
    </div>
  );
};

const TemplateAndColorPicker = ({ template, onTemplateChange, accentColor, onColorChange }: Props) => (
  <div className="space-y-4">
    {/* Template thumbnails */}
    <div>
      <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Template</h3>
      <div className="flex gap-3">
        {templates.map(({ key, label, description }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTemplateChange(key)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <TemplateThumbnail type={key} active={template === key} accent={accentColor} />
            <span className={`font-mono text-[10px] uppercase tracking-wider ${
              template === key ? "text-foreground" : "text-muted-foreground"
            }`}>
              {label}
            </span>
            <span className="text-[9px] text-muted-foreground max-w-[120px] text-center leading-tight">
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Color circles */}
    <div>
      <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Accent Color</h3>
      <div className="flex gap-2.5">
        {ACCENT_COLORS.map((c) => (
          <button
            key={c.name}
            type="button"
            title={c.name}
            onClick={() => onColorChange(c.hsl)}
            className="relative w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: `hsl(${c.hsl})`,
              borderColor: accentColor === c.hsl ? "hsl(var(--foreground))" : "transparent",
            }}
          >
            {accentColor === c.hsl && (
              <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TemplateAndColorPicker;
