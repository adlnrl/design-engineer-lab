import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { ProgressProvider } from './hooks/useProgress.jsx'

import Dashboard from './features/Dashboard.jsx'
import Modules from './features/Modules.jsx'
import LessonView from './features/LessonView.jsx'
import Simulator from './features/Simulator.jsx'
import Codebase from './features/Codebase.jsx'
import Missions from './features/Missions.jsx'
import MissionView from './features/MissionView.jsx'
import Flashcards from './features/Flashcards.jsx'
import Glossary from './features/Glossary.jsx'
import Tips from './features/Tips.jsx'
import GitConcepts from './features/GitConcepts.jsx'
import CICD from './features/CICD.jsx'
import CourseList from './features/courses/CourseList.jsx'
import CourseLessonView from './features/courses/CourseLessonView.jsx'

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId/:lessonId" element={<CourseLessonView />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId/:lessonId" element={<LessonView />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/codebase" element={<Codebase />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/missions/:id" element={<MissionView />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/git" element={<GitConcepts />} />
          <Route path="/cicd" element={<CICD />} />
        </Route>
      </Routes>
    </ProgressProvider>
  )
}
