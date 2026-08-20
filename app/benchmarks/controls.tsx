'use client'

import { useEffect, useState } from 'preact/hooks'

type Option = { id: string; label: string }

/**
 * The page's only island. It owns no content: it flips data-* attributes on the
 * server-rendered #bench wrapper, and CSS does the filtering.
 */
export function BenchControls({ categories, phases }: { categories: Option[]; phases: Option[] }) {
  const [category, setCategory] = useState('all')
  const [phase, setPhase] = useState('all')

  useEffect(() => {
    const root = document.getElementById('bench')
    if (!root) return
    root.dataset.category = category
    root.dataset.phase = phase
  }, [category, phase])

  return (
    <div class="bench-controls">
      <Group
        label="Category"
        options={[{ id: 'all', label: 'All' }, ...categories]}
        value={category}
        onPick={setCategory}
      />
      <Group
        label="Run"
        options={[{ id: 'all', label: 'All' }, ...phases]}
        value={phase}
        onPick={setPhase}
      />
    </div>
  )
}

function Group({
  label,
  options,
  value,
  onPick,
}: {
  label: string
  options: Option[]
  value: string
  onPick: (id: string) => void
}) {
  return (
    <div class="control-group" role="group" aria-label={label}>
      <span class="control-label">{label}</span>
      {options.map(option => (
        <button
          key={option.id}
          type="button"
          class="control-chip"
          aria-pressed={value === option.id}
          onClick={() => onPick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
