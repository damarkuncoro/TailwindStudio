import { describe, it, expect } from 'vitest';
import {
  normalizePropertyName,
  normalizePropertyValue,
  normalizeCSSDeclaration
} from '../normalize';

describe('normalizePropertyName', () => {
  it('should convert kebab-case to camelCase', () => {
    expect(normalizePropertyName('font-size')).toBe('fontSize');
    expect(normalizePropertyName('background-color')).toBe('backgroundColor');
  });

  it('should convert snake_case to camelCase', () => {
    expect(normalizePropertyName('font_size')).toBe('fontSize');
  });
});

describe('normalizePropertyValue', () => {
  it('should trim and collapse whitespace', () => {
    expect(normalizePropertyValue('   16px   ')).toBe('16px');
    expect(normalizePropertyValue('  1  /   1 ')).toBe('1 / 1');
  });

  it('should ignore non-string values', () => {
    // @ts-expect-error testing non-string
    expect(normalizePropertyValue(42)).toBe(42);
  });
});

describe('normalizeCSSDeclaration', () => {
  it('should normalize keys and values in CSS object', () => {
    const input = {
      'font-size': ' 16px ',
      'background-color': '  red  ',
      'margin_top': ' 12px '
    };

    expect(normalizeCSSDeclaration(input)).toEqual({
      fontSize: '16px',
      backgroundColor: 'red',
      marginTop: '12px'
    });
  });
});
