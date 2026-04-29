import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SectionHeader } from "@/components/SectionHeader";
import { ConfidentialBadge } from "@/components/ConfidentialBadge";
import { MemberAvatar } from "@/components/MemberAvatar";
import { members } from "@/data/members";
import { useParStore, computeIndividualResult, computeFinalSalaries, goalCompletionPct } from "@/store/parStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColor = (t: string) =>
  t === "Corporativa"
    ? "bg-info/15 text-info border-info/30"
    : t === "Qualidade"
    ? "bg-primary/15 text-primary border-primary/30"
    : "bg-success/15 text-success border-success/30";

export default function Paineis() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const selected = members.find((m) => m.id === memberId) ?? members[0];
  const { completions, ebitda, regraDeOuro, setCompletion } = useParStore();

  useEffect(() => {
    if (!memberId) navigate(`/paineis/${selected.id}`, { replace: true });
  }, [memberId, navigate, selected.id]);

  const result = computeIndividualResult(selected.id, completions);
  const salarios = computeFinalSalaries(selected.id, completions, ebitda, regraDeOuro);
  const totalPts = selected.goals.reduce((s, g) => s + g.points, 0);

  return (
    <div>
      <SectionHeader
        eyebrow="Painel Individual"
        title="Metas, Pontuação e Apuração"
        description="Ajuste o % atingido em cada meta para ver a pontuação ponderada e a projeção do bônus em salários."
        right={
          <div className="w-full md:w-80">
            <Select value={selected.id} onValueChange={(v) => navigate(`/paineis/${v}`)}>
              <SelectTrigger className="bg-input/40 border-border h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name} — {m.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />

      {/* Header card */}
      <Card className="luxe-card p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold-soft pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-5">
          <MemberAvatar name={selected.name} gradient={selected.gradient} size="lg" />
          <div className="flex-1">
            <h3 className="font-display text-2xl">{selected.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selected.role} · {selected.company}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-md border border-primary/30 bg-primary/5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3" /> Bônus alvo
              </div>
              <div className="font-display text-xl gold-text">{selected.salaryMultiplier} salários</div>
            </div>
            <div className="px-4 py-2 rounded-md border border-border bg-card">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Resultado</div>
              <div className="font-display text-xl tabular">{result.toFixed(1)}%</div>
            </div>
            <div className="px-4 py-2 rounded-md border border-primary/30 bg-primary/10">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Projeção</div>
              <div className="font-display text-xl gold-text tabular">{salarios.toFixed(1)} sal.</div>
            </div>
          </div>
        </div>
        {selected.scopeNote && (
          <div className="relative mt-4 text-xs text-muted-foreground border-l-2 border-primary/40 pl-3">
            {selected.scopeNote}
          </div>
        )}
      </Card>

      {/* Goals list */}
      <Card className="luxe-card overflow-hidden">
        {/* Desktop table header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border bg-secondary/40">
          <div className="col-span-2">Tipo / Meta</div>
          <div className="col-span-3">KPI</div>
          <div className="col-span-2">Valor Meta</div>
          <div className="col-span-1 text-center">Pts</div>
          <div className="col-span-3">% Atingido</div>
          <div className="col-span-1 text-right">Pond.</div>
        </div>

        <div className="divide-y divide-border">
          {selected.goals.map((g) => {
            const hasSubs = !!g.subKpis?.length;
            const effectivePct = goalCompletionPct(selected.id, g, completions);
            const value = hasSubs ? effectivePct : completions[selected.id]?.[g.id] ?? 0;
            const pond = (effectivePct / 100) * g.points;
            return (
              <div key={g.id} className="px-5 lg:px-6 py-5 hover:bg-secondary/20 transition-colors">
                {/* Mobile */}
                <div className="lg:hidden">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <Badge className={cn("border text-[10px]", typeColor(g.type))}>{g.type}</Badge>
                      <h4 className="font-display text-lg mt-1.5">{g.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-data text-xs text-muted-foreground">{g.points} pts{g.cap ? ` · teto ${g.cap}%` : ""}</div>
                      <div className="font-display text-lg gold-text tabular">{pond.toFixed(1)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{g.kpi}</div>
                  <div className="text-xs text-foreground/80 mb-3">{g.target} · <span className="text-muted-foreground">{g.deadline}</span></div>
                  {hasSubs ? (
                    <div className="space-y-3">
                      {g.subKpis!.map((sk) => {
                        const sv = completions[selected.id]?.[`${g.id}:${sk.id}`] ?? 0;
                        return (
                          <div key={sk.id}>
                            <div className="flex items-baseline justify-between mb-1">
                              <span className="text-xs font-medium">{sk.name}</span>
                              <span className="font-mono-data text-xs tabular">{sv}% · {sk.points} pts</span>
                            </div>
                            <Slider
                              value={[sv]}
                              max={g.cap ?? 120}
                              step={1}
                              onValueChange={(v) => setCompletion(selected.id, `${g.id}:${sk.id}`, v[0])}
                            />
                            {sk.description && <p className="text-[11px] text-muted-foreground mt-1">{sk.description}</p>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Slider
                        value={[value]}
                        max={g.cap ?? 120}
                        step={1}
                        onValueChange={(v) => setCompletion(selected.id, g.id, v[0])}
                        className="flex-1"
                      />
                      <span className="font-mono-data text-sm w-12 text-right tabular">{value}%</span>
                    </div>
                  )}
                  {g.dependency && (
                    <div className="mt-3 flex items-start gap-2 text-[11px] p-2 rounded-md border border-info/30 bg-info/10 text-info">
                      <Link2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{g.dependency.note}</span>
                    </div>
                  )}
                </div>

                {/* Desktop */}
                <div className="hidden lg:grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-2">
                    <Badge className={cn("border text-[10px]", typeColor(g.type))}>{g.type}</Badge>
                    <h4 className="font-display text-base mt-1.5 leading-tight">{g.name}</h4>
                  </div>
                  <div className="col-span-3 text-sm">
                    <div className="text-foreground/90">{g.kpi}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{g.source}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm">{g.target}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {g.deadline}{g.cap ? ` · teto ${g.cap}%` : ""}
                    </div>
                  </div>
                  <div className="col-span-1 text-center font-mono-data text-sm tabular pt-1">{g.points}</div>
                  <div className="col-span-3">
                    {hasSubs ? (
                      <div className="space-y-3">
                        {g.subKpis!.map((sk) => {
                          const sv = completions[selected.id]?.[`${g.id}:${sk.id}`] ?? 0;
                          return (
                            <div key={sk.id}>
                              <div className="flex items-baseline justify-between mb-1">
                                <span className="text-[11px] text-foreground/85 truncate pr-2">{sk.name}</span>
                                <span className="font-mono-data text-[11px] tabular shrink-0">{sv}% · {sk.points}p</span>
                              </div>
                              <Slider
                                value={[sv]}
                                max={g.cap ?? 120}
                                step={1}
                                onValueChange={(v) => setCompletion(selected.id, `${g.id}:${sk.id}`, v[0])}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Slider
                          value={[value]}
                          max={g.cap ?? 120}
                          step={1}
                          onValueChange={(v) => setCompletion(selected.id, g.id, v[0])}
                          className="flex-1"
                        />
                        <span className="font-mono-data text-sm w-12 text-right tabular">{value}%</span>
                      </div>
                    )}
                    {g.dependency && (
                      <div className="mt-2 flex items-start gap-1.5 text-[11px] text-info">
                        <Link2 className="h-3 w-3 shrink-0 mt-0.5" />
                        <span>{g.dependency.note}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 text-right font-display text-lg gold-text tabular pt-1">
                    {pond.toFixed(1)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer totals */}
        <div className="px-6 py-5 bg-secondary/40 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Pontos disponíveis</div>
            <div className="font-display text-2xl tabular">{totalPts}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Pontuação total</div>
            <div className="font-display text-2xl tabular">{result.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Resultado individual</div>
            <div className="font-display text-2xl gold-text tabular">{result.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <Lock className="h-3 w-3" /> Projeção
            </div>
            <div className="font-display text-2xl gold-text tabular">{salarios.toFixed(1)} sal.</div>
          </div>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <ConfidentialBadge>Valores em R$ ocultos por política</ConfidentialBadge>
        <span className="text-[11px] text-muted-foreground">
          EBITDA atual: <span className="font-mono-data text-foreground">{ebitda}%</span> · Regra de Ouro:{" "}
          <span className={cn("font-mono-data", regraDeOuro === "OK" ? "text-success" : "text-destructive")}>
            {regraDeOuro}
          </span>
        </span>
      </div>
    </div>
  );
}
