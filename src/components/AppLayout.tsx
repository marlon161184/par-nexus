import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Target, BarChart3, Calculator, BookOpen, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-sidebar border-r border-sidebar-border sticky top-0 h-screen">
        <div className="px-7 pt-8 pb-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Hyndra · Newe
          </div>
          <h1 className="font-display text-4xl mt-4 leading-none tracking-tight font-light">
            PAR <span className="gold-text">2026</span>
          </h1>
          <p className="text-[11px] text-muted-foreground mt-3 max-w-[22ch] leading-relaxed">
            Plataforma de Resultados · Programa de Participação Anual
          </p>
        </div>
        <div className="gold-rule mx-7" />
        <nav className="flex-1 px-4 py-6 space-y-0.5 overflow-y-auto">
          {navItems.map((it) => {
            const active = pathname === it.to || (it.to !== "/" && pathname.startsWith(it.to));
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={cn(
                  "group flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm transition-all border-l-2",
                  active
                    ? "bg-sidebar-accent text-primary border-primary"
                    : "text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent/60 border-transparent",
                )}
              >
                <span className={cn("font-mono text-[10px] tracking-widest", active ? "text-primary" : "text-muted-foreground")}>{it.num}</span>
                <it.icon className={cn("h-4 w-4", active && "text-primary")} />
                <span className="font-body tracking-tight">{it.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="px-7 py-5 border-t border-sidebar-border text-[10px] leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-1.5 font-mono uppercase tracking-widest">
            <Lock className="h-3 w-3 text-primary/70" />
            Confidencial
          </div>
          <div className="mt-1">Ciclo 2026 · Hyndra · Newe</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-sidebar/95 backdrop-blur border-b border-sidebar-border flex items-center px-5">
        <h1 className="font-display text-xl">
          PAR <span className="gold-text">2026</span>
        </h1>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Hyndra · Newe</span>
      </div>

      <main className="flex-1 min-w-0 pt-14 lg:pt-0 pb-24 lg:pb-0">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 lg:py-12 animate-fade-in">{children}</div>
        <footer className="hidden lg:block text-center text-[11px] text-muted-foreground py-8 border-t border-border/40 mt-12">
          Documento Confidencial · Ciclo 2026 · Hyndra Participações · Newe Urbanismo
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
