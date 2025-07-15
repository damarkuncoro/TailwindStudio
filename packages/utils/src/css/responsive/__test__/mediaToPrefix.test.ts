import { describe, it, expect } from 'vitest';
import { getPrefixFromMedia } from '../mediaToPrefix';

describe('getPrefixFromMedia', () => {
  it('should return md for 768px', () => {
    expect(getPrefixFromMedia('min-width: 768px')).toBe('md');
  });

  it('should return undefined for unknown query', () => {
    expect(getPrefixFromMedia('min-width: 500px')).toBeUndefined();
  });

  it('should handle extra spaces', () => {
    expect(getPrefixFromMedia('   min-width:  768px   ')).toBe('md');
  });

  it('should handle mixed case', () => {
    expect(getPrefixFromMedia('Min-Width: 768px')).toBe('md');
  });

  it('should return xl for 1280px', () => {
    expect(getPrefixFromMedia('min-width: 1280px')).toBe('xl');
  });

  it('should return undefined for unrelated media query', () => {
    expect(getPrefixFromMedia('(max-height: 800px)')).toBeUndefined();
  });
});
