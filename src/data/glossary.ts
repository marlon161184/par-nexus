export interface Term {
  term: string;
  definition: string;
  usage: string;
  example: string;
}

export const glossary: Term[] = [
  { term: "VGV", definition: "Valor Geral de Vendas — soma do valor de todas as unidades comercializadas.", usage: "Meta corporativa para liderança comercial e operações.", example: "Atma R$92M + Ária R$85,5M em 2026." },
  { term: "VSO", definition: "Velocidade de Vendas Sobre Oferta.", usage: "Indicador de ritmo comercial mensal e acumulado.", example: "Atma ≥ 5%/mês · Ária ≥ 30% acumulado." },
  { term: "EBITDA", definition: "Lucro antes de juros, impostos, depreciação e amortização.", usage: "Gatilho corporativo binário do PAR 2026 (≥90% do planejado).", example: "Se EBITDA = 95%, gatilho atingido." },
  { term: "Frente de Avaliação", definition: "Eixo no qual o desempenho é medido.", usage: "PAR 2026 possui 3 frentes: Gatilho, Regra de Ouro e Metas.", example: "Frente 1 = EBITDA corporativo." },
  { term: "Meta Corporativa", definition: "Meta da companhia, compartilhada por vários elegíveis.", usage: "Reflete resultado coletivo (VGV, EBITDA, custos).", example: "Controle de Custos de Obra para Fernando e Rogério." },
  { term: "Meta Individual", definition: "Meta específica do papel do executivo.", usage: "Mede entrega pessoal e diferenciação.", example: "Lançamento Ária para Fernando." },
  { term: "Regra de Ouro", definition: "Critério eliminatório: zero acidente com afastamento > 90 dias.", usage: "Se violada, zera o bônus de todos os 10 elegíveis.", example: "Acidente grave registrado → bônus = 0." },
  { term: "KPI", definition: "Key Performance Indicator — indicador-chave de desempenho.", usage: "Define como cada meta é medida objetivamente.", example: "KPI de VSO = unidades vendidas / oferta." },
  { term: "Pontos por Meta", definition: "Peso da meta no painel individual (escala 100).", usage: "Quanto mais estratégica, mais pontos.", example: "Custos de Obra para Rogério vale 30 pts." },
  { term: "Pontuação Ponderada", definition: "Resultado parcial da meta = % atingido × pontos.", usage: "Soma compõe o resultado individual final.", example: "100% × 25 pts = 25 pts." },
  { term: "Resultado Individual", definition: "Soma de todas as pontuações ponderadas, em base 100.", usage: "Determina a fração do bônus alvo a receber.", example: "92 pts = 92% do bônus alvo." },
  { term: "Apuração Final", definition: "Cálculo consolidado ao fim do ciclo.", usage: "Aplica gatilho EBITDA, regra de ouro e resultado individual.", example: "Encerrada em jan/27 com base em dez/26." },
  { term: "Multiplicador de Salários", definition: "Fator que define o bônus alvo de cada elegível.", usage: "Mantém os valores em R$ confidenciais.", example: "5 salários para Superintendente." },
  { term: "Fonte de Apuração", definition: "Sistema ou documento oficial que comprova o KPI.", usage: "Garante rastreabilidade e auditoria.", example: "Mega ERP, CRM, relatórios financeiros." },
  { term: "Memória de Cálculo", definition: "Registro detalhado de como cada KPI foi apurado.", usage: "Anexa ao fechamento do PAR.", example: "Planilha consolidada por elegível." },
  { term: "Fórmula Inversa", definition: "Quanto menor o desvio de custo, maior o resultado, com teto de 120%.", usage: "Aplicada em metas de Controle de Custos.", example: "Custo realizado / planejado invertido." },
  { term: "NPS", definition: "Net Promoter Score — lealdade de clientes externos.", usage: "Mede satisfação em entregas e serviços.", example: "Agenda mensal de resultados com NPS ≥ 70." },
  { term: "eNPS", definition: "Employee Net Promoter Score — satisfação interna.", usage: "Indicador de cultura e clima.", example: "eNPS ≥ 70 em harmonização de benefícios." },
  { term: "CAC", definition: "Custo de Aquisição de Cliente.", usage: "Mede eficiência de marketing.", example: "CAC ≤ R$15k por unidade." },
  { term: "Sharpe Ratio", definition: "Retorno excedente por unidade de risco.", usage: "Avalia performance ajustada da carteira.", example: "Sharpe > 0,5 na carteira de investimentos." },
  { term: "MQL", definition: "Marketing Qualified Lead — lead qualificado por marketing.", usage: "Métrica de topo do funil.", example: "≥ 720 MQL em 2026." },
  { term: "SQL", definition: "Sales Qualified Lead — lead qualificado por vendas.", usage: "Indicador de meio do funil.", example: "MQL → SQL ≥ 15%." },
  { term: "Pipeline R$", definition: "Valor total das oportunidades em negociação.", usage: "Mede saúde do funil comercial.", example: "Pipeline ≥ R$20M." },
  { term: "OPEX", definition: "Operating Expenditure — despesas operacionais.", usage: "Acompanhado mensalmente em relatórios consolidados.", example: "11 relatórios OPEX em 2026." },
  { term: "Baseline", definition: "Linha de base aprovada para escopo, prazo e custo.", usage: "Referência para medir desvios.", example: "Baseline de obras Atma." },
  { term: "Go-to-Market", definition: "Estratégia de lançamento de produto.", usage: "Medida por marcos (GTM 1, 2, 3).", example: "GTM Ária com 3 marcos até ago/26." },
  { term: "Milestone", definition: "Marco binário: cumprido ou não.", usage: "Usado em entregas críticas.", example: "Aprovação do 5 Year Plan." },
  { term: "DDS", definition: "Diálogo Diário de Segurança.", usage: "Indicador proativo de cultura de segurança.", example: "≥ 85% de aderência em obras." },
  { term: "Ciclo de Apuração", definition: "Período de medição do PAR.", usage: "PAR 2026 cobre jan/26 a dez/26.", example: "Apuração final em jan/27." },
  { term: "NPS de Marca", definition: "Net Promoter Score aplicado à percepção de marca.", usage: "Mede a força do reposicionamento Atma com leads e compradores.", example: "Meta ≥ 50 no KPI A do Projeto de Branding (Rafael)." },
  { term: "Taxonomia de Canais", definition: "Modelo padronizado de classificação da origem de leads (orgânico, indicação, PR, eventos, mídia paga).", usage: "Base para atribuição de canais no CRM e medição de % canais de marca.", example: "KPI B do Branding (Rafael) depende da Governança de CRM (Leandro)." },
  { term: "Canais de Marca", definition: "Canais que entregam leads originados pela força do posicionamento (orgânico, indicação, PR, eventos).", usage: "Indicador estratégico de saúde de marca, separado de mídia paga.", example: "Meta ≥ 30% MQL orgânico — entra oficialmente no PAR 2027." },
];
