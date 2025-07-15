import { describe, it, expect } from 'vitest';
import { matchDisplay } from '../display';

describe('matchDisplay', () => {
  it('should match known display values', () => {
    expect(matchDisplay('display', 'block')[0].tw).toBe('block');
    expect(matchDisplay('display', 'inline-flex')[0].tw).toBe('inline-flex');
    expect(matchDisplay('display', 'table-row-group')[0].tw).toBe('table-row-group');
    expect(matchDisplay('display', 'none')[0].tw).toBe('hidden');
  });

  it('should return custom utility for unknown values', () => {
    expect(matchDisplay('display', 'run-in')[0].tw).toBe('display-[run-in]');
  });

  it('should ignore unrelated properties', () => {
    expect(matchDisplay('position', 'absolute')).toEqual([]);
  });
});
