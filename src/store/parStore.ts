import { create } from "zustand";
import { members } from "@/data/members";

type Completions = Record<string, Record<string, number>>; // memberId -> goalId -> %

interface ParState {
  ebitda: number; // %
  regraDeOuro: "OK" | "ZERADO";
  completions: Completions;
  setEbitda: (v: number) => void;
  setRegraDeOuro: (s: "OK" | "ZERADO") => void;
  setCompletion: (memberId: string, goalId: string, value: number) => void;
  getCompletion: (memberId: string, goalId: string) => number;
  resetMember: (memberId: string) => void;
}

const seed: Completions = {};
members.forEach((m) => {
  seed[m.id] = {};
  m.goals.forEach((g) => {
    // pseudo-random pleasant defaults 60-95
    const base = 60 + ((m.id.charCodeAt(0) + g.points) % 36);
    seed[m.id][g.id] = base;
  });
});

export const useParStore = create<ParState>((set, get) => ({
  ebitda: 95,
  regraDeOuro: "OK",
  completions: seed,
  setEbitda: (v) => set({ ebitda: v }),
  setRegraDeOuro: (s) => set({ regraDeOuro: s }),
  setCompletion: (memberId, goalId, value) =>
    set((s) => ({
      completions: {
        ...s.completions,
        [memberId]: { ...s.completions[memberId], [goalId]: value },
      },
    })),
  getCompletion: (memberId, goalId) => get().completions[memberId]?.[goalId] ?? 0,
  resetMember: (memberId) =>
    set((s) => ({
      completions: {
        ...s.completions,
        [memberId]: Object.fromEntries(
          (members.find((m) => m.id === memberId)?.goals ?? []).map((g) => [g.id, 0]),
        ),
      },
    })),
}));

// Helpers
export const computeIndividualResult = (memberId: string, completions: Completions) => {
  const m = members.find((x) => x.id === memberId)!;
  const total = m.goals.reduce((sum, g) => {
    const pct = (completions[memberId]?.[g.id] ?? 0) / 100;
    return sum + pct * g.points;
  }, 0);
  return Math.round(total * 10) / 10; // 0..~120
};

export const ebitdaMultiplier = (ebitda: number) => {
  if (ebitda < 90) return 0;
  // Linear: 90% -> 1.0x, 100% -> 1.1x, 120% -> 1.3x (cap)
  const m = 1 + (ebitda - 90) / 100;
  return Math.min(m, 1.3);
};

export const computeFinalSalaries = (
  memberId: string,
  completions: Completions,
  ebitda: number,
  regra: "OK" | "ZERADO",
) => {
  if (regra === "ZERADO") return 0;
  if (ebitda < 90) return 0;
  const m = members.find((x) => x.id === memberId)!;
  const result = computeIndividualResult(memberId, completions); // 0..~120 (base 100)
  const mult = ebitdaMultiplier(ebitda);
  const finalPct = (result / 100) * mult;
  return Math.round(finalPct * m.salaryMultiplier * 10) / 10;
};
