import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Chip } from '../components/Card.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { missions } from '../data/missions.js'
import { useProgress } from '../hooks/useProgress.jsx'

export default function MissionView() {
  const { id } = useParams()
  const mission = missions.find(m => m.id === id)
  const { completeMission } = useProgress()
  const [stepIdx, setStepIdx] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correct, setCorrect] = useState(0)

  if (!mission) return <p>Mission not found. <Link to="/missions" className="underline">Back</Link></p>

  const step = mission.steps[stepIdx]
  const done = stepIdx >= mission.steps.length
  const total = mission.steps.length

  function pick(opt) {
    if (answered) return
    setAnswered(opt)
    if (opt.correct) setCorrect(c => c + 1)
  }

  function next() {
    setAnswered(null)
    if (stepIdx + 1 >= total) {
      setStepIdx(total)
      completeMission(mission.id)
    } else {
      setStepIdx(stepIdx + 1)
    }
  }

  return (
    <div>
      <Link to="/missions" className="text-sm text-ink underline">← Missions</Link>
      <PageHeader
        eyebrow={`Mission · ${mission.time}`}
        title={mission.title}
        lede={mission.objective}
        right={<Chip tone={mission.tone}>{Math.min(stepIdx + 1, total)}/{total}</Chip>}
      />

      <GridBackdrop tone={mission.tone} className="p-6 mb-5">
        <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-1">Context</div>
        <p className="text-[15px] text-inkDeep leading-relaxed max-w-[62ch]">{mission.context}</p>
      </GridBackdrop>

      {!done ? (
        <Card className="p-6">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-2">
            Step {stepIdx + 1} of {total}
          </div>
          <h3 className="h-serif text-[24px] leading-tight">{step.prompt}</h3>

          <div className="mt-5 grid gap-2">
            {step.options.map(o => {
              const state =
                !answered ? 'idle'
                : o.correct ? 'right'
                : answered.id === o.id ? 'wrong'
                : 'idle'
              const base = 'text-left rounded-xl2 border p-4 text-sm transition'
              const style = {
                idle:  'border-line bg-white hover:bg-mist',
                right: 'border-[#3b6b3f] bg-sage/70',
                wrong: 'border-[#7a3b3b] bg-blush/70'
              }[state]
              return (
                <button key={o.id} className={`${base} ${style}`} onClick={() => pick(o)}>
                  <span className="font-mono text-[12px] text-ink mr-2">{o.id}.</span>
                  {o.label}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-5">
              <p className="text-sm text-inkDeep">
                <b>{answered.correct ? 'Correct.' : 'Not quite.'}</b> {step.why}
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn-primary" onClick={next}>
                  {stepIdx + 1 < total ? 'Next step →' : 'Finish mission →'}
                </button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card tone="sage" className="p-8">
          <Chip tone="sage">Debrief</Chip>
          <h3 className="h-serif text-[28px] leading-tight mt-2">Nice work.</h3>
          <p className="text-[15px] text-inkDeep mt-2">Score: {correct} of {total} correct.</p>
          <p className="text-sm text-ink mt-3 leading-relaxed max-w-[60ch]">
            <b>Why this matters:</b> {mission.reflect}
          </p>
          <div className="mt-5 flex gap-3">
            <Link to="/missions" className="btn-primary">Next mission →</Link>
            <button className="btn" onClick={() => { setStepIdx(0); setCorrect(0) }}>Replay</button>
          </div>
        </Card>
      )}
    </div>
  )
}
