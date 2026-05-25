import logoHyndra from "@/assets/logo-hyndra.png";
import logoNewe from "@/assets/logo-newe.png";
import hyndraMark from "@/assets/hyndra-mark.png";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden luxe-card mb-12 border-emerald-bright/10">
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />

      {/* Animated emerald aurora */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{ backgroundImage: "var(--gradient-hero-aurora)" }}
      />

      {/* Conic emerald sweep */}
      <div
        className="absolute -top-1/2 -left-1/4 w-[140%] h-[200%] opacity-[0.12] blur-3xl pointer-events-none"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, transparent 0deg, hsl(var(--emerald)) 60deg, hsl(var(--emerald-bright)) 120deg, transparent 200deg)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Left emerald edge stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-emerald-bright/70 to-transparent" />

      {/* Watermark mark */}
      <img
        src={hyndraMark}
        alt=""
        aria-hidden
        className="absolute -right-24 -bottom-24 w-[520px] opacity-[0.06] select-none pointer-events-none animate-float-slow"
        style={{ filter: "hue-rotate(95deg) saturate(1.4)" }}
      />

      {/* Floating emerald orbs */}
      <div className="absolute top-12 right-[18%] h-2 w-2 rounded-full bg-emerald-glow shadow-[0_0_24px_hsl(var(--emerald-glow))] animate-pulse-glow" />
      <div className="absolute top-1/2 right-[8%] h-1.5 w-1.5 rounded-full bg-emerald-bright shadow-[0_0_18px_hsl(var(--emerald-bright))] animate-pulse-glow" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-24 left-[20%] h-1 w-1 rounded-full bg-emerald-glow shadow-[0_0_14px_hsl(var(--emerald-glow))] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative px-7 sm:px-12 lg:px-16 py-14 lg:py-20">
        {/* Top row: logos + confidencial */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <img src={logoHyndra} alt="Hyndra" className="h-7 w-28 object-contain" />
            <span className="h-5 w-px bg-emerald-bright/40" />
            <img src={logoNewe} alt="Newe Urbanismo" className="h-7 w-28 object-contain" />
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-bright opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-bright" />
            </span>
            <Lock className="h-3 w-3 text-emerald-bright/80" />
            Documento Confidencial
          </div>
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-bright" />
          <Sparkles className="h-3 w-3 text-emerald-bright" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-bright/90">
            Ciclo 2026 · Visão Executiva
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-light leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-[7.5rem] max-w-5xl">
          PAR <span className="emerald-text">2026</span>
        </h1>

        <div className="emerald-rule my-8 max-w-2xl" />

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
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-sm text-sm font-medium tracking-wide text-primary-foreground overflow-hidden transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--gradient-emerald)", boxShadow: "var(--shadow-emerald)" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
            <span className="relative">Acessar Metas Corporativas</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/simulador"
            className="inline-flex items-center gap-3 border border-emerald-bright/40 px-6 py-3 rounded-sm text-sm font-medium tracking-wide text-foreground/90 hover:border-emerald-bright hover:text-emerald-bright hover:bg-emerald-bright/5 transition-colors"
          >
            Abrir Simulador de Bônus
          </Link>
        </div>

        {/* Stats footer */}
        <div className="mt-14 pt-8 border-t border-emerald-bright/15 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { k: "10", l: "Líderes elegíveis" },
            { k: "03", l: "Frentes de avaliação" },
            { k: "2026", l: "Ciclo vigente" },
            { k: "100%", l: "Confidencial" },
          ].map((s) => (
            <div key={s.l} className="group">
              <div className="font-display text-3xl lg:text-4xl emerald-text tabular">{s.k}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-emerald-bright/80 transition-colors">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
