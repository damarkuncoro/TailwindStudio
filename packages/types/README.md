# @tailwind-studio/types

Shared TypeScript types for TailwindStudio monorepo.

## Struktur

- `css.ts` — representasi hasil parsing CSS (terstruktur)
- `tailwind.ts` — struktur saran konversi ke Tailwind
- `dom.ts` — struktur node HTML hasil parse

## Cara Import

```ts
import type { StructuredCssMap, TailwindSuggestion } from '@tailwind-studio/types';




---

## ✅ Langkah Terakhir

Jalankan:

```bash
cd packages/types
pnpm install
pnpm run build
