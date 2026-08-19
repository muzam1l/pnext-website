import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

/** Curated reading order; anything else lands after it, alphabetically. */
const ORDER = [
  'overview',
  'dev',
  'routing',
  'navigation',
  'rendering',
  'metadata',
  'css',
  'env',
  'config',
  'typegen',
  'compat',
  'performance',
];

const CANDIDATES = ['node_modules/@wular/pnext/reference', 'pnext/reference', '../pnext/reference'];

function referenceDir() {
  let dir = process.cwd();
  for (let up = 0; up < 6; up += 1) {
    for (const candidate of CANDIDATES) {
      const full = path.resolve(dir, candidate);
      if (existsSync(full)) return full;
    }
    dir = path.dirname(dir);
  }
  throw new Error('Could not locate the @wular/pnext reference docs');
}

export type DocEntry = { slug: string; title: string };

export async function listDocs(): Promise<DocEntry[]> {
  const dir = referenceDir();
  const files = (await readdir(dir)).filter(file => file.endsWith('.md'));
  const entries = await Promise.all(
    files.map(async file => {
      const slug = file.slice(0, -3);
      return { slug, title: titleOf(await readFile(path.join(dir, file), 'utf8'), slug) };
    }),
  );
  return entries.sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
}

export async function readDoc(slug: string): Promise<{ title: string; html: string } | undefined> {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = path.join(referenceDir(), `${slug}.md`);
  if (!existsSync(file)) return undefined;
  const source = await readFile(file, 'utf8');
  return { title: titleOf(source, slug), html: rewriteLinks(await marked.parse(source)) };
}

function rank(slug: string) {
  const index = ORDER.indexOf(slug);
  return index === -1 ? ORDER.length : index;
}

function titleOf(source: string, slug: string) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug;
}

// ./routing.md#segments -> /docs/routing#segments
function rewriteLinks(html: string) {
  return html.replace(/href="(?:\.\/)?([a-z0-9-]+)\.md(#[^"]*)?"/g, (_m, slug, hash) => `href="/docs/${slug}${hash ?? ''}"`);
}
