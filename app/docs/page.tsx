import type { Metadata } from '@wular/pnext'
import { notFound } from '@wular/pnext/navigation'
import { DocsShell } from './docs-shell'
import { listDocs, readDoc } from './reference'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'The pnext reference: routing, rendering, metadata, CSS, config, and compatibility.',
}

export default async function DocsIndex() {
  const [docs, doc] = await Promise.all([listDocs(), readDoc('overview')])
  if (!doc) notFound()

  return (
    <DocsShell docs={docs} current="overview">
      <article class="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
    </DocsShell>
  )
}
