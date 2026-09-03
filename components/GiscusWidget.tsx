'use client'

import { useEffect, useRef } from 'react'

export default function GiscusWidget() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

    if (!repo || !repoId || !category || !categoryId) {
      return
    }

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark_dimmed')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  const isConfigured =
    process.env.NEXT_PUBLIC_GISCUS_REPO &&
    process.env.NEXT_PUBLIC_GISCUS_REPO_ID &&
    process.env.NEXT_PUBLIC_GISCUS_CATEGORY &&
    process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  if (!isConfigured) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 py-10 text-center">
        <p className="text-sm text-zinc-500">
          Comments coming soon — Giscus will appear here once the GitHub repo is set up.
        </p>
      </div>
    )
  }

  return <div ref={ref} />
}
