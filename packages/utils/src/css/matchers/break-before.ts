import type { TailwindSuggestion } from '@tailwind-studio/types';
import { breakBeforeMap } from '../constants/breakBeforeMap';

export function matchBreakBefore(prop: string, value: string): TailwindSuggestion[] {
  if (prop !== 'break-before') return [];

  const normalized = value.trim();

  if (breakBeforeMap[normalized]) {
    return [{
      tw: breakBeforeMap[normalized],
      reason: 'tailwind break-before utility',
    }];
  }

  // Fallback for custom/unsupported values
  return [{
    tw: `break-before-[${normalized}]`,
    reason: 'custom break-before value',
  }];
}
