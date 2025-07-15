import { describe, expect, it } from 'vitest';
import type { StructuredCssMap } from '../src/css';

describe('StructuredCssMap', () => {
  it('should support base, media, and pseudo styles', () => {
    const map: StructuredCssMap = {
      card: {
        base: ['margin: 1rem'],
        media: {
          '(min-width: 768px)': ['margin: 2rem'],
        },
        pseudo: {
          hover: ['box-shadow: 0px 4px 6px rgba(0,0,0,0.1)'],
        },
      },
    };

    expect(map.card?.base).toContain('margin: 1rem');
    expect(map.card?.media?.['(min-width: 768px)']).toContain('margin: 2rem');
    expect(map.card?.pseudo?.hover).toContain('box-shadow: 0px 4px 6px rgba(0,0,0,0.1)');
  });
});