import Link from 'next/link'

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-100 transition-colors hover:text-violet-400"
        >
          Sudhir
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#projects"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Projects
          </Link>
          <Link
            href="/anime"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Anime
          </Link>
        </div>
      </nav>
    </header>
  )
}
