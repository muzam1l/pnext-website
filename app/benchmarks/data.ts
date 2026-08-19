// Every number here is transcribed from pnext/reference/performance.md (run dated 2026-08-19).
// Nothing is derived or estimated. Display strings keep the doc's own precision.

export type Category = 'dev' | 'build' | 'memory' | 'payload';
export type Phase = 'cold' | 'warm' | 'static';

export type Metric = {
  id: string;
  label: string;
  category: Category;
  phase: Phase;
  /** [pnext value, pnext display, Next.js value, Next.js display, ratio (Next ÷ pnext)] */
  hello?: Row;
  ssr?: Row;
  dashboard?: Row;
};

type Row = [number, string, number, string, number];

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'dev', label: 'Dev' },
  { id: 'build', label: 'Production' },
  { id: 'memory', label: 'Memory' },
  { id: 'payload', label: 'Payload' },
];

export const PHASES: { id: Phase; label: string }[] = [
  { id: 'cold', label: 'Cold' },
  { id: 'warm', label: 'Warm' },
];

export const FIXTURES = [
  { id: 'hello', label: 'hello-world', blurb: 'A single page.' },
  { id: 'ssr', label: 'ssr', blurb: 'A server-rendered site.' },
  { id: 'dashboard', label: 'dashboard', blurb: 'A mid-size admin app — 30 routes, 18 client islands.' },
] as const;

export type FixtureId = (typeof FIXTURES)[number]['id'];

export const METRICS: Metric[] = [
  {
    id: 'dev-ready',
    label: 'Dev server ready',
    category: 'dev',
    phase: 'cold',
    hello: [99.1, '99.1 ms', 259.2, '259.2 ms', 2.62],
    ssr: [108.5, '108.5 ms', 263.4, '263.4 ms', 2.43],
    dashboard: [91.6, '91.6 ms', 328.5, '328.5 ms', 3.58],
  },
  {
    id: 'dev-first-page',
    label: 'Dev first page HTML',
    category: 'dev',
    phase: 'cold',
    hello: [100.2, '100.2 ms', 1349.0, '1349.0 ms', 13.46],
    ssr: [144.9, '144.9 ms', 1571.8, '1571.8 ms', 10.85],
    dashboard: [164.9, '164.9 ms', 1810.8, '1810.8 ms', 10.98],
  },
  {
    id: 'dev-warm',
    label: 'Dev warm request (p50 of 7)',
    category: 'dev',
    phase: 'warm',
    hello: [7.9, '7.9 ms', 19.6, '19.6 ms', 2.48],
    ssr: [44.7, '44.7 ms', 39.5, '39.5 ms', 0.89],
    dashboard: [55.3, '55.3 ms', 46.5, '46.5 ms', 0.84],
  },
  {
    id: 'hmr',
    label: 'HMR save → visible',
    category: 'dev',
    phase: 'warm',
    hello: [23.0, '23.0 ms', 59.9, '59.9 ms', 2.6],
    ssr: [88.8, '88.8 ms', 103.7, '103.7 ms', 1.17],
    dashboard: [143.6, '143.6 ms', 184.8, '184.8 ms', 1.29],
  },
  {
    id: 'build-wall',
    label: 'Production build (wall)',
    category: 'build',
    phase: 'cold',
    hello: [387.9, '387.9 ms', 4072.6, '4072.6 ms', 10.5],
    ssr: [545.6, '545.6 ms', 4077.3, '4077.3 ms', 7.47],
    dashboard: [945.8, '945.8 ms', 6658.0, '6658.0 ms', 7.04],
  },
  {
    id: 'prod-start',
    label: 'Prod start (ready)',
    category: 'build',
    phase: 'cold',
    hello: [141.6, '141.6 ms', 139.5, '139.5 ms', 0.99],
    ssr: [147.2, '147.2 ms', 138.6, '138.6 ms', 0.94],
    dashboard: [103.8, '103.8 ms', 166.3, '166.3 ms', 1.6],
  },
  {
    id: 'prod-warm',
    label: 'Prod warm request (p50 of 7)',
    category: 'build',
    phase: 'warm',
    hello: [0.9, '0.9 ms', 1.5, '1.5 ms', 1.74],
    ssr: [0.9, '0.9 ms', 2.5, '2.5 ms', 2.75],
    dashboard: [0.6, '0.6 ms', 3.9, '3.9 ms', 6.63],
  },
  {
    id: 'dev-rss',
    label: 'Dev server RSS (ready + 7 warm)',
    category: 'memory',
    phase: 'warm',
    hello: [138.0, '138.0 MB', 530.0, '530.0 MB', 3.84],
    ssr: [150.0, '150.0 MB', 550.7, '550.7 MB', 3.67],
    dashboard: [168.8, '168.8 MB', 575.6, '575.6 MB', 3.41],
  },
  {
    id: 'build-rss',
    label: 'Prod build peak RSS',
    category: 'memory',
    phase: 'cold',
    hello: [122.8, '122.8 MB', 464.8, '464.8 MB', 3.79],
    ssr: [130.3, '130.3 MB', 465.7, '465.7 MB', 3.57],
    dashboard: [182.3, '182.3 MB', 549.4, '549.4 MB', 3.01],
  },
  {
    id: 'prod-rss',
    label: 'Prod server RSS (ready + 7 warm)',
    category: 'memory',
    phase: 'warm',
    hello: [112.3, '112.3 MB', 86.0, '86.0 MB', 0.77],
    ssr: [112.5, '112.5 MB', 86.3, '86.3 MB', 0.77],
    dashboard: [112.8, '112.8 MB', 90.9, '90.9 MB', 0.81],
  },
  {
    id: 'install',
    label: 'Framework install size',
    category: 'payload',
    phase: 'static',
    hello: [7.0, '7.0 MB', 420.7, '420.7 MB', 59.76],
    ssr: [7.0, '7.0 MB', 420.7, '420.7 MB', 59.76],
    dashboard: [7.0, '7.0 MB', 420.7, '420.7 MB', 59.76],
  },
  {
    id: 'js-gzip',
    label: 'First-page client JS (gzip)',
    category: 'payload',
    phase: 'static',
    hello: [2.19, '2.19 KB', 141.78, '141.78 KB', 64.73],
    ssr: [16.13, '16.13 KB', 142.03, '142.03 KB', 8.8],
    dashboard: [23.68, '23.68 KB', 144.85, '144.85 KB', 6.12],
  },
  {
    id: 'js-raw',
    label: 'First-page client JS (raw)',
    category: 'payload',
    phase: 'static',
    hello: [4.43, '4.43 KB', 502.47, '502.47 KB', 113.36],
    ssr: [40.37, '40.37 KB', 502.78, '502.78 KB', 12.45],
    dashboard: [63.26, '63.26 KB', 507.42, '507.42 KB', 8.02],
  },
  {
    id: 'js-files',
    label: 'First-page JS files',
    category: 'payload',
    phase: 'static',
    hello: [3, '3', 5, '5', 1.67],
    ssr: [4, '4', 6, '6', 1.5],
    dashboard: [5, '5', 9, '9', 1.8],
  },
  {
    id: 'zero-island',
    label: 'Zero-island route client JS',
    category: 'payload',
    phase: 'static',
    hello: [4.43, '4.43 KB', 502.47, '502.47 KB', 113.36],
    ssr: [4.46, '4.46 KB', 502.47, '502.47 KB', 112.56],
  },
];

/** The doc's summary table: ranges across all three fixtures. */
export const HEADLINES = [
  { label: 'First page, cold', value: '11–13.5×', note: 'faster' },
  { label: 'Production build', value: '7–10.5×', note: 'faster' },
  { label: 'Dev server memory', value: '3.4–3.8×', note: 'less' },
  { label: 'First-page client JS (gzip)', value: '6–65×', note: 'less' },
  { label: 'Dev server ready', value: '2.4–3.6×', note: 'faster' },
  { label: 'Warm request (prod)', value: '1.7–6.6×', note: 'faster' },
  { label: 'HMR save → visible', value: '1.2–2.6×', note: 'faster' },
  { label: 'Framework install size', value: '60×', note: 'smaller — 7.0 MB vs 421 MB' },
];

export const RUN = {
  date: '2026-08-19',
  machine: 'CI — Blacksmith 4 vCPU (AMD EPYC), 16 GB RAM, Ubuntu 22.04 x64',
  bun: '1.3.10',
  next: '16.2.12',
  runs: '5 per metric (first discarded), medians reported',
};

export const CLIENT_RUNTIMES = [
  { name: 'router-prefetch-only', raw: '473 B', gzip: '348 B', brotli: '283 B' },
  { name: 'combined-router-hydrator', raw: '10.47 KB', gzip: '4.47 KB', brotli: '4.07 KB' },
];
