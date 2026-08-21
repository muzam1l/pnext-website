import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { marked } from 'marked'

/** Curated reading order; anything else lands after it, alphabetically. */
const ORDER = [
  'getting-started',
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
]

const CANDIDATES = ['node_modules/@wular/pnext/reference', 'pnext/reference', '../pnext/reference']

function referenceDir() {
  let dir = process.cwd()
  for (let up = 0; up < 6; up += 1) {
    for (const candidate of CANDIDATES) {
      const full = path.resolve(dir, candidate)
      if (existsSync(full)) return full
    }
    dir = path.dirname(dir)
  }
  throw new Error('Could not locate the @wular/pnext reference docs')
}

export type DocEntry = { slug: string; title: string; description: string }

export async function listDocs(): Promise<DocEntry[]> {
  const dir = referenceDir()
  const files = (await readdir(dir)).filter(file => file.endsWith('.md'))
  const entries = await Promise.all(
    files.map(async file => {
      const slug = file.slice(0, -3)
      const source = await readFile(path.join(dir, file), 'utf8')
      return { slug, title: titleOf(source, slug), description: descriptionOf(source) }
    }),
  )
  return entries.sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug))
}

export async function readDoc(slug: string): Promise<{ title: string; html: string } | undefined> {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined
  const file = path.join(referenceDir(), `${slug}.md`)
  if (!existsSync(file)) return undefined
  const source = await readFile(file, 'utf8')
  return {
    title: titleOf(source, slug),
    html: tabify(rewriteLinks(addHeadingIds(await marked.parse(source)))),
  }
}

// marked no longer emits heading ids; add GitHub-style slugs so #hash links land
function addHeadingIds(html: string) {
  const seen = new Map<string, number>()
  return html.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (_m, level, inner: string) => {
    let slug = inner
      .replace(/<[^>]+>/g, '')
      .toLowerCase()
      .replace(/&[a-z]+;|[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    const count = seen.get(slug) ?? 0
    seen.set(slug, count + 1)
    if (count) slug = `${slug}-${count}`
    return `<h${level} id="${slug}">${inner}</h${level}>`
  })
}

// <!-- tabs:start -->…<!-- tabs:end --> groups its h2 sections into tabs.
// The markers are invisible on GitHub/npm, where the sections render sequentially.
function tabify(html: string) {
  return html.replace(
    /<!--\s*tabs:start\s*-->([\s\S]*?)<!--\s*tabs:end\s*-->/g,
    (_m, inner: string) => {
      const parts = inner.split(/<h2[^>]*>(.*?)<\/h2>/)
      const labels: string[] = []
      const panels: string[] = []
      for (let i = 1; i < parts.length; i += 2) {
        labels.push(parts[i] ?? '')
        panels.push(parts[i + 1] ?? '')
      }
      if (!labels.length) return inner
      const tabs = labels
        .map(
          (label, i) =>
            `<button type="button" role="tab" aria-selected="${i === 0}" data-tab="${i}">${label}</button>`,
        )
        .join('')
      const sections = panels
        .map((panel, i) => `<div role="tabpanel" data-panel="${i}">${panel}</div>`)
        .join('')
      return `<div class="md-tabs" data-active="0"><div role="tablist">${tabs}</div>${sections}</div>`
    },
  )
}

function rank(slug: string) {
  const index = ORDER.indexOf(slug)
  return index === -1 ? ORDER.length : index
}

function titleOf(source: string, slug: string) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? slug
}

// First real prose paragraph, trimmed to one sentence, for the docs index cards.
function descriptionOf(source: string) {
  const paragraph = source
    .replace(/^#.*$/gm, '')
    .split(/\n\s*\n/)
    .map(part => part.trim())
    .find(part => part && !/^(```|[-*>|]|\d+\.)/.test(part))
    ?.replace(/\n/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  if (!paragraph) return ''
  const sentence = paragraph.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? paragraph
  return sentence.length > 160 ? `${sentence.slice(0, 157).trimEnd()}…` : sentence
}

// ./routing.md#segments -> /docs/routing#segments, wired for the pnext client router
function rewriteLinks(html: string) {
  return html
    .replace(
      /href="(?:\.\/)?([a-z0-9-]+)\.md(#[^"]*)?"/g,
      (_m, slug, hash) => `href="/docs/${slug}${hash ?? ''}"`,
    )
    .replace(
      /<a ([^>]*?)href="(\/(?!\/)[^"]*)"/g,
      (_m, attrs, href) =>
        `<a ${attrs}href="${href}" data-pnext-link="true" data-prefetch="visible"`,
    )
}
