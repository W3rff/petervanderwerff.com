import { serverSupabaseClient } from '#supabase/server';
import type { ApiListResponse, ConfigItem } from '#shared/types/api';

export default eventHandler(async (event): Promise<ApiListResponse<ConfigItem>> => {
  const client = await serverSupabaseClient(event);
  return await client.from('configs').select('id, key, value', { count: 'exact' }).order('id');
});
