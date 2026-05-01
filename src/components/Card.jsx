export function Card({ as: Tag = 'div', tone = 'paper', className = '', children, ...rest }) {
  const tones = {
    paper: 'bg-paper',
    sky:   'bg-sky/70',
    sage:  'bg-sage/70',
    lilac: 'bg-lilac/70',
    blush: 'bg-blush/70',
    mist:  'bg-mist'
  }
  return (
    <Tag
      className={`rounded-xl2 border border-line shadow-soft ${tones[tone] || tones.paper} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Chip({ tone = 'lilac', children, className = '' }) {
  const tones = {
    sky:   'bg-sky/60 text-[#224A55]',
    sage:  'bg-sage/70 text-[#355839]',
    lilac: 'bg-lilac/60 text-[#3A3E70]',
    blush: 'bg-blush/70 text-[#7A3B3B]',
    ink:   'bg-inkDeep text-white'
  }
  return <span className={`chip ${tones[tone] || tones.lilac} ${className}`}>{children}</span>
}
