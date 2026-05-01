export const tips = [
  {
    id: 't1',
    title: 'Think in components, not screens',
    body: `When you hand off a design, describe it as nested components. It maps directly to code.`,
    example: `Header (logo, nav, actions) → Hero (eyebrow, h1, cta) → FeatureList (item × N)`
  },
  {
    id: 't2',
    title: 'Read code like prose',
    body: `Skip punctuation on the first pass. Look for names: what are the components, what are the hooks, what props do they take?`,
    example: `<SafetyCheckButton variant="primary" onPress={start}> — "a primary-variant safety check button that starts something"`
  },
  {
    id: 't3',
    title: 'Trace UI → file in one hop',
    body: `If you see "Start Safety Check" on screen, search that text. The first hit is almost always the component.`,
    example: `Cmd-shift-F "Start Safety Check" → SafetyCheckButton.jsx line 18`
  },
  {
    id: 't4',
    title: 'Ask "pixel bug or data bug?"',
    body: `Color, size, spacing → CSS / Tailwind. Wrong number, missing item → state / hook.`,
    example: `Count shows 0 but list has 3 → data bug → look at useFriends.js`
  },
  {
    id: 't5',
    title: 'When CI fails, read the first red step',
    body: `Later steps never run after a failure. Lint failing is cheap to fix; tests failing is a real change needed.`,
    example: `install ✓  lint ✗ → a missing semicolon or unused import.`
  },
  {
    id: 't6',
    title: 'Review previews, not diffs',
    body: `Open the deploy preview URL from the PR. Judge design there. Leave comments with annotated screenshots.`,
    example: `PR #482 → Deploy preview → iPhone 14 frame → screenshot + comment on the button.`
  },
  {
    id: 't7',
    title: 'Name tokens in your specs',
    body: `"Use spacing-md" beats "a bit more space". Engineers love a spec that points to a token.`,
    example: `"Use color.sky for the background (not custom #CDEBF1)."`
  },
  {
    id: 't8',
    title: 'When in doubt, open DevTools Components',
    body: `React DevTools shows the live tree. You can click on the UI and see the component name.`,
    example: `Right-click → Inspect → Components tab → click the element.`
  }
]
