'use client'

import { useEffect } from 'preact/hooks'

const COPY_ICON =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1"/><path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2"/></svg>'
const CHECK_ICON =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5 7.5-8"/></svg>'

/** Idempotent; safe to re-run after the router swaps article content. */
function apply() {
  for (const pre of document.querySelectorAll<HTMLPreElement>('.prose pre')) {
    if (pre.querySelector('.pre-copy')) continue
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'pre-copy'
    button.setAttribute('aria-label', 'Copy code')
    button.innerHTML = COPY_ICON
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ''))
      button.classList.add('copied')
      button.innerHTML = CHECK_ICON
      setTimeout(() => {
        button.classList.remove('copied')
        button.innerHTML = COPY_ICON
      }, 1500)
    })
    pre.appendChild(button)
  }

  if (document.querySelector('.prose pre code[class*="language-"]:not([data-highlighted])')) {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200))
    idle(() => import('./highlight').then(m => m.highlightAll()))
  }
}

declare global {
  interface Window {
    __docsEnhanced?: boolean
  }
}

/** Renders nothing; enhances the rendered markdown with copy buttons, tabs, and highlighting. */
export function Enhance() {
  useEffect(() => {
    apply()
    if (window.__docsEnhanced) return
    window.__docsEnhanced = true

    // tab switching survives soft navigation via delegation
    document.addEventListener('click', event => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.md-tabs [role=tab]')
      if (!button) return
      const tabs = button.closest<HTMLElement>('.md-tabs')
      if (!tabs) return
      tabs.dataset.active = button.dataset.tab
      for (const other of tabs.querySelectorAll('[role=tab]')) {
        other.setAttribute('aria-selected', String(other === button))
      }
    })

    // the router swaps article DOM in place; re-apply enhancements when it does
    const observer = new MutationObserver(mutations => {
      if (mutations.some(m => m.addedNodes.length)) apply()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }, [])
  return null
}
