import type { ComponentChildren } from 'preact';
import { Header } from '../chrome';
import type { DocEntry } from './reference';
import './docs.css';

export function DocsShell({ docs, current, children }: { docs: DocEntry[]; current: string; children: ComponentChildren }) {
  return (
    <>
      <Header />
      <main class="docs">
        <div class="wrap docs-shell">
          <nav class="docs-nav" aria-label="Docs">
            <ul>
              {docs.map(doc => (
                <li key={doc.slug}>
                  <a
                    href={doc.slug === 'overview' ? '/docs' : `/docs/${doc.slug}`}
                    class={doc.slug === current ? 'active' : undefined}
                    aria-current={doc.slug === current ? 'page' : undefined}
                  >
                    {doc.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div class="docs-content">{children}</div>
        </div>
      </main>
    </>
  );
}
