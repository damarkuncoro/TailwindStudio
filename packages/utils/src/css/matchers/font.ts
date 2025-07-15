export function matchFontSize(value: string): string | null {
  if (!value.startsWith('font-size')) return null;
  const size = parseFloat(value.split(':')[1]);
  if (isNaN(size)) return null;

  if (size === 0.875) return 'text-sm';
  if (size === 1) return 'text-base';
  if (size === 1.25) return 'text-lg';
  return `text-[${size}rem]`;
}

export function matchFontWeight(value: string): string | null {
  if (!value.startsWith('font-weight')) return null;
  const weight = parseInt(value.split(':')[1]);
  if (weight >= 700) return 'font-bold';
  if (weight >= 500) return 'font-medium';
  return 'font-normal';
}
