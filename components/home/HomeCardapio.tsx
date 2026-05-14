"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MENU_PRODUCTS } from "./menu-products";
import { buildVictoriaWhatsAppUrl, trackWhatsAppClick } from "@/utils/whatsapp";

const GOLD = "#D4AF37";

const cardClassName =
  "group flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/50 shadow-[0_0_0_1px_rgba(0,168,89,0.08),0_28px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-md transition-shadow hover:border-[#00A859]/30 hover:shadow-[0_0_48px_-12px_rgba(0,168,89,0.2),0_36px_90px_-28px_rgba(0,0,0,0.9)]";

export function HomeCardapio() {
  const reducedMotion = useReducedMotion();
  const n = MENU_PRODUCTS.length;

  return (
    <section id="galeria" className="scroll-mt-16 border-t border-white/[0.05] bg-black pb-16 pt-8 sm:scroll-mt-20 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-6 xl:gap-5">
          {MENU_PRODUCTS.map((p, i) => (
            <motion.a
              key={p.id}
              href={buildVictoriaWhatsAppUrl("cardapio", p.whatsappLabel)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("cardapio", p.whatsappLabel)}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: reducedMotion ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
              className={cardClassName}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover object-center"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              </div>

              <div className="flex flex-col px-4 py-5 sm:px-5 sm:py-6">
                <h3
                  className="font-display text-base font-bold uppercase tracking-tight sm:text-lg"
                  style={{ color: GOLD }}
                >
                  {p.title}
                </h3>
              </div>
            </motion.a>
          ))}

          <motion.a
            href={buildVictoriaWhatsAppUrl("cardapio_completo")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("cardapio_completo")}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.5,
              delay: reducedMotion ? 0 : n * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
            className={`${cardClassName} min-h-[280px] flex-1 justify-between sm:min-h-0`}
          >
            <div className="relative flex min-h-[140px] flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#00A859]/12 via-zinc-900/40 to-black/80 px-4 py-8">
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#00A859]/40 bg-[#00A859]/15 text-[#25D366]"
                aria-hidden
              >
                <MessageCircle className="h-7 w-7" strokeWidth={2} />
              </div>
              <p className="text-center font-display text-lg font-bold uppercase leading-snug tracking-tight text-white sm:text-xl">
                Ver cardápio completo…
              </p>
              <p className="mt-3 max-w-[14rem] text-center text-xs leading-relaxed text-zinc-400">
                Toque para falar no WhatsApp e receber todos os itens e valores.
              </p>
            </div>
            <div className="border-t border-white/[0.06] px-4 py-4 sm:px-5">
              <span
                className="flex items-center justify-center gap-2 text-center font-display text-xs font-bold uppercase tracking-[0.14em] sm:text-sm"
                style={{ color: GOLD }}
              >
                WhatsApp
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
