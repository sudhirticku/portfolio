import { Client } from '@notionhq/client'
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Project, AnimeEntry, NotionBlock } from '@/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// In-memory cache for data source IDs (persists for the lifetime of a server instance)
const dsCache = new Map<string, string>()

async function getDataSourceId(databaseId: string): Promise<string> {
  if (dsCache.has(databaseId)) return dsCache.get(databaseId)!

  const db = await notion.databases.retrieve({ database_id: databaseId })
  const fullDb = db as DatabaseObjectResponse
  const dsId = fullDb.data_sources?.[0]?.id

  if (!dsId) throw new Error(`No data source found for database ${databaseId}`)

  dsCache.set(databaseId, dsId)
  return dsId
}

function richText(rt: Array<{ plain_text: string }> | undefined): string {
  return rt?.map((t) => t.plain_text).join('') ?? ''
}

type NotionFile = {
  type: string
  external?: { url: string }
  file?: { url: string }
}

function fileUrl(files: NotionFile[] | undefined): string | null {
  if (!files?.length) return null
  const f = files[0]
  if (f.type === 'external') return f.external?.url ?? null
  return f.file?.url ?? null
}

function normalizePage(page: PageObjectResponse): Project {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as Record<string, any>
  return {
    id: page.id,
    name: richText(props.Name?.title),
    tagline: richText(props.Tagline?.rich_text),
    categories: (props.Category?.multi_select ?? []).map((t: { name: string }) => t.name),
    downloadURL: props.BuildDownloadURL?.url ?? null,
    demoLink: props.DemoLink?.url ?? null,
    coverImage: fileUrl(props.CoverImage?.files),
  }
}

export async function getProjects(): Promise<Project[]> {
  const dsId = await getDataSourceId(process.env.NOTION_PROJECTS_DB_ID!)

  const response = await notion.dataSources.query({
    data_source_id: dsId,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  })

  return response.results
    .filter((r): r is PageObjectResponse => r.object === 'page' && 'properties' in r)
    .map(normalizePage)
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    if (!('properties' in page)) return null
    return normalizePage(page as PageObjectResponse)
  } catch {
    return null
  }
}

export async function getProjectBlocks(id: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: id,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...(response.results as NotionBlock[]))
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

export async function getAnime(): Promise<AnimeEntry[]> {
  const dsId = await getDataSourceId(process.env.NOTION_ANIME_DB_ID!)

  const response = await notion.dataSources.query({
    data_source_id: dsId,
    sorts: [{ property: 'Rating', direction: 'descending' }],
  })

  return response.results
    .filter((r): r is PageObjectResponse => r.object === 'page' && 'properties' in r)
    .map((page) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = page.properties as Record<string, any>
      return {
        id: page.id,
        title: richText(props.Title?.title),
        rating: props.Rating?.number ?? null,
        status: (props.Status?.select?.name ?? null) as AnimeEntry['status'],
        poster: fileUrl(props.Poster?.files),
        standoutAIFlavor: richText(props.StandoutAIFlavor?.rich_text),
      }
    })
}
