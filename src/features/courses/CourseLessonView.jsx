import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCourseLesson } from '../../data/courses.js'
import { useLayout } from '../../context/LayoutContext.jsx'
import { useProgress } from '../../hooks/useProgress.jsx'
import LeftTOC from './LeftTOC.jsx'
import RightSidebar from './RightSidebar.jsx'
import {
  LessonSection,
  VocabStrip,
  QuizBlock,
  ExerciseBlock,
  ReflectionBlock
} from './LessonSection.jsx'

export default function CourseLessonView() {
  const { courseId, lessonId } = useParams()
  const { navCollapsed } = useLayout()
  const { state, completeLesson } = useProgress()
  const nav = useNavigate()

  const found = getCourseLesson(courseId, lessonId)
  if (!found) {
    return (
      <div className="flex items-center justify-center h-64 text-ink">
        Lesson not found. <Link to="/courses" className="ml-2 underline">Back to courses</Link>
      </div>
    )
  }

  const { course, lesson, lessonIndex, prev, next } = found
  const done = !!state.lessons?.[course.id]?.[lesson.id]

  // Build TOC items: all sections + optional quiz/exercise/reflection
  const tocItems = [
    ...lesson.sections.map(s => ({ id: s.id, heading: s.heading })),
    ...(lesson.quiz?.length ? [{ id: 'quiz', heading: 'Quick check' }] : []),
    ...(lesson.exercise ? [{ id: 'exercise', heading: 'Exercise' }] : []),
    ...(lesson.reflection ? [{ id: 'reflection', heading: 'Reflect' }] : [])
  ]

  const handleComplete = () => {
    completeLesson(course.id, lesson.id)
    if (next) nav(`/courses/${course.id}/${next.id}`)
    else nav(`/courses`)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left sticky TOC */}
      <LeftTOC
        course={course}
        lesson={lesson}
        lessonIndex={lessonIndex}
        tocItems={tocItems}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <div className="max-w-[700px] mx-auto px-10 py-10">

          {/* Lesson header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-ink/50">
                Lesson {lessonIndex + 1} of {course.lessons.length}
              </span>
              <span className="text-line">·</span>
              <span className="text-[11px] text-ink/50">{lesson.duration}</span>
              {done && (
                <>
                  <span className="text-line">·</span>
                  <span className="text-[11px] font-semibold text-[#355839]/80 bg-sage/30 px-2 py-0.5 rounded-full">
                    Completed
                  </span>
                </>
              )}
            </div>
            <h1 className="h-serif text-[40px] leading-[1.05]">{lesson.title}</h1>
            <p className="mt-3 text-[15px] text-ink leading-relaxed max-w-[55ch]">{lesson.summary}</p>
          </header>

          {/* Sections */}
          <div className="space-y-12">
            {lesson.sections.map(section => (
              <LessonSection key={section.id} section={section} />
            ))}
          </div>

          {/* Vocab */}
          <div className="mt-12">
            <VocabStrip terms={lesson.vocab} />
          </div>

          {/* Quiz */}
          {lesson.quiz?.length > 0 && (
            <div className="mt-12">
              <QuizBlock questions={lesson.quiz} />
            </div>
          )}

          {/* Exercise */}
          {lesson.exercise && (
            <div className="mt-12">
              <ExerciseBlock exercise={lesson.exercise} />
            </div>
          )}

          {/* Reflection */}
          {lesson.reflection && (
            <div className="mt-12">
              <ReflectionBlock reflection={lesson.reflection} />
            </div>
          )}

          {/* Completion + navigation */}
          <div className="mt-14 pt-8 border-t border-line flex items-center justify-between gap-4">
            <div>
              {prev && (
                <Link
                  to={`/courses/${course.id}/${prev.id}`}
                  className="inline-flex items-center gap-2 text-sm text-ink hover:text-inkDeep transition"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {prev.title}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!done && (
                <button className="btn" onClick={() => completeLesson(course.id, lesson.id)}>
                  Mark done
                </button>
              )}
              <button className="btn-primary" onClick={handleComplete}>
                {next ? 'Next lesson →' : 'Finish course →'}
              </button>
            </div>
          </div>

          <div className="h-20" />
        </div>
      </div>

      {/* Right sidebar — shown only when nav is collapsed */}
      {navCollapsed && (
        <RightSidebar items={lesson.rightSidebar} />
      )}
    </div>
  )
}
