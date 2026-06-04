import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve('.');
const nextIndexPath = path.join(projectRoot, '.next', 'server', 'app', 'index.html');
const sitemapModulePath = path.join(projectRoot, 'src', 'app', 'sitemap.js');

function extractJsonLd(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
  const matches = []
  let m
  while ((m = re.exec(html)) !== null) {
    matches.push(m[1])
  }
  return matches
}

async function run() {
  console.log('SEO Validation Script')

  // JSON-LD extraction
  if (!fs.existsSync(nextIndexPath)) {
    console.error('.next server index.html not found at', nextIndexPath)
  } else {
    const html = fs.readFileSync(nextIndexPath, 'utf8')
    const scripts = extractJsonLd(html)
    console.log('\nFound', scripts.length, 'JSON-LD <script> blocks in .next server index.html')
    scripts.forEach((s, i) => {
      try {
        const parsed = JSON.parse(s)
        console.log(`\n[JSON-LD #${i+1}] valid JSON — top-level type:`, Array.isArray(parsed) ? 'Array' : typeof parsed)
        // basic checks
        if (parsed['@context'] || (Array.isArray(parsed) && parsed[0] && parsed[0]['@context'])) {
          console.log('[JSON-LD #' + (i+1) + '] contains @context')
        } else {
          console.warn('[JSON-LD #' + (i+1) + '] MISSING @context')
        }
      } catch (err) {
        console.error(`\n[JSON-LD #${i+1}] INVALID JSON:`, err.message)
      }
    })
  }

  // Sitemap preview by importing sitemap.js
  if (!fs.existsSync(sitemapModulePath)) {
    console.error('sitemap.js not found at', sitemapModulePath)
    return
  }

  try {
    const fullPath = 'file://' + path.join(projectRoot, 'src', 'app', 'sitemap.js')
    const mod = await import(fullPath)
    const sitemapFn = mod.default
    if (typeof sitemapFn !== 'function') {
      console.error('sitemap.js default export is not a function')
      return
    }
    const entries = sitemapFn()
    console.log('\nSitemap function produced', entries.length, 'entries')
    // Basic XML generation for preview
    const urlset = []
    urlset.push('<?xml version="1.0" encoding="UTF-8"?>')
    urlset.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')
    for (const e of entries) {
      urlset.push('  <url>')
      urlset.push(`    <loc>${e.url}</loc>`)
      if (e.lastModified) urlset.push(`    <lastmod>${new Date(e.lastModified).toISOString().split('T')[0]}</lastmod>`)
      if (e.changeFrequency) urlset.push(`    <changefreq>${e.changeFrequency}</changefreq>`)
      if (typeof e.priority !== 'undefined') urlset.push(`    <priority>${e.priority}</priority>`)
      if (e.alternates && Array.isArray(e.alternates)) {
        for (const a of e.alternates) {
          urlset.push(`    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.url}" />`)
        }
      }
      if (e.images && Array.isArray(e.images)) {
        for (const img of e.images) {
          urlset.push('    <image:image>')
          urlset.push(`      <image:loc>${img.url}</image:loc>`)
          if (img.alt) urlset.push(`      <image:caption>${img.alt}</image:caption>`)
          urlset.push('    </image:image>')
        }
      }
      urlset.push('  </url>')
    }
    urlset.push('</urlset>')
    const xml = urlset.join('\n')
    console.log('\nSitemap XML Preview:\n')
    console.log(xml)
  } catch (err) {
    console.error('Error importing or running sitemap.js:', err)
  }
}

run()
