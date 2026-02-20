import { useCallback, useState } from "react";

export const CHECKLIST_ITEMS = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page",
] as const;

export type ChecklistItem = (typeof CHECKLIST_ITEMS)[number];

const CHECKLIST_KEY = "rb_checklist";

function loadChecklist(): Record<number, boolean> {
  try {
    const stored = localStorage.getItem(CHECKLIST_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function useChecklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>(loadChecklist);

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const allPassed = CHECKLIST_ITEMS.every((_, i) => !!checked[i]);
  const passedCount = CHECKLIST_ITEMS.filter((_, i) => !!checked[i]).length;

  return { checked, toggle, allPassed, passedCount, total: CHECKLIST_ITEMS.length };
}
