export type CssProperty = string;

// Tipe mentah hasil parsing HTML+CSS, sebelum diubah ke Tailwind semantik
export interface StructuredCssMap {
  [selector: string]: {
    base?: CssProperty[];
    media?: {
      [mediaQuery: string]: CssProperty[];
    };
    pseudo?: {
      [pseudo: string]: CssProperty[];
    };
  };
}

// Tipe hasil normalisasi ke Tailwind style: responsive, base, pseudo
export interface TailwindStructuredMap {
  [selector: string]: {
    base?: CssProperty[];
    responsive?: {
      [prefix: string]: CssProperty[];
    };
    pseudo?: {
      [pseudo: string]: CssProperty[];
    };
  };
}
