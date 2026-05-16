"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { type LeadWaSource } from "@/lib/lead-types";
import { LeadOrderModal } from "./LeadOrderModal";

const ORIGIN_MAX = 200;

type LeadModalPayload = { origin: string; waSource: LeadWaSource };

type LeadCtx = {
  openLeadModal: (origin: string, waSource?: LeadWaSource) => void;
};

const LeadModalContext = createContext<LeadCtx | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<LeadModalPayload>({
    origin: "Home",
    waSource: "hero_fazer_pedido",
  });

  const openLeadModal = useCallback((origin: string, waSource: LeadWaSource = "hero_fazer_pedido") => {
    setPayload({
      origin: origin.slice(0, ORIGIN_MAX),
      waSource,
    });
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openLeadModal }), [openLeadModal]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadOrderModal
        open={open}
        origin={payload.origin}
        waSource={payload.waSource}
        onClose={() => setOpen(false)}
      />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal(): LeadCtx {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal deve ser usado dentro de LeadModalProvider.");
  }
  return ctx;
}
