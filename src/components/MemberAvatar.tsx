import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MemberAvatar({
  name,
  gradient,
  size = "md",
}: {
  name: string;
  gradient: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = { sm: "h-9 w-9 text-xs", md: "h-12 w-12 text-sm", lg: "h-16 w-16 text-base" }[size];
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center font-display font-semibold text-white shadow-soft ring-1 ring-white/10",
        gradient,
        dim,
      )}
    >
      {initials(name)}
    </div>
  );
}
