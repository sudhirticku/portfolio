'use client'

import { useState } from 'react'
import type { AnimeEntry } from '@/types'
import AnimeCard from './AnimeCard'

type Filter = 'All' | 'Recommended' | 'Watching'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'All' },
  { label: 'Highly Recommended', value: 'Recommended' },
  { label: 'Currently Watching', value: 'Watching' },
]

export default function AnimeGrid({ anime }: { anime: AnimeEntry[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filtered =
    active === 'All' ? anime : anime.filter((a) => a.status === active)

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              active === f.value
                ? 'border-violet-500 bg-violet-500/15 text-violet-300'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
          <p className="text-sm text-zinc-500">Nothing here yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((entry) => (
            <AnimeCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
