// Elegante, DRY, modular, robust, and easy to test matcher exports

const matcherNames = [
  'Aspect',
  'Columns',
  'AspectRatio',
  'Background',
  'Border',
  'Color',
  'Effect',
  'Font',
  'Grid',
  'Index',
  'Layout',
  'Misc',
  'Pseudo',
  'Sizing',
  'Spacing',
  'Transform',
  'Transition',
  'Typography',
  'Visibility',
  'Width',
  'ZIndex',
] as const;

type MatcherName = typeof matcherNames[number];

matcherNames.forEach((name) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  exports[`match${name}`] = require(`./${name.toLowerCase()}`)[`match${name}`];
});

// For testability: export matcherNames
export { matcherNames };

