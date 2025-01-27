import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

export async function GET() {
	const url = process.env.CLIENT_URL
	const fields: ISitemapField[] = [
		{
			loc: url,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 1
		},
		{
			loc: `${url}/subscriptions`,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 0.9
		},
		{
			loc: `${url}/support`,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.5
		},
		{
			loc: `${url}/about`,
			lastmod: new Date().toISOString(),
			changefreq: 'daily',
			priority: 0.5
		},
		{
			loc: `${url}/privacy`,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.1
		},
		{
			loc: `${url}/subscription-term`,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.1
		},
		{
			loc: `${url}/support`,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.5
		},
		{
			loc: `${url}/cookie-policy`,
			lastmod: new Date().toISOString(),
			changefreq: 'weekly',
			priority: 0.1
		}
	]
	return getServerSideSitemap(fields)
}
