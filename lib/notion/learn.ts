import { notion, getDataSourceId, text, select, date, url } from "./client";

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  type?: string;
  status?: string;
  date?: string;
  link?: string;
};

export async function getLessons(): Promise<Lesson[]> {
  try {
    const dsId = await getDataSourceId(process.env.NOTION_LEARN_DB!);
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.results.map((page: any) => {
      const p = page.properties;
      return {
        id: page.id,
        title: text(p.Name),
        summary: text(p.Summary),
        type: select(p.Type),
        status: select(p.Status),
        date: date(p.Date),
        link: url(p.Link),
      };
    });
  } catch {
    return [];
  }
}

export function youtubeEmbed(link?: string): string | undefined {
  if (!link) return undefined;
  const m = link.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : undefined;
}
