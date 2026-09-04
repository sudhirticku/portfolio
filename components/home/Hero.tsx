import { hero } from "@/content/site";
import { Button } from "@/components/shared/Button";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 md:pb-28 md:pt-32">
      <p className="text-sm text-[var(--muted)] hero-enter hero-enter-d1">{hero.eyebrow}</p>

      <h1 className="mt-6 text-[clamp(3.5rem,12vw,9rem)] font-semibold leading-[0.9] tracking-tighter hero-enter hero-enter-d2">
        {hero.brandPrefix}
        <span className="text-[var(--accent)] hero-accent">{hero.brandAccent}</span>
        {hero.brandSuffix}
      </h1>

      <p className="mt-10 max-w-2xl text-2xl font-medium leading-snug tracking-tight md:text-3xl hero-enter hero-enter-d3">
        {hero.headline}
      </p>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)] hero-enter hero-enter-d4">
        {hero.subhead}
      </p>

      <div className="mt-10 flex flex-wrap gap-3 hero-enter hero-enter-d5">
        <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
        <Button href={hero.secondaryCta.href} variant="ghost">
          {hero.secondaryCta.label}
        </Button>
      </div>
    </section>
  );
}
