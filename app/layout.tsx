import type { LayoutProps, Metadata, Viewport } from '@wular/pnext'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://pnext.dev'),
  title: {
    default: 'pnext — a fast little framework',
    template: '%s — pnext',
  },
  description:
    'A fast little framework for server-first React apps, fully compatible with Next.js.',
  openGraph: {
    title: 'pnext — a fast little framework',
    description:
      'A fast little framework for server-first React apps, fully compatible with Next.js.',
    url: 'https://pnext.dev',
    siteName: 'pnext',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'pnext — a fast little framework',
    description:
      'A fast little framework for server-first React apps, fully compatible with Next.js.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
