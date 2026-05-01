import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Chip } from '../components/Card.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Term from '../components/Term.jsx'
import { findLesson, modules } from '../data/modules.js'
import { useProgress } from '../hooks/useProgress.jsx'
import LessonVisual from './lesson/LessonVisual.jsx'

export default function LessonView() {
  const { moduleId, lessonId } = useParams()
  const found = findLesson(moduleId, lessonId)
  const { state, completeLesson } = useProgress()
  const nav = useNavigate()

  if (!found) return <p>Lesson not found. <Link to="/modules" className="underline">Back to modules</Link></p>

  const { module: m, lesson: l } = found
  const done = !!state.lessons?.[m.id]?.[l.id]
  const next = findNextAfter(m.id, l.id)

  return (
    <div>
      <Link to="/modules" className="text-sm text-ink underline">← Modules</Link>
      <PageHeader
        eyebrow={m.title}
        title={l.title}
        lede={<><span>{m.summary}</span></>}
        right={<Chip tone={m.tone}>{done ? 'Completed' : 'In progress'}</Chip>}
      />

      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-7 p-7">
          <h4 className="h-serif text-[22px] mb-3">Plain English</h4>
          <p className="text-[15px] leading-relaxed text-inkDeep">
            {renderWithTerms(l.body, l.terms)}
          </p>

          <h4 className="h-serif text-[22px] mt-7 mb-3">Why this matters</h4>
          <p className="text-[15px] leading-relaxed text-inkDeep">{l.why}</p>

          <h4 className="h-serif text-[22px] mt-7 mb-3">Example</h4>
          <CodeBlock>{l.example}</CodeBlock>

          <div className="mt-7 flex items-center gap-3">
            <button
              className="btn-primary"
              onClick={() => { completeLesson(m.id, l.id); if (next) nav(`/modules/${next.module.id}/${next.lesson.id}`) }}
            >
              {next ? 'Mark done & continue →' : 'Mark done →'}
            </button>
            <button className="btn" onClick={() => completeLesson(m.id, l.id)}>Just mark done</button>
          </div>
        </Card>

        <div className="col-span-5 space-y-5">
          <GridBackdrop tone={m.tone} className="p-5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-2">Interactive</div>
            <LessonVisual kind={l.visual} />
          </GridBackdrop>

          <Card className="p-5">
            <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-2">Key terms</div>
            <div className="flex flex-wrap gap-2">
              {(l.terms || []).map(t => <Term key={t} id={t} />)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function renderWithTerms(body, termIds = []) {
  if (!termIds.length) return body
  // Replace first occurrence of each term's title with a Term component.
  let out = [body]
  termIds.forEach(id => {
    // Find in string parts and split
    out = out.flatMap(part => {
      if (typeof part !== 'string') return [part]
      const words = keyFor(id)
      const idx = part.toLowerCase().indexOf(words.toLowerCase())
      if (idx === -1) return [part]
      return [
        part.slice(0, idx),
        <Term key={`${id}-${idx}`} id={id}>{part.slice(idx, idx + words.length)}</Term>,
        part.slice(idx + words.length)
      ]
    })
  })
  return out
}

function keyFor(id) {
  switch (id) {
    case 'component': return 'component'
    case 'tree':      return 'tree'
    case 'props':     return 'Props'
    case 'state':     return 'state'
    case 'rerender':  return 're-render'
    case 'event':     return 'event'
    case 'hook':      return 'hook'
    case 'tailwind':  return 'Tailwind'
    case 'repo':      return 'repo'
    case 'branch':    return 'branch'
    case 'commit':    return 'commits'
    case 'pr':        return 'PR'
    case 'merge':     return 'merge'
    case 'ci':        return 'CI'
    case 'cd':        return 'CD'
    case 'build':     return 'build'
    case 'deploy':    return 'deploy'
    default: return id
  }
}

function findNextAfter(moduleId, lessonId) {
  const modIdx = modules.findIndex(m => m.id === moduleId)
  if (modIdx < 0) return null
  const m = modules[modIdx]
  const lIdx = m.lessons.findIndex(l => l.id === lessonId)
  if (lIdx < m.lessons.length - 1) return { module: m, lesson: m.lessons[lIdx + 1] }
  const nextMod = modules[modIdx + 1]
  if (!nextMod) return null
  return { module: nextMod, lesson: nextMod.lessons[0] }
}
