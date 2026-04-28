export const pct = (n: number, digits = 0) => `${n.toFixed(digits)}%`;
export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
