export default function PageHeader({ eyebrow, title, lede, right }) {
  return (
    <header className="mb-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          {eyebrow && (
            <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink/70 mb-2">
              {eyebrow}
            </div>
          )}
          <h1 className="h-serif text-[44px] leading-[1.05]">{title}</h1>
          {lede && <p className="mt-3 text-[15px] text-ink max-w-[62ch] leading-relaxed">{lede}</p>}
        </div>
        {right}
      </div>
    </header>
  )
}
