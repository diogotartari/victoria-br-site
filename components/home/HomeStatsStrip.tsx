"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HandHeart, PartyPopper, Star } from "lucide-react";

const GOLD = "#D4AF37";

const STAT_CARD =
  "flex flex-col rounded-2xl border border-white/[0.08] bg-zinc-950/50 px-5 py-6 shadow-[0_0_0_1px_rgba(0,168,89,0.08),0_20px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-md sm:px-6 sm:py-7";

const stats = [
  {
    id: "reviews",
    href: "#avaliacoes" as const,
    icon: Star,
    value: "4,9",
    title: "Avaliações",
    subtitle: "Média dos clientes",
  },
  {
    id: "events",
    href: null,
    icon: PartyPopper,
    value: "+5k",
    title: "Eventos externos",
    subtitle: "Festas, copas e corporativos",
  },
  {
    id: "handmade",
    href: null,
    icon: HandHeart,
    value: "+300 mil",
    title: "Salgados feitos à mão",
    subtitle: "No mês, na nossa cozinha",
  },
] as const;

export function HomeStatsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="border-t border-white/[0.05] bg-black pb-14 pt-2 sm:pb-16 sm:pt-0 lg:pb-20"
      aria-label="Números da Victoria Brasileira"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const inner = (
              <>
                <Icon className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" strokeWidth={1.15} style={{ color: GOLD }} aria-hidden />
                <p className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-[2.75rem]">{s.value}</p>
                <p className="mt-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">{s.title}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 sm:text-xs">{s.subtitle}</p>
              </>
            );

            const motionProps = {
              initial: reducedMotion ? false : ({ opacity: 0, y: 20 } as const),
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-40px" },
              transition: {
                duration: 0.5,
                delay: reducedMotion ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            };

            if (s.href) {
              return (
                <motion.a
                  key={s.id}
                  href={s.href}
                  {...motionProps}
                  className={`${STAT_CARD} transition hover:border-[#00A859]/35 hover:shadow-[0_0_40px_-16px_rgba(0,168,89,0.18)]`}
                >
                  {inner}
                </motion.a>
              );
            }

            return (
              <motion.div key={s.id} {...motionProps} className={STAT_CARD}>
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
