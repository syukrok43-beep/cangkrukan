import { getCollection } from 'astro:content';

export async function GET() {
  const artikel = await getCollection('berita');
  
  const duaHariLalu = new Date();
  duaHariLalu.setDate(duaHariLalu.getDate() - 2);
  
  const artikelBaru = artikel.filter((post) => post.data.date >= duaHariLalu);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${artikelBaru.map((post) => `
  <url>
    <loc>https://cangkrukan.pages.dev/berita/${post.id}/</loc>
    <news:news>
      <news:publication>
        <news:name>Cangkrukan</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${post.data.date.toISOString()}</news:publication_date>
      <news:title>${post.data.title}</news:title>
    </news:news>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
