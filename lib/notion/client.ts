import { Client } from "@notionhq/client";
import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({ auth: process.env.NOTION_API_KEY });

const dsCache = new Map<string, string>();

export async function getDataSourceId(databaseId: string): Promise<string> {
  if (dsCache.has(databaseId)) return dsCache.get(databaseId)!;
  const db = await notion.databases.retrieve({ database_id: databaseId });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dsId = (db as DatabaseObjectResponse & { data_sources?: Array<{ id: string }> }).data_sources?.[0]?.id;
  if (!dsId) throw new Error(`No data source found for database ${databaseId}`);
  dsCache.set(databaseId, dsId);
  return dsId;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const text = (p: any): string =>
  p?.title?.map((t: { plain_text: string }) => t.plain_text).join("") ??
  p?.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") ??
  "";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const select = (p: any): string | undefined => p?.select?.name ?? p?.status?.name ?? undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const multi = (p: any): string[] => p?.multi_select?.map((s: { name: string }) => s.name) ?? [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const date = (p: any): string | undefined => p?.date?.start ?? undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const url = (p: any): string | undefined => p?.url ?? undefined;
