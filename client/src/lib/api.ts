import { useQuery } from "@tanstack/react-query";

export interface NewsArticle {
  id: number;
  title: string;
  titleUrdu: string | null;
  titleKn: string | null;
  excerpt: string;
  excerptUrdu: string | null;
  content: string;
  tag: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: number;
  title: string;
  titleUrdu: string | null;
  content: string;
  tag: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

interface ListResponse<T> {
  items: T[];
  total: number;
}

interface ListParams {
  limit?: number;
  offset?: number;
  tag?: string;
}

function buildQuery(params: ListParams): string {
  const search = new URLSearchParams();
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  if (params.tag) search.set("tag", params.tag);
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request to ${url} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function useListNewsArticles(params: ListParams = {}) {
  return useQuery({
    queryKey: ["news-articles", params],
    queryFn: () =>
      fetchJson<ListResponse<NewsArticle>>(`/api/news${buildQuery(params)}`),
  });
}

export function useListNotices(params: ListParams = {}) {
  return useQuery({
    queryKey: ["notices", params],
    queryFn: () =>
      fetchJson<ListResponse<Notice>>(`/api/notices${buildQuery(params)}`),
  });
}
