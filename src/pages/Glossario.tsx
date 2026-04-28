import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/SectionHeader";
import { glossary } from "@/data/glossary";
import { Search } from "lucide-react";

export default function Glossario() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return glossary;
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(s) ||
        t.definition.toLowerCase().includes(s) ||
        t.usage.toLowerCase().includes(s) ||
        t.example.toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <div>
      <SectionHeader
        eyebrow="Linguagem comum"
        title="Glossário do PAR 2026"
        description="Os termos-chave usados pela diretoria, comitê e elegíveis. Pesquise por sigla, conceito ou aplicação prática."
      />

      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por termo, definição ou exemplo…"
          className="pl-10 h-12 bg-input/40 border-border"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Card key={t.term} className="luxe-card p-5 hover:border-primary/40 transition-all">
            <div className="font-mono-data text-primary text-sm tracking-wide">{t.term}</div>
            <div className="gold-rule my-3" />
            <p className="text-sm leading-relaxed">{t.definition}</p>
            <div className="mt-4 space-y-2 text-xs">
              <div>
                <span className="uppercase tracking-widest text-muted-foreground text-[10px]">Uso no PAR · </span>
                <span className="text-foreground/85">{t.usage}</span>
              </div>
              <div>
                <span className="uppercase tracking-widest text-muted-foreground text-[10px]">Exemplo · </span>
                <span className="text-foreground/85">{t.example}</span>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground py-12">
            Nenhum termo encontrado para "{q}".
          </div>
        )}
      </div>
    </div>
  );
}
