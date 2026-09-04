import Link from "next/link";
import { builds } from "@/content/site";
import { Section } from "@/components/shared/Section";

export type Build = {
  id: string;
  title: string;
  summary: string;
  stage?: string;
  status?: string;
  effort?: string;
};

const statusTone: Record<string, string> = {
  "Battle-tested": "bg-[var(--ok-bg)] text-[var(--ok)]",
  Testing: "bg-[var(--warn-bg)] text-[var(--warn)]",
  WIP: "bg-[var(--line)] text-[var(--muted)]",
};

export function Builds({ items }: { items: Build[] }) {
  return (
    <Section id="builds" label={builds.label} header={builds.header}>
      <p className="max-w-prose text-lg text-[var(--muted)]">{builds.intro}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((b) => (
          <li key={b.id}>
            <Link
              href={`/projects/${b.id}`}
              className="build-card flex h-full flex-col rounded-2xl border border-[var(--line)] p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <div className="flex flex-wrap gap-2 text-xs">
                {b.stage && (
                  <span className="rounded-full border border-[var(--line)] px-2.5 py-1">
                    {b.stage}
                  </span>
                )}
                {b.status && (
                  <span className={`rounded-full px-2.5 py-1 ${statusTone[b.status] ?? statusTone.WIP}`}>
                    {b.status}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-[var(--muted)]">{b.summary}</p>
              <span className="mt-5 text-sm font-medium">{builds.cardCta}</span>
            </Link>
          </li>
        ))}

        <li className="rounded-2xl border border-dashed border-[var(--line)] p-6">
          <h3 className="text-xl font-semibold">{builds.comingSoon.title}</h3>
          <p className="mt-2 leading-relaxed text-[var(--muted)]">{builds.comingSoon.body}</p>
          <Link href={builds.comingSoon.cta.href} className="mt-5 inline-block text-sm font-medium">
            {builds.comingSoon.cta.label}
          </Link>
        </li>
      </ul>
    </Section>
  );
}
