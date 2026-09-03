import Image from 'next/image'
import type { NotionBlock, NotionRichText } from '@/types'

function RichText({ items = [] }: { items: NotionRichText[] }) {
  return (
    <>
      {items.map((item, i) => {
        let node: React.ReactNode = item.plain_text

        if (item.annotations?.bold) node = <strong>{node}</strong>
        if (item.annotations?.italic) node = <em>{node}</em>
        if (item.annotations?.strikethrough) node = <s>{node}</s>
        if (item.annotations?.code) {
          node = (
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-violet-300">
              {node}
            </code>
          )
        }
        if (item.href) {
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 underline underline-offset-2 hover:text-violet-300"
            >
              {node}
            </a>
          )
        }

        return <span key={i}>{node}</span>
      })}
    </>
  )
}

function getBlockData(block: NotionBlock) {
  return (block[block.type] ?? {}) as Record<string, unknown>
}

export default function BlockRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const rendered: React.ReactNode[] = []
  let listBuffer: { type: 'ul' | 'ol'; items: NotionBlock[] } | null = null

  function flushList() {
    if (!listBuffer) return
    const { type, items } = listBuffer
    const Tag = type === 'ul' ? 'ul' : 'ol'
    rendered.push(
      <Tag
        key={`list-${rendered.length}`}
        className={`mb-4 space-y-1 pl-6 text-zinc-300 ${type === 'ul' ? 'list-disc' : 'list-decimal'}`}
      >
        {items.map((item) => {
          const data = getBlockData(item)
          return (
            <li key={item.id} className="leading-relaxed">
              <RichText items={(data.rich_text ?? []) as NotionRichText[]} />
            </li>
          )
        })}
      </Tag>
    )
    listBuffer = null
  }

  for (const block of blocks) {
    const data = getBlockData(block)
    const rt = (data.rich_text ?? []) as NotionRichText[]

    if (block.type === 'bulleted_list_item') {
      if (listBuffer?.type !== 'ul') {
        flushList()
        listBuffer = { type: 'ul', items: [] }
      }
      listBuffer.items.push(block)
      continue
    }

    if (block.type === 'numbered_list_item') {
      if (listBuffer?.type !== 'ol') {
        flushList()
        listBuffer = { type: 'ol', items: [] }
      }
      listBuffer.items.push(block)
      continue
    }

    flushList()

    switch (block.type) {
      case 'paragraph':
        if (rt.length > 0) {
          rendered.push(
            <p key={block.id} className="mb-4 leading-relaxed text-zinc-300">
              <RichText items={rt} />
            </p>
          )
        }
        break

      case 'heading_1':
        rendered.push(
          <h2
            key={block.id}
            className="mb-4 mt-10 text-3xl font-bold tracking-tight text-zinc-50"
          >
            <RichText items={rt} />
          </h2>
        )
        break

      case 'heading_2':
        rendered.push(
          <h3 key={block.id} className="mb-3 mt-8 text-2xl font-semibold text-zinc-100">
            <RichText items={rt} />
          </h3>
        )
        break

      case 'heading_3':
        rendered.push(
          <h4 key={block.id} className="mb-2 mt-6 text-lg font-semibold text-zinc-200">
            <RichText items={rt} />
          </h4>
        )
        break

      case 'code': {
        const codeText = rt.map((r) => r.plain_text).join('')
        const lang = (data.language as string) || 'text'
        rendered.push(
          <div key={block.id} className="mb-4 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2">
              <span className="text-xs font-medium text-zinc-500">{lang}</span>
            </div>
            <pre className="overflow-x-auto p-4">
              <code className="font-mono text-sm text-zinc-200">{codeText}</code>
            </pre>
          </div>
        )
        break
      }

      case 'quote':
        rendered.push(
          <blockquote
            key={block.id}
            className="mb-4 border-l-2 border-violet-500 pl-4 text-zinc-400 italic"
          >
            <RichText items={rt} />
          </blockquote>
        )
        break

      case 'divider':
        rendered.push(
          <hr key={block.id} className="my-8 border-zinc-800" />
        )
        break

      case 'callout': {
        const icon = (data.icon as { emoji?: string })?.emoji ?? '💡'
        rendered.push(
          <div
            key={block.id}
            className="mb-4 flex gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4"
          >
            <span className="shrink-0 text-lg">{icon}</span>
            <p className="leading-relaxed text-zinc-300">
              <RichText items={rt} />
            </p>
          </div>
        )
        break
      }

      case 'image': {
        const imgData = data as { type?: string; external?: { url: string }; file?: { url: string }; caption?: NotionRichText[] }
        const url =
          imgData.type === 'external'
            ? (imgData.external?.url ?? null)
            : (imgData.file?.url ?? null)
        const caption = imgData.caption ?? []

        if (url) {
          rendered.push(
            <figure key={block.id} className="mb-6">
              <div className="relative overflow-hidden rounded-xl border border-zinc-800">
                <Image
                  src={url}
                  alt={caption.map((c) => c.plain_text).join('') || 'Image'}
                  width={900}
                  height={500}
                  className="w-full object-cover"
                />
              </div>
              {caption.length > 0 && (
                <figcaption className="mt-2 text-center text-xs text-zinc-500">
                  <RichText items={caption} />
                </figcaption>
              )}
            </figure>
          )
        }
        break
      }

      case 'toggle':
        rendered.push(
          <details
            key={block.id}
            className="mb-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
          >
            <summary className="cursor-pointer text-sm font-medium text-zinc-200 hover:text-zinc-100">
              <RichText items={rt} />
            </summary>
            <div className="mt-2 text-sm text-zinc-400">
              (Expand to see nested content — fully supported once the page loads)
            </div>
          </details>
        )
        break

      default:
        if (rt.length > 0) {
          rendered.push(
            <p key={block.id} className="mb-4 leading-relaxed text-zinc-300">
              <RichText items={rt} />
            </p>
          )
        }
    }
  }

  flushList()

  return <div className="prose-custom">{rendered}</div>
}
