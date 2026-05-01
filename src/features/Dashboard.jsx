import { Link } from 'react-router-dom'
import { Card, Chip } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import GridBackdrop from '../components/GridBackdrop.jsx'
import { modules } from '../data/modules.js'
import { useProgress } from '../hooks/useProgress.jsx'

function totalLessons() { return modules.reduce((n, m) => n + m.lessons.length, 0) }

function countCompleted(state) {
  return Object.values(state.lessons || {}).reduce(
    (n, map) => n + Object.values(map).filter(Boolean).length, 0
  )
}

export default function Dashboard() {
  const { state } = useProgress()
  const done = countCompleted(state)
  const total = totalLessons()
  const pct = total ? done / total : 0

  const next = findNextLesson(state)

  return (
    <div>
      <PageHeader
        eyebrow="Today"
        title="Welcome back"
        lede="A calm pace is still a pace. Pick one small thing — a lesson, a mission, a flashcard round."
        right={<ProgressRing value={pct} size={72} tone="#5D5D5A" label={`${done}/${total} lessons`} />}
      />

      <section className="grid grid-cols-12 gap-5">
        <GridBackdrop tone="sage" className="col-span-8 p-8">
          <div className="max-w-lg">
            <Chip tone="sage">Today&rsquo;s focus</Chip>
            <h2 className="h-serif text-[30px] leading-tight mt-3">
              {next ? next.lesson.title : 'You finished the core path. Try a mission.'}
            </h2>
            <p className="text-ink mt-2 text-[14.5px] leading-relaxed">
              {next ? next.module.summary : 'Apply what you know in a simulated product scenario.'}
            </p>
            <div className="mt-6 flex gap-3">
              {next ? (
                <Link to={`/modules/${next.module.id}/${next.lesson.id}`} className="btn-primary">
                  Continue learning →
                </Link>
              ) : (
                <Link to="/missions" className="btn-primary">Open work simulator →</Link>
              )}
              <Link to="/flashcards" className="btn">Quick flashcards</Link>
            </div>
          </div>
        </GridBackdrop>

        <Card className="col-span-4 p-6">
          <Chip tone="lilac">Current mission</Chip>
          <h3 className="h-serif text-[22px] mt-2 leading-tight">Find the Safety Check button</h3>
          <p className="text-sm text-ink mt-2 leading-relaxed">Trace UI → feature folder → primitive component.</p>
          <Link to="/missions/find-component" className="btn mt-5">Start mission →</Link>
        </Card>

        <Card tone="sky" className="col-span-4 p-6">
          <Chip tone="sky">Progress</Chip>
          <div className="mt-3 flex items-center gap-4">
            <ProgressRing value={pct} size={64} tone="#2C5560" />
            <div>
              <div className="h-serif text-[28px] leading-none">{Math.round(pct * 100)}%</div>
              <div className="text-sm text-ink">overall</div>
            </div>
          </div>
          <Link to="/modules" className="btn mt-5">See modules →</Link>
        </Card>

        <Card tone="blush" className="col-span-4 p-6">
          <Chip tone="blush">Weak areas</Chip>
          <ul className="mt-3 space-y-1.5 text-sm text-inkDeep">
            {weakAreas(state).map(a => (
              <li key={a.id} className="flex items-center justify-between">
                <span>{a.title}</span>
                <Link to={`/modules/${a.id}/${a.lessonId}`} className="text-xs underline">open</Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="lilac" className="col-span-4 p-6">
          <Chip tone="lilac">Quick resume</Chip>
          <p className="text-sm mt-2 text-inkDeep">
            {state.lastVisited
              ? <>Last opened <b>{state.lastVisited.lessonId}</b> in <b>{state.lastVisited.moduleId}</b>.</>
              : 'No recent lesson yet.'}
          </p>
          {state.lastVisited && (
            <Link
              to={`/modules/${state.lastVisited.moduleId}/${state.lastVisited.lessonId}`}
              className="btn mt-5"
            >Resume →</Link>
          )}
        </Card>

        <GridBackdrop tone="lilac" className="col-span-12 p-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <Chip tone="lilac">Why this lab</Chip>
              <h3 className="h-serif text-[26px] mt-2 leading-tight">
                Designer-friendly intuition. No terminal, no panic.
              </h3>
              <p className="text-sm text-ink mt-2 leading-relaxed">
                You&rsquo;ll build a mental model of React, codebases, Git and CI/CD through small visual simulations —
                so you can read code, review PRs, and collaborate without fear.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/simulator" className="btn">React simulator</Link>
              <Link to="/codebase" className="btn">Codebase explorer</Link>
            </div>
          </div>
        </GridBackdrop>
      </section>
    </div>
  )
}

function findNextLesson(state) {
  for (const m of modules) {
    for (const l of m.lessons) {
      if (!state.lessons?.[m.id]?.[l.id]) return { module: m, lesson: l }
    }
  }
  return null
}

function weakAreas(state) {
  const areas = []
  for (const m of modules) {
    const incomplete = m.lessons.find(l => !state.lessons?.[m.id]?.[l.id])
    if (incomplete) areas.push({ id: m.id, title: m.title, lessonId: incomplete.id })
    if (areas.length >= 4) break
  }
  return areas
}
