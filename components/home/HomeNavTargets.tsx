"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { INSTAGRAM_URL, InstagramLogoMark, trackInstagramClick } from "@/components/SocialIntegration";
import { buildVictoriaWhatsAppUrl, trackWhatsAppClick } from "@/utils/whatsapp";

const sobreFade = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const sobreContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
} as const;

const GOLD = "#D4AF37";

const REVIEWS = [
  {
    quote: "Parecia comercial de TV. Crocante, quente e sumiu em minutos. A equipe elogiou demais.",
    author: "Ricardo M.",
    meta: "Santana · Zona Norte, São Paulo",
    stars: 5,
  },
  {
    quote: "Encomendei para a copa do prédio. O cheiro na portaria virou convite: todo mundo perguntou o contato.",
    author: "Camila F.",
    meta: "Tucuruvi · Zona Norte, São Paulo",
    stars: 5,
  },
  {
    quote: "A coxinha é outro nível: massa fina, recheio generoso. Virou pedido fixo na minha família.",
    author: "Helena T.",
    meta: "Brasilândia · Zona Norte, São Paulo",
    stars: 5,
  },
  {
    quote: "Chegou no horário, bem embalado e ainda quentinho. Atendimento nota dez no WhatsApp.",
    author: "Diego A.",
    meta: "Jaçanã · Zona Norte, São Paulo",
    stars: 5,
  },
  {
    quote:
      "Confesso que achei que não ia dar certo levar salgado para um churrasco com meus sogros. Deu o contrário: elogiaram demais o kibe e ainda pediram mais.",
    author: "Paulo R.",
    meta: "Pirituba · Zona Norte, São Paulo",
    stars: 5,
  },
  {
    quote: "Qualidade de salgados finos com clima de boteco do coração. É Brasil de verdade.",
    author: "Juliana B.",
    meta: "Casa Verde · Zona Norte, São Paulo",
    stars: 5,
  },
] as const;

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" style={{ color: GOLD }} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] stroke-[#D4AF37] sm:h-4 sm:w-4" strokeWidth={1.2} />
      ))}
    </div>
  );
}

export function HomeNavTargets() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section
        id="sobre"
        className="relative scroll-mt-16 overflow-hidden border-t border-white/[0.04] bg-[#030303] py-24 sm:scroll-mt-20 sm:py-32 lg:py-40"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-[-10%] h-[min(70vh,620px)] w-[min(140vw,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_55%_60%_at_50%_35%,rgba(212,175,55,0.09),transparent_68%)]" />
          <div className="absolute bottom-[-15%] left-1/2 h-[45vh] w-[min(100vw,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,168,89,0.05),transparent_72%)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_22%,transparent_78%,rgba(0,0,0,0.35)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[34rem] px-6 text-center sm:max-w-[36rem] sm:px-8">
          <motion.div
            {...(reducedMotion
              ? {}
              : {
                  variants: sobreContainer,
                  initial: "hidden" as const,
                  whileInView: "show" as const,
                  viewport: { once: true, margin: "-80px" },
                })}
          >
            <motion.div
              {...(reducedMotion ? {} : { variants: sobreFade })}
              className="relative mx-auto inline-block"
            >
              <h2 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                Nossa História
              </h2>
              <div
                className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 opacity-70 blur-3xl sm:-inset-x-12"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212, 175, 55, 0.12), transparent 70%)",
                }}
                aria-hidden
              />
            </motion.div>

            <motion.div
              {...(reducedMotion ? {} : { variants: sobreFade })}
              className="mx-auto mt-10 flex justify-center sm:mt-12"
              aria-hidden
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent sm:w-20" />
            </motion.div>

            <motion.div
              {...(reducedMotion ? {} : { variants: sobreFade })}
              className="mt-10 space-y-8 text-[15px] font-normal leading-[1.75] tracking-[-0.01em] text-zinc-400 sm:mt-12 sm:text-[17px] sm:leading-[1.8]"
            >
              <p className="text-white/88">
                Toda grande resenha começa com comida boa.
              </p>
              <p>
                A Victoria Brasileira nasceu da paixão por criar salgados com sabor de verdade. Unimos receitas
                tradicionais, ingredientes selecionados e muito cuidado em cada detalhe para transformar momentos simples
                em experiências especiais.
              </p>
              <p>
                Hoje, levamos para cada pedido a essência da resenha brasileira: qualidade, sabor e aquele clima que
                reúne todo mundo à mesa.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        id="avaliacoes"
        className="relative scroll-mt-16 overflow-hidden border-t border-white/[0.06] bg-[#060606] py-20 sm:scroll-mt-20 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 max-w-[100vw] overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-[20%] h-[50%] w-[80%] max-w-2xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">Avaliações</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Quem provou, aprova
              </h2>
              <div className="mx-auto mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
                <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
                  <StarRow count={5} />
                  <span className="font-display text-lg font-bold tabular-nums text-white">4,9</span>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-zinc-500 sm:text-left">
                  Depoimentos de clientes que pediram salgados para casa, festas e eventos.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.article
                key={r.author}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="flex flex-col rounded-2xl border border-white/[0.07] bg-zinc-950/40 p-5 shadow-[0_0_0_1px_rgba(0,168,89,0.06)] backdrop-blur-sm sm:p-6"
              >
                <StarRow count={r.stars} />
                <blockquote className="mt-4 flex-1 text-left text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-white">{r.author}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-600">{r.meta}</p>
                </footer>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="scroll-mt-16 border-t border-white/[0.06] bg-black py-14 sm:scroll-mt-20 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-500/90">Contato</p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase text-white sm:text-3xl">
              Fale com um de nossos atendentes
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Pedidos, combos e logística direto nas nossas redes sociais.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <a
                href={buildVictoriaWhatsAppUrl("final_cta")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("final_cta")}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#00e676] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_28px_rgba(0,230,118,0.35)] sm:w-auto sm:max-w-none"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackInstagramClick("contato")}
                className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(225,48,108,0.12)] backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.08] sm:w-auto sm:max-w-none"
              >
                <InstagramLogoMark className="h-5 w-5 shrink-0" />
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export function HomeFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-black py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-4 text-center text-xs text-zinc-600 sm:flex-row sm:px-6 sm:text-left">
        <span className="font-display font-bold uppercase tracking-widest text-zinc-500">Victoria Brasileira</span>
        <p>
          <Link href="/plataforma" className="text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline">
            Plataforma
          </Link>
          <span className="mx-2" aria-hidden>
            ·
          </span>
          <span>© {new Date().getFullYear()} · Feito no Brasil</span>
        </p>
      </div>
    </footer>
  );
}
