import type { Metadata } from '@wular/pnext'
import { Enhance } from './enhance'
import { DocsShell } from './docs-shell'
import { listDocs, readDoc } from './reference'

export const metadata: Metadata = {
  title: 'Docs',
}

export default async function DocsIndex() {
  const [docs, doc] = await Promise.all([listDocs(), readDoc('getting-started')])

  return (
    <DocsShell docs={docs} current="getting-started">
      <article class="prose" dangerouslySetInnerHTML={{ __html: doc?.html ?? '' }} />
      <Enhance />
    </DocsShell>
  )
}
