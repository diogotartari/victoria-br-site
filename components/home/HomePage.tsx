"use client";

import { HomeCardapio } from "./HomeCardapio";
import { HomeFooter, HomeNavTargets } from "./HomeNavTargets";
import { HomeStatsStrip } from "./HomeStatsStrip";
import { HomeHeader } from "./HomeHeader";
import { HomeHero } from "./HomeHero";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-zinc-100">
      <HomeHeader />
      <main>
        <HomeHero />
        <HomeCardapio />
        <HomeStatsStrip />
        <HomeNavTargets />
      </main>
      <HomeFooter />
    </div>
  );
}
