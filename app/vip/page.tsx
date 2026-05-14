import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("vip");

export default function VipPage() {
  return <PlatformStub slug="vip" />;
}
