// A module is a topic. Each module has short lessons.
// Lessons are mini-cards: a plain-English explanation, a visual cue,
// a real example, why-it-matters, and an interactive element key.

export const modules = [
  {
    id: 'components',
    title: 'Components',
    tone: 'lilac',
    summary: 'Reusable pieces of UI. The atoms of a React app.',
    lessons: [
      {
        id: 'what-is-a-component',
        title: 'What is a component?',
        body: `A component is a function that returns UI. If you use the same shape in multiple places — a button, a card, a modal — it's a component.`,
        why: `When you design, you think in reusable pieces. Code works the same way. A button in Figma = a <Button> in code.`,
        example: `<Button label="Save" variant="primary" />`,
        visual: 'tree',
        terms: ['component', 'tree']
      },
      {
        id: 'tree',
        title: 'The component tree',
        body: `Components nest inside other components. That nesting is the "tree". App → Layout → Sidebar → NavItem.`,
        why: `When something looks wrong on screen, the fastest fix is locating where in the tree the UI is built.`,
        example: `App\n└─ Layout\n   ├─ Sidebar\n   │  └─ NavItem\n   └─ Main`,
        visual: 'tree',
        terms: ['tree', 'rerender']
      }
    ]
  },
  {
    id: 'props',
    title: 'Props — data in',
    tone: 'sky',
    summary: 'How a parent component passes data to a child.',
    lessons: [
      {
        id: 'basics',
        title: 'Props are inputs',
        body: `Props are the arguments a component receives. The parent decides what the child shows.`,
        why: `If you change a label in design, the underlying change in code is almost always a prop.`,
        example: `<Badge tone="sage">New</Badge>`,
        visual: 'props',
        terms: ['props', 'component']
      }
    ]
  },
  {
    id: 'state',
    title: 'State — what changes',
    tone: 'sage',
    summary: 'Data a component owns. Changing it re-renders the UI.',
    lessons: [
      {
        id: 'what-is-state',
        title: 'State = memory',
        body: `State is the small piece of memory a component keeps. When it changes, React runs the component again to produce fresh UI.`,
        why: `"Why did my screen update?" — the answer is almost always: state changed.`,
        example: `const [open, setOpen] = useState(false)`,
        visual: 'state',
        terms: ['state', 'rerender', 'hook']
      }
    ]
  },
  {
    id: 'events',
    title: 'Events',
    tone: 'blush',
    summary: 'How user actions trigger state changes.',
    lessons: [
      {
        id: 'onclick',
        title: 'Click → state → UI',
        body: `A user clicks. An event handler runs. The handler updates state. React re-renders. The UI reflects the new state.`,
        why: `This loop is the heartbeat of any interactive UI. Every animated, responsive bit you design follows it.`,
        example: `<button onClick={() => setCount(c => c + 1)}>+</button>`,
        visual: 'event',
        terms: ['event', 'state', 'rerender']
      }
    ]
  },
  {
    id: 'rendering',
    title: 'Rendering',
    tone: 'lilac',
    summary: 'Turning components into DOM — and why it happens.',
    lessons: [
      {
        id: 'why-rerender',
        title: 'Why re-rendering happens',
        body: `React re-renders a component when its state changes or its parent re-renders. It then reconciles — only touching the actual DOM nodes that need to change.`,
        why: `Seeing unnecessary re-renders helps you know when to push back on a design that implies heavy recomputes.`,
        example: `setFilter('active') → TodoList re-renders`,
        visual: 'state',
        terms: ['rerender', 'tree']
      }
    ]
  },
  {
    id: 'styling',
    title: 'Styling (Tailwind mental model)',
    tone: 'sky',
    summary: 'Utility classes describe a small step of styling each.',
    lessons: [
      {
        id: 'utility-first',
        title: 'Utility-first styling',
        body: `Instead of writing CSS rules elsewhere, you compose small classes inline. p-4 = padding, rounded-xl = radius, bg-sky = background.`,
        why: `You can change a design without leaving the component. The class names are almost a spec.`,
        example: `<div className="rounded-xl2 bg-sky p-4 text-inkDeep">Hello</div>`,
        visual: 'styling',
        terms: ['tailwind']
      }
    ]
  },
  {
    id: 'structure',
    title: 'File & codebase structure',
    tone: 'mist',
    summary: 'Where things live and why.',
    lessons: [
      {
        id: 'folders',
        title: 'Where to look',
        body: `Most frontends have: components/ (generic UI), features/ (product areas), pages/ (routes), hooks/ (shared logic), utils/ (helpers).`,
        why: `Knowing this lets you walk into any codebase and answer "where does this button live?" in under a minute.`,
        example: `src/features/safety-check/SafetyCheckButton.jsx`,
        visual: 'codebase',
        terms: ['component']
      }
    ]
  },
  {
    id: 'git',
    title: 'Git mental model',
    tone: 'sage',
    summary: 'Branches and commits — without the terminal.',
    lessons: [
      {
        id: 'branches',
        title: 'Branches are parallel timelines',
        body: `A branch is a line of commits. You make changes on a branch, then merge them back to main. Nothing is shipped until merged.`,
        why: `Every design change that ships lives on a branch first. Reading a PR is reading a branch.`,
        example: `main ——o——o——o—\n           \\\n            o—o  feat/safety-redesign`,
        visual: 'git',
        terms: ['repo', 'branch', 'commit', 'pr', 'merge']
      }
    ]
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    tone: 'blush',
    summary: 'What happens automatically between push and deploy.',
    lessons: [
      {
        id: 'pipeline',
        title: 'The pipeline',
        body: `Push → install → lint → test → build → deploy preview. Each step is a check. If one fails, later steps don't run.`,
        why: `When a preview URL doesn't appear, it's because one of these steps failed. You can look at which.`,
        example: `install ✓  lint ✓  test ✗  build –  deploy –`,
        visual: 'cicd',
        terms: ['ci', 'cd', 'build', 'deploy']
      }
    ]
  },
  {
    id: 'workflow',
    title: 'Real product workflow',
    tone: 'lilac',
    summary: 'Ticket → branch → PR → review → merge → ship.',
    lessons: [
      {
        id: 'flow',
        title: 'How a design change becomes a release',
        body: `Someone files a ticket. An engineer makes a branch. They commit. They open a PR. CI runs. You review the preview. Someone approves. It merges. CD ships it.`,
        why: `You can meet the code at the right moment — the preview — instead of fighting the terminal.`,
        example: `Ticket MIL-482 → feat/safety-redesign → PR #482 → staging → main`,
        visual: 'workflow',
        terms: ['repo', 'branch', 'pr', 'merge', 'ci', 'cd', 'deploy']
      }
    ]
  }
]

export function findLesson(moduleId, lessonId) {
  const m = modules.find(x => x.id === moduleId)
  if (!m) return null
  const l = m.lessons.find(x => x.id === lessonId)
  if (!l) return null
  return { module: m, lesson: l }
}
