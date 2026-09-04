import { whoFor } from "@/content/site";
import { Section } from "@/components/shared/Section";

export function WhoFor() {
  return (
    <Section id="who" label={whoFor.label} header={whoFor.header}>
      <ul className="divide-y divide-[var(--line)]">
        {whoFor.items.map((item) => (
          <li key={item.title} className="py-6 first:pt-0">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 max-w-prose leading-relaxed text-[var(--muted)]">{item.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-lg font-medium">{whoFor.closing}</p>
    </Section>
  );
}
