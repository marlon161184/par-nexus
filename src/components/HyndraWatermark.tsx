import mark from "@/assets/hyndra-mark.png";
import { cn } from "@/lib/utils";

export function HyndraWatermark({
  className,
  size = 140,
  opacity = 0.05,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <img
      src={mark}
      alt=""
      aria-hidden
      className={cn(
        "pointer-events-none absolute -right-6 -bottom-6 select-none",
        className,
      )}
      style={{ width: size, height: size, opacity, objectFit: "contain" }}
    />
  );
}
