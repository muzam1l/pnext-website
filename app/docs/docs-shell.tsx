import type { ComponentChildren } from 'preact';
import { Header } from '../chrome';
import { DocsNav } from './docs-nav';
import type { DocEntry } from './reference';
import './docs.css';

export function DocsShell({ docs, current, children }: { docs: DocEntry[]; current: string; children: ComponentChildren }) {
  return (
    <>
      <Header />
      <main class="docs">
        <div class="wrap docs-shell">
          <DocsNav docs={docs} current={current} />
          <div class="docs-content">{children}</div>
        </div>
      </main>
    </>
  );
}
