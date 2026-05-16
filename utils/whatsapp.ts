import {
  buildVictoriaOrderWaMessage,
  VICTORIA_ORDER_WA_MESSAGE_EMPTY,
  type VictoriaOrderWaParts,
} from "@/lib/victoria-whatsapp-message";

/** Metadados opcionais para log / API (ex.: webhook futuro). */
export interface WhatsAppMessage {
  phone: string;
  message: string;
  source: string;
  timestamp: Date;
  userAgent?: string;
  productInterest?: string;
}

export { buildVictoriaOrderWaMessage, VICTORIA_ORDER_WA_MESSAGE_EMPTY, type VictoriaOrderWaParts };

/** (11) 2991-4390. Formato wa.me: 55 + DDD + número, só dígitos */
const DEFAULT_PHONE = "551129914390";

export function getVictoriaWhatsAppDigits(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_PHONE) {
    return process.env.NEXT_PUBLIC_WHATSAPP_PHONE.replace(/\D/g, "");
  }
  return DEFAULT_PHONE;
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

/** Abre o WhatsApp com texto livre (ex.: após formulário de lead). */
export function buildVictoriaWhatsAppUrlFromPlainMessage(plainMessage: string): string {
  const phone = getVictoriaWhatsAppDigits();
  return `${WA_ME_BASE}${phone}?text=${encodeURIComponent(plainMessage)}`;
}

/**
 * URL `wa.me` com a mensagem padrão do site (Hero, navbar, mobile, cardápio, trilho social).
 * `source` e `productName` mantidos só para compatibilidade com chamadas existentes e analytics.
 */
export function buildVictoriaWhatsAppUrl(_source: string, _productName?: string): string {
  return buildVictoriaWhatsAppUrlFromPlainMessage(VICTORIA_ORDER_WA_MESSAGE_EMPTY);
}

export class VictoriaWhatsAppIntegration {
  generateWhatsAppURL(source: string, productName?: string): string {
    return buildVictoriaWhatsAppUrl(source, productName);
  }
}

export const victoriaWhatsApp = new VictoriaWhatsAppIntegration();
