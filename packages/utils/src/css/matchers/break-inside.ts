import type { TailwindSuggestion } from '@tailwind-studio/types';
import { breakInsideMap } from '../constants/breakInsideMap';

export function matchBreakInside(prop: string, value: string): TailwindSuggestion[] {
  if (prop !== 'break-inside') return [];

  const normalized = value.trim();

  if (breakInsideMap[normalized]) {
    return [{
      tw: breakInsideMap[normalized],
      reason: 'tailwind break-inside utility',
    }];
  }

  return [{
    tw: `break-inside-[${normalized}]`,
    reason: 'custom break-inside value',
  }];
}
