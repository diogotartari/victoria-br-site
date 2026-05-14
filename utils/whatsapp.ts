/** Metadados opcionais para log / API (ex.: webhook futuro). */
export interface WhatsAppMessage {
  phone: string;
  message: string;
  source: string;
  timestamp: Date;
  userAgent?: string;
  productInterest?: string;
}

/** (11) 2991-4390. Formato wa.me: 55 + DDD + número, só dígitos */
const DEFAULT_PHONE = "551129914390";

const MESSAGES = {
  hero: "Olá! Quero conhecer os salgados de vocês.",
  navbar_whatsapp: "Olá! Quero fazer um pedido pelo WhatsApp.",
  hero_fazer_pedido: "Olá! Quero fazer um pedido de salgados. Podem me orientar?",
  final_cta: "Olá! Quero transformar minha resenha com os salgados da Victoria Brasileira.",
  cardapio: "Oi! Vi o cardápio no site e quero fazer um pedido. Podem me ajudar?",
  cardapio_completo:
    "Olá! Quero o cardápio completo com todos os itens e valores. Podem me enviar pelo WhatsApp?",
  coxinha: "🏆 Eiii! Vi a Coxinha Premium no site e preciso experimentar! Como faço o pedido?",
  kibe: "🌟 Olá! O Kibe Especial no site chamou minha atenção! Vocês entregam na minha região?",
  combo: "🇧🇷 Oi Victoria BR! Quero o Combo Copa que vi no site! Tá disponível hoje?",
  fidelidade: "💎 Olá! Quero participar do Victoria VIP Club que conheci no site!",
  promocao: "🎁 Oi! Vi uma promoção no site da Victoria BR, ainda está valendo?",
  copa: "⚽ Eaaa! Vi a Edição Copa no site e quero torcer com os salgados de vocês!",
  recomendacao: "⭐ Olá! Me recomendaram vocês pelo site, quero conhecer os salgados!",
  checkout: "🛒 Oi! Estava finalizando um pedido no site e prefiro finalizar pelo WhatsApp!",
} as const;

export type WhatsAppSource = keyof typeof MESSAGES;

function getPhone(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_PHONE) {
    return process.env.NEXT_PUBLIC_WHATSAPP_PHONE.replace(/\D/g, "");
  }
  return DEFAULT_PHONE;
}

/** Rótulo humano para o time saber de qual botão veio o lead. */
function channelLabel(source: string, productName?: string): string {
  if (source === "cardapio" && productName?.trim()) {
    return `Cardápio (home) — produto: ${productName.trim()}`;
  }
  const map: Record<string, string> = {
    hero: "Atalho lateral — WhatsApp",
    navbar_whatsapp: "Topo do site — Peça pelo WhatsApp",
    hero_fazer_pedido: "Hero — botão Fazer pedido",
    final_cta: "Final da página — Contato / WhatsApp",
    cardapio: "Cardápio (home) — produto",
    cardapio_completo: "Cardápio (home) — ver cardápio completo",
    coxinha: "Fluxo site — Coxinha",
    kibe: "Fluxo site — Kibe",
    combo: "Fluxo site — Combo",
    fidelidade: "Fluxo site — VIP",
    promocao: "Fluxo site — Promoção",
    copa: "Fluxo site — Copa",
    recomendacao: "Fluxo site — Indicação",
    checkout: "Fluxo site — Checkout",
  };
  return map[source] ?? `Site — ${source}`;
}

/** Envolve o texto do cliente com aviso fixo para o atendente: lead veio do site. */
function wrapSiteLeadMessage(coreMessage: string, source: string, productName?: string): string {
  const channel = channelLabel(source, productName);
  const header =
    `*LEAD — SITE*\n` +
    `_Cliente abriu o WhatsApp pela loja online da Victoria Brasileira._\n\n` +
    `*Onde clicou:* ${channel}\n\n` +
    `────────────\n\n`;
  const footer =
    `\n\n────────────\n` + `_Mensagem automática do site · origem digital._`;
  return `${header}${coreMessage.trim()}${footer}`;
}

function getCoreMessage(source: string, productName?: string): string {
  if (productName?.trim()) {
    return `Olá! Vim pela loja online e quero falar sobre *${productName.trim()}*. Podem me ajudar com o pedido?`;
  }
  if (Object.prototype.hasOwnProperty.call(MESSAGES, source)) {
    return MESSAGES[source as WhatsAppSource];
  }
  return MESSAGES.hero;
}

function getCustomMessage(source: string, productName?: string): string {
  const core = getCoreMessage(source, productName);
  return wrapSiteLeadMessage(core, source, productName);
}

/** Dispara evento de analytics no clique (não chamar durante render). */
export function trackWhatsAppClick(source: string, productName?: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "whatsapp_click", {
      source,
      product: productName ?? "general",
      timestamp: new Date().toISOString(),
    });
  }
}

const WA_ME_BASE = "https://wa.me/";

/** URL `wa.me` sem efeitos colaterais; use em `href` e chame `trackWhatsAppClick` no `onClick`. */
export function buildVictoriaWhatsAppUrl(source: string, productName?: string): string {
  const message = getCustomMessage(source, productName);
  const encodedMessage = encodeURIComponent(message);
  const phone = getPhone();
  return `${WA_ME_BASE}${phone}?text=${encodedMessage}`;
}

export class VictoriaWhatsAppIntegration {
  generateWhatsAppURL(source: string, productName?: string): string {
    return buildVictoriaWhatsAppUrl(source, productName);
  }
}

export const victoriaWhatsApp = new VictoriaWhatsAppIntegration();
