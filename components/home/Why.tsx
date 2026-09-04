import { why } from "@/content/site";
import { Section } from "@/components/shared/Section";

export function Why() {
  return (
    <Section id="why" label={why.label} header={why.header} tone="tint">
      <div className="max-w-prose space-y-5 text-lg leading-relaxed">
        {why.body.map((p, i) => (
          <p key={i} className={p.length < 40 ? "font-semibold" : "text-[var(--muted)]"}>
            {p}
          </p>
        ))}
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {why.pillars.map((pillar) => (
          <div key={pillar.title}>
            <span className="text-2xl" aria-hidden>
              {pillar.icon}
            </span>
            <h3 className="mt-3 font-semibold">{pillar.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{pillar.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
