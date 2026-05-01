const TYPE_STYLES = {
  fact: {
    bg: 'bg-blush/30',
    border: 'border-blush',
    label: 'Did you know?',
    labelColor: 'text-[#7A3B3B]/70',
    dot: 'bg-blush'
  },
  inPractice: {
    bg: 'bg-sage/25',
    border: 'border-sage',
    label: 'In your design work',
    labelColor: 'text-[#355839]/70',
    dot: 'bg-sage'
  },
  askEngineer: {
    bg: 'bg-sky/20',
    border: 'border-sky',
    label: 'Questions to ask engineers',
    labelColor: 'text-[#224A55]/70',
    dot: 'bg-sky'
  }
}

function SidebarCard({ item }) {
  const styles = TYPE_STYLES[item.type] ?? TYPE_STYLES.fact

  return (
    <div className={`rounded-xl2 border ${styles.border} ${styles.bg} p-4`}>
      <div className={`text-[11px] font-semibold tracking-[0.12em] uppercase ${styles.labelColor} mb-2.5`}>
        {styles.label}
      </div>

      {item.body && (
        <p className="text-[13px] leading-relaxed text-inkDeep">{item.body}</p>
      )}

      {item.items && (
        <ul className="space-y-2">
          {item.items.map((q, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-inkDeep">
              <span className="mt-[5px] shrink-0 w-1 h-1 rounded-full bg-ink/40" />
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function RightSidebar({ items }) {
  if (!items?.length) return null

  return (
    <div className="w-[260px] shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-line bg-paper">
      <div className="px-5 pt-7 pb-4 border-b border-line">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/40">
          Context & tips
        </div>
      </div>
      <div className="px-4 py-5 space-y-4">
        {items.map((item, i) => (
          <SidebarCard key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
