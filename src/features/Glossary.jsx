import { useMemo, useState } from 'react'
import { Card } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { glossary } from '../data/glossary.js'

export default function Glossary() {
  const [q, setQ] = useState('')

  const entries = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const all = Object.entries(glossary)
    if (!needle) return all
    return all.filter(([, v]) =>
      v.term.toLowerCase().includes(needle) ||
      v.short.toLowerCase().includes(needle)
    )
  }, [q])

  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Glossary"
        lede="Every term the lab uses. Hover anywhere in the app to see the short version; this is the long one."
        right={
          <input
            type="search"
            placeholder="Search…"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="rounded-full bg-white border border-line px-4 py-2 text-sm w-60"
          />
        }
      />
      <div className="grid grid-cols-2 gap-5">
        {entries.map(([id, v]) => (
          <Card key={id} className="p-5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-1">{v.term}</div>
            <p className="text-sm text-inkDeep">{v.short}</p>
            <p className="text-xs text-ink mt-3"><b>Why it matters:</b> {v.why}</p>
            {v.example && (
              <div className="mt-3 font-mono text-[11.5px] bg-mist rounded-lg p-2 text-inkDeep">{v.example}</div>
            )}
          </Card>
        ))}
        {!entries.length && <p className="text-sm text-ink">No terms match “{q}”.</p>}
      </div>
    </div>
  )
}
