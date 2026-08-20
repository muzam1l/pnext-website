import { Link } from '@wular/pnext/link'
import { ThemeToggle } from './theme-toggle'

/** Add nav links here; each renders as a chip, left of the theme toggle. */
const NAV_LINKS = [
  { label: 'docs', href: '/docs' },
  { label: 'benchmarks', href: '/benchmarks' },
  { label: 'github', href: 'https://github.com/muzam1l/pnext', external: true },
]

export function Header() {
  return (
    <header class="site">
      <div class="nav">
        <Link className="wordmark" href="/" prefetch="visible">
          pnext
        </Link>
        <nav class="right" aria-label="Main">
          <ul class="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                {link.external ? (
                  <a class="chip" href={link.href} target="_blank" rel="noreferrer noopener">
                    {link.label}
                  </a>
                ) : (
                  <Link
                    className="chip"
                    href={link.href as '/docs' | '/benchmarks'}
                    prefetch="visible"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
