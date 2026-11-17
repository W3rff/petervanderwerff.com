import { serverSupabaseClient } from '#supabase/server';
import type { ApiDetailResponse, ContentItem, PageDetail } from '#shared/types/api';
import type { Json } from '~/types/database.types';

interface PageContentRow {
  content: {
    properties: Json | null;
    content_types: { template: string | null } | null;
  } | null;
}

function formatRoute(item: PageContentRow): ContentItem {
  const template = item.content?.content_types?.template ?? '';
  const properties = item.content?.properties;
  return { properties, template };
}

export default eventHandler(async (event): Promise<ApiDetailResponse<PageDetail> | null> => {
  const client = await serverSupabaseClient(event);
  const slug = event.context.params?.slug ?? '';

  const { data } = await client
    .from('pages')
    .select('id, image, tags, slug, title, meta')
    .eq('type', 'project')
    .eq('slug', slug)
    .single();
  if (!data?.id) {
    return null;
  }

  const { id: pageId, ...page } = data;

  const { data: rows } = await client
    .from('pages_content')
    .select(
      `
      content (
        properties,
        content_types(template)
      )
    `,
    )
    .eq('page_id', pageId)

    .order('sort');

  return { data: { ...page, items: rows?.map(formatRoute) } };
});
