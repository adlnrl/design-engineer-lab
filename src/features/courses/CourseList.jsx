import { Link } from 'react-router-dom'
import { Card, Chip } from '../../components/Card.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import { courses } from '../../data/courses.js'
import { useProgress } from '../../hooks/useProgress.jsx'

const TONE_DOT = {
  sky: 'bg-sky',
  sage: 'bg-sage',
  lilac: 'bg-lilac',
  blush: 'bg-blush'
}

export default function CourseList() {
  const { state } = useProgress()

  return (
    <div>
      <PageHeader
        eyebrow="Courses"
        title="Your curriculum"
        lede="Structured learning paths that build your mental models from the ground up. Each course is a complete topic, told in order."
      />

      <div className="grid grid-cols-1 gap-5">
        {courses.map((course, i) => {
          const completedCount = course.lessons.filter(
            l => state.lessons?.[course.id]?.[l.id]
          ).length
          const pct = completedCount / course.lessons.length

          return (
            <Card key={course.id} tone={course.tone} className="p-8">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink/60">
                      Course {String(i + 1).padStart(2, '0')}
                    </span>
                    <Chip tone={course.tone}>{completedCount}/{course.lessons.length} lessons</Chip>
                  </div>
                  <h2 className="h-serif text-[32px] leading-tight">{course.title}</h2>
                  <p className="text-ink text-[14.5px] mt-1 font-medium">{course.subtitle}</p>
                  <p className="text-ink text-sm mt-3 leading-relaxed max-w-[60ch]">{course.description}</p>

                  {/* Progress bar */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex-1 max-w-[200px] h-1.5 rounded-full bg-white/60">
                      <div
                        className="h-full rounded-full bg-inkDeep/40 transition-all"
                        style={{ width: `${pct * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-ink/70">{Math.round(pct * 100)}% complete</span>
                  </div>

                  {/* Lesson list */}
                  <ul className="mt-6 space-y-2">
                    {course.lessons.map((lesson, li) => {
                      const done = state.lessons?.[course.id]?.[lesson.id]
                      return (
                        <li key={lesson.id}>
                          <Link
                            to={`/courses/${course.id}/${lesson.id}`}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/60 hover:bg-white transition group"
                          >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${done ? 'bg-inkDeep' : 'bg-line'}`} />
                            <span className="text-sm text-inkDeep flex-1">{lesson.title}</span>
                            <span className="text-xs text-ink/50">{lesson.duration}</span>
                            <span className="text-ink/30 group-hover:text-ink/60 transition">→</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="shrink-0 text-right hidden lg:block">
                  <div className="text-[48px] font-serif text-inkDeep/10 leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-ink/60 mt-1">{course.duration} total</div>
                  <Link
                    to={`/courses/${course.id}/${course.lessons[0].id}`}
                    className="btn-primary mt-4 inline-flex"
                  >
                    {completedCount === 0 ? 'Start course →' : 'Continue →'}
                  </Link>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Coming soon placeholder */}
      <div className="mt-5 rounded-xl2 border border-dashed border-line p-8 text-center">
        <p className="text-sm text-ink/60">More courses coming soon — Browser & Runtime, HTML/CSS/JS, APIs & Data Flow, and more.</p>
      </div>
    </div>
  )
}
