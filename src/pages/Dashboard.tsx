import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SectionHeader } from "@/components/SectionHeader";
import { ConfidentialBadge } from "@/components/ConfidentialBadge";
import { useParStore, computeIndividualResult, computeFinalSalaries } from "@/store/parStore";
import { HyndraWatermark } from "@/components/HyndraWatermark";

import { members } from "@/data/members";
import { Users, Calendar, Activity, ShieldCheck, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: any;
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "default" | "gold" | "success";
}) => (
  <Card className="luxe-card p-5 relative overflow-hidden">
    {tone === "gold" && <div className="absolute inset-0 bg-gradient-gold-soft pointer-events-none" />}
    <div className="relative flex items-start justify-between">
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="font-display text-3xl mt-2 tabular">{value}</div>
        {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
      </div>
      <div className="h-9 w-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </div>
  </Card>
);

export default function Dashboard() {
  const { ebitda, regraDeOuro, completions, setEbitda, setRegraDeOuro } = useParStore();

  const ebitdaOk = ebitda >= 90;
  const regraOk = regraDeOuro === "OK";

  const memberResults = members.map((m) => ({
    id: m.id,
    name: m.name.split(" ")[0],
    full: m.name,
    resultado: computeIndividualResult(m.id, completions),
    salarios: computeFinalSalaries(m.id, completions, ebitda, regraDeOuro),
    multiplier: m.salaryMultiplier,
  }));
  const avgResultado = Math.round(memberResults.reduce((s, x) => s + x.resultado, 0) / memberResults.length);

  return (
    <div>
      <SectionHeader
        eyebrow="Ciclo 2026 · Visão Executiva"
        title="Programa de Participação Anual nos Resultados"
        description="Visão consolidada das três frentes de avaliação, do gatilho corporativo e da projeção de bônus dos 10 elegíveis."
        right={<ConfidentialBadge>Documento Confidencial</ConfidentialBadge>}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <SummaryCard icon={Users} label="Total Elegíveis" value="10" hint="Liderança Hyndra · Newe" />
        <SummaryCard icon={Calendar} label="Ciclo" value="2026" hint="Janeiro a Dezembro" />
        <SummaryCard icon={Activity} label="Status" value="Em andamento" tone="gold" />
        <SummaryCard
          icon={ShieldCheck}
          label="Regra de Ouro"
          value={regraOk ? "Ativa" : "Zerada"}
          hint={regraOk ? "Sem ocorrências" : "Bônus zerado"}
          tone={regraOk ? "success" : "default"}
        />
      </div>

      {/* Frentes */}
      <div className="grid lg:grid-cols-3 gap-5 mb-10">
        {/* Frente 1 */}
        <Card className="luxe-card p-6">
          <div className="flex items-center justify-between">
            <Badge className="bg-info/15 text-info border-info/30 hover:bg-info/15">Frente 1</Badge>
            <span
              className={`text-[11px] uppercase tracking-widest ${
                ebitdaOk ? "text-success" : ebitda > 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {ebitdaOk ? "Atingido" : ebitda > 0 ? "Não atingido" : "Pendente"}
            </span>
          </div>
          <h3 className="font-display text-xl mt-4">Gatilho Corporativo</h3>
          <p className="text-sm text-muted-foreground mt-1">EBITDA ≥ 90% do planejado · binário</p>

          <div className="mt-6 space-y-2">
            <label className="text-xs text-muted-foreground">EBITDA realizado %</label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                value={ebitda}
                onChange={(e) => setEbitda(Number(e.target.value))}
                className="font-mono-data tabular bg-input/40 border-border"
                min={0}
                max={150}
              />
              <span className="text-2xl font-display gold-text tabular">{ebitda}%</span>
            </div>
          </div>
        </Card>

        {/* Frente 2 */}
        <Card className="luxe-card p-6">
          <div className="flex items-center justify-between">
            <Badge className="bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/15">
              Frente 2 · Eliminatória
            </Badge>
            <span className={`text-[11px] uppercase tracking-widest ${regraOk ? "text-success" : "text-destructive"}`}>
              {regraOk ? "OK" : "Zerado"}
            </span>
          </div>
          <h3 className="font-display text-xl mt-4">Regra de Ouro</h3>
          <p className="text-sm text-muted-foreground mt-1">Zero acidente com afastamento &gt; 90 dias</p>

          <div className="mt-6 flex items-center gap-3">
            <Switch checked={regraOk} onCheckedChange={(v) => setRegraDeOuro(v ? "OK" : "ZERADO")} />
            <span className="text-sm">{regraOk ? "Sem ocorrências" : "Acidente registrado"}</span>
          </div>

          {!regraOk && (
            <div className="mt-4 flex items-start gap-2 text-xs p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Bônus zerado para todos os 10 elegíveis.</span>
            </div>
          )}
        </Card>

        {/* Frente 3 */}
        <Card className="luxe-card p-6">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/15">Frente 3</Badge>
            <span className="text-[11px] uppercase tracking-widest text-primary/80">Médio Ciclo</span>
          </div>
          <h3 className="font-display text-xl mt-4">Metas Individuais</h3>
          <p className="text-sm text-muted-foreground mt-1">Avaliação dos painéis individuais</p>

          <div className="mt-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Média de conclusão</div>
                <div className="font-display text-4xl gold-text tabular">{avgResultado}%</div>
              </div>
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-3 h-1.5 bg-muted/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-gold transition-all"
                style={{ width: `${Math.min(avgResultado, 100)}%` }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Bar chart */}
      <Card className="luxe-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-primary/80">Projeção</div>
            <h3 className="font-display text-2xl mt-1">Bônus simulado por elegível</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Resultado atual · valores em <span className="font-mono-data">salários</span> (multiplicador)
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
            <Link to="/simulador">
              Abrir Simulador <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={memberResults} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={100}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number, _n, p: any) => [`${v} salários (alvo: ${p.payload.multiplier})`, "Projeção"]}
                labelFormatter={(l, p: any) => p?.[0]?.payload?.full ?? l}
              />
              <Bar dataKey="salarios" radius={[0, 6, 6, 0]}>
                {memberResults.map((m, i) => (
                  <Cell key={i} fill={`url(#goldGrad${i % 2})`} />
                ))}
              </Bar>
              <defs>
                <linearGradient id="goldGrad0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(160 64% 32%)" />
                  <stop offset="100%" stopColor="hsl(152 58% 52%)" />
                </linearGradient>
                <linearGradient id="goldGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(168 70% 26%)" />
                  <stop offset="100%" stopColor="hsl(150 55% 48%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
