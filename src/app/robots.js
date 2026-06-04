const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osamah-alaini.vercel.app'
const siteUrl = rawSiteUrl.replace(/\/$/, '')

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}