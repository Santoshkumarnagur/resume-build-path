import { useState, useCallback } from "react";

export type TemplateName = "classic" | "modern" | "minimal";

export interface AccentColor {
  name: string;
  hsl: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: "Teal", hsl: "168 60% 40%" },
  { name: "Navy", hsl: "220 60% 35%" },
  { name: "Burgundy", hsl: "345 60% 35%" },
  { name: "Forest", hsl: "150 50% 30%" },
  { name: "Charcoal", hsl: "0 0% 25%" },
];

const TEMPLATE_KEY = "rb_resume_template";
const COLOR_KEY = "rb_resume_accent";

export function useTemplate() {
  const [template, setTemplateState] = useState<TemplateName>(() => {
    try {
      const stored = localStorage.getItem(TEMPLATE_KEY);
      if (stored === "classic" || stored === "modern" || stored === "minimal") return stored;
    } catch {}
    return "classic";
  });

  const [accentColor, setAccentColorState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(COLOR_KEY);
      if (stored && ACCENT_COLORS.some((c) => c.hsl === stored)) return stored;
    } catch {}
    return ACCENT_COLORS[0].hsl;
  });

  const setTemplate = useCallback((t: TemplateName) => {
    localStorage.setItem(TEMPLATE_KEY, t);
    setTemplateState(t);
  }, []);

  const setAccentColor = useCallback((hsl: string) => {
    localStorage.setItem(COLOR_KEY, hsl);
    setAccentColorState(hsl);
  }, []);

  return { template, setTemplate, accentColor, setAccentColor };
}
