export const glossary = {
  component: {
    term: 'Component',
    short: 'A reusable piece of UI. A function that returns markup.',
    why: 'Thinking in components is how you move from screens to code.',
    example: 'A `<Button>` used in 12 places is one component, not twelve.'
  },
  props: {
    term: 'Props',
    short: 'Inputs passed into a component from its parent.',
    why: 'Props are how parents tell children what to show.',
    example: '<Button label="Save" variant="primary" />'
  },
  state: {
    term: 'State',
    short: 'Data a component owns that can change over time.',
    why: 'When state changes, React re-renders that component.',
    example: 'isOpen, count, inputValue'
  },
  rerender: {
    term: 'Re-render',
    short: 'React re-runs the component function to produce fresh UI.',
    why: 'Helps explain why the UI updates after a click or input.',
    example: 'setCount(1) → Counter re-renders with "1"'
  },
  event: {
    term: 'Event',
    short: 'A user action like click, type, hover, submit.',
    why: 'Events are how state changes get kicked off.',
    example: 'onClick={() => setOpen(true)}'
  },
  hook: {
    term: 'Hook',
    short: 'A special function (starts with use) that plugs into React features.',
    why: 'Hooks are how a function component gets state, effects, and context.',
    example: 'useState, useEffect, useMemo'
  },
  tree: {
    term: 'Component tree',
    short: 'The nested structure of components at runtime.',
    why: 'Bugs often live at a level in the tree. Knowing the tree speeds debugging.',
    example: 'App → Layout → Sidebar → NavItem'
  },
  tailwind: {
    term: 'Tailwind',
    short: 'Utility-first CSS. Style by composing small class names.',
    why: 'Lets you style inline without jumping to a stylesheet.',
    example: 'className="rounded-xl bg-sky px-4 py-2"'
  },
  repo: {
    term: 'Repo',
    short: 'A Git-tracked folder of code and history.',
    why: 'The unit of a project. All branches and commits live here.',
    example: 'genvis/milli-app'
  },
  branch: {
    term: 'Branch',
    short: 'A parallel line of commits that can diverge from main.',
    why: 'Lets you work on changes without disturbing shipped code.',
    example: 'feat/safety-check-redesign'
  },
  commit: {
    term: 'Commit',
    short: 'A saved snapshot of changes with a message.',
    why: 'The atomic unit of change. Reviewable, revertable.',
    example: '"fix: safety-check button misaligned on iOS"'
  },
  pr: {
    term: 'Pull request',
    short: 'A proposal to merge one branch into another, reviewed by people or CI.',
    why: 'Where design, code, and compliance conversations happen.',
    example: 'PR #482 — Redesign safety check'
  },
  merge: {
    term: 'Merge',
    short: 'Combining the commits of one branch into another.',
    why: 'Once merged to main, the change becomes part of what ships.',
    example: 'Squash-merge feat/… into main'
  },
  ci: {
    term: 'CI',
    short: 'Continuous Integration — automated checks on every push.',
    why: 'Catches broken tests and lints before review.',
    example: 'GitHub Actions runs build + tests on every PR.'
  },
  cd: {
    term: 'CD',
    short: 'Continuous Delivery — automated deploys after checks pass.',
    why: 'Reduces human error between merge and release.',
    example: 'main branch deploys to staging automatically.'
  },
  build: {
    term: 'Build',
    short: 'Turning source code into an optimized bundle the browser can run.',
    why: 'What "it works on my machine" sometimes doesn’t translate to.',
    example: 'vite build → /dist'
  },
  deploy: {
    term: 'Deploy',
    short: 'Publishing the built app to a server users can reach.',
    why: 'A successful deploy is what makes a design actually live.',
    example: 'Preview URL for PR #482'
  },
  dependency: {
    term: 'Dependency',
    short: 'An external package the app relies on.',
    why: 'Version mismatches are a common source of weird bugs.',
    example: 'react, react-router-dom'
  },
  hoc: {
    term: 'Render tree',
    short: 'The current live tree React is rendering to the screen.',
    why: 'What DevTools shows; how to locate a UI element in code.',
    example: 'Inspect → Components panel'
  }
}
