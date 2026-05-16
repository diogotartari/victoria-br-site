"use client";

import Image from "next/image";

/** Logo oficial em `public/logo.png` (brasão Victoria BR). */
export const VICTORIA_LOGO_PATH = "/logo.png" as const;

export type VictoriaLogoSize = "navbar" | "footer" | "compact";

const sizeMap: Record<
  VictoriaLogoSize,
  { width: number; height: number; className: string }
> = {
  navbar: {
    width: 180,
    height: 180,
    className: "shrink-0",
  },
  footer: {
    width: 120,
    height: 150,
    className: "h-11 w-auto",
  },
  compact: {
    width: 72,
    height: 90,
    className: "h-9 w-auto",
  },
};

type VictoriaLogoProps = {
  size: VictoriaLogoSize;
  className?: string;
  priority?: boolean;
};

export function VictoriaLogo({ size, className = "", priority }: VictoriaLogoProps) {
  const s = sizeMap[size];
  return (
    <Image
      src={VICTORIA_LOGO_PATH}
      alt="Victoria BR, salgados oficiais"
      width={s.width}
      height={s.height}
      priority={priority}
      sizes={size === "navbar" ? "180px" : "120px"}
      className={`object-contain object-left-top ${s.className} ${className}`.trim()}
    />
  );
}
