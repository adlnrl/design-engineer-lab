import { Link } from 'react-router-dom'
import { Card, Chip } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { modules } from '../data/modules.js'
import { useProgress } from '../hooks/useProgress.jsx'

export default function Modules() {
  const { state } = useProgress()

  return (
    <div>
      <PageHeader
        eyebrow="Learn"
        title="Modules"
        lede="Small lessons grouped by topic. Each one is under 3 minutes and ends with an interactive example."
      />

      <div className="grid grid-cols-2 gap-5">
        {modules.map(m => {
          const completed = m.lessons.filter(l => state.lessons?.[m.id]?.[l.id]).length
          return (
            <Card key={m.id} tone={m.tone} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Chip tone={m.tone}>{completed}/{m.lessons.length} lessons</Chip>
                  <h3 className="h-serif text-[26px] mt-2 leading-tight">{m.title}</h3>
                  <p className="text-sm text-ink mt-2 leading-relaxed">{m.summary}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-1.5">
                {m.lessons.map(l => {
                  const done = state.lessons?.[m.id]?.[l.id]
                  return (
                    <li key={l.id}>
                      <Link
                        to={`/modules/${m.id}/${l.id}`}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm bg-white/70 hover:bg-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${done ? 'bg-inkDeep' : 'bg-line'}`} />
                          {l.title}
                        </span>
                        <span className="text-ink/60">→</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
