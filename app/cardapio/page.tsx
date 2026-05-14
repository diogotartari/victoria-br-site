import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("cardapio");

export default function CardapioPage() {
  return <PlatformStub slug="cardapio" />;
}
