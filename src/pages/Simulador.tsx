import { HyndraWatermark } from "@/components/HyndraWatermark";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/SectionHeader";
import { ConfidentialBadge } from "@/components/ConfidentialBadge";
import { MemberAvatar } from "@/components/MemberAvatar";
import { members } from "@/data/members";
import {
  useParStore,
  computeIndividualResult,
  computeFinalSalaries,
  ebitdaMultiplier,
  goalCompletionPct,
} from "@/store/parStore";
import { AlertTriangle, ShieldOff, Lock, Link2 } from "lucide-react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

export default function Simulador() {
  const [selectedId, setSelectedId] = useState(members[0].id);
  const member = members.find((m) => m.id === selectedId)!;
  const { ebitda, regraDeOuro, completions, setEbitda, setRegraDeOuro, setCompletion } = useParStore();

  const ebitdaOk = ebitda >= 90;
  const regraOk = regraDeOuro === "OK";

  const result = computeIndividualResult(member.id, completions);
  const mult = ebitdaMultiplier(ebitda);
  const salarios = computeFinalSalaries(member.id, completions, ebitda, regraDeOuro);
  const finalPct = (result / 100) * mult * 100;

  // Bar chart by category
  const byCategory = ["Corporativa", "Individual", "Qualidade"]
    .map((cat) => {
      const goals = member.goals.filter((g) => g.type === cat);
      if (goals.length === 0) return null;
      const score = goals.reduce(
        (s, g) => s + (goalCompletionPct(member.id, g, completions) / 100) * g.points,
        0,
      );
      const totalPts = goals.reduce((s, g) => s + g.points, 0);
      return { cat, score: Math.round(score * 10) / 10, totalPts };
    })
    .filter(Boolean) as { cat: string; score: number; totalPts: number }[];

  return (
    <div>
      <SectionHeader
        eyebrow="Cálculo Interativo"
        title="Simulador de Bônus"
        description="Modele cenários ajustando EBITDA, Regra de Ouro e o % atingido em cada meta. Os valores em R$ permanecem confidenciais."
        right={<ConfidentialBadge>Saída em salários</ConfidentialBadge>}
      />

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Left — controls */}
        <div className="space-y-6">
          {/* Top controls */}
          <Card className="luxe-card p-6 relative overflow-hidden"><HyndraWatermark size={160} opacity={0.04} />
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Elegível</label>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger className="mt-2 bg-input/40 border-border h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-muted-foreground">EBITDA realizado</label>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">80% — 130%</span>
                    <span className="font-display text-xl gold-text tabular">{ebitda}%</span>
                  </div>
                  <Slider
                    value={[ebitda]}
                    min={80}
                    max={130}
                    step={1}
                    onValueChange={(v) => setEbitda(v[0])}
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Regra de Ouro</label>
                <div className="mt-3 flex items-center gap-3 h-11">
                  <Switch checked={regraOk} onCheckedChange={(v) => setRegraDeOuro(v ? "OK" : "ZERADO")} />
                  <span
                    className={cn(
                      "font-mono-data text-sm",
                      regraOk ? "text-success" : "text-destructive",
                    )}
                  >
                    {regraOk ? "OK" : "ZERADO"}
                  </span>
                </div>
              </div>
            </div>

            {!regraOk && (
              <div className="mt-5 flex items-start gap-2 text-sm p-4 rounded-md border border-destructive/40 bg-destructive/10 text-destructive">
                <ShieldOff className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Bônus zerado — acidente com afastamento &gt; 90 dias registrado.</span>
              </div>
            )}
            {!ebitdaOk && regraOk && (
              <div className="mt-5 flex items-start gap-2 text-sm p-4 rounded-md border border-warning/40 bg-warning/10 text-warning-foreground">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-warning" />
                <span className="text-warning">Gatilho corporativo não atingido — avaliação suspensa (EBITDA &lt; 90%).</span>
              </div>
            )}
          </Card>

          {/* Goal sliders */}
          <Card className="luxe-card p-6 relative overflow-hidden"><HyndraWatermark size={160} opacity={0.04} />
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-xl">Metas — {member.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/10">
                <Lock className="h-3 w-3 mr-1" /> {member.salaryMultiplier} salários
              </Badge>
            </div>

            {member.scopeNote && (
              <div className="mb-4 text-xs text-muted-foreground border-l-2 border-primary/40 pl-3">
                {member.scopeNote}
              </div>
            )}

            <div className="space-y-5">
              {member.goals.map((g) => {
                const hasSubs = !!g.subKpis?.length;
                const effectivePct = goalCompletionPct(member.id, g, completions);
                const value = hasSubs ? Math.round(effectivePct) : completions[member.id]?.[g.id] ?? 0;
                return (
                  <div key={g.id}>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <div className="min-w-0">
                        <span
                          className={cn(
                            "text-[10px] uppercase tracking-widest mr-2 px-1.5 py-0.5 rounded border",
                            g.type === "Corporativa"
                              ? "text-info border-info/30 bg-info/10"
                              : g.type === "Qualidade"
                              ? "text-primary border-primary/30 bg-primary/10"
                              : "text-success border-success/30 bg-success/10",
                          )}
                        >
                          {g.type}
                        </span>
                        <span className="text-sm font-medium">{g.name}</span>
                        <span className="text-xs text-muted-foreground ml-2 font-mono-data">
                          · {g.points} pts{g.cap ? ` · teto ${g.cap}%` : ""}
                        </span>
                      </div>
                      <span className="font-mono-data text-sm tabular shrink-0">{value}%</span>
                    </div>
                    {hasSubs ? (
                      <div className="space-y-3 pl-3 border-l border-border/60">
                        {g.subKpis!.map((sk) => {
                          const sv = completions[member.id]?.[`${g.id}:${sk.id}`] ?? 0;
                          return (
                            <div key={sk.id}>
                              <div className="flex items-baseline justify-between mb-1">
                                <span className="text-xs text-foreground/85">{sk.name}</span>
                                <span className="font-mono-data text-xs tabular">{sv}% · {sk.points}p</span>
                              </div>
                              <Slider
                                value={[sv]}
                                max={g.cap ?? 120}
                                step={1}
                                onValueChange={(v) => setCompletion(member.id, `${g.id}:${sk.id}`, v[0])}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Slider
                        value={[value]}
                        max={g.cap ?? 120}
                        step={1}
                        onValueChange={(v) => setCompletion(member.id, g.id, v[0])}
                      />
                    )}
                    {g.dependency && (
                      <div className="mt-2 flex items-start gap-1.5 text-[11px] text-info">
                        <Link2 className="h-3 w-3 shrink-0 mt-0.5" />
                        <span>{g.dependency.note}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bar chart */}
          <Card className="luxe-card p-6 relative overflow-hidden"><HyndraWatermark size={160} opacity={0.04} />
            <h3 className="font-display text-xl mb-1">Pontuação por categoria</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Pontos ponderados acumulados em cada frente
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="cat" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number, _n, p: any) => [`${v} / ${p.payload.totalPts} pts`, "Pontuação"]}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {byCategory.map((c, i) => (
                      <Cell
                        key={i}
                        fill={
                          c.cat === "Corporativa"
                            ? "hsl(213 70% 50%)"
                            : c.cat === "Qualidade"
                            ? "hsl(41 60% 58%)"
                            : "hsl(152 55% 45%)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right — output */}
        <div className="lg:sticky lg:top-6 self-start">
          <Card className="luxe-card p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-gold-soft pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <MemberAvatar name={member.name} gradient={member.gradient} size="md" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Apuração</div>
                  <div className="font-display text-lg leading-none">{member.name}</div>
                </div>
              </div>

              <div className="space-y-4">
                <Row label="Resultado individual" value={`${result.toFixed(1)}%`} />
                <Row label="Multiplicador EBITDA" value={`${(mult * 100).toFixed(0)}%`} />
                <div className="gold-rule" />
                <Row label="Resultado final" value={`${finalPct.toFixed(1)}%`} highlight />
                <div className="px-4 py-5 rounded-md border border-primary/40 bg-primary/10 text-center">
                  <div className="text-[10px] uppercase tracking-widest text-primary/80 flex items-center justify-center gap-1 mb-1">
                    <Lock className="h-3 w-3" /> Salários a receber
                  </div>
                  <div className="font-display text-5xl gold-text tabular leading-none">
                    {salarios.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Alvo: {member.salaryMultiplier} salários
                  </div>
                </div>

                {!regraOk && (
                  <div className="text-xs p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive">
                    Bônus zerado — acidente com afastamento registrado.
                  </div>
                )}
                {!ebitdaOk && regraOk && (
                  <div className="text-xs p-3 rounded-md border border-warning/40 bg-warning/10 text-warning">
                    Gatilho corporativo não atingido — avaliação suspensa.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-display tabular",
          highlight ? "text-2xl gold-text" : "text-xl",
        )}
      >
        {value}
      </span>
    </div>
  );
}
