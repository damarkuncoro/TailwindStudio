import { describe, it, expect } from 'vitest';
import type { TailwindSuggestion } from '../src/tailwind';

describe('TailwindSuggestion', () => {
  it('should accept basic suggestion format', () => {
    const s: TailwindSuggestion = {
      tw: 'p-4',
      source: 'padding: 1rem',
      reason: 'match with 1rem',
    };

    expect(s.tw).toBe('p-4');
    expect(s.source).toMatch(/padding/);
    expect(s.reason).toBe('match with 1rem');
  });

  it('should allow !important suggestions', () => {
    const s: TailwindSuggestion = {
      tw: 'p-4',
      important: true,
    };

    expect(s.important).toBe(true);
  });
});
