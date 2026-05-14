import type { Metadata } from "next";
import { PlatformHub } from "@/components/platform/PlatformHub";

export const metadata: Metadata = {
  title: "Victoria BR Digital Platform | Ecossistema",
  description:
    "Homepage, cardápio 3D, Copa, perfil gamificado, checkout, PWA, IA, admin, Game Center e VIP Club.",
  openGraph: {
    title: "Victoria BR Digital Platform",
    locale: "pt_BR",
  },
};

export default function PlataformaPage() {
  return <PlatformHub />;
}
