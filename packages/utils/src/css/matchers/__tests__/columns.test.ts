import { describe, it, expect } from 'vitest';
import { matchColumns } from '../columns';

describe('matchColumns', () => {
  it('matches numeric values 1-12', () => {
    expect(matchColumns('columns', '3')[0].tw).toBe('columns-3');
    expect(matchColumns('columns', '12')[0].tw).toBe('columns-12');
  });

  it('matches auto', () => {
    expect(matchColumns('columns', 'auto')[0].tw).toBe('columns-auto');
  });

  it('matches custom width values', () => {
    expect(matchColumns('columns', '200px')[0].tw).toBe('columns-[200px]');
    expect(matchColumns('columns', '20rem')[0].tw).toBe('columns-[20rem]');
  });

  it('falls back to custom syntax', () => {
    expect(matchColumns('columns', 'min-content')[0].tw).toBe('columns-[min-content]');
  });

  it('returns empty array for unrelated properties', () => {
    expect(matchColumns('grid-template-columns', '3')).toEqual([]);
  });
});
