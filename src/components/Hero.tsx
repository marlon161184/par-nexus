import logoHyndra from "@/assets/logo-hyndra.png";
import logoNewe from "@/assets/logo-newe.png";
import hyndraMark from "@/assets/hyndra-mark.png";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden luxe-card mb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsl(var(--primary-glow)) 0%, transparent 45%)",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Watermark mark */}
      <img
        src={hyndraMark}
        alt=""
        aria-hidden
        className="absolute -right-24 -bottom-24 w-[520px] opacity-[0.05] select-none pointer-events-none"
      />

      <div className="relative px-7 sm:px-12 lg:px-16 py-14 lg:py-20">
        {/* Top row: logos + confidencial */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <img src={logoHyndra} alt="Hyndra" className="h-7 w-28 object-contain" />
            <span className="h-5 w-px bg-border" />
            <img src={logoNewe} alt="Newe Urbanismo" className="h-7 w-28 object-contain" />
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Lock className="h-3 w-3 text-primary/70" />
            Documento Confidencial
          </div>
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-primary/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Ciclo 2026 · Visão Executiva
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-[7.5rem] max-w-5xl">
          PAR <span className="gold-text">2026</span>
        </h1>

        <div className="gold-rule my-8 max-w-2xl" />

        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-light leading-tight max-w-3xl tracking-tight text-foreground/90">
          Programa de Participação <br className="hidden sm:block" />
          <span className="text-muted-foreground">Anual nos Resultados.</span>
        </p>

        <p className="mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed">
          Plataforma executiva para condução, mensuração e simulação do programa
          de bônus dos 10 líderes elegíveis da Hyndra Participações e da Newe Urbanismo.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/metas"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
          >
            Acessar Metas Corporativas
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/simulador"
            className="inline-flex items-center gap-3 border border-border px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:border-primary/60 hover:text-primary transition-colors"
          >
            Abrir Simulador de Bônus
          </Link>
        </div>

        {/* Stats footer */}
        <div className="mt-14 pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { k: "10", l: "Líderes elegíveis" },
            { k: "03", l: "Frentes de avaliação" },
            { k: "2026", l: "Ciclo vigente" },
            { k: "100%", l: "Confidencial" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl lg:text-4xl gold-text tabular">{s.k}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
