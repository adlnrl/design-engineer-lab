import { course01 } from './courses/course-01-internet.js'

export const courses = [course01]

export function getCourse(id) {
  return courses.find(c => c.id === id) ?? null
}

export function getCourseLesson(courseId, lessonId) {
  const course = getCourse(courseId)
  if (!course) return null
  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId)
  if (lessonIndex < 0) return null
  return {
    course,
    lesson: course.lessons[lessonIndex],
    lessonIndex,
    prev: course.lessons[lessonIndex - 1] ?? null,
    next: course.lessons[lessonIndex + 1] ?? null
  }
}
