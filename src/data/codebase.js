// A simplified, realistic "Milli-like" codebase used for the Explorer.
// Each file has `code` (string) and `note` (plain-English explanation).
// The tree is a nested object of folders → files.

export const codebaseTree = {
  name: 'milli-app',
  kind: 'folder',
  children: [
    {
      name: 'package.json', kind: 'file', path: 'package.json', lang: 'json',
      note: `Lists dependencies and scripts. When you run npm install, this file tells npm what to fetch.`,
      code: `{
  "name": "milli-app",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-router-dom": "^6.26.2"
  }
}`
    },
    {
      name: 'README.md', kind: 'file', path: 'README.md', lang: 'md',
      note: `The human-first doc. Usually the fastest way to learn a repo without asking.`,
      code: `# Milli\nSafety check app. \n\n## Run\n\nnpm install && npm run dev`
    },
    {
      name: 'src',
      kind: 'folder',
      children: [
        {
          name: 'main.jsx', kind: 'file', path: 'src/main.jsx', lang: 'jsx',
          note: `The entry. It mounts <App /> into the page.`,
          code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root'))
  .render(<App />)`
        },
        {
          name: 'App.jsx', kind: 'file', path: 'src/App.jsx', lang: 'jsx',
          note: `Top-level component. Wires router + layout.`,
          code: `import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SafetyCheck from './pages/SafetyCheck.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/safety" element={<SafetyCheck />} />
    </Routes>
  )
}`
        },
        {
          name: 'pages',
          kind: 'folder',
          children: [
            {
              name: 'Home.jsx', kind: 'file', path: 'src/pages/Home.jsx', lang: 'jsx',
              note: `A page component. It composes feature pieces but contains little logic itself.`,
              code: `import SafetyCheckButton from '../features/safety-check/SafetyCheckButton.jsx'
import FriendsStatus from '../features/friends/FriendsStatus.jsx'

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl">Hi, Adila</h1>
      <SafetyCheckButton />
      <FriendsStatus />
    </main>
  )
}`
            },
            {
              name: 'SafetyCheck.jsx', kind: 'file', path: 'src/pages/SafetyCheck.jsx', lang: 'jsx',
              note: `The live safety-check screen (started after the user taps the button on Home).`,
              code: `export default function SafetyCheck() {
  return <main className="p-6">Safety check in progress…</main>
}`
            }
          ]
        },
        {
          name: 'features',
          kind: 'folder',
          children: [
            {
              name: 'safety-check',
              kind: 'folder',
              children: [
                {
                  name: 'SafetyCheckButton.jsx', kind: 'file',
                  path: 'src/features/safety-check/SafetyCheckButton.jsx', lang: 'jsx',
                  note: `The product-specific button. It knows what to do when tapped.
It composes the generic <Button> primitive — so sizing/color lives there.`,
                  code: `import Button from '../../components/Button.jsx'
import { useNavigate } from 'react-router-dom'

export default function SafetyCheckButton() {
  const navigate = useNavigate()
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => navigate('/safety')}
    >
      Start Safety Check
    </Button>
  )
}`
                }
              ]
            },
            {
              name: 'friends',
              kind: 'folder',
              children: [
                {
                  name: 'useFriends.js', kind: 'file',
                  path: 'src/features/friends/useFriends.js', lang: 'js',
                  note: `A custom hook. It owns the list of friends and returns helpers.`,
                  code: `import { useState } from 'react'

export function useFriends() {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Sana' },
    { id: 2, name: 'Eli' },
    { id: 3, name: 'Kim' }
  ])
  const notifiedCount = friends.filter(f => f.notified).length
  return { friends, notifiedCount, setFriends }
}`
                },
                {
                  name: 'FriendsStatus.jsx', kind: 'file',
                  path: 'src/features/friends/FriendsStatus.jsx', lang: 'jsx',
                  note: `The UI that shows how many friends have been notified.`,
                  code: `import { useFriends } from './useFriends.js'

export default function FriendsStatus() {
  const { friends, notifiedCount } = useFriends()
  return (
    <section className="rounded-xl bg-white p-4">
      <p>{notifiedCount} of {friends.length} friends notified</p>
    </section>
  )
}`
                }
              ]
            }
          ]
        },
        {
          name: 'components',
          kind: 'folder',
          children: [
            {
              name: 'Button.jsx', kind: 'file', path: 'src/components/Button.jsx', lang: 'jsx',
              note: `The generic button primitive. Sizes, variants, and tokens live here.
This is the file you edit when a visual-only change is needed.`,
              code: `const sizes = { sm: 'h-9 px-3', md: 'h-11 px-4', lg: 'h-13 px-5' }
const variants = {
  primary:   'bg-ink text-white',
  secondary: 'bg-mist text-ink border border-line'
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...rest }) {
  return (
    <button
      className={\`rounded-full \${sizes[size]} \${variants[variant]} \${className}\`}
      {...rest}
    />
  )
}`
            },
            {
              name: 'Card.jsx', kind: 'file', path: 'src/components/Card.jsx', lang: 'jsx',
              note: `A generic content container.`,
              code: `export default function Card({ children, className = '' }) {
  return (
    <div className={\`rounded-2xl bg-white p-4 \${className}\`}>{children}</div>
  )
}`
            }
          ]
        },
        {
          name: 'hooks',
          kind: 'folder',
          children: [
            {
              name: 'useLocalStorage.js', kind: 'file', path: 'src/hooks/useLocalStorage.js', lang: 'js',
              note: `A reusable hook. Persists a piece of state to the browser between visits.`,
              code: `import { useEffect, useState } from 'react'
export function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v])
  return [v, setV]
}`
            }
          ]
        },
        {
          name: 'utils',
          kind: 'folder',
          children: [
            {
              name: 'format.js', kind: 'file', path: 'src/utils/format.js', lang: 'js',
              note: `Small pure helpers. No React here.`,
              code: `export const pluralise = (n, one, many) => n === 1 ? one : many`
            }
          ]
        }
      ]
    }
  ]
}

// Flattened lookup for search and path-based navigation.
export function flattenFiles(tree = codebaseTree, acc = []) {
  if (tree.kind === 'file') acc.push(tree)
  if (tree.children) tree.children.forEach(c => flattenFiles(c, acc))
  return acc
}
