import Link from 'next/link'
import { ArrowRight, Tv2 } from 'lucide-react'
import { getProjects, getAnime } from '@/lib/notion'
import Hero from '@/components/Hero'
import ProjectGrid from '@/components/ProjectGrid'
import AnimeCard from '@/components/AnimeCard'

export const revalidate = 3600

export default async function Home() {
  const [projects, anime] = await Promise.all([
    getProjects().catch(() => []),
    getAnime().catch(() => []),
  ])
  const featuredAnime = anime.slice(0, 6)

  return (
    <main>
      <Hero />

      {/* Projects section */}
      <section id="projects" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Builds
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50">
              AI Workflows & Automations
            </h2>
          </div>
        </div>
        <ProjectGrid projects={projects} />
      </section>

      {/* Anime teaser section */}
      {featuredAnime.length > 0 && (
        <section className="border-t border-zinc-800 bg-zinc-950/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  <Tv2 size={12} />
                  Currently watching / recommending
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-50">Anime Picks</h2>
                <p className="mt-2 text-sm text-zinc-500">
                  The shows I&apos;m watching and what makes them stick.
                </p>
              </div>
              <Link
                href="/anime"
                className="hidden items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100 sm:flex"
              >
                See all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {featuredAnime.map((entry) => (
                <AnimeCard key={entry.id} entry={entry} />
              ))}
            </div>

            <div className="mt-8 sm:hidden">
              <Link
                href="/anime"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300"
              >
                See full anime list
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
