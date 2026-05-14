import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";
import { members } from "@/data/members";
import { Building2, TrendingUp, ShieldAlert, Coins } from "lucide-react";

const corporateGoals = [
  {
    icon: TrendingUp,
    title: "VGV / Receita",
    desc: "Atma R$92M (Rafael) · Atma + Ária para Caetano e Matteo. Geradores de receita: Rafael, Leandro e Nabil.",
    members: ["Rafael", "Leandro", "Caetano", "Matteo", "Marlon", "Nabil"],
  },
  {
    icon: Coins,
    title: "Fluxo de Caixa",
    desc: "Exposição máxima de R$50M no ciclo.",
    members: ["Fernando", "Matteo", "Maurício", "Gustavo"],
  },
  {
    icon: Building2,
    title: "Controle de Custos de Obra",
    desc: "Fórmula inversa com teto de 120% sobre custo planejado.",
    members: ["Fernando", "Caetano", "Rogério"],
  },
  {
    icon: ShieldAlert,
    title: "VSO — Velocidade de Vendas Atma",
    desc: "Atma ≥ 5%/mês. Ária fora do escopo de Rafael em 2026 (lançamento 2027).",
    members: ["Rafael", "Nabil"],
  },
  {
    icon: Coins,
    title: "Receita Comercial Recebida",
    desc: "≥ 90% da projeção mensal. Leandro responde pela cadência de recebimento.",
    members: ["Leandro", "Nabil"],
  },
  {
    icon: TrendingUp,
    title: "Pipeline Qualificado — MQL e Volume",
    desc: "≥ 720 MQL/ano · Pipeline ≥ R$20M · MQL→SQL ≥ 15%.",
    members: ["Leandro"],
  },
  {
    icon: Building2,
    title: "Custo de Pessoas",
    desc: "Folha + encargos dentro do orçamento aprovado.",
    members: ["Marlon"],
  },
];

export default function MetasCorporativas() {
  const totalMembersAffected = new Set(
    corporateGoals.flatMap((g) => g.members),
  ).size;

  return (
    <div>
      <SectionHeader
        eyebrow="Frente Coletiva"
        title="Metas Corporativas"
        description="Indicadores compartilhados que refletem o resultado coletivo da Newe e da Hyndra. Pesos individuais variam por papel — consulte cada painel."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="luxe-card p-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Metas corporativas</div>
          <div className="font-display text-3xl mt-2 tabular gold-text">{corporateGoals.length}</div>
        </Card>
        <Card className="luxe-card p-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Elegíveis impactados</div>
          <div className="font-display text-3xl mt-2 tabular">{totalMembersAffected}</div>
        </Card>
        <Card className="luxe-card p-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Gatilho</div>
          <div className="font-display text-3xl mt-2">EBITDA</div>
        </Card>
        <Card className="luxe-card p-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Eliminatória</div>
          <div className="font-display text-3xl mt-2">Regra de Ouro</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {corporateGoals.map((g) => (
          <Card key={g.title} className="luxe-card p-6 group hover:border-primary/40 transition-all">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <g.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl">{g.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{g.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.members.map((n) => (
                    <Badge
                      key={n}
                      variant="outline"
                      className="text-[10px] border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                    >
                      {n}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
