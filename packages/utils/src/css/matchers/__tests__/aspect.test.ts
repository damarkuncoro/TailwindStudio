import { describe, it, expect } from 'vitest';
import { matchAspect } from '../aspect';

describe('matchAspect', () => {
  it('should match theme: 1 / 1 → aspect-square', () => {
    const result = matchAspect('aspect-ratio', '1 / 1');
    expect(result[0].tw).toBe('aspect-square');
  });

  it('should match theme: 16 / 9 → aspect-video', () => {
    const result = matchAspect('aspect-ratio', '16 / 9');
    expect(result[0].tw).toBe('aspect-video');
  });

  it('should match theme: 4 / 3 → aspect-retro', () => {
    const result = matchAspect('aspect-ratio', '4 / 3');
    expect(result[0].tw).toBe('aspect-retro');
  });

  it('should match auto', () => {
    const result = matchAspect('aspect-ratio', 'auto');
    expect(result[0].tw).toBe('aspect-auto');
  });

  it('should handle var(--custom-ratio)', () => {
    const result = matchAspect('aspect-ratio', 'var(--my-aspect)');
    expect(result[0].tw).toBe('aspect-(--my-aspect)');
  });

  it('should handle calc expression', () => {
    const result = matchAspect('aspect-ratio', 'calc(4*3+1)/3');
    expect(result[0].tw).toBe('aspect-[calc(4*3+1)/3]');
  });

  it('should fallback to custom aspect', () => {
    const result = matchAspect('aspect-ratio', '5 / 4');
    expect(result[0].tw).toBe('aspect-[5 / 4]');
  });

  it('should return [] for unrelated prop', () => {
    const result = matchAspect('width', '16 / 9');
    expect(result).toEqual([]);
  });
});
