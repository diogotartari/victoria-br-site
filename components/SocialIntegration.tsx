"use client";

import Link from "next/link";
import { useId } from "react";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { buildVictoriaWhatsAppUrl, trackWhatsAppClick } from "@/utils/whatsapp";

export const INSTAGRAM_URL = "https://instagram.com/victoriabrsalgados";

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zm6.162-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.406-3.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
      />
    </svg>
  );
}

/** Marca Instagram com gradiente (ideal para CTAs). */
export function InstagramLogoMark({ className }: { className?: string }) {
  const gradId = `ig-grad-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD600" />
          <stop offset="35%" stopColor="#FF7A00" />
          <stop offset="65%" stopColor="#E4405F" />
          <stop offset="100%" stopColor="#9333EA" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zm6.162-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.406-3.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
      />
    </svg>
  );
}

export function trackInstagramClick(source?: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "instagram_click", {
    source: source ?? "website",
    timestamp: new Date().toISOString(),
  });
}

function trackSocialNav(channel: string, href: string): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "social_nav_click", {
    channel,
    href,
    timestamp: new Date().toISOString(),
  });
}

const railBtn =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/55 text-zinc-100 shadow-lg backdrop-blur-md transition hover:border-victoria-gold/45 hover:bg-black/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-victoria-red";

/** Botão isolado do Instagram (reutilizável). */
export function InstagramIntegration() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackInstagramClick()}
      className={railBtn}
      aria-label="Victoria BR no Instagram"
    >
      <InstagramGlyph className="h-5 w-5 shrink-0" />
    </a>
  );
}

/**
 * Trilho fixo: Instagram, WhatsApp, VIP e cardápio.
 * Posicionado à esquerda para não colidir com CTAs no canto inferior direito.
 */
export function SocialIntegration() {
  const waHref = buildVictoriaWhatsAppUrl("hero");

  return (
    <aside
      className="fixed bottom-6 left-4 z-[55] flex flex-col gap-2 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
      aria-label="Redes sociais e atalhos"
    >
      <InstagramIntegration />
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("hero")}
        className={`${railBtn} text-emerald-100 hover:text-white`}
        aria-label="Falar no WhatsApp com a Victoria BR"
      >
        <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
      </a>
      <Link
        href="/vip"
        onClick={() => trackSocialNav("vip", "/vip")}
        className={`${railBtn} text-amber-100/90`}
        aria-label="Victoria VIP Club"
      >
        <Star className="h-5 w-5 shrink-0" aria-hidden />
      </Link>
      <Link
        href="/cardapio"
        onClick={() => trackSocialNav("cardapio", "/cardapio")}
        className={`${railBtn} text-emerald-200/90`}
        aria-label="Ver cardápio"
      >
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
      </Link>
    </aside>
  );
}
