export default function GridBackdrop({ tone = 'sage', children, className = '' }) {
  const tones = {
    sage: 'bg-sage/40',
    sky:  'bg-sky/40',
    lilac:'bg-lilac/40',
    blush:'bg-blush/50',
    mist: 'bg-mist'
  }
  return (
    <div className={`relative overflow-hidden rounded-xl2 border border-line ${tones[tone]} ${className}`}>
      <div className="absolute inset-0 soft-grid opacity-60 pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  )
}
