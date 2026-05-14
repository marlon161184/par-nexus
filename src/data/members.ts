export type GoalType = "Corporativa" | "Individual" | "Qualidade";

export interface SubKpi {
  id: string;
  name: string;
  points: number;
  description?: string;
}

export interface Goal {
  id: string;
  type: GoalType;
  name: string;
  description: string;
  points: number;
  kpi: string;
  target: string;
  deadline: string;
  source?: string;
  cap?: number; // teto em %
  subKpis?: SubKpi[];
  dependency?: { memberId: string; goalId: string; note: string };
}

export interface Member {
  id: string;
  name: string;
  role: string;
  company: string;
  salaryMultiplier: number;
  gradient: string;
  scopeNote?: string;
  goals: Goal[];
}

const g = (
  id: string,
  type: GoalType,
  name: string,
  points: number,
  kpi: string,
  target: string,
  deadline = "dez/26",
  description = "",
  source = "Memória de Cálculo PAR 2026",
  extras: Partial<Pick<Goal, "cap" | "subKpis" | "dependency">> = {},
): Goal => ({
  id,
  type,
  name,
  description: description || name,
  points,
  kpi,
  target,
  deadline,
  source,
  ...extras,
});

export const members: Member[] = [
  {
    id: "fernando",
    name: "Fernando Rainieri",
    role: "Superintendente de Operações",
    company: "Newe Urbanismo",
    salaryMultiplier: 5,
    gradient: "from-amber-500 to-rose-600",
    goals: [
      g("f1", "Corporativa", "Controle de Custos de Obra", 25, "Custo Obra Atma + Ária dentro do orçamento", "Fórmula inversa teto 120%", "dez/26", "", "Relatório de Obras"),
      g("f2", "Corporativa", "Fluxo de Caixa", 20, "Exposição máxima de caixa", "≤ R$50M de exposição", "dez/26", "", "Financeiro (Matteo)"),
      g("f3", "Individual", "Sell-out Atma + Ária", 20, "VSO Atma e Ária", "100% Atma · VSO Ária ≥ 30%", "dez/26", "", "Relatório Comercial"),
      g("f4", "Individual", "Lançamento Ária", 15, "Checklist GTM 100% executado", "Milestone binário", "dez/26", "", "Ata de Comitê"),
      g("f5", "Individual", "Landbanking", 10, "Áreas aprovadas pelo Comitê", "≥ 2 áreas aprovadas", "dez/26", "", "Registro Comitê Estratégico"),
      g("f6", "Individual", "Governança Executiva", 10, "Reuniões de Comitê + Orçamento 2027", "6 reuniões Comitê + Orçamento 2027 aprovado", "nov/26", "", "Ata de Comitê"),
    ],
  },
  {
    id: "rafael",
    name: "Rafael Salomão",
    role: "Diretor Comercial & Marketing",
    company: "Newe Urbanismo",
    salaryMultiplier: 4,
    gradient: "from-emerald-500 to-teal-700",
    scopeNote: "Escopo 2026: Atma · Branding · Novos Negócios. Ária fora do escopo — lançamento previsto para 2027.",
    goals: [
      g("r1", "Corporativa", "VGV / Receita — Atma", 25, "VGV vendido Atma", "Atma ≥ R$92M", "dez/26", "Rafael, Leandro e Nabil são co-responsáveis como geradores de receita.", "CRM + Financeiro"),
      g("r2", "Corporativa", "VSO — Velocidade de Vendas Atma", 15, "VSO mensal Atma", "Atma ≥ 5% de sell-out/mês", "dez/26", "", "Relatório Comercial", { cap: 120 }),
      g(
        "r3",
        "Individual",
        "Projeto de Branding",
        20,
        "NPS de Marca + CRM com taxonomia de canais",
        "NPS Marca ≥ 50 · CRM com taxonomia homologada",
        "dez/26 (baseline NPS: mai/26)",
        "Reposicionamento de marca Atma + governança de atribuição de canais.",
        "Pesquisa externa + CRM (Gustavo Garcia)",
        {
          subKpis: [
            { id: "r3a", name: "KPI A — NPS de Marca ≥ 50", points: 10, description: "Pesquisa estruturada com leads qualificados e compradores Atma após lançamento do novo posicionamento. Requer baseline antes de mai/26." },
            { id: "r3b", name: "KPI B — CRM com taxonomia de origem", points: 10, description: "Modelo de atribuição de canais (orgânico, indicação, PR, eventos, mídia paga) homologado como KPI oficial da área C&M. Meta de % canais de marca (≥30% MQL orgânico) entra no PAR 2027." },
          ],
          dependency: { memberId: "leandro", goalId: "le4", note: "KPI B depende formalmente da meta de Governança de CRM de Leandro Gonçalves." },
        },
      ),
      g("r4", "Individual", "Novos Negócios — Estudos e Due Diligence", 15, "Estudos de viabilidade + due diligence entregues", "≥ 2 estudos ao Comitê · ≥ 1 due diligence com parecer", "dez/26", "", "Registro Comitê Estratégico", { cap: 120 }),
      g("r5", "Individual", "Liderança e Desenvolvimento do Time C&M", 15, "Trilhas da Academia de Vendas + NPS interno", "≥ 3 trilhas ativas · OKRs Leandro/Nabil revisados trimestralmente · NPS interno C&M ≥ 70", "dez/26", "", "RH (Marlon) + Pesquisa interna"),
      g("r6", "Individual", "Inteligência Comercial e Forecast Estratégico", 10, "Acurácia de forecast + relatórios de mercado", "Acurácia ≥ 8/12 meses (desvio ≤ 15%) · 4 relatórios trimestrais ao Comitê", "dez/26", "", "CRM + Apresentações Comitê", { cap: 120 }),
    ],
  },
  {
    id: "leandro",
    name: "Leandro Gonçalves",
    role: "Head Comercial & Marketing da Operação",
    company: "Newe Urbanismo",
    salaryMultiplier: 4,
    gradient: "from-sky-500 to-indigo-700",
    scopeNote: "Filtro operacional entre a visão do Diretor e a execução de Nabil. Responsável por execução comercial, disciplina de processo e dados.",
    goals: [
      g("le1", "Corporativa", "Receita Comercial Recebida", 20, "Receita recebida vs. projeção mensal", "≥ 90% da projeção mensal de receitas recebidas", "dez/26", "Rafael, Leandro e Nabil são co-responsáveis — Leandro responde pela cadência de recebimento.", "Financeiro (Matteo) + CRM", { cap: 120 }),
      g("le2", "Corporativa", "Pipeline Qualificado — MQL e Volume", 15, "Volume MQL + taxa de conversão do funil", "≥ 720 MQL/ano · Pipeline ≥ R$20M · MQL→SQL ≥ 15%", "dez/26", "", "CRM (Gustavo Garcia)", { cap: 120 }),
      g("le3", "Individual", "Conversão Comercial e Disciplina de Processo", 20, "Taxa de conversão + SLA de contrato", "Visitas → vendas ≥ 50% · 100% propostas validadas · Contratos em ≤ 7 dias", "dez/26", "", "CRM + Jurídico", { cap: 120 }),
      g(
        "le4",
        "Individual",
        "Governança de CRM e Dados Comerciais",
        20,
        "Completude CRM + relatórios + dashboard",
        "≥ 90% campos obrigatórios · 12 relatórios mensais · Dashboard VSO+CAC até mar/26 · Taxonomia de origem implantada",
        "dez/26 (dashboard: mar/26)",
        "Suporta o KPI B do Projeto de Branding de Rafael.",
        "CRM (Gustavo Garcia)",
        { cap: 100, dependency: { memberId: "rafael", goalId: "r3", note: "Suporta o KPI B (taxonomia de canais) do Projeto de Branding de Rafael Salomão." } },
      ),
      g("le5", "Individual", "Qualidade e Compliance de Marketing", 15, "% materiais aprovados sem retrabalho + CAC", "100% materiais aprovados · zero retrabalho por compliance · CAC ≤ R$15k/unidade (Atma)", "dez/26", "", "Relatório MKT + Financeiro"),
      g("le6", "Individual", "Orçamento Operacional C&M", 10, "Desvio orçamentário C&M acumulado", "MKT R$5,4M + Comercial R$4,6M com desvio ≤ 5%", "dez/26", "Cálculo por fórmula inversa.", "Financeiro (Matteo)"),
    ],
  },
  {
    id: "caetano",
    name: "Caetano Viana de Jesus",
    role: "Head de PPA",
    company: "Newe Urbanismo",
    salaryMultiplier: 4,
    gradient: "from-indigo-500 to-blue-800",
    goals: [
      g("c1", "Corporativa", "VGV / Receita", 20, "VGV vendido Atma + Ária", "Atma R$92M · Ária R$85,5M", "dez/26", "", "CRM + Financeiro"),
      g("c2", "Corporativa", "Controle de Custos de Obra", 20, "Custo de obra vs. orçamento", "Fórmula inversa teto 120%", "dez/26", "", "Relatório de Obras"),
      g("c3", "Individual", "Inteligência de Mercado", 10, "Relatórios entregues ao Comitê", "4 relatórios ao Comitê", "dez/26", "", "Ata de Comitê"),
      g("c4", "Individual", "Aprovações de Projetos", 20, "Aprovações obtidas por empreendimento", "Ária jun/26 · Gaia dez/26 · Graprohab dez/26", "dez/26", "", "Registro de aprovações"),
      g("c5", "Individual", "Orçamento do Departamento", 15, "Execução orçamentária PPA", "MKT R$5,4M · Comercial R$4,6M dentro do orçamento", "dez/26", "", "Financeiro (Matteo)"),
      g("c6", "Individual", "Expansão Landbank", 15, "Áreas em processo dentro do prazo", "4 áreas em ≤ 10 semanas do TI", "dez/26", "", "Registro Comitê Estratégico"),
    ],
  },
  {
    id: "matteo",
    name: "Matteo Risolia",
    role: "Head Financeiro & Investimentos",
    company: "Hyndra / Newe",
    salaryMultiplier: 4,
    gradient: "from-violet-500 to-purple-800",
    goals: [
      g("m1", "Corporativa", "VGV / Receita", 20, "VGV vendido Atma + Ária", "Atma R$92M · Ária R$85,5M", "dez/26", "", "CRM + Financeiro"),
      g("m2", "Corporativa", "Fluxo de Caixa", 25, "Exposição máxima de caixa", "≤ R$50M de exposição", "dez/26", "", "Relatório Financeiro"),
      g("m3", "Individual", "Gestão da Carteira de Investimentos", 30, "Rentabilidade + Sharpe + Volatilidade", "≥ 100% CDI · Sharpe > 0,5 · Vol ≤ 2%", "dez/26", "", "Relatório de Investimentos"),
      g("m4", "Individual", "Agenda Mensal de Resultados", 15, "Template + % reuniões + NPS", "Template jun/26 · ≥ 90% realizadas · NPS ≥ 70", "dez/26", "", "Ata + Pesquisa interna"),
      g("m5", "Individual", "Orçamento 2027 + OPEX Consolidado", 10, "Ciclo orçamentário + relatórios OPEX", "Ciclo nov/26 · 11 relatórios OPEX mensais", "dez/26", "", "Financeiro"),
    ],
  },
  {
    id: "marlon",
    name: "Marlon Silva",
    role: "Head de Pessoas e Cultura",
    company: "Hyndra / Newe",
    salaryMultiplier: 4,
    gradient: "from-pink-500 to-rose-700",
    goals: [
      g("ma1", "Corporativa", "VGV / Receita", 20, "Capacidade organizacional para suportar VGV", "Estrutura de time C&M completa e operacional", "dez/26", "", "RH + Comitê"),
      g("ma2", "Corporativa", "Custo de Pessoas", 20, "Folha + encargos vs. orçamento", "Dentro do orçamento aprovado", "dez/26", "", "Financeiro (Matteo)"),
      g("ma3", "Individual", "Harmonização de Benefícios", 15, "Pacote implantado + eNPS", "100% pacote jun/26 · eNPS ≥ 70", "set/26", "", "RH + Pesquisa interna"),
      g("ma4", "Individual", "Academia de Vendas Newe", 20, "Trilhas ativas + % conclusão", "3 trilhas · ≥ 80% conclusão time Comercial", "dez/26", "", "LMS + RH"),
      g("ma5", "Individual", "Cultura Organizacional", 15, "Toolkit + % colaboradores treinados", "Toolkit Nosso Jeito de Ser Newe · 100% treinados", "dez/26", "", "RH + Pesquisa interna"),
      g("ma6", "Individual", "Planejamento Estratégico 5 Year Plan", 10, "Milestone + aprovação Comitê", "Milestone binário · Aprovação Comitê", "dez/26", "", "Ata de Comitê"),
    ],
  },
  {
    id: "nabil",
    name: "Nabil Barakat Bezerra",
    role: "Gerente de Vendas",
    company: "Newe Urbanismo",
    salaryMultiplier: 3,
    gradient: "from-orange-500 to-red-700",
    scopeNote: "Co-responsável como gerador de receita junto com Rafael e Leandro — papel de execução e fechamento.",
    goals: [
      g("n1", "Corporativa", "VGV / Receita", 25, "VGV gerado por conversão e fechamento", "Conforme target Atma", "dez/26", "", "CRM + Financeiro"),
      g("n2", "Corporativa", "Receita Comercial Recebida", 10, "Receita recebida vs. projeção mensal", "≥ 90% projeção mensal", "dez/26", "", "Financeiro + CRM"),
      g("n3", "Corporativa", "VSO", 15, "VSO mensal Atma", "Atma ≥ 5%/mês", "dez/26", "", "Relatório Comercial"),
      g("n4", "Individual", "Conversão Comercial", 25, "Visitas → Vendas", "≥ 50%", "dez/26", "", "CRM"),
      g("n5", "Individual", "Disciplina Comercial", 15, "Propostas validadas + SLA contratos", "100% propostas validadas · Contratos ≤ 7 dias", "dez/26", "", "CRM + Jurídico"),
      g("n6", "Individual", "Acurácia de Forecast", 10, "Desvio do forecast mensal", "≥ 8/12 meses com desvio ≤ 15%", "dez/26", "", "CRM"),
    ],
  },
  {
    id: "rogerio",
    name: "Rogério Jaruche",
    role: "Gerente de Obras",
    company: "Newe Urbanismo",
    salaryMultiplier: 3,
    gradient: "from-amber-600 to-yellow-800",
    goals: [
      g("ro1", "Corporativa", "Controle de Custos de Obra", 30, "Custo de obra vs. orçamento", "Fórmula inversa teto 120%", "dez/26", "", "Relatório de Obras"),
      g("ro2", "Individual", "Andamento Físico de Obras", 20, "% execução física", "Atma 65% · Ária 15%", "dez/26", "", "Relatório de Obras"),
      g("ro3", "Individual", "Andamento Financeiro", 20, "Desvio financeiro vs. cronograma", "Desvio máximo 5%", "dez/26", "", "Financeiro + Obras"),
      g("ro4", "Individual", "Qualidade e Segurança Proativa", 15, "Checklists + DDS", "≥ 90% checklists · ≥ 85% DDS", "dez/26", "", "Relatório de Obras"),
      g("ro5", "Individual", "Contratos de Fornecedores", 15, "Contratos no prazo baseline", "100% no prazo do baseline", "dez/26", "", "Jurídico + Obras"),
    ],
  },
  {
    id: "mauricio",
    name: "Maurício Barcellos",
    role: "Gerente de Planejamento",
    company: "Newe Urbanismo",
    salaryMultiplier: 3,
    gradient: "from-cyan-500 to-blue-800",
    goals: [
      g("mb1", "Corporativa", "Fluxo de Caixa — Previsibilidade", 20, "Acurácia por empreendimento", "Atma R$26M · Ária R$10M · Teto 120%", "dez/26", "", "Financeiro (Matteo)"),
      g("mb2", "Individual", "Andamento Físico", 30, "% execução vs. baseline", "65% do baseline aprovado", "dez/26", "", "Relatório de Obras"),
      g("mb3", "Individual", "Acurácia de Custos", 25, "Desvio projetado vs. realizado", "Desvio ≤ 5%", "dez/26", "", "Financeiro + Planejamento"),
      g("mb4", "Individual", "Relatórios no Prazo", 15, "SLA de entrega ao CEO", "100% SLA", "dez/26", "", "Registro CEO"),
    ],
  },
  {
    id: "gustavo",
    name: "Gustavo Garcia",
    role: "Especialista de T.I",
    company: "Hyndra / Newe",
    salaryMultiplier: 3,
    gradient: "from-slate-500 to-zinc-800",
    goals: [
      g("gu1", "Corporativa", "Fluxo de Caixa", 20, "Sistemas de suporte à exposição máxima", "Exposição máxima R$50M", "dez/26", "", "Financeiro (Matteo)"),
      g("gu2", "Individual", "Controles Sistêmicos no Mega", 25, "Fluxos + matriz de perfil + relatório", "3 entregas concluídas", "set/26", "", "TI + Financeiro"),
      g("gu3", "Individual", "Capacitação e Compliance", 15, "% colaboradores treinados", "100% treinados", "dez/26", "", "RH + TI"),
      g("gu4", "Individual", "Automação Bancária", 20, "Integração bancária operacional", "Milestone binário — integração concluída", "jul/26", "", "TI + Financeiro"),
      g("gu5", "Individual", "LGPD", 20, "Políticas implantadas", "3 políticas aprovadas", "dez/26", "", "Jurídico + TI"),
    ],
  },
];

export const totalPoints = (m: Member) => m.goals.reduce((s, g) => s + g.points, 0);
