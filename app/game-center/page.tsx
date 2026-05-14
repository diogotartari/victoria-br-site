import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("game-center");

export default function GameCenterPage() {
  return <PlatformStub slug="game-center" />;
}
