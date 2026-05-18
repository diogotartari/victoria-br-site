"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { useLeadModal } from "@/components/leads/LeadModalContext";

const LINKS = [
  { href: "#topo", label: "Início" },
  { href: "#galeria", label: "Cardápio" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
] as const;

const IFOOD_URL =
  "https://www.ifood.com.br/delivery/sao-paulo-sp/victoria--br-salgados-parque-mandaqui/d67f87f4-95b0-4c9c-8bb5-b474450a3297?utm_medium=share";

export function HomeHeader() {
  const reducedMotion = useReducedMotion();
  const { openLeadModal } = useLeadModal();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const navigateToSection = useCallback(
    (hash: string) => {
      const id = hash.startsWith("#") ? hash.slice(1) : hash;
      const el = typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [reducedMotion],
  );

  const onMobileNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      document.body.style.overflow = "";
      setOpen(false);
      window.setTimeout(() => navigateToSection(href), 80);
    },
    [navigateToSection],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] max-w-[100vw] border-b border-white/[0.06] bg-black/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-28 min-w-0 max-w-[1440px] items-center justify-between gap-3 px-5 sm:px-8 lg:grid lg:h-28 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-10">
        <a href="#topo" className="flex h-full min-w-0 items-center gap-3 self-center lg:justify-self-start">
          <span className="shrink-0">
            <Image
              src="/logo.png"
              alt="Victoria Brasileira"
              width={180}
              height={180}
              className="h-24 w-auto object-contain"
              priority
            />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-[#C41E3A]">
              Victoria
            </span>
            <span className="font-display text-[11px] font-black uppercase tracking-[0.2em] text-[#00A859]">
              Brasileira
            </span>
          </span>
          <span className="sr-only">Victoria Brasileira</span>
        </a>

        <nav
          className="hidden h-full items-center justify-center gap-9 self-center lg:flex lg:justify-self-center"
          aria-label="Principal"
        >
          {LINKS.map((l, i) => {
            const active = i === 0;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative pb-1 text-[13px] font-medium tracking-wide transition ${
                  active ? "text-[#00A859]" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
                {active ? (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px rounded-full bg-[#00A859]"
                    aria-hidden
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex h-full items-center justify-end gap-3 self-center justify-self-end">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-200 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </button>

          <motion.a
            href={IFOOD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="hidden items-center gap-2 rounded-full border border-[#EA1D2C] bg-transparent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(234,29,44,0.14)] transition hover:bg-[#EA1D2C]/10 lg:inline-flex"
          >
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#EA1D2C] text-[9px] font-black leading-none text-white"
              aria-hidden
            >
              iF
            </span>
            iFood
          </motion.a>

          <motion.button
            type="button"
            onClick={() => {
              openLeadModal("Topo — Peça pelo WhatsApp", "navbar_whatsapp");
              setOpen(false);
            }}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="hidden items-center gap-2 rounded-full border border-[#00A859] bg-transparent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_rgba(0,168,89,0.15)] transition hover:bg-[#00A859]/10 lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
            Peça pelo WhatsApp
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/[0.06] bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col px-5 py-4" aria-label="Principal mobile">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-white/[0.05] ${
                    i === 0 ? "text-[#00A859]" : "text-white/90"
                  }`}
                  onClick={(e) => onMobileNavClick(e, l.href)}
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#00A859] py-3 text-sm font-semibold uppercase tracking-wide text-white"
                onClick={() => {
                  openLeadModal("Topo — Peça pelo WhatsApp", "navbar_whatsapp");
                  setOpen(false);
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Peça pelo WhatsApp
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
