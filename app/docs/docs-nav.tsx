'use client';

import { useState } from 'preact/hooks';
import type { DocEntry } from './reference';

export function DocsNav({ docs, current }: { docs: DocEntry[]; current: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav class={open ? 'docs-nav open' : 'docs-nav'} aria-label="Docs">
      <button
        type="button"
        class="docs-nav-fab"
        aria-expanded={open}
        aria-controls="docs-nav-panel"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕ close' : '☰ docs'}
      </button>
      <div
        id="docs-nav-panel"
        class="docs-nav-panel"
        onClick={event => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
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
      </div>
    </nav>
  );
}
