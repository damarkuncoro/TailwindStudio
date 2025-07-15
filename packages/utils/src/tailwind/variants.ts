/**
 * Tailwind Variants Utilities
 * 
 * Fungsi-fungsi untuk membantu manipulasi dan deteksi varian Tailwind CSS
 * seperti hover:, focus:, md:, dark:, dsb.
 */

/**
 * Mengecek apakah sebuah class adalah varian Tailwind (misal: hover:bg-blue-500).
 */
export function isTailwindVariant(className: string): boolean {
  return /^[a-z0-9-]+:/.test(className);
}

/**
 * Mendapatkan nama varian dari sebuah class Tailwind (misal: "hover" dari "hover:bg-blue-500").
 * Jika tidak ada varian, mengembalikan null.
 */
export function getTailwindVariant(className: string): string | null {
  const match = className.match(/^([a-z0-9-]+):/);
  return match ? match[1] : null;
}

/**
 * Menghapus varian dari sebuah class Tailwind (misal: "hover:bg-blue-500" → "bg-blue-500").
 */
export function stripTailwindVariant(className: string): string {
  return className.replace(/^[a-z0-9-]+:/, "");
}
