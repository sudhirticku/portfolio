import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ExternalLink, ArrowLeft } from 'lucide-react'
import { getProject, getProjectBlocks, getProjects } from '@/lib/notion'
import BlockRenderer from '@/components/BlockRenderer'
import GiscusWidget from '@/components/GiscusWidget'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((p) => ({ id: p.id }))
  } catch {
    // Notion unavailable at build time — pages will be generated on first request
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(id)
  return {
    title: project ? `${project.name} — Sudhir` : 'Project — Sudhir',
    description: project?.tagline ?? undefined,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [project, blocks] = await Promise.all([getProject(id), getProjectBlocks(id)])

  if (!project) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-zinc-400">Project not found.</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft size={14} />
        All projects
      </Link>

      {/* Cover image */}
      {project.coverImage && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src={project.coverImage}
            alt={project.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        {project.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-50">{project.name}</h1>

        {project.tagline && (
          <p className="text-lg leading-relaxed text-zinc-400">{project.tagline}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="mb-10 flex flex-wrap gap-3">
        {project.downloadURL && (
          <a
            href={project.downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/50 transition-all hover:bg-violet-500 hover:shadow-violet-900/60"
          >
            <Download size={15} />
            Download Build
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
          >
            <ExternalLink size={15} />
            View Demo
          </a>
        )}
      </div>

      {/* Divider */}
      <hr className="mb-10 border-zinc-800" />

      {/* Notion page content */}
      <article className="mb-16">
        {blocks.length > 0 ? (
          <BlockRenderer blocks={blocks} />
        ) : (
          <p className="text-zinc-500">No documentation yet — check back soon.</p>
        )}
      </article>

      {/* Comments */}
      <section>
        <h2 className="mb-6 text-xl font-semibold text-zinc-100">Discussion</h2>
        <GiscusWidget />
      </section>
    </main>
  )
}
