# pnext.dev

The official website for [pnext](https://pnext.dev) — a fast little framework for server-first React apps, fully compatible with Next.js.

It is itself a pnext app, on **core pnext** (pure Preact, no `compat.react` or `compat.next`). Every page is a Server Component and the whole site builds to static HTML. The only client island is the dark/light theme toggle.

## Pages

- `/` — the landing page.
- `/docs` — index of the reference documentation.
- `/docs/<slug>` — a reference page, rendered server-side from the markdown that ships in the `@wular/pnext` package (`node_modules/@wular/pnext/reference/*.md`). Slugs are discovered from the filesystem and prerendered via `params()`, so no docs are duplicated here.

## Develop

```sh
bun install
bun dev          # http://localhost:3000
```

Other scripts:

```sh
bun run build      # static build into .pnext/public
bun run start      # serve the production build
bun run typecheck  # pnext typegen && tsc --noEmit
bun run analyze    # inspect a route's bundle
```

## The pnext dependency

In the pnext monorepo this package depends on `"@wular/pnext": "workspace:*"` so the site always runs against the local framework checkout. Building this repo standalone resolves the published package from npm instead — pin it in `package.json`:

```json
"devDependencies": { "@wular/pnext": "^0.0.2" }
```

The docs pages read their markdown from whichever copy is resolved, so a standalone build documents the published version.

## Deploy

The build is fully static — no server function is needed.

```sh
bun run build   # -> .pnext/public
```

`vercel.json` configures Vercel for that output (`outputDirectory: .pnext/public`, `cleanUrls: true`). Deploying from within the monorepo additionally needs the project's **Root Directory** set to `website`; as a standalone repo it is already the root. The `pnext.dev` domain and its DNS are configured in the Vercel dashboard.

Any static host works: serve `.pnext/public` and enable clean URLs.

## License

The pnext project does not currently declare a license. This site inherits whatever pnext settles on — add a `LICENSE` file here to match once it does.
