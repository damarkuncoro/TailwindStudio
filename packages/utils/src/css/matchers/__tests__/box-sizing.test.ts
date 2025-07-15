import { describe, it, expect } from 'vitest';
import { matchBoxSizing } from '../box-sizing';

describe('matchBoxSizing', () => {
  it('should match known values', () => {
    expect(matchBoxSizing('box-sizing', 'border-box')[0].tw).toBe('box-border');
    expect(matchBoxSizing('box-sizing', 'content-box')[0].tw).toBe('box-content');
  });

  it('should fallback to custom syntax', () => {
    const result = matchBoxSizing('box-sizing', 'padding-box');
    expect(result[0].tw).toBe('box-sizing-[padding-box]');
  });

  it('should ignore unrelated properties', () => {
    expect(matchBoxSizing('display', 'block')).toEqual([]);
  });
});
