import { describe, expect, it } from 'vitest';
import type { ParsedHtmlNode } from '../src/dom'; // sesuaikan path

describe('ParsedHtmlNode', () => {
  it('supports recursive children', () => {
    const el: ParsedHtmlNode = {
      type: 'element',
      tag: 'div',
      attrs: {},
      children: [
        {
          type: 'text',
          content: 'Hello',
        },
        {
          type: 'element',
          tag: 'span',
          attrs: { class: 'text-red-500' },
          children: [],
        },
      ],
    };

    expect(el.children.length).toBe(2);
    expect(el.children[0].type).toBe('text');
  });
});