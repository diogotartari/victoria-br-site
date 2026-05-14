import type { Metadata } from "next";

export type PlatformSlug =
  | "home"
  | "cardapio"
  | "copa"
  | "perfil"
  | "checkout"
  | "pwa"
  | "assistente"
  | "admin"
  | "game-center"
  | "vip";

export type PlatformModule = {
  slug: PlatformSlug;
  path: string;
  emoji: string;
  title: string;
  headline: string;
  description: string;
  /** Páginas placeholder ainda não conectadas a backend */
  status: "roadmap" | "beta";
  noindex?: boolean;
};

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    slug: "home",
    path: "/",
    emoji: "🏠",
    title: "Homepage cinematográfica",
    headline: "Atos I, II e III · salgados em cena",
    description:
      "Landing com hero 3D, partículas douradas, vitrine sensorial e jornada de conquista.",
    status: "beta",
  },
  {
    slug: "cardapio",
    path: "/cardapio",
    emoji: "🍖",
    title: "Cardápio futurista 3D",
    headline: "Explorar sabores em perspectiva",
    description:
      "Navegação imersiva, SKUs com preview 3D e filtros inteligentes por ocasião e torcida.",
    status: "roadmap",
  },
  {
    slug: "copa",
    path: "/copa",
    emoji: "🏆",
    title: "Copa Experience",
    headline: "Sazonal · modo estádio",
    description:
      "Combos torcida, frete em dias de jogo e skins exclusivas da competição.",
    status: "roadmap",
  },
  {
    slug: "perfil",
    path: "/perfil",
    emoji: "👤",
    title: "Perfil do cliente gamificado",
    headline: "XP, badges e histórico de pedidos",
    description:
      "Progressão Victoria, missões semanais e benefícios desbloqueáveis.",
    status: "roadmap",
  },
  {
    slug: "checkout",
    path: "/checkout",
    emoji: "🛒",
    title: "Checkout premium",
    headline: "Pix, cartão e confirmação em tempo real",
    description:
      "Resumo cinematográfico, upsell contextual e rastreio pós-compra.",
    status: "roadmap",
  },
  {
    slug: "pwa",
    path: "/pwa",
    emoji: "📱",
    title: "App PWA",
    headline: "Instala no celular · modo offline leve",
    description:
      "Atalhos, push de pedido e experiência app sem loja de aplicativos.",
    status: "roadmap",
  },
  {
    slug: "assistente",
    path: "/assistente",
    emoji: "🤖",
    title: "Victoria AI Assistant",
    headline: "Sugestão de combo e suporte 24/7",
    description:
      "LLM com políticas da marca, cardápio e logística integrados ao atendimento.",
    status: "roadmap",
  },
  {
    slug: "admin",
    path: "/admin",
    emoji: "📊",
    title: "Dashboard admin",
    headline: "Produção, entregas e campanhas",
    description:
      "KPIs ao vivo, fila de cozinha e CRM operacional para franquias e hubs.",
    status: "roadmap",
    noindex: true,
  },
  {
    slug: "game-center",
    path: "/game-center",
    emoji: "🎮",
    title: "Game Center Coxito",
    headline: "Mini games e desafios de crocância",
    description:
      "Ranking nacional, drops sazonais e cupons vitória ao completar fases.",
    status: "roadmap",
  },
  {
    slug: "vip",
    path: "/vip",
    emoji: "💎",
    title: "Victoria VIP Club",
    headline: "Degustações fechadas e linhas exclusivas",
    description:
      "Assinatura premium, eventos privados e antecipação de lançamentos.",
    status: "roadmap",
  },
];

const bySlug = Object.fromEntries(
  PLATFORM_MODULES.map((m) => [m.slug, m]),
) as Record<PlatformSlug, PlatformModule>;

export function getPlatformModule(slug: PlatformSlug): PlatformModule {
  const mod = bySlug[slug];
  if (!mod) {
    throw new Error(`Unknown platform slug: ${slug}`);
  }
  return mod;
}

export function platformPageMetadata(
  slug: Exclude<PlatformSlug, "home">,
): Metadata {
  const m = bySlug[slug];
  return {
    title: `${m.title} | Victoria BR Digital`,
    description: m.description,
    robots: m.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: m.title,
      description: m.headline,
      locale: "pt_BR",
    },
  };
}
