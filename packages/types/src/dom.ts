// packages/types/src/dom.ts

export interface ParsedHtmlNode {
  type: string;
  tag: string;
  attrs?: Record<string, string>;
  children?: ParsedHtmlNode[];
}
