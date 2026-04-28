export type GoalType = "Corporativa" | "Individual" | "Qualidade";

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
}

export interface Member {
  id: string;
  name: string;
  role: string;
  company: string;
  salaryMultiplier: number;
  gradient: string;
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
): Goal => ({ id, type, name, description: description || name, points, kpi, target, deadline, source });

export const members: Member[] = [
  {
    id: "fernando",
    name: "Fernando Rainieri",
    role: "Superintendente de Operações",
    company: "Newe Urbanismo",
    salaryMultiplier: 5,
    gradient: "from-amber-500 to-rose-600",
    goals: [
      g("f1", "Corporativa", "Controle de Custos de Obra", 25, "Custo Obra Atma + Ária", "Fórmula inversa teto 120%"),
      g("f2", "Corporativa", "Fluxo de Caixa", 20, "Exposição máxima", "R$ 50M"),
      g("f3", "Individual", "Sell-out Atma + Ária", 20, "VSO", "100% Atma · VSO Ária ≥ 30%"),
      g("f4", "Individual", "Lançamento Ária", 15, "Checklist GTM", "100%"),
      g("f5", "Individual", "Landbanking", 10, "Áreas aprovadas", "≥ 2 áreas"),
      g("f6", "Individual", "Governança Executiva", 10, "Reuniões + Orçamento", "6 reuniões Comitê + Orç. 2027", "nov/26"),
    ],
  },
  {
    id: "rafael",
    name: "Rafael Salomão",
    role: "Head Comercial e Marketing",
    company: "Newe Urbanismo",
    salaryMultiplier: 4,
    gradient: "from-emerald-500 to-teal-700",
    goals: [
      g("r1", "Corporativa", "VGV / Receita", 20, "VGV", "Atma R$92M · Ária R$85,5M"),
      g("r2", "Corporativa", "Receita Comercial Recebida", 10, "% projeção", "≥ 90% mensal"),
      g("r3", "Corporativa", "VSO", 15, "Velocidade de Vendas", "Atma ≥ 5%/mês · Ária ≥ 30% acum."),
      g("r4", "Individual", "Pipeline Qualificado", 15, "MQL · Pipeline", "≥ 720 MQL · ≥ R$20M"),
      g("r5", "Individual", "Conversão Comercial & Forecast", 10, "Conv · Acurácia", "≥ 50% · ≥ 8/12 meses"),
      g("r6", "Individual", "Go-to-Market Ária", 10, "Marcos GTM", "3 marcos", "ago/26"),
      g("r7", "Individual", "Novos Negócios", 10, "Estudos · DD", "≥ 2 estudos · 1 DD"),
      g("r8", "Qualidade", "Compliance de Comunicação", 5, "Materiais aprovados", "100%"),
      g("r9", "Qualidade", "Governança de Dados CRM", 5, "Campos · Relatórios", "≥ 90% · 12 relatórios"),
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
      g("c1", "Corporativa", "VGV / Receita", 20, "VGV", "Atma R$92M · Ária R$85,5M"),
      g("c2", "Corporativa", "Controle de Custos de Obra", 20, "Custo", "Fórmula inversa teto 120%"),
      g("c3", "Individual", "Inteligência de Mercado", 10, "Relatórios Comitê", "4 relatórios"),
      g("c4", "Individual", "Aprovações de Projetos", 20, "Marcos", "Ária jun/26 · Gaia dez/26 · Graprohab dez/26"),
      g("c5", "Individual", "Orçamento do Departamento", 15, "MKT · Comercial", "R$5,4M · R$4,6M"),
      g("c6", "Individual", "Expansão Landbank", 15, "Áreas / TI", "4 áreas em ≤ 10 sem."),
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
      g("m1", "Corporativa", "VGV / Receita", 20, "VGV", "Atma R$92M · Ária R$85,5M"),
      g("m2", "Corporativa", "Fluxo de Caixa", 25, "Exposição", "Máx. R$50M"),
      g("m3", "Individual", "Carteira de Investimentos", 30, "CDI · Sharpe · Vol", "≥100% CDI · Sharpe >0,5 · Vol ≤2%"),
      g("m4", "Individual", "Agenda Mensal de Resultados", 15, "Template · NPS", "Template jun/26 · ≥90% · NPS≥70"),
      g("m5", "Individual", "Orçamento 2027 + OPEX", 10, "Ciclo · Relatórios", "Ciclo nov/26 · 11 relatórios"),
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
      g("ma1", "Corporativa", "VGV / Receita", 20, "Capacidade organizacional", "Suportar VGV"),
      g("ma2", "Corporativa", "Custo de Pessoas", 20, "Folha + encargos", "Dentro do orçamento"),
      g("ma3", "Individual", "Harmonização de Benefícios", 15, "Pacote · eNPS", "100% jun/26 · eNPS ≥ 70", "set/26"),
      g("ma4", "Individual", "Academia de Vendas Newe", 20, "Trilhas · Conclusão", "3 trilhas · ≥80%"),
      g("ma5", "Individual", "Cultura Organizacional", 15, "Toolkit · Treinamento", "Nosso Jeito · 100% treinados"),
      g("ma6", "Individual", "Planejamento Estratégico 5YP", 10, "Aprovação Comitê", "Milestone binário"),
    ],
  },
  {
    id: "nabil",
    name: "Nabil Barakat Bezerra",
    role: "Gerente de Vendas",
    company: "Newe Urbanismo",
    salaryMultiplier: 3,
    gradient: "from-orange-500 to-red-700",
    goals: [
      g("n1", "Corporativa", "VGV / Receita", 25, "Conversão e fechamento", "Meta de VGV"),
      g("n2", "Corporativa", "Receita Comercial Recebida", 10, "% projeção", "≥ 90% mensal"),
      g("n3", "Corporativa", "VSO", 15, "Velocidade", "Atma ≥ 5%/mês · Ária ≥ 30% acum."),
      g("n4", "Individual", "Conversão Comercial", 25, "Visitas → Vendas", "≥ 50%"),
      g("n5", "Individual", "Disciplina Comercial", 15, "Propostas · Contratos", "100% validadas · ≤7 dias"),
      g("n6", "Individual", "Acurácia de Forecast", 10, "Desvio meses", "≥ 8/12 com desvio ≤ 15%"),
    ],
  },
  {
    id: "lais",
    name: "Laís Machado",
    role: "Gerente de Marketing",
    company: "Newe Urbanismo",
    salaryMultiplier: 3,
    gradient: "from-fuchsia-500 to-pink-700",
    goals: [
      g("l1", "Corporativa", "VGV / Receita", 15, "Geração de demanda", "Meta de VGV"),
      g("l2", "Corporativa", "VSO", 10, "Velocidade", "Atma ≥ 5%/mês · Ária ≥ 30% acum."),
      g("l3", "Individual", "Geração de Leads", 20, "Leads/ano", "≥ 720"),
      g("l4", "Individual", "Funil MQL → SQL", 25, "% MQL · MQL→SQL", "≥5% · ≥15%"),
      g("l5", "Individual", "CAC", 20, "Custo por unidade", "Atma e Ária ≤ R$15k"),
      g("l6", "Individual", "Governança de Marca", 10, "Sem retrabalho", "100% campanhas"),
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
      g("ro1", "Corporativa", "Controle de Custos de Obra", 30, "Custo", "Fórmula inversa teto 120%"),
      g("ro2", "Individual", "Andamento Físico", 20, "% executado", "Atma 65% · Ária 15%"),
      g("ro3", "Individual", "Andamento Financeiro", 20, "Desvio cronograma", "≤ 5%"),
      g("ro4", "Individual", "Qualidade e Segurança", 15, "Checklists · DDS", "≥90% · ≥85%"),
      g("ro5", "Individual", "Contratos de Fornecedores", 15, "Prazo baseline", "100%"),
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
      g("mb1", "Corporativa", "Fluxo de Caixa — Previsibilidade", 20, "Exposição", "Atma R$26M · Ária R$10M (teto 120%)"),
      g("mb2", "Individual", "Andamento Físico", 30, "Baseline", "65% baseline aprovado"),
      g("mb3", "Individual", "Acurácia de Custos", 25, "Desvio", "≤ 5% projetado vs realizado"),
      g("mb4", "Individual", "Relatórios no Prazo", 15, "SLA CEO", "100%"),
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
      g("gu1", "Corporativa", "Fluxo de Caixa", 20, "Exposição", "Máx. R$50M"),
      g("gu2", "Individual", "Controles Sistêmicos no Mega", 25, "Fluxos · Matriz · Relatório", "Conformidade", "set/26"),
      g("gu3", "Individual", "Capacitação e Compliance", 15, "Colaboradores treinados", "100%"),
      g("gu4", "Individual", "Automação Bancária", 20, "Integração", "Milestone binário", "jul/26"),
      g("gu5", "Individual", "LGPD", 20, "Políticas", "3 políticas de privacidade e segurança"),
    ],
  },
];

export const totalPoints = (m: Member) => m.goals.reduce((s, g) => s + g.points, 0);
