import { useMemo, useState } from 'react'
import { Card, Chip } from '../components/Card.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { flashcards } from '../data/flashcards.js'
import { useProgress } from '../hooks/useProgress.jsx'

const DECKS = ['All', 'React', 'Git', 'CI/CD', 'Codebase', 'Design']

export default function Flashcards() {
  const { state, recordFlashcard } = useProgress()
  const [deck, setDeck] = useState('All')
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const cards = useMemo(() =>
    deck === 'All' ? flashcards : flashcards.filter(c => c.deck === deck),
  [deck])

  const card = cards[i % cards.length]
  const stats = state.flashcards[card?.id] || { seen: 0, correct: 0 }

  function score(correct) {
    recordFlashcard(card.id, correct)
    setFlipped(false)
    setI(v => (v + 1) % cards.length)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Flashcards"
        lede="One card at a time. Flip, then be honest. Small sessions beat long ones."
      />

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {DECKS.map(d => (
          <button
            key={d}
            onClick={() => { setDeck(d); setI(0); setFlipped(false) }}
            className={`chip border ${deck === d ? 'bg-inkDeep text-white border-inkDeep' : 'bg-white border-line text-ink'}`}
          >{d}</button>
        ))}
      </div>

      <Card className="p-8 max-w-xl">
        <div className="flex items-center justify-between">
          <Chip tone="lilac">{card.deck}</Chip>
          <span className="text-xs text-ink">Seen {stats.seen} · Correct {stats.correct}</span>
        </div>

        <button
          onClick={() => setFlipped(f => !f)}
          className="mt-6 w-full text-left min-h-[160px] rounded-xl2 bg-mist border border-line p-6 transition hover:bg-white"
        >
          <div className="text-[11px] font-semibold tracking-wider uppercase text-ink/70 mb-2">
            {flipped ? 'Answer' : 'Question'}
          </div>
          <p className="font-serif text-[24px] leading-snug text-inkDeep">
            {flipped ? card.back : card.front}
          </p>
        </button>

        {flipped ? (
          <div className="mt-6 flex gap-3">
            <button className="btn" onClick={() => score(false)}>Got it wrong</button>
            <button className="btn-primary" onClick={() => score(true)}>Got it right →</button>
          </div>
        ) : (
          <div className="mt-6 flex gap-3">
            <button className="btn" onClick={() => setI(v => (v + 1) % cards.length)}>Skip</button>
            <button className="btn-primary" onClick={() => setFlipped(true)}>Flip card →</button>
          </div>
        )}
      </Card>
    </div>
  )
}
