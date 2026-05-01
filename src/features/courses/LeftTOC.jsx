import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// IntersectionObserver-based active section tracker
function useActiveSectionId(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)
  const visibleRef = useRef(new Set())

  useEffect(() => {
    if (!ids.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visibleRef.current.add(entry.target.id)
          else visibleRef.current.delete(entry.target.id)
        })
        const first = ids.find(id => visibleRef.current.has(id))
        if (first) setActiveId(first)
      },
      { rootMargin: '0px 0px -72% 0px', threshold: 0 }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Fallback: when near the top of the page and nothing is intersecting, activate first item
    function onScroll() {
      if (window.scrollY < 120 && visibleRef.current.size === 0) {
        setActiveId(ids[0])
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids.join(',')])  // eslint-disable-line

  return activeId
}

export default function LeftTOC({ course, lesson, lessonIndex, tocItems }) {
  const sectionIds = tocItems.map(t => t.id)
  const activeId = useActiveSectionId(sectionIds)

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 32
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="w-[220px] shrink-0 sticky top-0 h-screen overflow-y-auto bg-mist border-r border-line flex flex-col">
      {/* Course / lesson meta */}
      <div className="px-5 pt-7 pb-5 border-b border-line shrink-0">
        <Link
          to={`/courses`}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/50 hover:text-ink transition inline-flex items-center gap-1.5 mb-3"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {course.title}
        </Link>
        <div className="text-[11px] text-ink/50 mb-1.5">
          Lesson {lessonIndex + 1} of {course.lessons.length}
        </div>
        <p className="text-[13px] font-medium text-inkDeep leading-snug">{lesson.title}</p>

        {/* Lesson progress dots */}
        <div className="flex gap-1.5 mt-3">
          {course.lessons.map((l, i) => (
            <Link
              key={l.id}
              to={`/courses/${course.id}/${l.id}`}
              title={l.title}
              className={`h-1.5 rounded-full transition-all ${
                i === lessonIndex
                  ? 'bg-inkDeep w-4'
                  : i < lessonIndex
                  ? 'bg-inkDeep/40 w-1.5'
                  : 'bg-line w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* TOC items */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/40 px-3 mb-3">
          On this page
        </div>
        <ul className="space-y-0.5">
          {tocItems.map((item) => {
            const isActive = item.id === activeId
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[13px] leading-snug transition-all ${
                    isActive
                      ? 'text-inkDeep font-medium bg-white/70 shadow-ring'
                      : 'text-ink/60 hover:text-ink hover:bg-white/40'
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1 h-1 rounded-full bg-inkDeep mr-2 mb-0.5 align-middle" />
                  )}
                  {item.heading}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Duration badge */}
      <div className="px-5 py-4 border-t border-line shrink-0">
        <span className="text-[11px] text-ink/50">⏱ {lesson.duration} read</span>
      </div>
    </div>
  )
}
