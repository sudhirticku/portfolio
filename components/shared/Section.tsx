import type { ReactNode } from "react";

type Props = {
  id?: string;
  label?: string;
  header: string;
  children: ReactNode;
  tone?: "default" | "tint";
};

export function Section({ id, label, header, children, tone = "default" }: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-[var(--line)] ${
        tone === "tint" ? "bg-[var(--tint)]" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            {label && <p className="text-sm text-[var(--muted)]">{label}</p>}
            <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {header}
            </h2>
          </div>
          <div className="md:col-span-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
