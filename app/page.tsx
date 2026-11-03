import { dynamic } from '@wular/pnext/dynamic'
import { Link } from '@wular/pnext/link'
import { Header } from './chrome'
import './page.css'

const CopyCode = dynamic(() => import('./copy-code').then(m => m.CopyCode), {
  load: 'visible',
  ssr: true,
})

// Rounded by hand for display; exact per-cell numbers live on /benchmarks
// (reference/data/bench.json). Keep in sync when requoting a bench run.
const BADGES = [
  ['0 KB', 'JavaScript shipped on server-rendered pages'],
  ['~1.3 KB gzip', 'adds client-side navigation, its runtime loads on idle'],
  ['8.5 KB', 'whole framework at first paint, hydrating on Preact'],
  ['15 KB', 'with full React compatibility included'],
  ['5-16x', 'faster first page render than Next.js in dev'],
  ['3-4x', 'less memory used in dev than Next.js'],
  ['6-16x', 'faster production builds than Next.js'],
  ['5,900+', "assertions passing from Next.js 16.4.3's own test suite"],
]

const RUNGS = [
  ['core pnext', 'Pure Preact. The smallest, fastest rung.'],
  ['compat.react', 'Runs React components and libraries as-is.'],
  ['compat.next', 'Runs a whole Next.js App Router app, unchanged.'],
]

export default function Home() {
  return (
    <>
      <Header />

      <section class="hero">
        <div class="stickers">
          <span class="sticker s1">super fast dev</span>
          <span class="sticker s2">100% compatible with Next.js App Router</span>
          <span class="sticker s3">instant production builds</span>
        </div>

        <h1 class="big display">
          <span class="logo-tile">p</span>next
        </h1>
        <p class="tagline">
          A{' '}
          <span class="circle-wrap">
            fast
            <svg viewBox="0 0 140 70" fill="none" aria-hidden="true">
              <path
                d="M8 40C8 15 40 6 70 6c34 0 62 12 62 30 0 20-32 32-68 32-30 0-58-9-58-24"
                stroke="var(--blue)"
                stroke-width="5"
                stroke-linecap="round"
              />
            </svg>
          </span>{' '}
          little framework for server-first React apps, fully compatible with Next.js.
        </p>
        <div class="actions">
          <Link href="/docs" className="btn primary">
            Getting started
          </Link>
          <Link href="/benchmarks" className="btn secondary">
            Performance benchmarks
          </Link>
        </div>
      </section>

      <section class="wash-sun" aria-labelledby="evidence-h">
        <div class="wrap">
          <h2 id="evidence-h">The numbers, not the adjectives</h2>
          <p class="lede">
            Incremental by design: you can start with no JavaScript at all and pay only for the
            features you add, including React and Next.js compatibility.
          </p>
          <div class="badge-grid">
            {BADGES.map(([num, desc]) => (
              <div class="badge" key={num}>
                <span class="num">{num}</span>
                <span class="desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" aria-labelledby="start-h">
        <div class="wrap">
          <h2 id="start-h">Start in one line</h2>
          <p class="lede">Create an app, or point pnext at one you already have.</p>
          <CopyCode command="bunx @wular/pnext@latest create my-app" comment="# new app" />
          <CopyCode
            command="bunx @wular/pnext@latest migrate"
            comment="# or migrate an existing Next.js app in place"
          />
          <p class="lede" style={{ marginBottom: 0 }}>
            Migrate rewrites your scripts and config, scans your source, and reports anything worth
            a look. It never edits your code. Full walkthrough in{' '}
            <Link href="/docs">Getting Started</Link>.
          </p>
        </div>
      </section>

      <section id="ladder" class="wash-blue" aria-labelledby="ladder-h">
        <div class="wrap">
          <h2 id="ladder-h">Climb the compat ladder</h2>
          <p class="lede">Start wherever your app already is. Move up only when it suits you.</p>
          <div class="ladder">
            {RUNGS.map(([tag, text], i) => (
              <>
                {i > 0 && <div class="arrow">↑</div>}
                <div class="rung" key={tag}>
                  <span class="tag">{tag}</span>
                  <p>{text}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
