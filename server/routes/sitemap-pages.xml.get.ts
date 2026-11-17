import { serverSupabaseClient } from '#supabase/server';
import type { EventHandlerRequest, H3Event } from 'h3';

function buildSitemap(pages: { route: string; date: string }[] | undefined) {
  const formattedPages =
    pages?.map(({ route, date }) => {
      return `<url>
    <loc>${route}</loc>
    <lastmod>${date}</lastmod>
  </url>`;
    }) ?? [];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${formattedPages.join()}
</urlset>`;
}

async function getPages(event: H3Event<EventHandlerRequest>) {
  const client = await serverSupabaseClient(event);
  const { origin } = getRequestURL(event);
  const { data } = await client.from('pages').select('slug, updated_at').eq('type', 'page');
  return data
    ?.filter((page): page is { slug: string; updated_at: string } => page.slug !== null && page.updated_at !== null)
    .map(({ slug, updated_at }) => {
      const path = slug === 'home' ? '' : `/${slug}`;
      const route = `${origin}${path}`;
      const date = new Date(updated_at).toLocaleDateString('en-CA');
      return {
        route,
        date,
      };
    });
}

export default defineEventHandler(async (event) => {
  const pages = await getPages(event);
  event.node.res.setHeader('content-type', 'text/xml');

  return buildSitemap(pages);
});
