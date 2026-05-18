export type LeadWaSource = "hero_fazer_pedido" | "final_cta" | "navbar_whatsapp";

/** Campos aceitos no POST. */
export type LeadPayload = {
  nome: string;
  telefone: string;
  produto: string;
  mensagem: string;
};

/** Linha gravada no .xlsx */
export type LeadRow = {
  nome: string;
  telefone: string;
  produto: string;
  mensagem: string;
  horario: string;
};

export const LEAD_FIELD_LIMITS = {
  nome: 120,
  telefone: 40,
  produto: 200,
  mensagem: 4000,
} as const;
