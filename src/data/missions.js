// Work simulator missions. Each mission is a small, scored exercise
// that teaches a real-world workflow skill a design-engineer needs.

export const missions = [
  {
    id: 'find-component',
    title: 'Find the Safety Check button',
    tone: 'sage',
    time: '2 min',
    objective: 'Locate the file where the Safety Check button is rendered.',
    context: `A PM says the Safety Check button on the home screen should be a little taller on iOS. Before filing a ticket, you want to find the component to confirm how it's built.`,
    steps: [
      { kind: 'pick-file', prompt: 'Which file do you open first?', options: [
        { id: 'a', label: 'src/pages/Home.jsx' },
        { id: 'b', label: 'src/features/safety-check/SafetyCheckButton.jsx', correct: true },
        { id: 'c', label: 'src/components/Button.jsx' }
      ], why: `features/ holds product-area UI. "SafetyCheckButton" is specific — start there. Button.jsx is the generic primitive; Home.jsx only composes the screen.` },
      { kind: 'pick-file', prompt: 'Who defines the button height?', options: [
        { id: 'a', label: 'src/components/Button.jsx', correct: true },
        { id: 'b', label: 'src/pages/Home.jsx' },
        { id: 'c', label: 'SafetyCheckButton.jsx' }
      ], why: `Height lives on the generic <Button> primitive. SafetyCheckButton composes it; the primitive owns sizing.` }
    ],
    reflect: `When a bug is "visual", trace UI → product feature file → primitive. Don't start from pages/.`
  },
  {
    id: 'trace-bug',
    title: 'Trace a bug from screen to state',
    tone: 'blush',
    time: '3 min',
    objective: 'Identify where an incorrect value is coming from.',
    context: `The "Friends notified" count shows 0 even when 3 friends are listed. Where should you look first?`,
    steps: [
      { kind: 'pick-file', prompt: 'Which layer is the bug most likely in?', options: [
        { id: 'a', label: 'UI (Tailwind class)' },
        { id: 'b', label: 'State (what the component reads)', correct: true },
        { id: 'c', label: 'Styling token'}
      ], why: `The number is data. Styling can't show "3" as "0". The state is wrong or the derived value is wrong.` },
      { kind: 'pick-file', prompt: 'Which file looks most suspicious?', options: [
        { id: 'a', label: 'src/features/friends/useFriends.js', correct: true },
        { id: 'b', label: 'src/features/safety-check/SafetyCheckButton.jsx' },
        { id: 'c', label: 'src/components/Badge.jsx' }
      ], why: `useFriends is the hook that reads the list. The count probably derives from it — start there.` }
    ],
    reflect: `Separate "pixel bugs" (CSS) from "data bugs" (state, fetching). The fix lives in different files.`
  },
  {
    id: 'review-pr',
    title: 'Review a PR as a designer',
    tone: 'sky',
    time: '4 min',
    objective: 'Know what to check on a PR without reading every line.',
    context: `PR #482 — "Redesign safety check" is open. You're not expected to approve code, but you are expected to check the design.`,
    steps: [
      { kind: 'pick-file', prompt: 'What do you open first?', options: [
        { id: 'a', label: 'The diff of SafetyCheckButton.jsx' },
        { id: 'b', label: 'The CI preview URL', correct: true },
        { id: 'c', label: 'The commit history' }
      ], why: `The preview is the live version of the change. You judge design there, not in the diff.` },
      { kind: 'pick-file', prompt: 'CI shows "tests ✗". What does this mean for you?', options: [
        { id: 'a', label: 'You can ignore it' },
        { id: 'b', label: 'Wait for fixes before approving design', correct: true },
        { id: 'c', label: 'Fix the tests yourself' }
      ], why: `A failing pipeline usually means no preview. Your design review blocks on green CI.` }
    ],
    reflect: `PR reviews for designers: check preview, check interaction, check edge cases, leave comments with screenshots.`
  },
  {
    id: 'spec-change',
    title: 'Spec a change so it lands in one file',
    tone: 'lilac',
    time: '3 min',
    objective: 'Write a change request an engineer can apply without guessing.',
    context: `You want the Safety Check button to be 52px tall on mobile. How do you write it?`,
    steps: [
      { kind: 'pick-file', prompt: 'Pick the most useful spec', options: [
        { id: 'a', label: '"Make the button bigger on mobile"' },
        { id: 'b', label: '"Bump the sm size from 44px to 52px in components/Button.jsx"', correct: true },
        { id: 'c', label: '"Use a larger padding"' }
      ], why: `The more your request names the file and token, the faster it ships.` },
      { kind: 'pick-file', prompt: 'What will the engineer want from you?', options: [
        { id: 'a', label: 'A screenshot with the measurement called out', correct: true },
        { id: 'b', label: 'A Figma link and nothing else' },
        { id: 'c', label: 'The commit message to use' }
      ], why: `A labelled screenshot is usually enough. Bonus if you name the component and token.` }
    ],
    reflect: `Specs that name the file, the prop, and the token are the ones that don't bounce.`
  }
]
