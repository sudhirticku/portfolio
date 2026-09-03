import Link from 'next/link'
import Image from 'next/image'
import { Download, ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-600 hover:shadow-xl hover:shadow-violet-950/20 hover:-translate-y-0.5">
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-950/40 to-zinc-900">
            <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <div className="h-5 w-5 rounded bg-violet-500/40" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category tags */}
        {project.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-1.5 text-base font-semibold leading-snug text-zinc-100 group-hover:text-white">
          {project.name}
        </h3>

        {/* Tagline */}
        {project.tagline && (
          <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400">{project.tagline}</p>
        )}

        {/* Buttons */}
        <div className="mt-auto flex gap-2">
          {project.downloadURL && (
            <a
              href={project.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
            >
              <Download size={13} />
              Download Build
            </a>
          )}
          <Link
            href={`/projects/${project.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
          >
            View Details
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Demo link (subtle, below) */}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1 text-xs text-zinc-500 transition-colors hover:text-violet-400"
          >
            <ExternalLink size={11} />
            View demo
          </a>
        )}
      </div>
    </div>
  )
}
