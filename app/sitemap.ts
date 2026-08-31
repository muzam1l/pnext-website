import { listDocs } from './docs/reference'

const BASE = 'https://pnext.dev'

export default async function sitemap() {
  const docs = await listDocs()
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/docs`, priority: 0.9 },
    { url: `${BASE}/benchmarks`, priority: 0.8 },
    ...docs
      .filter(doc => doc.slug !== 'getting-started')
      .map(doc => ({ url: `${BASE}/docs/${doc.slug}`, priority: 0.7 })),
  ]
}
