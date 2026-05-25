import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Target, BarChart3, Calculator, BookOpen, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import logoHyndra from "@/assets/logo-hyndra.png";
import logoNewe from "@/assets/logo-newe.png";


const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, num: "01" },
  { to: "/elegiveis", label: "Elegíveis", icon: Users, num: "02" },
  { to: "/metas", label: "Metas Corporativas", icon: Target, num: "03" },
  { to: "/paineis", label: "Painéis Individuais", icon: BarChart3, num: "04" },
  { to: "/simulador", label: "Simulador de Bônus", icon: Calculator, num: "05" },
  { to: "/glossario", label: "Glossário", icon: BookOpen, num: "06" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex w-full bg-gradient-ink">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-sidebar border-r border-sidebar-border sticky top-0 h-screen relative overflow-hidden">
        {/* Emerald aurora glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              "radial-gradient(60% 40% at 0% 0%, hsl(var(--emerald) / 0.18), transparent 70%), radial-gradient(50% 35% at 100% 100%, hsl(var(--emerald-bright) / 0.10), transparent 70%)",
          }}
        />
        {/* Vertical emerald edge */}
        <div className="absolute right-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-emerald-bright/40 to-transparent" />

        <div className="relative px-7 pt-8 pb-6">
          <div className="flex items-center gap-4 h-7 mb-5 opacity-95">
            <img src={logoHyndra} alt="Hyndra" className="h-6 w-24 object-contain" />
            <span className="h-4 w-px bg-emerald-bright/40" />
            <img src={logoNewe} alt="Newe Urbanismo" className="h-6 w-24 object-contain" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-bright/80 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-bright opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-bright" />
            </span>
            Hyndra · Newe
          </div>
          <h1 className="font-display text-4xl mt-3 leading-none tracking-tight font-light">
            PAR <span className="emerald-text">2026</span>
          </h1>
          <p className="text-[11px] text-muted-foreground mt-3 max-w-[22ch] leading-relaxed">
            Plataforma de Resultados · Programa de Participação Anual
          </p>
        </div>

        <div className="emerald-rule mx-7 relative" />
        <nav className="relative flex-1 px-4 py-6 space-y-0.5 overflow-y-auto">
          {navItems.map((it) => {
            const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={cn(
                  "group relative flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm transition-all border-l-2 overflow-hidden",
                  active
                    ? "bg-emerald/10 text-emerald-bright border-emerald-bright shadow-[inset_0_0_24px_hsl(var(--emerald)/0.12)]"
                    : "text-sidebar-foreground hover:text-emerald-bright hover:bg-emerald/5 border-transparent hover:border-emerald-bright/50",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-glow via-emerald-bright to-emerald shadow-[0_0_12px_hsl(var(--emerald-bright))]" />
                )}
                <span className={cn("font-mono text-[10px] tracking-widest", active ? "text-emerald-bright" : "text-muted-foreground group-hover:text-emerald-bright/70")}>{it.num}</span>
                <it.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", active && "text-emerald-bright")} />
                <span className="font-body tracking-tight">{it.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="relative px-7 py-5 border-t border-sidebar-border text-[10px] leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-1.5 font-mono uppercase tracking-widest">
            <Lock className="h-3 w-3 text-emerald-bright/80" />
            Confidencial
          </div>
          <div className="mt-1">Ciclo 2026 · Hyndra · Newe</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-sidebar/95 backdrop-blur border-b border-sidebar-border flex items-center px-5 gap-3">
        <img src={logoHyndra} alt="Hyndra" className="h-5 w-20 object-contain opacity-90" />
        <span className="h-3 w-px bg-border/60" />
        <img src={logoNewe} alt="Newe" className="h-5 w-20 object-contain opacity-90" />
        <h1 className="ml-auto font-display text-lg">
          PAR <span className="gold-text">2026</span>
        </h1>
      </div>

      <main className="flex-1 min-w-0 pt-14 lg:pt-0 pb-24 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 lg:py-12 animate-fade-in">{children}</div>
        <footer className="hidden lg:flex flex-col items-center gap-4 py-10 border-t border-border/40 mt-12">
          <div className="flex items-center gap-5 opacity-80">
            <img src={logoHyndra} alt="Hyndra" className="h-6 w-24 object-contain" />
            <span className="h-4 w-px bg-border/60" />
            <img src={logoNewe} alt="Newe Urbanismo" className="h-6 w-24 object-contain" />
          </div>
          <div className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Confidencial · Ciclo 2026 · Hyndra Participações · Newe Urbanismo
          </div>
        </footer>
      </main>


      {/* Bottom nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar/95 backdrop-blur border-t border-sidebar-border">
        <div className="grid grid-cols-6">
          {navItems.map((it) => {
            const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={cn(
                  "flex flex-col items-center justify-center py-2.5 gap-1 text-[10px]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <it.icon className="h-4 w-4" />
                <span className="leading-none truncate max-w-[60px]">{it.label.split(" ")[0]}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
