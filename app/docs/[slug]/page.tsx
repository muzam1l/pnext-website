import type { Metadata } from '@wular/pnext';
import { notFound } from '@wular/pnext/navigation';
import type { PageProps, StaticParams } from '#gen/app/docs/[slug]/page';
import { Footer, Header } from '../../chrome';
import { listDocs, readDoc } from '../reference';
import '../docs.css';

// Core metadata is build-time and param-free, so the per-doc title lives in the <h1>.
export const metadata: Metadata = {
  title: 'Reference',
  description: 'A page of the pnext reference documentation.',
};

export function params(): StaticParams {
  return listDocs().then(docs => docs.map(doc => ({ slug: doc.slug })));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await readDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <Header />
      <main class="docs">
        <div class="wrap">
          <a class="eyebrow" href="/docs">
            ← all docs
          </a>
          <article class="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
