import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("pwa");

export default function PwaPage() {
  return <PlatformStub slug="pwa" />;
}
