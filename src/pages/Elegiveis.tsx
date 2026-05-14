import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { members } from "@/data/members";
import { useParStore, computeIndividualResult } from "@/store/parStore";
import { MemberAvatar } from "@/components/MemberAvatar";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, Lock } from "lucide-react";

export default function Elegiveis() {
  const { completions } = useParStore();

  return (
    <div>
      <SectionHeader
        eyebrow="Liderança 2026"
        title="Os 10 Elegíveis"
        description="Cada executivo possui um painel individual com metas corporativas e individuais ponderadas em base 100. Os valores em R$ permanecem confidenciais — exibimos apenas o multiplicador de salários."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {members.map((m) => {
          const result = computeIndividualResult(m.id, completions);
          const pct = Math.min(result, 100);
          return (
            <Card
              key={m.id}
              className="luxe-card p-5 group hover:border-primary/40 hover:shadow-gold transition-all"
            >
              <div className="flex items-start gap-4">
                <MemberAvatar name={m.name} gradient={m.gradient} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg leading-tight truncate">{m.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{m.role}</p>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5 truncate">{m.company}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/15 font-mono-data text-[11px]">
                  <Lock className="h-3 w-3 mr-1" />
                  {m.salaryMultiplier} salários
                </Badge>
                <span className="font-display text-xl tabular gold-text">{result.toFixed(0)}%</span>
              </div>

              <div className="mt-3 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-gold transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full mt-5 border-border hover:border-primary/40 hover:text-primary"
              >
                <Link to={`/paineis/${m.id}`}>
                  Ver Painel <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
