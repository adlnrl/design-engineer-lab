import { Card } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { tips } from '../data/tips.js'

export default function Tips() {
  return (
    <div>
      <PageHeader
        eyebrow="Reference"
        title="Tips for designers"
        lede="Small habits that compound. Borrowed from design engineers who still call themselves designers."
      />
      <div className="grid grid-cols-2 gap-5">
        {tips.map(t => (
          <Card key={t.id} className="p-6">
            <h3 className="h-serif text-[22px] leading-tight text-inkDeep">{t.title}</h3>
            <p className="text-sm text-ink mt-2 leading-relaxed">{t.body}</p>
            {t.example && (
              <div className="mt-3 font-mono text-[12px] bg-mist rounded-xl p-3 text-inkDeep">{t.example}</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
