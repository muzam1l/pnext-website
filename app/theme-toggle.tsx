'use client';

import { useState } from 'preact/hooks';

function storedTheme() {
  try {
    return localStorage.getItem('pnext-theme');
  } catch {
    return null;
  }
}

// Apply the stored theme as soon as this island's chunk loads. Light is the default.
if (typeof document !== 'undefined') {
  const stored = storedTheme();
  if (stored) document.documentElement.setAttribute('data-theme', stored);
}

export function ThemeToggle() {
  const [dark, setDark] = useState(() => storedTheme() === 'dark');

  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('pnext-theme', next);
    } catch {}
    setDark(next === 'dark');
  };

  return (
    <button
      class="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
      <svg
        class="icon-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
