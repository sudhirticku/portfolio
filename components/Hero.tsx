export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-24">
      <div className="max-w-3xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
          <span className="text-xs font-medium tracking-wide text-violet-300">
            Talent Partner → AI Builder
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-zinc-50 lg:text-6xl">
          I build AI workflows
          <br />
          <span className="text-violet-400">for recruitment.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mb-8 text-lg text-zinc-400 lg:text-xl">
          7+ years in talent acquisition — now building AI-powered workflows that take the busywork
          out of hiring.
        </p>

        {/* Divider */}
        <div className="mb-8 h-px w-16 bg-violet-500/50" />

        {/* Bio */}
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {`I'm Sudhir — a talent partner with 7+ years building engineering, GTM, and leadership
          teams for companies across the globe. Along the way I got tired of the repetitive parts of
          recruiting, so I started building AI-powered workflows to fix them: streamlining sourcing,
          candidate outreach, and the busywork that slows hiring down. As a founding hire at an
          AI-native startup, I saw up close how good tooling changes the game — this site is where I
          share the AI workflows and automations I'm building for the recruitment and HR space.`}
        </p>
      </div>
    </section>
  )
}
