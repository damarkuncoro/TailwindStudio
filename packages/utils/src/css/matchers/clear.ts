import type { TailwindSuggestion } from '@tailwind-studio/types';
import { clearMap } from '../constants/clearMap';

export function matchClear(prop: string, value: string): TailwindSuggestion[] {
  if (prop !== 'clear') return [];

  const normalized = value.trim();

  if (clearMap[normalized]) {
    return [
      {
        tw: clearMap[normalized],
        reason: 'tailwind clear utility',
      },
    ];
  }

  return [
    {
      tw: `clear-[${normalized}]`,
      reason: 'custom clear value',
    },
  ];
}
