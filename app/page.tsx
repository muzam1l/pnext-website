import { dynamic } from '@wular/pnext/dynamic';
import { Header } from './chrome';
import './page.css';

const CopyCode = dynamic(() => import('./copy-code').then(m => m.CopyCode), {
  load: 'visible',
  ssr: true,
});

const BADGES = [
  ['0 KB', 'JavaScript shipped on server-rendered pages'],
  ['~1 KB gzip', 'adds client-side navigation and prefetching'],
  ['7.5 KB', 'whole framework, hydrating on Preact'],
  ['12.5 KB', 'with full React compatibility included'],
  ['11–13.5x', 'faster first page render than Next.js in dev'],
  ['3.4–3.8x', 'less memory used in dev than Next.js'],
  ['7–10.5x', 'faster production builds than Next.js'],
  ['4,400+', "assertions passing from Next.js's own App Router test suite"],
];

const RUNGS = [
  ['core pnext', 'Pure Preact. The smallest, fastest rung.'],
  ['compat.react', 'Runs React components and libraries as-is.'],
  ['compat.next', 'Runs a whole Next.js App Router app, unchanged.'],
];

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

        <h1 class="big display">pnext</h1>
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
          <a class="btn primary" href="#start">
            Getting started
          </a>
          <a class="btn secondary" href="/benchmarks">
            Performance benchmarks
          </a>
        </div>
      </section>

      <section class="wash-sun" aria-labelledby="evidence-h">
        <div class="wrap">
          <h2 id="evidence-h">The numbers, not the adjectives</h2>
          <p class="lede">
            Incremental by design: server-rendered pages ship no JavaScript at all, and you pay only for the islands
            you hydrate — on Preact, not React.
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
          <p class="lede">No config to read first. Create an app, or point pnext at one you already have.</p>
          <CopyCode />
          <p class="lede" style={{ marginBottom: 0 }}>
            Migrate rewrites your scripts and config, scans your source, and reports anything worth a look. It never
            edits your code.
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
  );
}
