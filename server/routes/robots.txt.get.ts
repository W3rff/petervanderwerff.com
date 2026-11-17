function buildSitemap(origin: string) {
  return `User-agent: *
Disallow: 

Sitemap: ${origin}/sitemap.xml`;
}

export default defineEventHandler((event) => {
  const { origin } = getRequestURL(event);

  event.node.res.setHeader('content-type', 'text/plain');

  return buildSitemap(origin);
});
