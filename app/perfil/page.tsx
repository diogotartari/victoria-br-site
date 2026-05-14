import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("perfil");

export default function PerfilPage() {
  return <PlatformStub slug="perfil" />;
}
