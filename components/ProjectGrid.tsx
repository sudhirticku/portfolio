import type { Project } from '@/types'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-800 py-20 text-center">
        <p className="text-sm text-zinc-500">No projects yet — add some in Notion.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
