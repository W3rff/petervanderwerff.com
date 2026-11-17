function buildSitemap(origin: string) {
  return `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${origin}/sitemap-pages.xml</loc>
    </sitemap>
</sitemapindex>`;
}

export default defineEventHandler((event) => {
  const { origin } = getRequestURL(event);

  event.node.res.setHeader('content-type', 'text/xml');

  return buildSitemap(origin);
});
