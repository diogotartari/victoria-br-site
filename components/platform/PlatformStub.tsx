import Link from "next/link";
import type { PlatformSlug } from "@/lib/platform-registry";
import { getPlatformModule } from "@/lib/platform-registry";
import { VictoriaLogo } from "@/components/branding/VictoriaLogo";

type PlatformStubProps = {
  slug: Exclude<PlatformSlug, "home">;
};

export function PlatformStub({ slug }: PlatformStubProps) {
  const m = getPlatformModule(slug);

  return (
    <div className="relative min-h-screen overflow-hidden bg-crest-motif text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(225,29,46,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_40%,rgba(9,74,48,0.4),transparent_48%)]" />

      <header className="relative z-10 border-b border-victoria-green-deep/50 bg-victoria-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
            <span className="rounded-lg bg-black/50 p-1 ring-1 ring-victoria-gold/25">
              <VictoriaLogo size="compact" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
              ← Início
            </span>
          </Link>
          <Link
            href="/plataforma"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500 transition hover:text-emerald-300"
          >
            Mapa da plataforma
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.42em] text-[#a67c2a]">
          Victoria BR Digital Platform
        </p>
        <div className="mt-6 flex flex-wrap items-end gap-4">
          <span className="text-5xl sm:text-6xl" aria-hidden>
            {m.emoji}
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
              {m.title}
            </h1>
            <p className="mt-2 text-lg text-emerald-100/90">{m.headline}</p>
          </div>
        </div>

        <span className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-zinc-400">
          {m.status === "beta" ? "Em evolução contínua" : "Roadmap · em breve"}
        </span>

        <p className="mt-8 text-lg leading-relaxed text-zinc-400">{m.description}</p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#cta"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#9b0f1c] via-[#e11d2e] to-[#ff4d5e] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_0_1px_rgba(166,124,42,0.35),0_14px_48px_rgba(225,29,46,0.35)]"
          >
            Falar com o time
          </Link>
          <Link
            href="/plataforma"
            className="inline-flex items-center justify-center rounded-full border border-emerald-800/55 bg-[#041810]/80 px-8 py-3.5 text-sm font-semibold text-emerald-50 transition hover:border-[#e11d2e]/35"
          >
            Ver ecossistema completo
          </Link>
        </div>
      </main>
    </div>
  );
}
