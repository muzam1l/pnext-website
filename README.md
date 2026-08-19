# pnext.dev

The official website for [pnext](https://pnext.dev), a fast little framework for server-first React apps, fully compatible with Next.js.

The site is itself a pnext app on **core pnext**, and it practices what the landing page preaches:

- Every page is an async Server Component. The landing page, the docs, and the benchmark tables all render to plain HTML with **0 KB** of page JavaScript.
- The whole site is a static `pnext build`. No server, no functions, just files.
- There are exactly two client islands: the theme toggle and the benchmark filters, each about a kilobyte. The copy-to-clipboard block uses `dynamic({ load: 'visible' })`, so even that JS only loads when it scrolls into view.
- Light and dark are one design, recolored with CSS tokens. The island applies your stored preference.

## Where the content comes from

- **Docs** (`/docs/*`) are rendered server-side from the markdown that ships inside `@wular/pnext` (`reference/*.md`). Slugs are discovered from the filesystem and prerendered, so the site never duplicates documentation.
- **Benchmarks** (`/benchmarks`) read `reference/data/bench.json`, which the workspace bench harness emits per run. Numbers on the site and in the reference are always the same published run, including the metrics where Next.js is ahead.

## Develop

```sh
bun install
bun dev
```

Plus the usual `build`, `start`, `typecheck`, and `analyze` scripts.

## Deploy

`bun run build` emits the static site to `.pnext/public`. `vercel.json` is preconfigured for it (when deploying from the monorepo, set the Vercel Root Directory to `website`). Any static host with clean URLs works just as well.
