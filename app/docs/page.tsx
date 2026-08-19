import type { Metadata } from '@wular/pnext';
import { Footer, Header } from '../chrome';
import { listDocs } from './reference';
import './docs.css';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'The pnext reference: routing, rendering, metadata, CSS, config, and compatibility.',
};

export default async function DocsIndex() {
  const docs = await listDocs();
  return (
    <>
      <Header />
      <main class="docs">
        <div class="wrap">
          <span class="eyebrow">reference</span>
          <h1>Docs</h1>
          <p class="lede">
            Everything pnext does, one page per topic. Start with the overview, then dip into whatever you need.
          </p>
          <ul class="doc-list">
            {docs.map(doc => (
              <li key={doc.slug}>
                <a href={`/docs/${doc.slug}`}>
                  {doc.title}
                  <span class="slug">/docs/{doc.slug}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
