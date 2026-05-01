export const flashcards = [
  { id: 'f1', deck: 'React', front: 'What is a prop?', back: 'An input passed into a component from its parent.' },
  { id: 'f2', deck: 'React', front: 'What is state?', back: 'Data a component owns that changes over time. Changing it re-renders the component.' },
  { id: 'f3', deck: 'React', front: 'What triggers a re-render?', back: 'A state change in the component or a re-render of its parent.' },
  { id: 'f4', deck: 'React', front: 'What is a hook?', back: 'A function starting with "use" that plugs into React features (state, effects, context).' },
  { id: 'f5', deck: 'React', front: 'useState returns what?', back: 'A pair: the current value and a setter function.' },
  { id: 'f6', deck: 'Codebase', front: 'What lives in components/?', back: 'Generic, reusable UI primitives — Button, Card, Tooltip.' },
  { id: 'f7', deck: 'Codebase', front: 'What lives in features/?', back: 'Product-area UI and logic. One folder per feature.' },
  { id: 'f8', deck: 'Codebase', front: 'Where do shared hooks go?', back: 'src/hooks/ — they are reused across features.' },
  { id: 'f9', deck: 'Git', front: 'What is a branch?', back: 'A parallel line of commits that can diverge from main.' },
  { id: 'f10', deck: 'Git', front: 'What is a PR?', back: 'A pull request — a proposal to merge one branch into another, reviewed by people and CI.' },
  { id: 'f11', deck: 'Git', front: 'What is a commit?', back: 'A saved snapshot of changes with a message.' },
  { id: 'f12', deck: 'CI/CD', front: 'What is CI?', back: 'Continuous Integration — automated checks like lint, tests, build on every push.' },
  { id: 'f13', deck: 'CI/CD', front: 'What is CD?', back: 'Continuous Delivery — automated deploys after checks pass.' },
  { id: 'f14', deck: 'CI/CD', front: 'What is a build?', base: '', back: 'The process of turning source code into an optimized bundle the browser runs.' },
  { id: 'f15', deck: 'Design', front: 'Best way to spec a change?', back: 'Name the file, the component, and the token. A labelled screenshot helps.' }
]
