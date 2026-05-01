import { Link } from 'react-router-dom'
import { Card, Chip } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { missions } from '../data/missions.js'
import { useProgress } from '../hooks/useProgress.jsx'

export default function Missions() {
  const { state } = useProgress()
  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Work simulator"
        lede="Real-ish product scenarios. Each one takes 2–4 minutes and ends with why it matters on the job."
      />

      <div className="grid grid-cols-2 gap-5">
        {missions.map(m => {
          const status = state.missions[m.id]
          return (
            <Card key={m.id} tone={m.tone} className="p-6">
              <div className="flex items-center justify-between">
                <Chip tone={m.tone}>{m.time}</Chip>
                {status === 'done' && <span className="text-xs text-ink">Completed</span>}
              </div>
              <h3 className="h-serif text-[24px] leading-tight mt-2">{m.title}</h3>
              <p className="text-sm text-ink mt-2 leading-relaxed">{m.objective}</p>
              <Link to={`/missions/${m.id}`} className="btn mt-5">
                {status === 'done' ? 'Replay' : 'Start mission →'}
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
