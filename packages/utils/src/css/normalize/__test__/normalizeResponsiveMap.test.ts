import { describe, it, expect } from 'vitest';
import { normalizeResponsiveMap } from '../normalizeResponsiveMap';
import { StructuredCssMap } from '@tailwind-studio/types';

describe('normalizeResponsiveMap', () => {
  it('should normalize media queries to tailwind prefixes', () => {
    const input: StructuredCssMap = {
      button: {
        base: ['padding: 8px'],
        media: {
          'min-width: 768px': ['padding: 16px'],
          'min-width: 1024px': ['padding: 24px']
        }
      }
    };

    const result = normalizeResponsiveMap(input);

    expect(result).toEqual({
      button: {
        base: ['padding: 8px'],
        responsive: {
          md: ['padding: 16px'],
          lg: ['padding: 24px']
        }
      }
    });
  });

  it('should ignore unknown media queries', () => {
    const input: StructuredCssMap = {
      box: {
        media: {
          'max-height: 800px': ['color: red'],
          'min-width: 768px': ['color: blue']
        }
      }
    };

    const result = normalizeResponsiveMap(input);

    expect(result).toEqual({
      box: {
        responsive: {
          md: ['color: blue']
        }
      }
    });
  });
});
