import Link from "next/link";
import { VictoriaLogo } from "@/components/branding/VictoriaLogo";
import { PLATFORM_MODULES } from "@/lib/platform-registry";

export function PlatformHub() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-crest-motif text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-20%,color-mix(in_srgb,var(--victoria-red)_14%,transparent),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_60%,color-mix(in_srgb,var(--victoria-gold)_10%,transparent),transparent_42%)]" />

      <header className="relative z-10 border-b border-victoria-green-deep/50 bg-victoria-black/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
            <span className="rounded-lg bg-black/50 p-1 ring-1 ring-victoria-gold/25">
              <VictoriaLogo size="compact" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
              ← Homepage
            </span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Digital Platform
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.48em] text-victoria-red">
          Ecossistema
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
          Victoria Brasileira Digital Platform
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Visão completa dos produtos digitais, da homepage cinematográfica ao VIP
          Club. Cada módulo abre um capítulo da experiência oficial Victoria.
        </p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORM_MODULES.map((m) => (
            <li key={m.slug}>
              <Link
                href={m.path}
                className="group flex h-full flex-col rounded-2xl border border-victoria-green-deep/50 bg-victoria-green-deep/40 p-5 shadow-[0_0_0_1px_color-mix(in_srgb,var(--victoria-red)_12%,transparent)] transition hover:border-victoria-gold/35 hover:bg-victoria-green/15"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden>
                    {m.emoji}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold uppercase leading-snug tracking-wide text-white group-hover:text-victoria-gold">
                      {m.title}
                    </p>
                    <p className="mt-1 text-sm text-emerald-200/85">{m.headline}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-500">
                  {m.description}
                </p>
                <span className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-victoria-gold/90">
                  {m.path} · {m.status === "beta" ? "ativo" : "roadmap"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
