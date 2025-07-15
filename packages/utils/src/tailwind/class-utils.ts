/**
 * Tailwind Class Utilities
 * 
 * Kumpulan fungsi utilitas untuk manipulasi dan analisis class Tailwind CSS.
 */

/**
 * Menggabungkan beberapa string class Tailwind menjadi satu string unik.
 * Menghilangkan duplikasi dan whitespace berlebih.
 */
export function mergeTailwindClasses(...classes: (string | undefined | null)[]): string {
  const set = new Set<string>();
  classes
    .filter(Boolean)
    .join(" ")
    .split(/\s+/)
    .forEach((cls) => {
      if (cls) set.add(cls);
    });
  return Array.from(set).join(" ");
}

/**
 * Memeriksa apakah sebuah class ada di dalam string class Tailwind.
 */
export function hasTailwindClass(classString: string, className: string): boolean {
  return classString.split(/\s+/).includes(className);
}

/**
 * Menghapus class tertentu dari string class Tailwind.
 */
export function removeTailwindClass(classString: string, className: string): string {
  return classString
    .split(/\s+/)
    .filter((cls) => cls !== className)
    .join(" ");
}
