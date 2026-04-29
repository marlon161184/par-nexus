import { create } from "zustand";
import { members, type Goal } from "@/data/members";

type Completions = Record<string, Record<string, number>>; // memberId -> goalId(or goalId:subId) -> %

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
    const base = 60 + ((m.id.charCodeAt(0) + g.points) % 36);
    if (g.subKpis?.length) {
      g.subKpis.forEach((s, i) => {
        seed[m.id][`${g.id}:${s.id}`] = Math.min(100, base + i * 3);
      });
    } else {
      seed[m.id][g.id] = base;
    }
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
      completions: { ...s.completions, [memberId]: {} },
    })),
}));

// Returns the goal's effective % atingido (0..cap), aggregating sub-KPIs if present.
export const goalCompletionPct = (
  memberId: string,
  goal: Goal,
  completions: Completions,
): number => {
  const cap = goal.cap ?? 120;
  let pct = 0;
  if (goal.subKpis?.length) {
    // Each sub-KPI contributes its weighted share of points.
    const subPtsTotal = goal.subKpis.reduce((s, sk) => s + sk.points, 0) || goal.points;
    const earned = goal.subKpis.reduce((sum, sk) => {
      const v = completions[memberId]?.[`${goal.id}:${sk.id}`] ?? 0;
      return sum + (Math.min(v, cap) / 100) * sk.points;
    }, 0);
    pct = (earned / subPtsTotal) * 100;
  } else {
    pct = completions[memberId]?.[goal.id] ?? 0;
  }
  return Math.min(pct, cap);
};

// Helpers
export const computeIndividualResult = (memberId: string, completions: Completions) => {
  const m = members.find((x) => x.id === memberId)!;
  const total = m.goals.reduce((sum, g) => {
    const pct = goalCompletionPct(memberId, g, completions) / 100;
    return sum + pct * g.points;
  }, 0);
  return Math.round(total * 10) / 10;
};

export const ebitdaMultiplier = (ebitda: number) => {
  if (ebitda < 90) return 0;
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
  const result = computeIndividualResult(memberId, completions);
  const mult = ebitdaMultiplier(ebitda);
  const finalPct = (result / 100) * mult;
  return Math.round(finalPct * m.salaryMultiplier * 10) / 10;
};
