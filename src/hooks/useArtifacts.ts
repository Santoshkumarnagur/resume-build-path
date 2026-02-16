import { useState, useCallback } from "react";

const STEPS = [
  { num: 1, slug: "01-problem", title: "Problem Statement", description: "Define the core problem your AI Resume Builder solves" },
  { num: 2, slug: "02-market", title: "Market Research", description: "Analyze competitors and target users" },
  { num: 3, slug: "03-architecture", title: "Architecture", description: "Design the system architecture" },
  { num: 4, slug: "04-hld", title: "High-Level Design", description: "Create high-level design documents" },
  { num: 5, slug: "05-lld", title: "Low-Level Design", description: "Detail component-level design" },
  { num: 6, slug: "06-build", title: "Build", description: "Implement the core features" },
  { num: 7, slug: "07-test", title: "Test", description: "Write and run tests" },
  { num: 8, slug: "08-ship", title: "Ship", description: "Deploy and launch" },
] as const;

export type StepInfo = (typeof STEPS)[number];

function getArtifactKey(stepNum: number) {
  return `rb_step_${stepNum}_artifact`;
}

export function useArtifacts() {
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const getArtifact = useCallback((stepNum: number): string | null => {
    return localStorage.getItem(getArtifactKey(stepNum));
  }, []);

  const saveArtifact = useCallback((stepNum: number, value: string) => {
    localStorage.setItem(getArtifactKey(stepNum), value);
    refresh();
  }, [refresh]);

  const isStepComplete = useCallback((stepNum: number): boolean => {
    return !!localStorage.getItem(getArtifactKey(stepNum));
  }, []);

  const isStepUnlocked = useCallback((stepNum: number): boolean => {
    if (stepNum === 1) return true;
    return !!localStorage.getItem(getArtifactKey(stepNum - 1));
  }, []);

  const getHighestUnlocked = useCallback((): number => {
    for (let i = 8; i >= 1; i--) {
      if (localStorage.getItem(getArtifactKey(i))) return Math.min(i + 1, 8);
    }
    return 1;
  }, []);

  return { steps: STEPS, getArtifact, saveArtifact, isStepComplete, isStepUnlocked, getHighestUnlocked };
}
