import type { Metadata } from 'next'
import { getAnime } from '@/lib/notion'
import AnimeGrid from '@/components/AnimeGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Anime — Sudhir',
  description: 'Anime I\'m watching, have completed, or recommend.',
}

export default async function AnimePage() {
  const anime = await getAnime().catch(() => [])

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Side quest
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-50">Anime</h1>
        <p className="max-w-xl text-base text-zinc-400">
          What I&apos;m watching, what I&apos;ve loved, and the ones worth recommending. Filtered by
          mood, sorted by how hard they hit.
        </p>
      </div>

      <AnimeGrid anime={anime} />
    </main>
  )
}
