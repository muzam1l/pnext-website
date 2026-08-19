import { Footer, Header } from './chrome';
import './page.css';

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

const STEPS = [
  ['01', 'app/page.tsx and layout.tsx are async Server Components.'],
  ['02', 'Mark client islands with "use client", nothing else.'],
  ['03', 'route.ts handles HTTP. Suspense streams. dynamic({ load: "visible" }) defers offscreen islands.'],
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
          <span class="sticker s1">0 KB JS on server-rendered pages</span>
          <span class="sticker s2">4,400+ Next tests passing</span>
          <span class="sticker s3">7.5 KB whole framework</span>
        </div>

        <h1 class="big display">pnext</h1>
        <p class="tagline">
          A fast{' '}
          <span class="circle-wrap">
            little
            <svg viewBox="0 0 140 70" fill="none" aria-hidden="true">
              <path
                d="M8 40C8 15 40 6 70 6c34 0 62 12 62 30 0 20-32 32-68 32-30 0-58-9-58-24"
                stroke="var(--blue)"
                stroke-width="5"
                stroke-linecap="round"
              />
            </svg>
          </span>{' '}
          framework.
        </p>
        <p class="sub">For server-first React apps, fully compatible with Next.js.</p>
        <div class="actions">
          <a class="btn primary" href="#start">
            Getting started
          </a>
          <a class="btn secondary" href="/benchmarks">
            View the performance benchmarks
          </a>
        </div>
      </section>

      <section class="wash-sun" aria-labelledby="evidence-h">
        <div class="wrap">
          <h2 id="evidence-h">The numbers, not the adjectives</h2>
          <p class="lede">
            Server-rendered pages ship no JavaScript at all. Interactive ones stay small because pnext hydrates on
            Preact, not React.
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
          <div class="code-block">
            <span class="comment"># new app</span>
            <br />
            <span class="prompt">$</span> bunx @wular/pnext create my-app
            <br />
            <br />
            <span class="comment"># or migrate an existing Next.js app in place</span>
            <br />
            <span class="prompt">$</span> bunx @wular/pnext migrate
          </div>
          <p class="lede" style={{ marginBottom: 0 }}>
            Migrate rewrites your scripts and config, scans your source, and reports anything worth a look. It never
            edits your code.
          </p>
          <div class="steps">
            {STEPS.map(([n, text]) => (
              <div class="step" key={n}>
                <span class="n">{n}</span>
                {text}
              </div>
            ))}
          </div>
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

      <Footer />
    </>
  );
}
