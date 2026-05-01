import { useEffect, useRef, useState } from 'react'
import { Card, Chip } from '../components/Card.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import PageHeader from '../components/PageHeader.jsx'

const DEMOS = [
  { id: 'tree',     label: 'Component tree' },
  { id: 'props',    label: 'Props flow' },
  { id: 'state',    label: 'State change' },
  { id: 'modal',    label: 'Toggle a modal' },
  { id: 'form',     label: 'Form ↔ state' },
  { id: 'rerender', label: 'Re-render highlight' }
]

export default function Simulator() {
  const [demo, setDemo] = useState(DEMOS[0].id)
  return (
    <div>
      <PageHeader
        eyebrow="Simulator"
        title="React, made visible"
        lede="Interact with tiny React apps and watch what updates. Each demo mirrors a real pattern you'll meet in code."
      />
      <div className="flex flex-wrap gap-2 mb-6">
        {DEMOS.map(d => (
          <button
            key={d.id}
            onClick={() => setDemo(d.id)}
            className={`chip border ${demo === d.id ? 'bg-inkDeep text-white border-inkDeep' : 'bg-white border-line text-ink'}`}
          >{d.label}</button>
        ))}
      </div>

      {demo === 'tree'     && <TreeDemo />}
      {demo === 'props'    && <PropsDemo />}
      {demo === 'state'    && <StateDemo />}
      {demo === 'modal'    && <ModalDemo />}
      {demo === 'form'     && <FormDemo />}
      {demo === 'rerender' && <RerenderDemo />}
    </div>
  )
}

function DemoShell({ left, right }) {
  return (
    <div className="grid grid-cols-12 gap-5">
      <GridBackdrop tone="sky" className="col-span-7 p-6 min-h-[320px]">{left}</GridBackdrop>
      <Card className="col-span-5 p-6">{right}</Card>
    </div>
  )
}

function Box({ label, active, children, className = '' }) {
  return (
    <div className={`rounded-xl2 border px-3 py-2 text-[13px] text-inkDeep transition
      ${active ? 'border-inkDeep bg-white ring-2 ring-inkDeep/15' : 'border-line bg-white/80'} ${className}`}>
      <div className="text-[10px] font-semibold tracking-wider uppercase text-ink/70 mb-0.5">{label}</div>
      {children}
    </div>
  )
}

function TreeDemo() {
  const [hover, setHover] = useState(null)
  const nodes = [
    { id: 'App', file: 'src/App.jsx', parent: null, role: 'Top-level. Wires routing.' },
    { id: 'Layout', file: 'src/components/Layout.jsx', parent: 'App', role: 'Page shell. Sidebar + main area.' },
    { id: 'Sidebar', file: 'src/components/Layout.jsx', parent: 'Layout', role: 'Navigation list.' },
    { id: 'NavItem', file: 'src/components/Layout.jsx', parent: 'Sidebar', role: 'One row per destination.' },
    { id: 'Main', file: 'src/App.jsx', parent: 'Layout', role: 'The current route renders here.' },
    { id: 'Home', file: 'src/pages/Home.jsx', parent: 'Main', role: 'The home page.' },
    { id: 'SafetyCheckButton', file: 'src/features/safety-check/SafetyCheckButton.jsx', parent: 'Home', role: 'Product button. Uses <Button> primitive.' }
  ]
  const selected = nodes.find(n => n.id === hover) || nodes[0]
  return (
    <DemoShell
      left={
        <div className="flex flex-col gap-2">
          {nodes.map(n => (
            <div key={n.id} style={{ paddingLeft: depthOf(n, nodes) * 18 }}>
              <button
                onMouseEnter={() => setHover(n.id)}
                onFocus={() => setHover(n.id)}
                onClick={() => setHover(n.id)}
                className="text-left"
              >
                <Box label={n.parent ? `child of ${n.parent}` : 'root'} active={hover === n.id}>
                  &lt;{n.id}&nbsp;/&gt;
                </Box>
              </button>
            </div>
          ))}
        </div>
      }
      right={
        <div>
          <Chip tone="sky">Selected</Chip>
          <h3 className="h-serif text-[24px] leading-tight mt-2">{selected.id}</h3>
          <p className="text-sm text-ink mt-2">{selected.role}</p>
          <div className="mt-3 font-mono text-[12px] bg-mist rounded-xl p-3 text-inkDeep">{selected.file}</div>
          <p className="text-xs text-ink mt-4">
            Hover a node to see where in the tree it sits and which file defines it.
          </p>
        </div>
      }
    />
  )
}
function depthOf(node, nodes, d = 0) {
  if (!node.parent) return d
  const p = nodes.find(x => x.id === node.parent)
  return p ? depthOf(p, nodes, d + 1) : d
}

function PropsDemo() {
  const [label, setLabel] = useState('Save')
  const [tone, setTone] = useState('sky')
  const [size, setSize] = useState('md')
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' }
  const tones = { sky: 'bg-sky', sage: 'bg-sage', lilac: 'bg-lilac', blush: 'bg-blush' }
  return (
    <DemoShell
      left={
        <div className="h-full flex flex-col justify-center items-center gap-6">
          <button className={`rounded-full text-inkDeep border border-line ${sizes[size]} ${tones[tone]}`}>
            {label}
          </button>
          <p className="text-xs text-ink">Parent passes props → child renders them.</p>
        </div>
      }
      right={
        <div className="space-y-3">
          <Chip tone="lilac">Props</Chip>
          <Field label="label"><input value={label} onChange={e => setLabel(e.target.value)} className="input" /></Field>
          <Field label="tone">
            <select value={tone} onChange={e => setTone(e.target.value)} className="input">
              <option>sky</option><option>sage</option><option>lilac</option><option>blush</option>
            </select>
          </Field>
          <Field label="size">
            <select value={size} onChange={e => setSize(e.target.value)} className="input">
              <option>sm</option><option>md</option><option>lg</option>
            </select>
          </Field>
          <CodeBlock>{`<Button\n  label="${label}"\n  tone="${tone}"\n  size="${size}"\n/>`}</CodeBlock>
        </div>
      }
    />
  )
}

function StateDemo() {
  const [count, setCount] = useState(0)
  const [renders, setRenders] = useState(0)
  useEffect(() => { setRenders(r => r + 1) }, [count])
  return (
    <DemoShell
      left={
        <div className="h-full flex flex-col justify-center items-center gap-6">
          <div className="rounded-xl2 border border-line bg-white px-8 py-5 font-mono text-4xl text-inkDeep">{count}</div>
          <div className="flex gap-3">
            <button className="btn" onClick={() => setCount(c => c - 1)}>−1</button>
            <button className="btn-primary" onClick={() => setCount(c => c + 1)}>+1</button>
            <button className="btn" onClick={() => setCount(0)}>reset</button>
          </div>
        </div>
      }
      right={
        <div>
          <Chip tone="sage">Under the hood</Chip>
          <ul className="text-sm text-inkDeep mt-3 space-y-1">
            <li><b>State:</b> count = {count}</li>
            <li><b>Re-renders since mount:</b> {renders}</li>
          </ul>
          <CodeBlock className="mt-3">{`const [count, setCount] = useState(0)
<button onClick={() => setCount(c => c + 1)}>+1</button>`}</CodeBlock>
          <p className="text-xs text-ink mt-3">
            Every click changes state, which triggers a re-render. The render counter ticks up automatically.
          </p>
        </div>
      }
    />
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <DemoShell
      left={
        <div className="h-full grid place-items-center">
          <button className="btn-primary" onClick={() => setOpen(true)}>Open modal</button>
          {open && (
            <div className="absolute inset-0 bg-inkDeep/20 backdrop-blur-[2px] grid place-items-center">
              <div className="card p-6 w-[320px]">
                <h4 className="h-serif text-[22px]">Confirm safety check</h4>
                <p className="text-sm text-ink mt-2">We&apos;ll notify your trusted contacts.</p>
                <div className="mt-5 flex justify-end gap-2">
                  <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
                  <button className="btn-primary" onClick={() => setOpen(false)}>Confirm</button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      right={
        <div>
          <Chip tone="blush">Pattern</Chip>
          <p className="text-sm mt-3 text-inkDeep">
            A boolean state (<code>open</code>) controls whether the modal exists in the tree.
            Events flip it; React adds or removes the DOM for you.
          </p>
          <CodeBlock className="mt-3">{`const [open, setOpen] = useState(false)
{open && <Modal onClose={() => setOpen(false)} />}`}</CodeBlock>
        </div>
      }
    />
  )
}

function FormDemo() {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  return (
    <DemoShell
      left={
        <div className="h-full flex flex-col justify-center gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="input w-full" />
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="A short note…" className="input w-full" />
          <div className="rounded-xl2 bg-white border border-line p-4 text-sm text-inkDeep">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-1">Preview</div>
            {name ? <b>{name}</b> : <span className="text-ink/50">(name)</span>}: {note || <span className="text-ink/50">(note)</span>}
          </div>
        </div>
      }
      right={
        <div>
          <Chip tone="lilac">Controlled input</Chip>
          <p className="text-sm text-inkDeep mt-3">
            The input&apos;s value <i>is</i> state. Typing fires onChange → updates state → the input and preview re-render together.
          </p>
          <CodeBlock className="mt-3">{`const [name, setName] = useState('')
<input value={name} onChange={e => setName(e.target.value)} />`}</CodeBlock>
        </div>
      }
    />
  )
}

function RerenderDemo() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const aRef = useRef(0); aRef.current++
  const bRef = useRef(0); bRef.current++
  return (
    <DemoShell
      left={
        <div className="h-full grid grid-cols-2 gap-4 p-4">
          <Panel name="A" value={a} renders={aRef.current} onInc={() => setA(x => x + 1)} accent="bg-sky" />
          <Panel name="B" value={b} renders={bRef.current} onInc={() => setB(x => x + 1)} accent="bg-sage" />
        </div>
      }
      right={
        <div>
          <Chip tone="sky">What re-renders?</Chip>
          <p className="text-sm text-inkDeep mt-3">
            Both panels live in one parent. When the parent re-renders (because <b>any</b> state changes),
            both children re-run. That&apos;s usually fine. When it&apos;s not, you reach for memoization.
          </p>
          <CodeBlock className="mt-3">{`function Parent() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  return <> <Panel /> <Panel /> </>
}`}</CodeBlock>
        </div>
      }
    />
  )
}

function Panel({ name, value, renders, onInc, accent }) {
  return (
    <div className={`rounded-xl2 border border-line ${accent}/40 p-4 flex flex-col gap-3`}>
      <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70">Panel {name}</div>
      <div className="font-mono text-3xl text-inkDeep">{value}</div>
      <button className="btn self-start" onClick={onInc}>+1</button>
      <div className="text-xs text-ink">Renders: {renders}</div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-ink/70">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
