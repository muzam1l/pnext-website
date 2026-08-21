'use client'

import { useState } from 'preact/hooks'

export function CopyCode({ command, comment }: { command: string; comment?: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div class="code-block">
      {comment && (
        <>
          <span class="comment">{comment}</span>
          <br />
        </>
      )}
      <span class="code-line">
        <span>
          <span class="prompt">$</span> {command}
        </span>
        <button
          type="button"
          class={`copy-btn${copied ? ' copied' : ''}`}
          aria-label={copied ? 'Copied to clipboard' : `Copy command: ${command}`}
          onClick={copy}
        >
          {copied ? (
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
  )
}
