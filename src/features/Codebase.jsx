import { useMemo, useState } from 'react'
import { Card, Chip } from '../components/Card.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { codebaseTree, flattenFiles } from '../data/codebase.js'

export default function Codebase() {
  const files = useMemo(() => flattenFiles(), [])
  const [path, setPath] = useState('src/App.jsx')
  const [expanded, setExpanded] = useState(() => new Set(['src', 'src/features', 'src/features/safety-check', 'src/components']))
  const [q, setQ] = useState('')

  const current = files.find(f => f.path === path) || files[0]
  const results = q.trim()
    ? files.filter(f =>
        f.path.toLowerCase().includes(q.toLowerCase()) ||
        f.code.toLowerCase().includes(q.toLowerCase()))
    : null

  function toggle(id) {
    setExpanded(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Codebase"
        title="Explorer"
        lede="A simplified Milli-style frontend repo. Click files to read the code and a plain-English note on why the file exists."
        right={
          <input
            type="search"
            placeholder="Search files & code…"
            value={q}
            onChange={e => setQ(e.target.value)}
            className="input w-64"
          />
        }
      />

      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-4 p-4 max-h-[640px] overflow-auto">
          {results ? (
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 px-2 mb-2">
                {results.length} result{results.length === 1 ? '' : 's'}
              </div>
              {results.map(f => (
                <FileRow key={f.path} node={f} active={f.path === path} onOpen={() => setPath(f.path)} />
              ))}
              {!results.length && <p className="text-sm text-ink px-2">Nothing matches “{q}”.</p>}
            </div>
          ) : (
            <Tree node={codebaseTree} depth={0} expanded={expanded} onToggle={toggle} active={path} onOpen={setPath} parentPath="" />
          )}
        </Card>

        <Card className="col-span-8 p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <Chip tone="lilac">{current.lang}</Chip>
              <h3 className="h-serif text-[24px] leading-tight mt-2">{current.path}</h3>
            </div>
          </div>
          <p className="text-sm text-ink mt-3 leading-relaxed">{current.note}</p>
          <CodeBlock className="mt-4 max-h-[420px]">{current.code}</CodeBlock>
          <p className="text-xs text-ink mt-4 italic">
            Tip: when you spot a bug, the file name is usually a giveaway.
            Search-by-text (“Start Safety Check”) beats search-by-file.
          </p>
        </Card>
      </div>
    </div>
  )
}

function Tree({ node, depth, parentPath, expanded, onToggle, active, onOpen }) {
  const id = parentPath ? `${parentPath}/${node.name}` : node.name
  if (node.kind === 'file') {
    return <FileRow node={node} depth={depth} active={active === node.path} onOpen={() => onOpen(node.path)} />
  }
  const open = expanded.has(id) || depth === 0
  return (
    <div>
      <button
        className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm hover:bg-mist"
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={() => onToggle(id)}
      >
        <span className="text-ink/60 w-3 text-center">{open ? '▾' : '▸'}</span>
        <span className="text-inkDeep">{node.name}/</span>
      </button>
      {open && (
        <div>
          {node.children.map(c => (
            <Tree
              key={c.name}
              node={c} depth={depth + 1}
              parentPath={id}
              expanded={expanded} onToggle={onToggle}
              active={active} onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FileRow({ node, depth = 0, active, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-sm
        ${active ? 'bg-white shadow-soft border border-line' : 'hover:bg-mist'}`}
      style={{ paddingLeft: 8 + depth * 14 }}
    >
      <span className="text-ink/60 w-3 text-center">{extIcon(node.lang)}</span>
      <span className={active ? 'text-inkDeep font-medium' : 'text-inkDeep'}>{node.name}</span>
    </button>
  )
}

function extIcon(lang) {
  if (lang === 'jsx') return '⌘'
  if (lang === 'js')  return '∵'
  if (lang === 'md')  return '✎'
  if (lang === 'json') return '{}'
  return '·'
}
