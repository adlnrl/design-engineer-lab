import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

const ProgressCtx = createContext(null)

const DEFAULT = {
  lessons: {},     // { moduleId: { lessonId: true } }
  missions: {},    // { missionId: 'done' | 'attempted' }
  flashcards: {},  // { cardId: { seen: n, correct: n } }
  lastVisited: null,
  streak: 0,
  visitedDays: []  // ISO date strings
}

function todayISO() { return new Date().toISOString().slice(0, 10) }

export function ProgressProvider({ children }) {
  const [state, setState] = useLocalStorage('del:progress:v1', DEFAULT)

  const completeLesson = useCallback((moduleId, lessonId) => {
    setState(s => ({
      ...s,
      lessons: {
        ...s.lessons,
        [moduleId]: { ...(s.lessons[moduleId] || {}), [lessonId]: true }
      },
      lastVisited: { moduleId, lessonId, at: Date.now() }
    }))
  }, [setState])

  const completeMission = useCallback((id, status = 'done') => {
    setState(s => ({ ...s, missions: { ...s.missions, [id]: status } }))
  }, [setState])

  const recordFlashcard = useCallback((id, correct) => {
    setState(s => {
      const prev = s.flashcards[id] || { seen: 0, correct: 0 }
      return {
        ...s,
        flashcards: {
          ...s.flashcards,
          [id]: { seen: prev.seen + 1, correct: prev.correct + (correct ? 1 : 0) }
        }
      }
    })
  }, [setState])

  const touchVisit = useCallback(() => {
    const t = todayISO()
    setState(s => s.visitedDays.includes(t) ? s : { ...s, visitedDays: [...s.visitedDays, t] })
  }, [setState])

  const resetAll = useCallback(() => setState(DEFAULT), [setState])

  const value = useMemo(() => ({
    state,
    completeLesson,
    completeMission,
    recordFlashcard,
    touchVisit,
    resetAll
  }), [state, completeLesson, completeMission, recordFlashcard, touchVisit, resetAll])

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressCtx)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
