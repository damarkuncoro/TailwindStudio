import { describe, it, expect } from 'vitest';
import { matchBreakAfter } from '../break-after';

describe('matchBreakAfter', () => {
  it('should match standard break-after utilities', () => {
    expect(matchBreakAfter('break-after', 'auto')[0].tw).toBe('break-after-auto');
    expect(matchBreakAfter('break-after', 'avoid-page')[0].tw).toBe('break-after-avoid-page');
    expect(matchBreakAfter('break-after', 'column')[0].tw).toBe('break-after-column');
  });

  it('should return fallback utility for unknown values', () => {
    expect(matchBreakAfter('break-after', 'custom')[0].tw).toBe('break-after-[custom]');
  });

  it('should ignore non-break-after properties', () => {
    expect(matchBreakAfter('margin', 'auto')).toEqual([]);
  });
});
