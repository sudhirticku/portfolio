import { about } from "@/content/site";
import { Section } from "@/components/shared/Section";

export function About() {
  return (
    <Section id="about" label={about.label} header={about.header}>
      <div className="max-w-prose space-y-5 text-lg leading-relaxed text-[var(--muted)]">
        {about.body.map((p, i) => (
          <p
            key={i}
            className={i === about.body.length - 1 ? "font-semibold text-[var(--ink)]" : ""}
          >
            {p}
          </p>
        ))}
      </div>
      <ul className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
        {about.facts.map((f) => (
          <li key={f} className="border-l-2 border-[var(--accent)] pl-3">
            {f}
          </li>
        ))}
      </ul>
    </Section>
  );
}
