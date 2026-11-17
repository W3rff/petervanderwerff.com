import { serverSupabaseClient } from '#supabase/server';
import { setRange } from '~~/server/utils';
import type { ApiListResponse, ProjectSummary } from '#shared/types/api';

export default eventHandler(async (event): Promise<ApiListResponse<ProjectSummary>> => {
  const client = await serverSupabaseClient(event);
  const { start, end } = setRange(event, 10);

  return await client
    .from('pages')
    .select('title, tags, slug, image', { count: 'exact' })
    .eq('type', 'project')
    .order('sort')
    .range(start, end);
});
