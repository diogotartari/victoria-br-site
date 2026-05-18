"use client";

import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, MessageCircle, X } from "lucide-react";
import { LEAD_FIELD_LIMITS, type LeadWaSource } from "@/lib/lead-types";
import { buildVictoriaWhatsAppUrlFromPlainMessage, buildVictoriaOrderWaMessage, trackWhatsAppClick } from "@/utils/whatsapp";

const BR_GREEN = "#00A859";
const GOLD = "#D4AF37";

type Props = {
  open: boolean;
  origin: string;
  waSource: LeadWaSource;
  onClose: () => void;
};

export function LeadOrderModal({ open, origin: _origin, waSource, onClose }: Props) {
  const baseId = useId();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [produto, setProduto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [phase, setPhase] = useState<"idle" | "submitting" | "success">("idle");

  const closeModal = useCallback(() => {
    setPhase("idle");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    setNome("");
    setTelefone("");
    setProduto("");
    setMensagem("");
    setPhase("idle");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPhase("submitting");

    const formData = new FormData(e.currentTarget);
    const submittedNome = String(formData.get("nome") ?? "").trim().slice(0, LEAD_FIELD_LIMITS.nome);
    const submittedTelefone = String(formData.get("telefone") ?? "").trim().slice(0, LEAD_FIELD_LIMITS.telefone);
    const submittedProduto = String(formData.get("produto") ?? "").trim().slice(0, LEAD_FIELD_LIMITS.produto);
    const submittedMensagem = String(formData.get("mensagem") ?? "").trim().slice(0, LEAD_FIELD_LIMITS.mensagem);

    const pedidoDesejado = [submittedProduto, submittedMensagem].filter(Boolean).join("\n\n");
    const msg = buildVictoriaOrderWaMessage({
      nome: submittedNome,
      telefone: submittedTelefone,
      pedidoDesejado,
    });
    const whatsappUrl = buildVictoriaWhatsAppUrlFromPlainMessage(msg);
    const whatsappWindow = window.open("", "_blank");
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          nome: submittedNome,
          telefone: submittedTelefone,
          produto: submittedProduto,
          mensagem: submittedMensagem,
        }),
      });

      if (!res.ok) {
        const responseText = await res.text().catch(() => "");
        console.error("[LeadOrderModal] Falha ao salvar lead", {
          status: res.status,
          response: responseText,
        });
      } else {
        const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
        if (!data?.ok) {
          console.error("[LeadOrderModal] API de leads retornou falha", data);
        }
      }
    } catch (error) {
      console.error("[LeadOrderModal] Erro ao salvar lead", error);
    }

    setPhase("success");
    trackWhatsAppClick(waSource);
    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.href = whatsappUrl;
    }
    window.setTimeout(() => {
      closeModal();
    }, 900);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-white/[0.12] bg-black/60 px-3.5 py-2.5 text-sm text-white outline-none ring-0 transition placeholder:text-zinc-600 focus:border-[#00A859]/50 focus:ring-1 focus:ring-[#00A859]/30";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lead-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/75 p-4 pb-8 backdrop-blur-md sm:items-center sm:pb-4"
          role="presentation"
          onMouseDown={(ev) => {
            if (ev.target === ev.currentTarget) closeModal();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${baseId}-title`}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(0,168,89,0.12),0_32px_80px_-20px_rgba(0,0,0,0.9)]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                background:
                  "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(212,175,55,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(0,168,89,0.08), transparent 50%)",
              }}
              aria-hidden
            />
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={closeModal}
              className="absolute right-3 top-3 z-20 rounded-full p-2 text-zinc-500 transition hover:bg-white/[0.06] hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative px-5 pb-6 pt-8 sm:px-6 sm:pb-7 sm:pt-9">
              <div className="mb-1 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" style={{ color: BR_GREEN }} aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  Fazer pedido
                </p>
              </div>
              <h2 id={`${baseId}-title`} className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                Deixe seus dados
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Salvamos no sistema e abrimos o WhatsApp com a sua mensagem. Campos com * são obrigatórios.
              </p>

              {phase === "success" ? (
                <div className="mt-8 flex flex-col items-center gap-3 py-4 text-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#00A859]/40 bg-[#00A859]/15"
                    style={{ color: BR_GREEN }}
                  >
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                  <p className="font-display text-lg font-semibold text-white">Tudo certo!</p>
                  <p className="text-sm text-zinc-400">Estamos abrindo seu WhatsApp para finalizar seu pedido 👋</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor={`${baseId}-nome`} className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Nome *
                    </label>
                    <input
                      id={`${baseId}-nome`}
                      name="nome"
                      required
                      autoComplete="name"
                      maxLength={LEAD_FIELD_LIMITS.nome}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className={inputClass}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${baseId}-tel`} className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id={`${baseId}-tel`}
                      name="telefone"
                      required
                      type="tel"
                      autoComplete="tel"
                      maxLength={LEAD_FIELD_LIMITS.telefone}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className={inputClass}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${baseId}-prod`} className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Produto ou interesse
                    </label>
                    <input
                      id={`${baseId}-prod`}
                      name="produto"
                      maxLength={LEAD_FIELD_LIMITS.produto}
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                      className={inputClass}
                      placeholder="Ex.: coxinha, kit festa…"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${baseId}-msg`} className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      Mensagem
                    </label>
                    <textarea
                      id={`${baseId}-msg`}
                      name="mensagem"
                      rows={3}
                      maxLength={LEAD_FIELD_LIMITS.mensagem}
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      className={`${inputClass} resize-none`}
                      placeholder="Quantidade, data do evento, endereço…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={phase === "submitting"}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_32px_rgba(0,168,89,0.25)] transition enabled:hover:brightness-110 disabled:opacity-60"
                    style={{ backgroundColor: BR_GREEN }}
                  >
                    {phase === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Salvando…
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                        Salvar e abrir WhatsApp
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
