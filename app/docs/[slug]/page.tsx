import type { Metadata } from '@wular/pnext'
import { notFound } from '@wular/pnext/navigation'
import type { PageProps, StaticParams } from '#gen/app/docs/[slug]/page'
import { Enhance } from '../enhance'
import { DocsShell } from '../docs-shell'
import { listDocs, readDoc } from '../reference'

// Core metadata is build-time and param-free, so the per-doc title lives in the <h1>.
export const metadata: Metadata = {
  title: 'Reference',
  description: 'A page of the pnext reference documentation.',
}

export function params(): StaticParams {
  // 'getting-started' is hand-authored at /docs, so it has no [slug] page.
  return listDocs().then(docs =>
    docs.filter(doc => doc.slug !== 'getting-started').map(doc => ({ slug: doc.slug })),
  )
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const [docs, doc] = await Promise.all([listDocs(), readDoc(slug)])
  if (!doc) notFound()

  return (
    <DocsShell docs={docs} current={slug}>
      <article class="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
      <Enhance />
    </DocsShell>
  )
}
