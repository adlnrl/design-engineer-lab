import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock.jsx'

export default function LessonVisual({ kind }) {
  switch (kind) {
    case 'tree':     return <TreeVisual />
    case 'props':    return <PropsVisual />
    case 'state':    return <StateVisual />
    case 'event':    return <EventVisual />
    case 'styling':  return <StylingVisual />
    case 'codebase': return <CodebaseVisual />
    case 'git':      return <GitVisual />
    case 'cicd':     return <CicdVisual />
    case 'workflow': return <WorkflowVisual />
    default:         return <div className="text-sm text-ink">Interactive example.</div>
  }
}

function Node({ children, className='' }) {
  return (
    <div className={`rounded-xl border border-line bg-white px-3 py-1.5 text-[13px] text-inkDeep ${className}`}>
      {children}
    </div>
  )
}

function TreeVisual() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Node>App</Node>
      <div className="pl-6 flex flex-col gap-2">
        <Node>Layout</Node>
        <div className="pl-6 flex flex-col gap-2">
          <Node>Sidebar</Node>
          <div className="pl-6"><Node>NavItem × 10</Node></div>
          <Node>Main</Node>
        </div>
      </div>
      <p className="text-xs text-ink mt-2">A component tree. Each parent owns its children.</p>
    </div>
  )
}

const TONE_BG = {
  sage: 'bg-sage', sky: 'bg-sky', lilac: 'bg-lilac', blush: 'bg-blush'
}

function PropsVisual() {
  const [label, setLabel] = useState('Save')
  const [tone, setTone] = useState('sage')
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <label className="text-xs text-ink">label</label>
        <input
          className="rounded-lg border border-line bg-white px-2 py-1 text-sm"
          value={label} onChange={e => setLabel(e.target.value)}
        />
        <label className="text-xs text-ink ml-3">tone</label>
        <select className="rounded-lg border border-line bg-white px-2 py-1 text-sm"
                value={tone} onChange={e => setTone(e.target.value)}>
          <option value="sage">sage</option>
          <option value="sky">sky</option>
          <option value="lilac">lilac</option>
          <option value="blush">blush</option>
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button className={`rounded-full px-4 py-2 text-sm text-inkDeep ${TONE_BG[tone]}`}>{label}</button>
        <span className="text-xs text-ink">← same component, different props</span>
      </div>
      <CodeBlock className="mt-4">{`<Button label="${label}" tone="${tone}" />`}</CodeBlock>
    </div>
  )
}

function StateVisual() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={() => setCount(c => c + 1)}>+1</button>
        <button className="btn" onClick={() => setCount(0)}>reset</button>
        <div className="ml-2 rounded-full bg-white border border-line px-4 py-2 text-sm font-mono">{count}</div>
      </div>
      <p className="text-xs text-ink mt-3">
        Each click calls setCount. State changes → the component re-renders → the number updates.
      </p>
      <CodeBlock className="mt-3">{`const [count, setCount] = useState(0)
<button onClick={() => setCount(c => c + 1)}>+1</button>`}</CodeBlock>
    </div>
  )
}

function EventVisual() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex items-center gap-3">
      <button className="btn-primary" onClick={() => setOpen(o => !o)}>
        {open ? 'Hide modal' : 'Show modal'}
      </button>
      {open && (
        <div className="rounded-xl2 border border-line bg-white px-3 py-2 text-sm">
          Hi! I&apos;m a modal. Set open=false to dismiss.
        </div>
      )}
    </div>
  )
}

const RADIUS = { sm: 'rounded-sm', md: 'rounded-md', xl: 'rounded-xl', full: 'rounded-full' }

function StylingVisual() {
  const [radius, setRadius] = useState('xl')
  const [bg, setBg] = useState('sky')
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <label className="text-xs text-ink">radius</label>
        <select className="rounded-lg border border-line bg-white px-2 py-1 text-sm"
          value={radius} onChange={e => setRadius(e.target.value)}>
          <option>sm</option><option>md</option><option>xl</option><option>full</option>
        </select>
        <label className="text-xs text-ink ml-3">bg</label>
        <select className="rounded-lg border border-line bg-white px-2 py-1 text-sm"
          value={bg} onChange={e => setBg(e.target.value)}>
          <option>sky</option><option>sage</option><option>lilac</option><option>blush</option>
        </select>
      </div>
      <div className={`${RADIUS[radius]} ${TONE_BG[bg]} px-4 py-3 text-sm text-inkDeep`}>Styled card</div>
      <CodeBlock className="mt-4">{`<div className="rounded-${radius} bg-${bg} px-4 py-3">Styled card</div>`}</CodeBlock>
    </div>
  )
}

function CodebaseVisual() {
  return (
    <pre className="font-mono text-[12.5px] text-inkDeep leading-relaxed">
{`src/
├─ components/   ← generic UI primitives
├─ features/     ← product areas
├─ pages/        ← route-level screens
├─ hooks/        ← shared logic
└─ utils/        ← tiny helpers`}
    </pre>
  )
}

function GitVisual() {
  return (
    <svg viewBox="0 0 320 150" className="w-full h-auto">
      <line x1="20" y1="40" x2="300" y2="40" stroke="#5D5D5A" strokeWidth="2" />
      {[40, 100, 160, 220, 280].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="40" r="8" fill="#CDEBF1" stroke="#2C5560" strokeWidth="1.5" />
        </g>
      ))}
      <text x="20" y="30" fontSize="11" fill="#2E2E2C" fontFamily="Figtree">main</text>
      <line x1="160" y1="48" x2="220" y2="100" stroke="#9AA3D2" strokeWidth="2" />
      <line x1="220" y1="100" x2="280" y2="100" stroke="#9AA3D2" strokeWidth="2" />
      <circle cx="220" cy="100" r="8" fill="#CBCEEA" stroke="#3A3E70" strokeWidth="1.5" />
      <circle cx="280" cy="100" r="8" fill="#CBCEEA" stroke="#3A3E70" strokeWidth="1.5" />
      <text x="220" y="125" fontSize="11" fill="#2E2E2C" fontFamily="Figtree">feat/safety-redesign</text>
    </svg>
  )
}

function CicdVisual() {
  const steps = ['install', 'lint', 'test', 'build', 'deploy']
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className="rounded-full px-3 py-1.5 text-xs bg-white border border-line">
            {s} <span className="ml-1 text-ink/60">{i < 4 ? '✓' : '…'}</span>
          </div>
          {i < steps.length - 1 && <span className="text-ink/40">→</span>}
        </div>
      ))}
    </div>
  )
}

function WorkflowVisual() {
  const steps = ['Ticket', 'Branch', 'Commit', 'PR', 'CI', 'Review', 'Merge', 'Deploy']
  return (
    <ol className="grid grid-cols-4 gap-2">
      {steps.map(s => (
        <li key={s} className="rounded-xl border border-line bg-white px-3 py-2 text-xs text-inkDeep text-center">
          {s}
        </li>
      ))}
    </ol>
  )
}
