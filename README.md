# Design Engineer Lab

A calm, offline-friendly, interactive lab that helps designers build real
intuition for React, codebases, Git, and CI/CD — without the terminal.

Inspired visually by [Tines](https://www.tines.com). Built for you, Adila.

---

## 1. How to run it locally

Requirements: Node 18+ and npm.

```
cd design-engineer-lab
npm install
npm run dev
```

It opens on `http://localhost:5173`. After the first install the app runs
fully offline (fonts are cached by the browser on first load).

To build a static bundle:

```
npm run build
npm run preview
```

Progress is saved to your browser's `localStorage` — nothing leaves the device.

---

## 2. Product plan (what you'll find inside)

Ten things, grouped by intent:

| Group     | Screen              | What it teaches |
|-----------|---------------------|------------------|
| Start     | **Dashboard**       | Continue-learning, today's focus, weak areas, quick resume. |
| Learn     | **Modules**         | Lessons on components, props, state, events, rendering, styling, structure, Git, CI/CD, workflow. |
| Learn     | **React Simulator** | Live demos: tree, props, state, modal, controlled form, re-render highlight. |
| Learn     | **Codebase Explorer** | A simulated Milli-style repo. Click files, read plain-English notes. |
| Practice  | **Work Simulator**  | 2–4 minute missions: find a component, trace a bug, review a PR, spec a change. |
| Practice  | **Flashcards**      | Tiny decks for React, Git, CI/CD, Codebase, Design. Self-grade. |
| Reference | **Git concepts**    | Visual timeline. No commands. |
| Reference | **CI/CD flow**      | Animated pipeline with failure scenarios. |
| Reference | **Designer tips**   | Small habits that compound on the job. |
| Reference | **Glossary**        | Every hoverable term, in one place. |

Explicitly **not** included: terminal/CLI lessons. You already have Terminal
Dojo for that.

---

## 3. UI system

- Palette: `mist` (#F8F6F5), `sky` (#CDEBF1), `sage` (#DEF1D0), `lilac` (#CBCEEA),
  `blush` (#F8E5E5), `ink` (#5D5D5A), `inkDeep` (#2E2E2C)
- Typography: **Instrument Serif** (headings), **Figtree** (UI), **JetBrains Mono**
  (code — a free stand-in for Google Sans Code)
- Primitives live in `src/components/`:
  - `Card`, `Chip` — rounded, soft, tone-tinted surfaces
  - `Term` — hoverable glossary term (powers inline jargon tooltips)
  - `CodeBlock` — dark mono block for examples
  - `GridBackdrop` — subtle grid pattern echoing the Tines pages
  - `ProgressRing` — SVG donut for completion
  - `PageHeader` — eyebrow + serif title + lede + slot for actions
  - `Layout` — sidebar + main

---

## 4. Codebase tour (learn from the app itself)

```
design-engineer-lab/
├── index.html              ← app shell; loads fonts
├── vite.config.js          ← Vite config; serves /src
├── tailwind.config.js      ← design tokens (colors + fonts)
├── postcss.config.js       ← tailwind + autoprefixer pipeline
├── src/
│   ├── main.jsx            ← entry; mounts <App /> inside <BrowserRouter>
│   ├── App.jsx             ← route table
│   ├── index.css           ← tailwind layers + .card/.btn/.input recipes
│   │
│   ├── components/         ← reusable UI primitives
│   │   ├── Layout.jsx
│   │   ├── PageHeader.jsx
│   │   ├── Card.jsx
│   │   ├── CodeBlock.jsx
│   │   ├── GridBackdrop.jsx
│   │   ├── ProgressRing.jsx
│   │   └── Term.jsx        ← hoverable glossary tooltip
│   │
│   ├── features/           ← one folder or file per "screen"
│   │   ├── Dashboard.jsx
│   │   ├── Modules.jsx
│   │   ├── LessonView.jsx
│   │   ├── lesson/
│   │   │   └── LessonVisual.jsx   ← the interactive element per lesson
│   │   ├── Simulator.jsx
│   │   ├── Codebase.jsx
│   │   ├── Missions.jsx
│   │   ├── MissionView.jsx
│   │   ├── Flashcards.jsx
│   │   ├── Glossary.jsx
│   │   ├── Tips.jsx
│   │   ├── GitConcepts.jsx
│   │   └── CICD.jsx
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js    ← persists any state to localStorage
│   │   └── useProgress.jsx       ← global progress context; lessons/missions/flashcards
│   │
│   └── data/
│       ├── modules.js       ← module & lesson content
│       ├── missions.js      ← mission scenarios
│       ├── flashcards.js    ← decks
│       ├── glossary.js      ← every hoverable term
│       ├── tips.js          ← designer tips
│       └── codebase.js      ← the simulated Milli repo
```

**Reading tip:** start at `src/main.jsx`, follow `App.jsx` to the route for
whatever page you're curious about, then open its file in `src/features/`. Every
screen composes primitives from `src/components/` — so changes to look & feel
usually live there.

---

## 5. How to extend later

- **Add a lesson:** edit `src/data/modules.js`. Add a new `lesson` object to a
  module's `lessons` array. If you want a custom visual, add a case to
  `src/features/lesson/LessonVisual.jsx`.
- **Add a mission:** edit `src/data/missions.js`. Each mission has `steps[]`
  with an options list and a `why` explanation.
- **Add a flashcard:** add to `src/data/flashcards.js`. Pick an existing deck or
  a new one (the filter chips are derived at render time).
- **Add a glossary term:** add to `src/data/glossary.js`. Use `<Term id="…">`
  anywhere in JSX — the tooltip is automatic.
- **Add to the simulated codebase:** add a file node to `src/data/codebase.js`.
  It shows up in the Explorer with its note and code.
- **Theme it:** edit `tailwind.config.js` colors. Every screen uses tone props
  (`sage`, `sky`, `lilac`, `blush`) so a palette swap flows through.

Enjoy the lab.
