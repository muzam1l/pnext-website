// bench/bench-matrix.ts emits reference/data/bench.json; it is copy-pasted into pnext/reference/data per run.
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export type Category = 'dev' | 'build' | 'memory' | 'payload'
export type Phase = 'cold' | 'warm' | 'static'

export type Metric = {
  id: string
  label: string
  category: Category
  phase: Phase
  /** [pnext value, pnext display, Next.js value, Next.js display, ratio (Next ÷ pnext)] */
  hello?: Row
  ssr?: Row
  dashboard?: Row
}

type Row = [number, string, number, string, number]

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'dev', label: 'Dev' },
  { id: 'build', label: 'Production' },
  { id: 'memory', label: 'Memory' },
  { id: 'payload', label: 'Payload' },
]

export const PHASES: { id: Phase; label: string }[] = [
  { id: 'cold', label: 'Cold' },
  { id: 'warm', label: 'Warm' },
]

const CANDIDATES = [
  'node_modules/@wular/pnext/reference/data/bench.json',
  'pnext/reference/data/bench.json',
  '../pnext/reference/data/bench.json',
]

function benchDataFile() {
  let dir = process.cwd()
  for (let up = 0; up < 6; up += 1) {
    for (const candidate of CANDIDATES) {
      const full = path.resolve(dir, candidate)
      if (existsSync(full)) return full
    }
    dir = path.dirname(dir)
  }
  throw new Error('Could not locate @wular/pnext reference/data/bench.json')
}

type Row5 = [number, string, number, string, number]

type BenchJson = {
  run: { date: string; machine: string; bun: string; next: string; runs: string }
  fixtures: { id: FixtureId; label: string; blurb: string }[]
  metrics: {
    id: string
    label: string
    category: Category
    phase: Phase
    rows: Partial<Record<FixtureId, Row5>>
  }[]
  headlines: {
    label: string
    value: string
    direction: 'faster' | 'less' | 'smaller'
    detail?: string
  }[]
  clientRuntimes: { name: string; raw: string; gzip: string; brotli: string }[]
}

export type FixtureId = 'hello' | 'ssr' | 'dashboard'

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Malformed bench.json: ${message}`)
}

function validate(data: unknown): asserts data is BenchJson {
  assert(data && typeof data === 'object', 'root must be an object')
  const d = data as Record<string, unknown>
  assert(d.run && typeof d.run === 'object', 'missing "run"')
  assert(Array.isArray(d.fixtures) && d.fixtures.length > 0, 'missing "fixtures" array')
  assert(Array.isArray(d.metrics) && d.metrics.length > 0, 'missing "metrics" array')
  assert(Array.isArray(d.headlines) && d.headlines.length > 0, 'missing "headlines" array')
  assert(Array.isArray(d.clientRuntimes), 'missing "clientRuntimes" array')
  for (const metric of d.metrics as Record<string, unknown>[]) {
    assert(
      typeof metric.id === 'string' && typeof metric.label === 'string',
      `metric missing id/label`,
    )
    assert(metric.rows && typeof metric.rows === 'object', `metric "${metric.id}" missing "rows"`)
    for (const [fixtureId, row] of Object.entries(metric.rows as Record<string, unknown>)) {
      assert(
        Array.isArray(row) && row.length === 5,
        `metric "${metric.id}" row "${fixtureId}" must be a 5-tuple`,
      )
    }
  }
}

function loadBenchData(): BenchJson {
  const file = benchDataFile()
  const raw = readFileSync(file, 'utf8')
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    throw new Error(`Malformed bench.json at ${file}: not valid JSON (${(err as Error).message})`)
  }
  validate(parsed)
  return parsed
}

const DATA = loadBenchData()

export const FIXTURES = DATA.fixtures as { id: FixtureId; label: string; blurb: string }[]

export const METRICS: Metric[] = DATA.metrics.map(metric => ({
  id: metric.id,
  label: metric.label,
  category: metric.category,
  phase: metric.phase,
  ...metric.rows,
}))

/** The doc's summary table: ranges across all three fixtures. */
export const HEADLINES = DATA.headlines.map(h => ({
  label: h.label,
  value: h.value,
  note: h.detail ? `${h.direction} — ${h.detail}` : h.direction,
}))

export const RUN = DATA.run

export const CLIENT_RUNTIMES = DATA.clientRuntimes
