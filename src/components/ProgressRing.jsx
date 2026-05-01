export default function ProgressRing({ value = 0, size = 64, stroke = 6, tone = '#5D5D5A', label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  const dash = c * pct

  return (
    <div className="inline-flex items-center gap-3">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EFEAE1" strokeWidth={stroke} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={tone}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      {label && <span className="text-sm text-ink">{label}</span>}
    </div>
  )
}
