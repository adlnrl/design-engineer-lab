export default function CodeBlock({ children, language = 'jsx', className = '' }) {
  return (
    <pre className={`font-mono text-[12.5px] leading-relaxed bg-[#1C1C1A] text-[#EDE7D9] rounded-xl2 p-4 overflow-auto ${className}`}>
      <code data-lang={language}>{children}</code>
    </pre>
  )
}
