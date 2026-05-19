import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  right,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8", className)}>
      <div>
        {eyebrow && (
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            <span className="h-px w-8 bg-primary/50" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight font-light max-w-3xl">{title}</h2>
        {description && <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{description}</p>}
      </div>
      {right}
    </div>
  );
}
