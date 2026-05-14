import type { Metadata } from "next";
import { PlatformStub } from "@/components/platform/PlatformStub";
import { platformPageMetadata } from "@/lib/platform-registry";

export const metadata: Metadata = platformPageMetadata("checkout");

export default function CheckoutPage() {
  return <PlatformStub slug="checkout" />;
}
