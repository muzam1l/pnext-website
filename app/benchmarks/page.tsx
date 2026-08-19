import type { Metadata } from '@wular/pnext';
import { Footer, Header } from '../chrome';
import { BenchControls } from './controls';
import { CATEGORIES, CLIENT_RUNTIMES, FIXTURES, HEADLINES, METRICS, PHASES, RUN, type FixtureId } from './data';
import '../docs/docs.css'; // page shell: .docs, .eyebrow, .lede
import './benchmarks.css';

export const metadata: Metadata = {
  title: 'Benchmarks',
  description:
    'pnext vs Next.js on the same source: dev startup, production builds, memory, and client payload, measured by bun bench.',
};

export default function Benchmarks() {
  return (
    <>
      <Header />
      <main class="docs bench-page">
        <div class="wrap">
          <span class="eyebrow">performance</span>
          <h1>Benchmarks</h1>
          <p class="lede">
            The same fixture source runs under both frameworks and <code>bun bench</code> measures them side by side.
            Every number below is one full run's output — no estimates, no best-of cherry-picking.
          </p>

          <ul class="headline-grid">
            {HEADLINES.map(item => (
              <li class="headline" key={item.label}>
                <span class="headline-value">{item.value}</span>
                <span class="headline-note">{item.note}</span>
                <span class="headline-label">{item.label}</span>
              </li>
            ))}
          </ul>
          <p class="headline-caption">
            Ranges span all three fixtures. Absolute numbers per fixture are below.
          </p>

          <div id="bench" class="bench" data-category="all" data-phase="all" data-view="bars">
            <BenchControls categories={CATEGORIES} phases={PHASES} />

            <p class="bench-empty">
              Payload metrics are measured on the built output, so they are neither a cold nor a warm run. Set{' '}
              <strong>Run</strong> back to <strong>All</strong> to see them.
            </p>

            <div class="bench-bars-view">
              {FIXTURES.map(fixture => (
                <section class="bench-group" key={fixture.id} aria-labelledby={`f-${fixture.id}`}>
                  <h2 id={`f-${fixture.id}`}>
                    {fixture.label}
                    <span class="group-blurb">{fixture.blurb}</span>
                  </h2>
                  {rowsFor(fixture.id).map(({ metric, row }) => {
                    const [pnext, pnextText, next, nextText, ratio] = row;
                    const max = Math.max(pnext, next);
                    return (
                      <div class="bench-row" data-cat={metric.category} data-phase={metric.phase} key={metric.id}>
                        <div class="row-head">
                          <span class="row-label">{metric.label}</span>
                          <span class={ratio >= 1 ? 'row-ratio win' : 'row-ratio loss'}>
                            {ratio.toFixed(2)}×{ratio >= 1 ? '' : ' — Next.js ahead'}
                          </span>
                        </div>
                        <Bar name="pnext" width={(pnext / max) * 100} text={pnextText} lead={ratio >= 1} />
                        <Bar name="Next.js" width={(next / max) * 100} text={nextText} lead={ratio < 1} />
                      </div>
                    );
                  })}
                </section>
              ))}
            </div>

            <div class="bench-table-view">
              {FIXTURES.map(fixture => (
                <section class="bench-group" key={fixture.id}>
                  <h2>{fixture.label}</h2>
                  <table class="bench-table">
                    <thead>
                      <tr>
                        <th scope="col">Metric</th>
                        <th scope="col">pnext</th>
                        <th scope="col">Next.js</th>
                        <th scope="col">Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowsFor(fixture.id).map(({ metric, row }) => (
                        <tr class="bench-row" data-cat={metric.category} data-phase={metric.phase} key={metric.id}>
                          <th scope="row">{metric.label}</th>
                          <td>{row[1]}</td>
                          <td>{row[3]}</td>
                          <td class={row[4] >= 1 ? 'win' : 'loss'}>{row[4].toFixed(2)}×</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))}
            </div>
          </div>

          <p class="bench-legend">
            Ratio is Next.js ÷ pnext, so above 1.00× means pnext is ahead. Lower is better for every metric here.
          </p>

          <section class="bench-group">
            <h2>Client runtime bundles</h2>
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
          </section>

          <section class="bench-notes">
            <h2>Method, honestly</h2>
            <ul>
              <li>
                Run of {RUN.date} on {RUN.machine}. Bun {RUN.bun}, Next.js {RUN.next}. {RUN.runs}.
              </li>
              <li>
                Every fixture runs unmodified on both frameworks, so the two columns render the same app from the same
                source.
              </li>
              <li>
                <strong>pnext trails on two metrics.</strong> Dev warm requests degrade with module count (44.7 ms on
                ssr, 55.3 ms on dashboard) and fall behind Next on the two larger fixtures — a known gap under
                investigation. The production server also idles at ~112 MB against Next's ~86–91 MB, which is Bun's
                runtime baseline, while answering warm requests 1.7–6.6× faster.
              </li>
              <li>
                Dev cold start wipes the output directory and stops at the readiness banner; first page HTML is the GET
                that follows, so it includes on-demand compilation.
              </li>
              <li>
                RSS is summed across the whole process tree at one fixed point — after the ready signal and 7 warm
                requests — never sampled at an arbitrary time. Build peak RSS comes from <code>/usr/bin/time</code>{' '}
                wrapping the build.
              </li>
              <li>
                Fixtures enable <code>compat.next</code> so one source tree runs on both frameworks. That ships pnext's
                Next-compat navigation client, which a core pnext app does not carry — the 0 B zero-island budget is a
                core-pnext invariant this suite does not exercise.
              </li>
              <li>
                Full details, targets, and the exact commands are in <a href="/docs/performance">the performance
                reference</a>.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Bar({ name, width, text, lead }: { name: string; width: number; text: string; lead: boolean }) {
  return (
    <div class="bar-line">
      <span class="bar-name">{name}</span>
      <span class="bar-track">
        <span class={lead ? 'bar lead' : 'bar'} style={{ width: `${width.toFixed(1)}%` }} />
      </span>
      <span class="bar-value">{text}</span>
    </div>
  );
}

function rowsFor(fixture: FixtureId) {
  return METRICS.flatMap(metric => {
    const row = metric[fixture];
    return row ? [{ metric, row }] : [];
  });
}
