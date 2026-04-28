import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConfidentialBadge({ className, children = "Confidencial" }: { className?: string; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-primary/80 border border-primary/30 px-2 py-0.5 rounded-full bg-primary/5",
        className,
      )}
    >
      <Lock className="h-3 w-3" />
      {children}
    </span>
  );
}
