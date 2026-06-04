const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://osamah-alaini.vercel.app'
const siteUrl = rawSiteUrl.replace(/\/$/, '')

export default function sitemap() {
  const now = new Date()
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        {
          url: `${siteUrl}/Osamah.jpg`,
          alt: 'Osamah H. Alaini',
        },
      ],
      alternates: [
        { hreflang: 'en', url: `${siteUrl}/` },
        { hreflang: 'ar', url: `${siteUrl}/?lang=ar` },
      ],
    },
  ]
}