import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("assistente");

export default function AssistentePage() {
  return <PlatformStub slug="assistente" />;
}
