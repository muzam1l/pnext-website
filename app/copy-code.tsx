'use client'

import { useState } from 'preact/hooks'

const COMMANDS = [
  { comment: '# new app', command: 'bunx @wular/pnext create my-app' },
  {
    comment: '# or migrate an existing Next.js app in place',
    command: 'bunx @wular/pnext migrate',
  },
]

export function CopyCode() {
  const [copied, setCopied] = useState(-1)

  function copy(i: number, command: string) {
    navigator.clipboard.writeText(command)
    setCopied(i)
    setTimeout(() => setCopied(c => (c === i ? -1 : c)), 1500)
  }

  return (
    <>
      {COMMANDS.map(({ comment, command }, i) => (
        <div class="code-block" key={command}>
          <span class="comment">{comment}</span>
          <br />
          <span class="code-line">
            <span>
              <span class="prompt">$</span> {command}
            </span>
            <button
              type="button"
              class={`copy-btn${copied === i ? ' copied' : ''}`}
              aria-label={copied === i ? 'Copied to clipboard' : `Copy command: ${command}`}
              onClick={() => copy(i, command)}
            >
              {copied === i ? (
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  aria-hidden="true"
                >
                  <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
                  <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
                </svg>
              )}
            </button>
          </span>
        </div>
      ))}
    </>
  )
}
