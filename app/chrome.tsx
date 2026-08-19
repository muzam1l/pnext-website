import { ThemeToggle } from './theme-toggle';

/** Add nav links here; each renders as a chip, left of the theme toggle. */
const NAV_LINKS = [
  { label: 'docs', href: '/docs' },
  { label: 'benchmarks', href: '/benchmarks' },
  { label: 'github', href: 'https://github.com/muzam1l/pnext', external: true },
];

export function Header() {
  return (
    <header class="site">
      <div class="nav">
        <a class="wordmark" href="/">
          pnext
        </a>
        <nav class="right" aria-label="Main">
          <ul class="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a class="chip" href={link.href} {...(link.external ? { rel: 'noreferrer noopener' } : {})}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <span class="wordmark">pnext</span>
      A fast little framework for server-first React apps, fully compatible with Next.js.
    </footer>
  );
}
