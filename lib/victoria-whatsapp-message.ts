/**
 * Única mensagem pré-preenchida ao abrir o WhatsApp pelo site.
 * Todo o texto de atalho (Hero, navbar, mobile, cardápio, trilho social, etc.) deve vir daqui.
 */

export const VICTORIA_ORDER_WA_MESSAGE_EMPTY = `Olá! 👋
Vim pelo site da Victoria Brasileira e gostaria de fazer um pedido 😄

📍 Nome:
📞 Telefone:
🥟 Pedido desejado:

Aguardo atendimento!`;

export type VictoriaOrderWaParts = {
  nome?: string;
  telefone?: string;
  /** Produto e/ou mensagem livre (ex.: após o modal de lead). */
  pedidoDesejado?: string;
};

/** Mesmo modelo do site, com campos preenchidos após o formulário. */
export function buildVictoriaOrderWaMessage(parts?: VictoriaOrderWaParts): string {
  if (!parts) return VICTORIA_ORDER_WA_MESSAGE_EMPTY;
  const nome = parts.nome?.trim() ?? "";
  const telefone = parts.telefone?.trim() ?? "";
  const pedidoDesejado = parts.pedidoDesejado?.trim() ?? "";
  return `Olá! 👋
Vim pelo site da Victoria Brasileira e gostaria de fazer um pedido 😄

📍 Nome:
${nome}
📞 Telefone:
${telefone}
🥟 Pedido desejado:
${pedidoDesejado}

Aguardo atendimento!`;
}
