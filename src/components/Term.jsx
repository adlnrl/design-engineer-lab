import { useState, useRef, useEffect } from 'react'
import { glossary } from '../data/glossary.js'

export default function Term({ id, children }) {
  const entry = glossary[id]
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  if (!entry) return <span>{children}</span>

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="term text-inkDeep"
        onClick={() => setOpen(o => !o)}
      >
        {children || entry.term}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-30 left-0 top-full mt-2 w-72 rounded-xl2 border border-line bg-white p-3 shadow-soft text-left"
        >
          <span className="block text-xs font-semibold tracking-wide uppercase text-ink/70">{entry.term}</span>
          <span className="block text-sm text-inkDeep mt-1">{entry.short}</span>
          <span className="block text-xs text-ink mt-2"><b>Why:</b> {entry.why}</span>
          {entry.example && (
            <span className="block mt-2 font-mono text-[11px] bg-mist rounded-lg p-2 text-inkDeep">{entry.example}</span>
          )}
        </span>
      )}
    </span>
  )
}
