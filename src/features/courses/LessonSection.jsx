import { useState } from 'react'
import { Card } from '../../components/Card.jsx'
import CodeBlock from '../../components/CodeBlock.jsx'

// ─── Body text renderer ───────────────────────────────────────────────────────
// Handles \n\n → paragraphs, **x** → bold, lines starting with • → list items,
// lines starting with **N.** → numbered list items
function renderBody(text) {
  if (!text) return null
  const paragraphs = text.split('\n\n')
  return paragraphs.map((para, pi) => {
    // Detect a bullet list block
    const lines = para.split('\n')
    const isBulletList = lines.every(l => l.trim().startsWith('•') || l.trim().startsWith('*') || /^\d+\./.test(l.trim()) || l.trim() === '')

    if (isBulletList && lines.some(l => l.trim().startsWith('•'))) {
      return (
        <ul key={pi} className="mt-4 space-y-2">
          {lines.filter(l => l.trim()).map((l, li) => (
            <li key={li} className="flex gap-2.5 text-[15px] leading-relaxed text-inkDeep">
              <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-ink/40 shrink-0" />
              <span>{inlineRich(l.replace(/^•\s*/, ''))}</span>
            </li>
          ))}
        </ul>
      )
    }

    // Numbered list block
    if (isBulletList && lines.some(l => /^\d+\./.test(l.trim()))) {
      return (
        <ol key={pi} className="mt-4 space-y-2 counter-reset">
          {lines.filter(l => l.trim()).map((l, li) => {
            const match = l.match(/^(\d+)\.\s*(.*)/)
            const num = match ? match[1] : li + 1
            const content = match ? match[2] : l
            return (
              <li key={li} className="flex gap-3 text-[15px] leading-relaxed text-inkDeep">
                <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-ink/10 grid place-items-center text-[11px] font-semibold text-ink">
                  {num}
                </span>
                <span>{inlineRich(content)}</span>
              </li>
            )
          })}
        </ol>
      )
    }

    // Mixed paragraph — some lines may be "**Label** rest" step-style
    const isStepBlock = lines.some(l => /^\*\*[^*]+\*\*/.test(l.trim()))
    if (isStepBlock && lines.length > 1) {
      return (
        <div key={pi} className="mt-4 space-y-3">
          {lines.filter(l => l.trim()).map((l, li) => (
            <p key={li} className="text-[15px] leading-relaxed text-inkDeep">{inlineRich(l)}</p>
          ))}
        </div>
      )
    }

    return (
      <p key={pi} className="mt-4 text-[15px] leading-relaxed text-inkDeep first:mt-0">
        {inlineRich(para)}
      </p>
    )
  })
}

function inlineRich(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-inkDeep">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

// ─── Section type wrappers ────────────────────────────────────────────────────

function WhyBlock({ heading, children }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-sage bg-sage/25 p-6 mt-1">
      <div className="absolute top-0 left-0 w-1 h-full bg-sage rounded-l-xl2" />
      <div className="pl-2">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#355839]/80 mb-2">Why this matters</div>
        <div className="text-[15px] leading-relaxed text-inkDeep space-y-3">{children}</div>
      </div>
    </div>
  )
}

function WithoutBlock({ heading, children }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-blush bg-blush/30 p-6 mt-1">
      <div className="absolute top-0 left-0 w-1 h-full bg-blush rounded-l-xl2" />
      <div className="pl-2">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#7A3B3B]/70 mb-2">Before this existed</div>
        <div className="text-[15px] leading-relaxed text-inkDeep space-y-3">{children}</div>
      </div>
    </div>
  )
}

function MetaphorBlock({ children }) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-sky bg-sky/25 p-6 mt-1">
      <div className="absolute top-0 left-0 w-1 h-full bg-sky rounded-l-xl2" />
      <div className="pl-2">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#224A55]/70 mb-2">Think of it like this</div>
        <div className="text-[15px] leading-relaxed text-inkDeep space-y-3">{children}</div>
      </div>
    </div>
  )
}

function EngineerBlock({ items }) {
  return (
    <div className="rounded-xl2 border border-lilac bg-lilac/25 p-6 mt-1">
      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#3A3E70]/70 mb-4">
        Engineer translation
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 items-baseline">
            <code className="shrink-0 font-mono text-[12px] bg-white/70 border border-lilac/50 rounded-lg px-2.5 py-1 text-inkDeep whitespace-nowrap">
              {item.term}
            </code>
            <span className="text-[14px] text-inkDeep leading-snug">{item.plain}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Section heading + content dispatcher ────────────────────────────────────
export function LessonSection({ section }) {
  const body = renderBody(section.body)

  const content = (() => {
    switch (section.type) {
      case 'why':      return <WhyBlock heading={section.heading}>{body}</WhyBlock>
      case 'without':  return <WithoutBlock heading={section.heading}>{body}</WithoutBlock>
      case 'metaphor': return <MetaphorBlock>{body}</MetaphorBlock>
      case 'engineer': return <EngineerBlock items={section.items} />
      default:         return <div className="space-y-0">{body}</div>
    }
  })()

  return (
    <section id={section.id} className="scroll-mt-8">
      {section.type !== 'engineer' && (
        <h2 className="h-serif text-[26px] leading-tight mb-4">{section.heading}</h2>
      )}
      {content}
    </section>
  )
}

// ─── Vocab strip ─────────────────────────────────────────────────────────────
export function VocabStrip({ terms }) {
  if (!terms?.length) return null
  return (
    <div className="flex flex-wrap gap-2 py-5 border-t border-line">
      <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/60 self-center mr-1">Key vocab</span>
      {terms.map(t => (
        <span
          key={t}
          className="text-[12px] font-mono bg-mist border border-line rounded-lg px-2.5 py-1 text-inkDeep"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

// ─── Quiz block ───────────────────────────────────────────────────────────────
function QuizQuestion({ question, index }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  const isCorrect = selected === question.answer

  return (
    <div className="mb-6 last:mb-0">
      <p className="text-[15px] font-medium text-inkDeep mb-3 leading-snug">
        <span className="text-ink/50 mr-2">{index + 1}.</span>{question.q}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const isSelected = selected === i
          const isAnswer = i === question.answer
          let cls = 'border-line bg-white text-inkDeep hover:bg-mist'
          if (answered) {
            if (isAnswer) cls = 'border-sage bg-sage/25 text-inkDeep'
            else if (isSelected) cls = 'border-blush bg-blush/25 text-inkDeep'
            else cls = 'border-line bg-white/50 text-ink/50'
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-[14px] leading-snug transition ${cls} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className="inline-flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full border grid place-items-center text-[11px] shrink-0 ${
                  answered && isAnswer ? 'border-[#355839] bg-sage text-[#355839]' :
                  answered && isSelected && !isAnswer ? 'border-[#7A3B3B] bg-blush text-[#7A3B3B]' :
                  'border-line'
                }`}>
                  {answered && isAnswer ? '✓' : answered && isSelected && !isAnswer ? '✗' : ''}
                </span>
                {opt}
              </span>
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`mt-3 rounded-xl p-4 text-[14px] leading-relaxed ${isCorrect ? 'bg-sage/20 text-inkDeep' : 'bg-blush/20 text-inkDeep'}`}>
          <span className="font-semibold">{isCorrect ? 'Correct. ' : 'Not quite. '}</span>
          {question.explanation}
        </div>
      )}
    </div>
  )
}

export function QuizBlock({ questions }) {
  if (!questions?.length) return null
  return (
    <section id="quiz" className="scroll-mt-8">
      <h2 className="h-serif text-[26px] leading-tight mb-5">Quick check</h2>
      <div className="rounded-xl2 border border-line bg-paper p-6">
        {questions.map((q, i) => <QuizQuestion key={i} question={q} index={i} />)}
      </div>
    </section>
  )
}

// ─── Exercise block ───────────────────────────────────────────────────────────
export function ExerciseBlock({ exercise }) {
  if (!exercise) return null
  const [done, setDone] = useState(false)
  return (
    <section id="exercise" className="scroll-mt-8">
      <h2 className="h-serif text-[26px] leading-tight mb-4">Exercise</h2>
      <div className="rounded-xl2 border border-sky bg-sky/20 p-6">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#224A55]/70 mb-3">Try it now</div>
        <p className="text-[15px] leading-relaxed text-inkDeep">{exercise.prompt}</p>
        <button
          onClick={() => setDone(d => !d)}
          className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
            done ? 'bg-sky border-sky/60 text-[#224A55]' : 'bg-white border-line text-inkDeep hover:bg-sky/20'
          }`}
        >
          <span className={`w-4 h-4 rounded-full border grid place-items-center text-[10px] ${done ? 'bg-[#224A55] border-[#224A55] text-white' : 'border-line'}`}>
            {done ? '✓' : ''}
          </span>
          {done ? 'Done!' : 'Mark as done'}
        </button>
      </div>
    </section>
  )
}

// ─── Reflection block ─────────────────────────────────────────────────────────
export function ReflectionBlock({ reflection }) {
  if (!reflection) return null
  return (
    <section id="reflection" className="scroll-mt-8">
      <h2 className="h-serif text-[26px] leading-tight mb-4">Reflect</h2>
      <div className="rounded-xl2 border border-lilac bg-lilac/20 p-6">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#3A3E70]/70 mb-3">Take a moment</div>
        <p className="text-[15px] leading-relaxed text-inkDeep italic">"{reflection}"</p>
      </div>
    </section>
  )
}
