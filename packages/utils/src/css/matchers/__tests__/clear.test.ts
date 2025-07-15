import { describe, it, expect } from 'vitest';
import { matchClear } from '../clear';

describe('matchClear', () => {
  it('should match tailwind clear values', () => {
    expect(matchClear('clear', 'left')[0].tw).toBe('clear-left');
    expect(matchClear('clear', 'right')[0].tw).toBe('clear-right');
    expect(matchClear('clear', 'both')[0].tw).toBe('clear-both');
    expect(matchClear('clear', 'none')[0].tw).toBe('clear-none');
  });

  it('should fallback to custom class', () => {
    expect(matchClear('clear', 'inherit')[0].tw).toBe('clear-[inherit]');
  });

  it('should ignore non-clear properties', () => {
    expect(matchClear('float', 'left')).toEqual([]);
  });
});
