"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, ChefHat, LayoutGrid, Leaf, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLeadModal } from "@/components/leads/LeadModalContext";

const COXITO = "/coxito.png";

const BR_GREEN = "#00A859";
const GOLD = "#D4AF37";
const IFOOD_URL =
  "https://www.ifood.com.br/delivery/sao-paulo-sp/victoria--br-salgados-parque-mandaqui/d67f87f4-95b0-4c9c-8bb5-b474450a3297?utm_medium=share";

const N = 24;

function EmberParticles({ reduced }: { reduced: boolean | null }) {
  const pts = useMemo(
    () =>
      reduced
        ? []
        : Array.from({ length: N }, (_, i) => {
            const s = (i + 1) * 7919;
            const u = (n: number) => ((s >> n) & 255) / 255;
            return {
              id: i,
              left: `${(u(0) * 100).toFixed(1)}%`,
              top: `${(u(4) * 100).toFixed(1)}%`,
              size: 1 + (i % 4) * 0.45,
              delay: u(8) * 5,
              dur: 11 + u(10) * 9,
              a: 0.035 + u(12) * 0.08,
            };
          }),
    [reduced],
  );

  if (!pts.length) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pts.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-amber-300/90"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.a,
          }}
          animate={{ y: [0, -12, 0], opacity: [p.a * 0.3, p.a, p.a * 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const PILLARS = [
  { icon: Leaf, label: "Ingredientes Selecionados" },
  { icon: ChefHat, label: "Receitas Artesanais" },
  { icon: Award, label: "Qualidade Garantida" },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const COXITO_INTRO_MS = 3200;

function CoxitoStage({ reducedMotion }: { reducedMotion: boolean | null }) {
  const [revealed, setRevealed] = useState(Boolean(reducedMotion));
  const [coxitoCheer, setCoxitoCheer] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const id = window.setTimeout(() => setRevealed(true), COXITO_INTRO_MS);
    return () => window.clearTimeout(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (!coxitoCheer) return;
    const id = window.setTimeout(() => setCoxitoCheer(false), 4200);
    return () => window.clearTimeout(id);
  }, [coxitoCheer]);

  const reveal = useCallback(() => {
    setRevealed(true);
    if (!reducedMotion) {
      setCoxitoCheer(true);
    }
  }, [reducedMotion]);

  return (
    <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[min(92%,680px)]">
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
        <div
          className="pointer-events-none absolute -bottom-4 left-1/2 z-0 h-24 w-[85%] max-w-md -translate-x-1/2 rounded-full bg-black/65 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-2 top-[10%] z-0 h-[55%] w-[50%] rounded-full bg-amber-400/18 blur-3xl"
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 z-[1]"
          initial={false}
          animate={
            revealed
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.9, filter: "blur(14px)" }
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative h-full w-full drop-shadow-[0_40px_90px_rgba(0,0,0,0.92)]"
            animate={revealed && !reducedMotion ? { y: [0, -10, 0] } : undefined}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {revealed && coxitoCheer ? (
                <motion.div
                  key="coxito-cheer"
                  initial={{ opacity: 0, scale: 0.88, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28, delay: 0.35 }}
                  className="pointer-events-none absolute left-1/2 top-[4%] z-[30] w-[min(92%,280px)] -translate-x-1/2 sm:top-[6%]"
                  aria-live="polite"
                >
                  <div className="relative rounded-2xl border border-[#009c3b]/35 bg-black/80 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md sm:px-5 sm:py-3.5">
                    <p className="bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776] bg-clip-text text-center font-display text-lg font-black uppercase tracking-[0.12em] text-transparent sm:text-xl">
                      Vai Brasil!
                    </p>
                    <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                      Coxito
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="relative h-full w-full">
              <Image
                src={COXITO}
                alt="Coxito, mascote Victoria Brasileira"
                fill
                className="object-contain object-center sm:object-bottom"
                sizes="(max-width: 1024px) 100vw, 680px"
                priority
                aria-hidden={!revealed}
              />
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!revealed && (
            <motion.div
              key="coxito-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center px-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              role="button"
              tabIndex={0}
              aria-label="Continuar: ver o mascote Coxito"
              onClick={reveal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  reveal();
                }
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(212,175,55,0.08),transparent_70%)]"
                aria-hidden
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[16rem] font-display text-xl font-semibold leading-snug tracking-tight text-white sm:max-w-md sm:text-2xl"
              >
                Este é o nosso mascote
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 max-w-[18rem] font-display text-xl font-semibold leading-snug tracking-tight sm:max-w-lg sm:text-2xl"
                style={{ color: GOLD }}
              >
                da Victoria Brasileira
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 h-px w-14 origin-center bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent sm:w-16"
                aria-hidden
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mt-6 text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-500"
              >
                Toque para ver
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HomeHero() {
  const reducedMotion = useReducedMotion();
  const { openLeadModal } = useLeadModal();

  return (
    <section
      id="topo"
      className="relative scroll-mt-16 overflow-hidden bg-black pt-20 sm:scroll-mt-20 sm:pt-24"
    >
      {/* Base + Copa depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(0,168,89,0.08),transparent_50%),radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(196,30,58,0.06),transparent_45%)]"
        aria-hidden
      />
      {/* Rim light — vinda da direita (mock) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_90%_at_100%_45%,rgba(255,210,140,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden
      />
      <EmberParticles reduced={reducedMotion} />

      {/* Bandeira desfocada à direita */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[5%] h-[85%] w-[70%] opacity-[0.16] blur-[80px] sm:blur-[100px] lg:-right-[10%] lg:w-[55%]"
        aria-hidden
      >
        <div className="h-full w-full bg-[conic-gradient(at_40%_50%,#009c3b,#ffdf00,#002776,#009c3b)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-0 lg:px-10 lg:pb-20 lg:pt-8">
        <motion.div
          {...(reducedMotion
            ? {}
            : {
                variants: container,
                initial: "hidden" as const,
                animate: "show" as const,
              })}
          className="flex max-w-xl flex-col lg:max-w-none"
        >
          <motion.p
            {...(reducedMotion ? {} : { variants: item })}
            className="text-[10px] font-semibold uppercase tracking-[0.42em] sm:text-[11px] sm:tracking-[0.48em]"
            style={{ color: GOLD }}
          >
            Sabor que é tradição
          </motion.p>

          <motion.h1
            {...(reducedMotion ? {} : { variants: item })}
            className="mt-6 font-display font-black uppercase leading-[0.92] tracking-[-0.04em]"
          >
            <span className="block text-[clamp(2.5rem,8vw,4.25rem)] text-white">O verdadeiro</span>
            <span
              className="mt-1 block text-[clamp(2.85rem,9.5vw,5.75rem)] leading-[0.92]"
              style={{ color: GOLD }}
            >
              sabor brasileiro
            </span>
          </motion.h1>

          <motion.p
            {...(reducedMotion ? {} : { variants: item })}
            className="mt-8 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Salgados artesanais, feitos com ingredientes selecionados e o tempero que conquista gerações.
          </motion.p>

          <motion.div
            {...(reducedMotion ? {} : { variants: item })}
            className="mt-10 flex items-center justify-center gap-3 lg:justify-start"
          >
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="flex h-14 w-[180px]"
            >
              <button
                type="button"
                onClick={() => openLeadModal("Hero — Fazer pedido", "hero_fazer_pedido")}
                className="flex h-14 w-[180px] cursor-pointer items-center justify-center gap-2.5 rounded-full text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_40px_rgba(0,168,89,0.35)]"
                style={{ backgroundColor: BR_GREEN }}
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                Fazer Pedido
              </button>
            </motion.div>
            <motion.a
              href="#galeria"
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="flex h-14 w-[180px] items-center justify-center gap-2.5 rounded-full border-2 bg-transparent text-sm font-bold uppercase tracking-[0.12em] backdrop-blur-sm transition hover:brightness-110"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              <LayoutGrid className="h-5 w-5" strokeWidth={1.75} style={{ color: GOLD }} aria-hidden />
              Ver Cardápio
            </motion.a>
            <motion.a
              href={IFOOD_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reducedMotion ? undefined : { scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="flex h-14 w-[180px] items-center justify-center rounded-full border-2 border-[#EA1D2C] bg-[#EA1D2C] text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:brightness-110"
            >
              iFood
            </motion.a>
          </motion.div>

          <motion.ul
            {...(reducedMotion ? {} : { variants: item })}
            className="mt-14 flex divide-x divide-white/[0.12] border-t border-white/[0.08] pt-10 sm:mt-16 lg:max-w-2xl"
          >
            {PILLARS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-w-0 flex-1 flex-col items-center px-3 text-center first:pl-0 last:pr-0 sm:px-5"
              >
                <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1} style={{ color: GOLD }} aria-hidden />
                <span className="mt-3 max-w-[9.5rem] text-[10px] font-semibold uppercase leading-snug tracking-wide text-white sm:max-w-none sm:text-[11px]">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 flex w-full max-w-[min(100vw-2rem,640px)] justify-center lg:mx-0 lg:mt-0 lg:max-w-none lg:justify-end"
        >
          <CoxitoStage reducedMotion={reducedMotion} />
        </motion.div>
      </div>
    </section>
  );
}
