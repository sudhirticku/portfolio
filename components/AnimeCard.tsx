import Image from 'next/image'
import { Star } from 'lucide-react'
import type { AnimeEntry } from '@/types'

const statusColors: Record<string, string> = {
  Recommended: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  Watching: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  Completed: 'border-zinc-600/40 bg-zinc-800/60 text-zinc-400',
}

export default function AnimeCard({ entry }: { entry: AnimeEntry }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-600 hover:shadow-xl hover:shadow-zinc-950/40 hover:-translate-y-0.5">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        {entry.poster ? (
          <Image
            src={entry.poster}
            alt={entry.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900">
            <span className="text-4xl">📺</span>
          </div>
        )}

        {/* Rating badge overlay */}
        {entry.rating !== null && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-2 py-1 text-xs font-semibold text-zinc-100 backdrop-blur-sm">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            {entry.rating}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-sm font-semibold leading-snug text-zinc-100 line-clamp-2">
          {entry.title}
        </h3>

        {entry.status && (
          <span
            className={`mb-3 self-start rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[entry.status] ?? statusColors.Completed}`}
          >
            {entry.status === 'Recommended' ? '★ Recommended' : entry.status}
          </span>
        )}

        {entry.standoutAIFlavor && (
          <p className="mt-auto text-xs leading-relaxed text-zinc-500 line-clamp-3">
            {entry.standoutAIFlavor}
          </p>
        )}
      </div>
    </div>
  )
}
