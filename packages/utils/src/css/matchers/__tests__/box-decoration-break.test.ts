import { describe, it, expect } from 'vitest';
import { matchBoxDecorationBreak } from '../box-decoration-break';


describe('matchBoxDecorationBreak', () => {
  it('should match known values', () => {
    expect(matchBoxDecorationBreak('box-decoration-break', 'slice')[0].tw).toBe('box-decoration-slice');
    expect(matchBoxDecorationBreak('box-decoration-break', 'clone')[0].tw).toBe('box-decoration-clone');
  });

  it('should fallback to custom syntax', () => {
    const result = matchBoxDecorationBreak('box-decoration-break', 'initial');
    expect(result[0].tw).toBe('box-decoration-[initial]');
  });

  it('should ignore unrelated properties', () => {
    expect(matchBoxDecorationBreak('display', 'block')).toEqual([]);
  });
});
