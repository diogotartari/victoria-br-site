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
    width: 160,
    height: 200,
    className: "h-10 w-auto max-h-11 sm:h-12 sm:max-h-14",
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
      sizes={size === "navbar" ? "140px" : "120px"}
      className={`object-contain object-left-top ${s.className} ${className}`.trim()}
    />
  );
}
