import { useState, useCallback } from "react";

export type TemplateName = "classic" | "modern" | "minimal";

const STORAGE_KEY = "rb_resume_template";

export function useTemplate() {
  const [template, setTemplateState] = useState<TemplateName>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "classic" || stored === "modern" || stored === "minimal") return stored;
    } catch {}
    return "classic";
  });

  const setTemplate = useCallback((t: TemplateName) => {
    localStorage.setItem(STORAGE_KEY, t);
    setTemplateState(t);
  }, []);

  return { template, setTemplate };
}
