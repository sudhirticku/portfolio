export interface Project {
  id: string
  name: string
  tagline: string
  categories: string[]
  downloadURL: string | null
  demoLink: string | null
  coverImage: string | null
}

export interface AnimeEntry {
  id: string
  title: string
  rating: number | null
  status: 'Watching' | 'Completed' | 'Recommended' | null
  poster: string | null
  standoutAIFlavor: string
}

export type NotionRichText = {
  type: string
  text?: { content: string; link?: { url: string } | null }
  annotations?: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href?: string | null
}

export type NotionBlock = {
  id: string
  type: string
  has_children: boolean
  [key: string]: unknown
}
