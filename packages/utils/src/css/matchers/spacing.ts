import { TailwindSuggestion } from '@tailwind-studio/types';

const spacingScale: Record<string, string> = {
  '0px': '0',
  '0.25rem': '1',
  '0.5rem': '2',
  '0.75rem': '3',
  '1rem': '4',
  '1.25rem': '5',
  '1.5rem': '6',
  '2rem': '8',
  '2.5rem': '10',
  '3rem': '12',
  '4rem': '16',
};

function convertToTwSpacing(value: string): string | undefined {
  const normalized = value.trim();
  return spacingScale[normalized];
}

export function matchSpacing(prop: string, value: string): TailwindSuggestion[] {
  const tw = convertToTwSpacing(value);
  if (!tw) return [];

  const result: TailwindSuggestion[] = [];

  if (prop === 'padding') result.push({ tw: `p-${tw}`, source: `${prop}: ${value}` });
  if (prop === 'margin') result.push({ tw: `m-${tw}`, source: `${prop}: ${value}` });
  if (prop === 'padding-top') result.push({ tw: `pt-${tw}`, source: `${prop}: ${value}` });
  if (prop === 'margin-bottom') result.push({ tw: `mb-${tw}`, source: `${prop}: ${value}` });

  return result;
}
