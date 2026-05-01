import { useMemo, useState } from 'react'
import { Card, Chip } from '../components/Card.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Term from '../components/Term.jsx'

const MAIN = [
  { id: 'm1', label: 'init' },
  { id: 'm2', label: 'add modules' },
  { id: 'm3', label: 'tokens' }
]
const BRANCH = [
  { id: 'b1', label: 'redesign button' },
  { id: 'b2', label: 'fix contrast' }
]

export default function GitConcepts() {
  const [step, setStep] = useState(0) // 0 branched, 1 committed, 2 PR open, 3 merged

  const merged = step >= 3

  const timeline = useMemo(() => {
    const base = [...MAIN]
    if (step === 0) return { main: base, branch: [] }
    if (step === 1) return { main: base, branch: [BRANCH[0]] }
    if (step === 2) return { main: base, branch: BRANCH }
    return { main: [...base, ...BRANCH], branch: [] }
  }, [step])

  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Git, without the terminal"
        lede="The mental model. No commands. Just the moves engineers and designers make together."
      />

      <GridBackdrop tone="sage" className="p-8 mb-5">
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {['Branch', 'Commit', 'Open PR', 'Merge'].map((label, i) => (
            <button key={label}
              onClick={() => setStep(i)}
              className={`chip border ${step === i ? 'bg-inkDeep text-white border-inkDeep' : 'bg-white border-line text-ink'}`}>
              {i + 1}. {label}
            </button>
          ))}
        </div>

        <GraphView main={timeline.main} branch={timeline.branch} merged={merged} />

        <p className="text-sm text-ink mt-4 max-w-[62ch] leading-relaxed">
          {[
            'Step 1 — a new branch is created from main. The history is the same until the first commit.',
            'Step 2 — the first commit lands on the branch. main is untouched.',
            'Step 3 — a PR is opened. CI runs. Reviewers (including you) comment on the preview.',
            'Step 4 — the branch merges to main. Those commits are now part of what ships.'
          ][step]}
        </p>
      </GridBackdrop>

      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6">
          <Chip tone="sky">Essentials</Chip>
          <ul className="mt-3 space-y-3 text-sm text-inkDeep leading-relaxed">
            <li><Term id="repo">Repo</Term> — the folder Git tracks.</li>
            <li><Term id="branch">Branch</Term> — a parallel line of commits.</li>
            <li><Term id="commit">Commit</Term> — a snapshot of changes.</li>
            <li><Term id="pr">PR</Term> — a proposal to merge one branch into another.</li>
            <li><Term id="merge">Merge</Term> — combining branches back into main.</li>
          </ul>
        </Card>
        <Card className="p-6">
          <Chip tone="lilac">A commit, read like prose</Chip>
          <CodeBlock className="mt-3">{`feat(safety-check): bump button size to 52px on mobile

- uses sm token in components/Button.jsx
- covers iOS 16 touch target audit`}</CodeBlock>
          <p className="text-xs text-ink mt-3">
            Good commit messages describe the change and why. They&apos;re the breadcrumbs you&apos;ll thank someone for later.
          </p>
        </Card>
      </div>
    </div>
  )
}

function GraphView({ main, branch, merged }) {
  const width = 640, y = 60, y2 = 120
  const step = 80
  const mainX = (i) => 60 + i * step
  return (
    <svg viewBox={`0 0 ${width} 180`} className="w-full h-auto">
      {/* Main line */}
      <line x1="40" y1={y} x2={width - 20} y2={y} stroke="#5D5D5A" strokeWidth="2" />
      {/* Main commits */}
      {main.map((c, i) => (
        <g key={c.id}>
          <circle cx={mainX(i)} cy={y} r="8" fill="#CDEBF1" stroke="#2C5560" strokeWidth="1.5" />
          <text x={mainX(i)} y={y - 14} textAnchor="middle" fontSize="11" fill="#2E2E2C">{c.label}</text>
        </g>
      ))}
      {!merged && <text x="40" y={y - 26} fontSize="11" fill="#2E2E2C" fontFamily="Figtree">main</text>}

      {/* Branch */}
      {branch.length > 0 && (
        <>
          <line x1={mainX(2)} y1={y + 6} x2={mainX(3)} y2={y2} stroke="#9AA3D2" strokeWidth="2" />
          <line x1={mainX(3)} y1={y2} x2={mainX(4)} y2={y2} stroke="#9AA3D2" strokeWidth="2" />
          {branch.map((c, i) => (
            <g key={c.id}>
              <circle cx={mainX(3 + i)} cy={y2} r="8" fill="#CBCEEA" stroke="#3A3E70" strokeWidth="1.5" />
              <text x={mainX(3 + i)} y={y2 + 22} textAnchor="middle" fontSize="11" fill="#2E2E2C">{c.label}</text>
            </g>
          ))}
          <text x={mainX(3) - 20} y={y2 + 42} fontSize="11" fill="#2E2E2C">feat/safety-redesign</text>
        </>
      )}
    </svg>
  )
}
