import type { Metadata } from '@wular/pnext'
import { Header } from '../chrome'
import { BenchControls } from './controls'
import {
  CATEGORIES,
  CLIENT_RUNTIMES,
  FIXTURES,
  HEADLINES,
  METRICS,
  PHASES,
  RUN,
  type FixtureId,
} from './data'
import './benchmarks.css'

export const metadata: Metadata = {
  title: 'Benchmarks',
  description:
    'pnext vs Next.js on the same source: dev startup, production builds, memory, and client payload, measured by bun bench.',
}

export default function Benchmarks() {
  return (
    <>
      <Header />
      <main class="docs bench-page">
        <div class="wrap">
          <span class="eyebrow">performance</span>
          <h1>Benchmarks</h1>
          <p class="lede">
            The same fixture source runs under both frameworks and <code>bun bench</code> measures
            them side by side. Every number below is one full run's output — no estimates, no
            best-of cherry-picking.
          </p>

          <div class="leaderboard">
            <ol class="leaderboard-list">
              {rankedHeadlines(HEADLINES).map(item => (
                <li class="leaderboard-row" key={item.label}>
                  <span class="leaderboard-label">
                    {item.label}
                    {item.detail && <span class="leaderboard-detail"> — {item.detail}</span>}
                  </span>
                  <span class="leaderboard-chip blue">
                    {item.value} {item.direction}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p class="headline-caption">
            Ranges span all three fixtures. Absolute numbers per fixture are below. pnext trails on
            two metrics: dev warm requests on the larger fixtures, and production idle memory (~112
            MB vs Next's ~86–91 MB, Bun's runtime baseline).
          </p>

          <div id="bench" class="bench" data-category="all" data-phase="all">
            <BenchControls categories={CATEGORIES} phases={PHASES} />

            <p class="bench-empty">
              Payload metrics are measured on the built output, so they are neither a cold nor a
              warm run. Set <strong>Run</strong> back to <strong>All</strong> to see them.
            </p>

            <div class="bench-legend-keys">
              <span>
                <span class="legend-swatch pnext" />
                pnext
              </span>
              <span>
                <span class="legend-swatch" />
                Next.js
              </span>
            </div>
            {FIXTURES.map(fixture => (
              <section class="bench-group" key={fixture.id} aria-labelledby={`f-${fixture.id}`}>
                <h2 id={`f-${fixture.id}`}>
                  {fixture.label}
                  <span class="group-blurb">{fixture.blurb}</span>
                </h2>
                <div class="bench-panel">
                  {rowsFor(fixture.id).map(({ metric, row }) => {
                    const [pnext, pnextText, next, nextText, ratio] = row
                    const max = Math.max(pnext, next)
                    return (
                      <div
                        class="bench-row"
                        data-cat={metric.category}
                        data-phase={metric.phase}
                        key={metric.id}
                      >
                        <span class="row-label">{metric.label}</span>
                        <div class="row-meta">
                          <div class="row-bars">
                            <span class="mini-bar-track">
                              <span
                                class="mini-bar pnext"
                                style={{ width: `${((pnext / max) * 100).toFixed(1)}%` }}
                              />
                            </span>
                            <span class="mini-bar-track">
                              <span
                                class="mini-bar"
                                style={{ width: `${((next / max) * 100).toFixed(1)}%` }}
                              />
                            </span>
                          </div>
                          <div class="row-values">
                            <span class="row-value">{pnextText}</span>
                            <span class="row-value">{nextText}</span>
                          </div>
                          <span class={ratio >= 1 ? 'row-ratio win' : 'row-ratio loss'}>
                            {ratio.toFixed(2)}×
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          <p class="bench-legend">
            Ratio is Next.js ÷ pnext, so above 1.00× means pnext is ahead. Lower is better for every
            metric here.
          </p>

          <section class="bench-group">
            <h2>Client runtime bundles</h2>
            <div class="bench-table-wrap">
              <table class="bench-table">
                <thead>
                  <tr>
                    <th scope="col">Runtime</th>
                    <th scope="col">Raw</th>
                    <th scope="col">Gzip</th>
                    <th scope="col">Brotli</th>
                  </tr>
                </thead>
                <tbody>
                  {CLIENT_RUNTIMES.map(runtime => (
                    <tr key={runtime.name}>
                      <th scope="row">{runtime.name}</th>
                      <td>{runtime.raw}</td>
                      <td>{runtime.gzip}</td>
                      <td>{runtime.brotli}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section class="bench-notes">
            <h2>Method</h2>
            <ul>
              <li>
                Run of {RUN.date} on {RUN.machine}. Bun {RUN.bun}, Next.js {RUN.next}. {RUN.runs}.
              </li>
              <li>
                Every fixture runs unmodified on both frameworks (via <code>compat.next</code>),
                same app from the same source.
              </li>
              <li>
                Cold starts include on-demand compilation; memory is measured across the whole
                process tree at a fixed point, never sampled arbitrarily.
              </li>
              <li>
                Full details, targets, and the exact commands are in{' '}
                <a href="/docs/performance">the performance reference</a>.
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

function rankedHeadlines(headlines: typeof HEADLINES) {
  const parsed = headlines.map(item => {
    const [direction, detail] = item.note.includes(' — ')
      ? item.note.split(' — ')
      : [item.note, undefined]
    const bounds = item.value.replace('×', '').split(/[–-]/).map(Number)
    return { ...item, direction, detail, upper: bounds.at(-1) ?? 0 }
  })
  const maxSqrt = Math.sqrt(Math.max(...parsed.map(item => item.upper)))
  return parsed
    .map(item => ({ ...item, pct: (Math.sqrt(item.upper) / maxSqrt) * 100 }))
    .sort((a, b) => b.upper - a.upper)
}

function rowsFor(fixture: FixtureId) {
  return METRICS.flatMap(metric => {
    const row = metric[fixture]
    return row ? [{ metric, row }] : []
  })
}
