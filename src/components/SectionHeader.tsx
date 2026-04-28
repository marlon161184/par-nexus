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
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-primary/80 mb-3">
            <span className="h-px w-6 bg-primary/60" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-3xl">{title}</h2>
        {description && <p className="text-muted-foreground mt-3 max-w-2xl">{description}</p>}
      </div>
      {right}
    </div>
  );
}
