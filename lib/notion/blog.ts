import { NotionToMarkdown } from "notion-to-md";
import { notion, getDataSourceId, text, select, multi, date } from "./client";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  tags: string[];
  readTime?: string;
};

const n2m = new NotionToMarkdown({ notionClient: notion });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPost(page: any): Post {
  const p = page.properties;
  return {
    id: page.id,
    slug: text(p.Slug),
    title: text(p.Name),
    excerpt: text(p.Excerpt),
    date: date(p.Date),
    tags: multi(p.Tags),
    readTime: select(p.ReadTime),
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const dsId = await getDataSourceId(process.env.NOTION_BLOG_DB!);
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((p: any) => toPost(p));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const dsId = await getDataSourceId(process.env.NOTION_BLOG_DB!);
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Published", checkbox: { equals: true } },
        ],
      },
    });
    const page = res.results[0];
    if (!page) return null;
    const blocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(blocks).parent;
    return { post: toPost(page), markdown };
  } catch {
    return null;
  }
}
