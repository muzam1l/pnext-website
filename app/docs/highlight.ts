import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)

const ALIASES: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  ts: 'typescript',
  tsx: 'typescript',
  js: 'typescript',
  jsx: 'typescript',
  html: 'xml',
}

export function highlightAll() {
  for (const code of document.querySelectorAll<HTMLElement>('.prose pre code')) {
    if (code.dataset.highlighted) continue
    const match = code.className.match(/language-([\w-]+)/)
    const language = ALIASES[match?.[1] ?? ''] ?? match?.[1]
    if (!language || !hljs.getLanguage(language)) continue
    let html = hljs.highlight(code.textContent ?? '', { language }).value
    // bash grammar leaves command names and flags plain; color them
    if (language === 'bash') {
      html = html
        .replace(/^([\w@][\w@./-]*)/gm, '<span class="hljs-built_in">$1</span>')
        .replace(/(^|[\s[|])(--?[\w-]+)/gm, '$1<span class="hljs-attr">$2</span>')
    }
    code.innerHTML = html
    code.dataset.highlighted = 'yes'
  }
}
