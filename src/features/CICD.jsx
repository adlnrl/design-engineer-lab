import { useEffect, useState } from 'react'
import { Card, Chip } from '../components/Card.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Term from '../components/Term.jsx'

const STEPS = [
  { id: 'install', label: 'Install deps', note: 'Download the packages listed in package.json.' },
  { id: 'lint',    label: 'Lint',         note: 'Check code style rules. Cheap to fail, cheap to fix.' },
  { id: 'test',    label: 'Test',         note: 'Run unit / integration tests. Failures often mean real bugs.' },
  { id: 'build',   label: 'Build',        note: 'Compile source into an optimised bundle.' },
  { id: 'preview', label: 'Deploy preview',note: 'Publish a temporary URL for design + code review.' },
  { id: 'ship',    label: 'Deploy prod',  note: 'Publish to the URL users see. Usually auto after merge.' }
]

const SCENARIOS = [
  { id: 'green', label: 'All green', failAt: -1 },
  { id: 'lint-fail', label: 'Lint fails', failAt: 1 },
  { id: 'test-fail', label: 'A test fails', failAt: 2 },
  { id: 'build-fail', label: 'Build breaks', failAt: 3 }
]

export default function CICD() {
  const [scenario, setScenario] = useState(SCENARIOS[0])
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    if (progress >= STEPS.length) { setRunning(false); return }
    if (scenario.failAt === progress) { setRunning(false); return }
    const t = setTimeout(() => setProgress(p => p + 1), 650)
    return () => clearTimeout(t)
  }, [running, progress, scenario])

  function run() { setProgress(0); setRunning(true) }

  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="CI/CD, demystified"
        lede="What happens between 'push' and 'deploy'. Try each scenario — most failures are fixable."
      />

      <GridBackdrop tone="sky" className="p-8 mb-5">
        <div className="flex gap-2 flex-wrap mb-4">
          {SCENARIOS.map(s => (
            <button key={s.id}
              onClick={() => { setScenario(s); setProgress(0); setRunning(false) }}
              className={`chip border ${scenario.id === s.id ? 'bg-inkDeep text-white border-inkDeep' : 'bg-white border-line text-ink'}`}>
              {s.label}
            </button>
          ))}
        </div>

        <ol className="grid grid-cols-6 gap-2">
          {STEPS.map((s, i) => {
            const state =
              i < progress ? 'done'
              : (i === progress && running && scenario.failAt !== i) ? 'running'
              : (i === scenario.failAt && (progress === i || !running)) && progress >= i ? 'failed'
              : 'pending'
            return (
              <li key={s.id}
                className={`rounded-xl2 border p-3 text-center transition
                  ${state === 'done'    ? 'border-[#3b6b3f] bg-sage/60' :
                    state === 'running' ? 'border-inkDeep bg-white'     :
                    state === 'failed'  ? 'border-[#7a3b3b] bg-blush/70':
                                          'border-line bg-white/60'}`}>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-ink/70">{i + 1}</div>
                <div className="text-sm text-inkDeep mt-1">{s.label}</div>
                <div className="text-xs mt-1">
                  {state === 'done'    && '✓'}
                  {state === 'running' && '…'}
                  {state === 'failed'  && '✗'}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 flex items-center gap-3">
          <button className="btn-primary" onClick={run} disabled={running}>
            {running ? 'Running…' : 'Run pipeline'}
          </button>
          <span className="text-xs text-ink">
            {scenario.failAt >= 0 && progress >= scenario.failAt && !running
              ? <>Pipeline stopped at <b>{STEPS[scenario.failAt].label}</b>. {STEPS[scenario.failAt].note}</>
              : 'Each step only runs if the previous one passes.'}
          </span>
        </div>
      </GridBackdrop>

      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6">
          <Chip tone="sage">What is CI/CD?</Chip>
          <p className="text-sm mt-3 text-inkDeep leading-relaxed">
            <Term id="ci">CI</Term> is the automatic check phase — tests, linting, build.
            <br /><Term id="cd">CD</Term> is the automatic delivery phase — deploy preview, then production.
          </p>
        </Card>
        <Card className="p-6">
          <Chip tone="blush">Why designers care</Chip>
          <ul className="mt-3 space-y-2 text-sm text-inkDeep">
            <li>• Preview URLs only exist when CI passes. If you can&apos;t find one, check the pipeline.</li>
            <li>• A failed <Term id="build">build</Term> often means a design change referenced a missing file or token.</li>
            <li>• A design review blocks if CI is red — ask the engineer first, then review.</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
