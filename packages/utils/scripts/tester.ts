// packages/utils/scripts/tester.ts
import { matchAspect } from '../src/css/matchers/aspect';

const test = matchAspect('aspect-ratio', '1 / 1');
console.log('Result:', test);
console.log('Tailwind class:', test[0]?.tw || 'No match found');