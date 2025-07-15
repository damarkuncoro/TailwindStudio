export const clearMap: Record<string, string> = {
    left: 'clear-left',
    right: 'clear-right',
    both: 'clear-both',
    none: 'clear-none',
};
/**
 * Known clear mappings to Tailwind classes
 * @see https://tailwindcss.com/docs/clear
 */
export type ClearMap = keyof typeof clearMap;