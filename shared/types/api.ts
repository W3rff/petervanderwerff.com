import type { Json, Tables } from '~/types/database.types';

export interface ApiError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

export interface ApiListResponse<T> {
  data: T[] | null;
  count: number | null;
  error: ApiError | null;
  status: number;
  statusText: string;
}

export interface ApiDetailResponse<T> {
  data: T;
}

export interface ContentItem {
  properties?: Json;
  template: string;
}

export type PageDetail = Pick<Tables<'pages'>, 'slug' | 'title' | 'image' | 'tags' | 'meta'> & {
  items?: ContentItem[];
};

export type ProjectSummary = Pick<Tables<'pages'>, 'slug' | 'title' | 'image' | 'tags'>;

export type ConfigItem = Pick<Tables<'configs'>, 'id' | 'key' | 'value'>;
