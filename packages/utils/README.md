Berikut adalah **penjelasan fungsi `@tailwind-studio/utils` secara detail dan profesional**, mencakup **tujuan utama, arsitektur modular, serta cara kerja internalnya**.

---

## 📦 Modul `@tailwind-studio/utils`

### 🎯 Tujuan Utama

`@tailwind-studio/utils` adalah *core utility module* yang menyediakan serangkaian fungsi bantu untuk:

* 🔁 **Mengonversi CSS standar menjadi class Tailwind** secara terstruktur
* 🧠 **Menganalisis dan menyarankan Tailwind class** berdasarkan properti dan nilai CSS
* 🔧 Memberikan tools pemrosesan seperti normalisasi, parsing, dan penyesuaian *responsive media*

---

## 🧱 Arsitektur Modular

```txt
packages/utils/
├── src/
│   ├── css/
│   │   ├── matchers/                ⇽ Matching CSS → Tailwind
│   │   ├── constants/               ⇽ Preset Tailwind config values (spacing, colors, breakpoints, etc)
│   │   ├── responsive/              ⇽ Tools untuk media-query → prefix Tailwind
│   │   ├── normalize.ts             ⇽ Normalize key & value CSS
│   │   ├── parser.ts                ⇽ Parsers CSS key-value raw
│   ├── tailwind/                    ⇽ Helpers untuk build tailwind suggestion
│   ├── dom/                         ⇽ Optional DOM-to-structure parser
│   └── index.ts                     ⇽ Entry-point export modul
```

---

## ⚙️ Cara Kerja Fungsi `@tailwind-studio/utils`

### 1. 🧩 **Matcher: Konversi CSS ke Tailwind**

Modul matcher bertugas mengidentifikasi padanan Tailwind untuk properti dan nilai CSS tertentu.

Contoh:

```ts
matchAspect("aspect-ratio", "1 / 1") 
// → [{ tw: 'aspect-square', reason: '1:1 ratio', source: 'aspect-ratio' }]
```

> 🔁 Output matcher selalu berupa array dari `TailwindSuggestion`.

### 2. 🧼 **Normalizer: Menstandarkan Input CSS**

CSS dari browser atau parser bisa memiliki format berbeda. Modul `normalize` digunakan untuk:

* Membersihkan whitespace
* Menurunkan huruf
* Mengubah kebab-case → camelCase
* Contoh:

```ts
normalizePropertyName("font-size") // → "fontSize"
normalizePropertyValue("   16px ") // → "16px"
```

### 3. 🗺️ **Responsive Mapper: Ubah media query ke Tailwind Prefix**

Tailwind menggunakan pendekatan *mobile-first* berbasis prefix (`sm`, `md`, `lg`, dst). Modul ini mengubah CSS media query:

```ts
{
  'min-width: 768px': ['padding: 16px']
}
// → { md: ['padding: 16px'] }
```

### 4. 🧠 **TailwindSuggestion: Format Hasil**

```ts
interface TailwindSuggestion {
  tw: string;          // class name e.g. "p-4"
  reason?: string;     // why it matched
  source?: string;     // source CSS property
  important?: boolean; // whether it's marked !important
}
```

Semua matcher akan mengeluarkan bentuk ini untuk konsistensi lintas modul.

---

## 🔬 Contoh Flow Lengkap

Misalnya Anda punya objek CSS:

```ts
{
  base: ['margin: 1rem'],
  media: {
    'min-width: 768px': ['margin: 2rem']
  }
}
```

Langkah-langkah yang dilakukan:

1. **normalizeResponsiveMap**:

   * Konversi `media` → `responsive: { md: [...] }`

2. **normalizeCSSDeclaration**:

   * Ubah `'margin: 1rem'` → `{ margin: '1rem' }`

3. **matchSpacing**:

   * Ubah `{ margin: '1rem' }` → `[ { tw: 'm-4', reason: ..., ... } ]`

4. **Output terstruktur**:

   * Dengan informasi lengkap (class + alasan + sumber)

---

## ✅ Manfaat

| Aspek                  | Penjelasan                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| **Scalable**           | Modularisasi memudahkan penambahan matcher baru                            |
| **DRY**                | Fungsi bisa digunakan lintas modul dan project                             |
| **Testable**           | Setiap matcher dan normalizer memiliki test unit                           |
| **Robust**             | Menangani berbagai input real-world dari CSS browser                       |
| **Real-time Friendly** | Cocok untuk digunakan dalam sistem realtime (seperti live preview builder) |

---

## 🧠 Cocok Digunakan Oleh

* Sistem **Tailwind Analyzer** untuk migrasi CSS → Tailwind
* **UI Builder** berbasis Tailwind (preview + codegen)
* **PostCSS Plugin** atau **CLI Formatter**
* **Linter atau Plugin ESLint** untuk Tailwind

---

## 🚀 Selanjutnya

Jika kamu ingin memperluas:

1. Tambah matcher baru (misalnya `font`, `color`, `border`)
2. Tambah fitur `suggestTailwind(css: string)` untuk 1-liner analisis
3. Ekspor CLI utilitas (misal `pnpm utils:analyze`)

Ingin saya bantu menyiapkan `suggestTailwind()` versi awal?
Berikut adalah **cara penggunaan `@tailwind-studio/utils`** untuk mengonversi CSS biasa menjadi saran class Tailwind dengan pendekatan modular dan real-world use case:

---

## ✅ 1. **Install & Setup**

Jika dalam monorepo:

```bash
pnpm add @tailwind-studio/utils --filter ./apps/your-app
```

Atau jika dalam repo biasa:

```bash
pnpm add @tailwind-studio/utils
```

---

## 🧪 2. **Basic Usage – Single Matcher**

Misal ingin menyarankan Tailwind untuk properti `aspect-ratio`:

```ts
import { matchAspect } from '@tailwind-studio/utils/css/matchers/aspect';

const result = matchAspect('aspect-ratio', '16 / 9');

console.log(result);
/*
[
  {
    tw: 'aspect-video',
    reason: 'matches 16:9 aspect',
    source: 'aspect-ratio'
  }
]
*/
```

---

## 🧩 3. **Gunakan Semua Matcher Secara Bersama**

Contoh: memproses 1 deklarasi CSS `{ margin: '1rem', aspectRatio: '1 / 1' }`

```ts
import { normalizeCSSDeclaration } from '@tailwind-studio/utils/css/normalize';
import { matchSpacing } from '@tailwind-studio/utils/css/matchers/spacing';
import { matchAspect } from '@tailwind-studio/utils/css/matchers/aspect';

const raw = { 'margin': '1rem', 'aspect-ratio': '1 / 1' };
const normalized = normalizeCSSDeclaration(raw);

// Gabungkan semua matcher
const suggestions = [
  ...matchSpacing('margin', normalized.margin),
  ...matchAspect('aspectRatio', normalized.aspectRatio)
];

console.log(suggestions);
/*
[
  { tw: 'm-4', source: 'margin', reason: 'matched spacing scale' },
  { tw: 'aspect-square', source: 'aspect-ratio', reason: 'matched 1:1' }
]
*/
```

---

## 📊 4. **Gunakan `normalizeResponsiveMap()` untuk CSS Responsive**

```ts
import { normalizeResponsiveMap } from '@tailwind-studio/utils/css/responsive/normalizeResponsiveMap';

const map = {
  button: {
    base: ['padding: 8px'],
    media: {
      'min-width: 768px': ['padding: 16px'],
      'min-width: 1024px': ['padding: 24px']
    }
  }
};

const result = normalizeResponsiveMap(map);

console.log(result);
/*
{
  button: {
    base: ['padding: 8px'],
    responsive: {
      md: ['padding: 16px'],
      lg: ['padding: 24px']
    }
  }
}
*/
```

---

## 🧠 5. **Gunakan dalam Sistem yang Lebih Besar**

Misalnya kamu membuat UI builder, atau CLI converter:

```ts
import { matchAll } from '@tailwind-studio/utils/css/matchers';
import { normalizeCSSDeclaration } from '@tailwind-studio/utils/css/normalize';

function suggestTailwind(css: Record<string, string>) {
  const normalized = normalizeCSSDeclaration(css);
  return Object.entries(normalized).flatMap(([prop, val]) => matchAll(prop, val));
}

// Output dari user
const cssInput = {
  margin: '2rem',
  'aspect-ratio': '4 / 3',
};

console.log(suggestTailwind(cssInput));
/*
[
  { tw: 'm-8', source: 'margin', ... },
  { tw: 'aspect-[4/3]', source: 'aspect-ratio', ... }
]
*/
```

---

## 🧪 6. **Testing Utilities**

Jika kamu ingin menguji fungsi:

```ts
pnpm test -F @tailwind-studio/utils
```

Struktur test:

```
src/
  css/
    matchers/
      aspect.ts
      spacing.ts
      __tests__/
        aspect.test.ts
        spacing.test.ts
```

---

## 📚 Referensi Tipe

```ts
export interface TailwindSuggestion {
  tw: string;          // Tailwind class suggestion
  reason?: string;     // Optional: reason for match
  source?: string;     // Optional: original CSS property
  important?: boolean; // Optional: from !important?
}
```

---

## 🚀 Siap Pakai

Kamu bisa gunakan utilitas ini untuk:

* 🔁 Migrasi CSS biasa ke Tailwind
* 🧱 Live Tailwind Class Preview dalam Visual Builder
* 📦 CLI untuk konversi otomatis
* 🧪 Test kompatibilitas style legacy

---

Kalau kamu ingin **fungsi utilitas seperti `suggestTailwind(cssObject)` secara lengkap dan otomatis**, aku bisa bantu buatkan. Mau lanjut ke sana?



Dalam sistem Tailwind Studio, **matcher** adalah jantung dari konversi CSS ke Tailwind class. Agar sistem ini **DRY, scalable, dan mudah dipelihara**, berikut daftar matcher yang sebaiknya kamu siapkan dan kelompokkan modular:

---

## ✅ 1. **Spacing Matchers** `matchers/spacing.ts`

Untuk konversi: `padding`, `margin`, `gap`, `space-*`

* `matchPadding`
* `matchPaddingX`, `matchPaddingY`, `matchPaddingTop`, dll
* `matchMargin`
* `matchGap`
* `matchSpaceX`, `matchSpaceY`

---

## ✅ 2. **Layout & Sizing Matchers** `matchers/layout.ts`

* `matchDisplay` → `flex`, `block`, `inline`, etc
* `matchWidth` → `w-*`
* `matchHeight` → `h-*`
* `matchMinWidth`, `matchMaxWidth`
* `matchPosition`, `matchTopRightBottomLeft`
* `matchZIndex`

---

## ✅ 3. **Font & Text Matchers** `matchers/font.ts`

* `matchFontSize` → `text-*`
* `matchFontWeight` → `font-*`
* `matchLineHeight`
* `matchLetterSpacing`
* `matchTextAlign`
* `matchFontFamily`

---

## ✅ 4. **Color & Background** `matchers/color.ts` dan `matchers/background.ts`

* `matchColor` → `text-*`
* `matchBackgroundColor` → `bg-*`
* `matchOpacity`
* `matchTextDecoration` → `underline`, `line-through`

---

## ✅ 5. **Border Matchers** `matchers/border.ts`

* `matchBorderWidth`
* `matchBorderColor`
* `matchBorderRadius`
* `matchBorderStyle`

---

## ✅ 6. **Effects & Transforms** `matchers/effect.ts`

* `matchBoxShadow`
* `matchTextShadow`
* `matchOpacity`
* `matchTransform`, `matchTranslate`, `matchRotate`, `matchScale`

---

## ✅ 7. **Pseudo-Class & State Handler** `matchers/pseudo.ts`

* `extractPseudoPrefix(property)` → `hover`, `focus`, `active`, dll
* `stripPseudo(property)` → menghapus `hover:` dari `hover:background-color: red`
* Dapat digabungkan ke hasil seperti `hover:bg-red-500`

---

## ✅ 8. **Misc Utilities** `matchers/misc.ts`

* `matchCursor`
* `matchPointerEvents`
* `matchVisibility`
* `matchOverflow`
* `matchAspectRatio`

---

## 🔁 Bonus: Grouping & Dispatcher

### `matchers/index.ts`

```ts
export const matchers = [
  ...spacingMatchers,
  ...layoutMatchers,
  ...fontMatchers,
  ...colorMatchers,
  ...borderMatchers,
  ...effectMatchers,
  ...miscMatchers,
];

export function matchTailwindClass(property: string): string[] {
  return matchers.map(fn => fn(property)).filter(Boolean) as string[];
}
```

---

Berikut adalah detail lengkap untuk setiap **Matcher Group** di `tailwind-suggester-engine`, agar sistem kamu **DRY, elegan, robust, scalable, dan mudah diuji serta dikembangkan**.

---

## 🧭 Summary: Matcher Groups — **Details**

| #  | Group          | File            | CSS Target                                | Tailwind Output                             | Catatan                         |
| -- | -------------- | --------------- | ----------------------------------------- | ------------------------------------------- | ------------------------------- |
| 1  | **Spacing**    | `spacing.ts`    | `padding`, `margin`, `gap`, `space-*`     | `p-*`, `m-*`, `gap-*`, `space-x-*`          | Hitung dari `px`, `rem`, dll    |
| 2  | **Layout**     | `layout.ts`     | `display`, `position`, `top/right/...`    | `flex`, `absolute`, `top-0`, dll            | Termasuk `z-index`              |
| 3  | **Font/Text**  | `font.ts`       | `font-size`, `font-weight`, `text-align`  | `text-sm`, `font-bold`, `text-center`       | Perlu konversi skala `rem`      |
| 4  | **Color**      | `color.ts`      | `color`, `background-color`, `opacity`    | `text-red-500`, `bg-blue-200`, `opacity-50` | Cocokkan dari nama warna        |
| 5  | **Border**     | `border.ts`     | `border`, `border-color`, `border-radius` | `border`, `border-red-500`, `rounded-md`    | Juga `border-width` dan `style` |
| 6  | **Effect**     | `effect.ts`     | `box-shadow`, `opacity`, `transform`      | `shadow-lg`, `opacity-50`, `rotate-6`       | Parsing kompleks                |
| 7  | **Pseudo**     | `pseudo.ts`     | `hover:...`, `focus:...`, `active:...`    | `hover:bg-red-500`, dll                     | Prefix wrapper                  |
| 8  | **Misc**       | `misc.ts`       | `cursor`, `visibility`, `overflow`        | `cursor-pointer`, `overflow-hidden`         | Utility penting                 |
| 9  | **Sizing**     | `sizing.ts`     | `width`, `height`, `min-*`, `max-*`       | `w-1/2`, `h-screen`, `min-w-[300px]`        | Tailwind sangat fleksibel       |
| 10 | **Flex/Grid**  | `flex.ts`       | `flex`, `align-items`, `justify-content`  | `flex`, `items-center`, `justify-between`   | Grid juga                       |
| 11 | **Transition** | `transition.ts` | `transition`, `duration`, `ease`, `delay` | `transition`, `duration-300`                | Untuk animasi                   |
| 12 | **Transform**  | `transform.ts`  | `translate`, `rotate`, `scale`            | `translate-x-4`, `rotate-6`                 | Value relatif                   |
| 13 | **Aspect**     | `aspect.ts`     | `aspect-ratio`                            | `aspect-video`, `aspect-[3/2]`              | Baru Tailwind v3+               |
| 14 | **Grid**       | `grid.ts`       | `grid-template`, `gap`, `col-span`        | `grid-cols-3`, `gap-4`, `col-span-2`        | Layout kompleks                 |
| 15 | **Visibility** | `visibility.ts` | `visibility`, `display`                   | `hidden`, `block`, `inline`                 | Overlap layout                  |

---

## ✅ Contoh Output Matcher

### Input CSS:

```css
padding: 1rem;
font-weight: 700;
background-color: red;
hover: background-color: black;
```

### Output:

```ts
[
  { tw: 'p-4', source: 'padding: 1rem' },
  { tw: 'font-bold', source: 'font-weight: 700' },
  { tw: 'bg-red-500', source: 'background-color: red' },
  { tw: 'hover:bg-black', source: 'hover: background-color: black' }
]
```

---

## 📁 Penamaan File & Fungsi

| File            | Fungsi Utama                                      |
| --------------- | ------------------------------------------------- |
| `spacing.ts`    | `matchPadding`, `matchMargin`                     |
| `font.ts`       | `matchFontSize`, `matchFontWeight`                |
| `color.ts`      | `matchTextColor`, `matchBackgroundColor`          |
| `border.ts`     | `matchBorderColor`, `matchBorderRadius`           |
| `layout.ts`     | `matchDisplay`, `matchPosition`, `matchZIndex`    |
| `pseudo.ts`     | `extractPseudoPrefix`, `stripPseudo`              |
| `sizing.ts`     | `matchWidth`, `matchHeight`, `matchMinWidth`      |
| `flex.ts`       | `matchFlexProps`, `matchGridProps`                |
| `effect.ts`     | `matchBoxShadow`, `matchOpacity`                  |
| `misc.ts`       | `matchCursor`, `matchOverflow`, `matchVisibility` |
| `transition.ts` | `matchTransitionProps`                            |
| `transform.ts`  | `matchTranslate`, `matchRotate`, `matchScale`     |
| `aspect.ts`     | `matchAspectRatio`                                |
| `grid.ts`       | `matchGridTemplate`, `matchGap`, `matchSpan`      |

---

## 🧪 Testing

Setiap matcher file bisa punya:

* `matcher.test.ts` dengan unit test Vitest
* Fixtures CSS → Tailwind map
* Coverage dengan edge cases (`!important`, `rem`, `px`, dll)

---

## 📦 Integrasi di Engine

Gabungkan semua di:

```ts
// packages/tailwind-suggester-engine/src/matcher/index.ts
export const matchers = [
  ...spacingMatchers,
  ...fontMatchers,
  ...colorMatchers,
  ...
];
```

Dan digunakan dalam:

```ts
generateTailwindSuggestionsFromProperty(cssProp: string): TailwindSuggestion[]
```

---

Siap lanjut scaffold folder & file awal? Atau mau saya bantu buat generator otomatis dari semua matcher ke `TailwindSuggestion`?
