import { footerCta, about, site } from "@/content/site";

export function FooterCta() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          {footerCta.header}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">{footerCta.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {footerCta.ctas.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                i === 0
                  ? "bg-[var(--paper)] text-[var(--ink)]"
                  : "border border-[var(--paper)]/30 hover:border-[var(--paper)]"
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>
        <p className="mt-16 max-w-md text-sm opacity-60">{about.short}</p>
        <p className="mt-4 text-xs opacity-40">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
