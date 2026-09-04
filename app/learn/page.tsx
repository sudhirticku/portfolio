import { Nav } from "@/components/shared/Nav";
import { FooterCta } from "@/components/home/FooterCta";
import { getLessons, youtubeEmbed } from "@/lib/notion/learn";
import { site } from "@/content/site";

export const revalidate = 3600;
export const metadata = { title: "Learn — RecruAIter" };

export default async function LearnPage() {
  const lessons = await getLessons();
  const upcoming = lessons.filter((l) => l.status === "Upcoming");
  const recorded = lessons.filter((l) => l.status !== "Upcoming");

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm text-[var(--muted)]">Learn</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Webinars and videos on building your first workflow.
        </h1>

        {lessons.length === 0 && (
          <div className="mt-12 max-w-prose rounded-2xl border border-dashed border-[var(--line)] p-8">
            <h2 className="text-xl font-semibold">Nothing scheduled yet.</h2>
            <p className="mt-2 leading-relaxed text-[var(--muted)]">
              Sessions on building your first recruiting workflow are coming. Get a heads-up when
              the first one goes live.
            </p>
            <a href={site.links.updates} className="mt-5 inline-block text-sm font-medium">
              Get notified →
            </a>
          </div>
        )}

        {upcoming.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight">Upcoming</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {upcoming.map((l) => (
                <li key={l.id} className="rounded-2xl border border-[var(--accent)] p-6">
                  <p className="text-sm text-[var(--muted)]">
                    {l.type}
                    {l.date ? ` · ${new Date(l.date).toDateString()}` : ""}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{l.title}</h3>
                  <p className="mt-2 leading-relaxed text-[var(--muted)]">{l.summary}</p>
                  {l.link && (
                    <a href={l.link} className="mt-5 inline-block text-sm font-medium">
                      Save your seat →
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {recorded.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight">Watch</h2>
            <ul className="mt-6 grid gap-8 sm:grid-cols-2">
              {recorded.map((l) => {
                const embed = youtubeEmbed(l.link);
                return (
                  <li key={l.id}>
                    {embed ? (
                      <iframe
                        src={embed}
                        title={l.title}
                        className="aspect-video w-full rounded-2xl border border-[var(--line)]"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : null}
                    <p className="mt-4 text-sm text-[var(--muted)]">{l.type}</p>
                    <h3 className="mt-1 text-xl font-semibold">{l.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--muted)]">{l.summary}</p>
                    {!embed && l.link && (
                      <a href={l.link} className="mt-3 inline-block text-sm font-medium">
                        Watch →
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
      <FooterCta />
    </>
  );
}
