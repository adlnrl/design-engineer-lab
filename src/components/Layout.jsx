import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useMatch } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { LayoutContext } from '../context/LayoutContext.jsx'

const NAV = [
  { group: 'Start here', items: [
    { to: '/', label: 'Dashboard', emoji: '✿' }
  ]},
  { group: 'Courses', items: [
    { to: '/courses', label: 'Courses', emoji: '◈' }
  ]},
  { group: 'Learn', items: [
    { to: '/modules',    label: 'Modules',          emoji: '✦' },
    { to: '/simulator',  label: 'React simulator',  emoji: '✧' },
    { to: '/codebase',   label: 'Codebase explorer',emoji: '❋' }
  ]},
  { group: 'Practice', items: [
    { to: '/missions',   label: 'Work simulator',   emoji: '✶' },
    { to: '/flashcards', label: 'Flashcards',       emoji: '❀' }
  ]},
  { group: 'Reference', items: [
    { to: '/git',        label: 'Git concepts',     emoji: '✺' },
    { to: '/cicd',       label: 'CI/CD flow',       emoji: '✹' },
    { to: '/tips',       label: 'Designer tips',    emoji: '✤' },
    { to: '/glossary',   label: 'Glossary',         emoji: '✱' }
  ]}
]

export default function Layout() {
  const { touchVisit } = useProgress()
  const loc = useLocation()
  const [navCollapsed, setNavCollapsed] = useLocalStorage('del:nav:collapsed', false)
  const isCourseLesson = !!useMatch('/courses/:courseId/:lessonId')

  useEffect(() => { touchVisit() }, [touchVisit])
  useEffect(() => { window.scrollTo({ top: 0 }) }, [loc.pathname])

  return (
    <LayoutContext.Provider value={{ navCollapsed, setNavCollapsed }}>
      <div className="min-h-screen flex">
        {/* Nav sidebar */}
        <aside
          className={`shrink-0 bg-mist border-r border-line sticky top-0 h-screen overflow-y-auto flex flex-col transition-all duration-200 ${
            navCollapsed ? 'w-[52px]' : 'w-[260px]'
          }`}
        >
          {/* Logo + collapse toggle */}
          <div className={`flex items-center border-b border-line shrink-0 ${navCollapsed ? 'justify-center px-0 py-5' : 'justify-between px-6 py-5'}`}>
            {!navCollapsed && (
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-full bg-inkDeep text-white grid place-items-center font-serif text-lg shrink-0">d</span>
                <span className="font-serif text-[15px] text-inkDeep truncate">Design Engineer Lab</span>
              </div>
            )}
            {navCollapsed && (
              <span className="w-7 h-7 rounded-full bg-inkDeep text-white grid place-items-center font-serif text-lg">d</span>
            )}
            {!navCollapsed && (
              <button
                onClick={() => setNavCollapsed(true)}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-ink/50 hover:text-ink hover:bg-white/60 transition"
                title="Collapse sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Nav items */}
          <nav className={`flex-1 py-4 ${navCollapsed ? 'px-1.5' : 'px-3'}`}>
            {NAV.map(group => (
              <div key={group.group} className={navCollapsed ? 'mb-2' : 'mb-5'}>
                {!navCollapsed && (
                  <div className="px-3 text-[11px] font-semibold tracking-wider uppercase text-ink/60 mb-1.5">
                    {group.group}
                  </div>
                )}
                {group.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    title={navCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl text-sm transition mb-0.5 ${
                        navCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'
                      } ${
                        isActive
                          ? 'bg-white shadow-soft text-inkDeep font-medium'
                          : 'text-ink hover:bg-white/60'
                      }`
                    }
                  >
                    <span className={`text-center ${navCollapsed ? 'text-[16px]' : 'w-5 text-ink/70'}`}>{item.emoji}</span>
                    {!navCollapsed && item.label}
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>

          {/* Expand button when collapsed */}
          {navCollapsed && (
            <div className="shrink-0 px-1.5 pb-4">
              <button
                onClick={() => setNavCollapsed(false)}
                className="w-full flex items-center justify-center py-2 rounded-xl text-ink/50 hover:text-ink hover:bg-white/60 transition"
                title="Expand sidebar"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          {isCourseLesson ? (
            <Outlet />
          ) : (
            <div className="max-w-5xl mx-auto px-10 py-10">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </LayoutContext.Provider>
  )
}
