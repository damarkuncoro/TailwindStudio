import type { TailwindSuggestion } from '@tailwind-studio/types';
import { breakAfterMap } from '../constants/breakAfterMap';

export function matchBreakAfter(prop: string, value: string): TailwindSuggestion[] {
  if (prop !== 'break-after') return [];

  const normalized = value.trim();

  if (breakAfterMap[normalized]) {
    return [{
      tw: breakAfterMap[normalized],
      reason: 'tailwind break-after utility',
    }];
  }

  // Fallback for custom/unsupported values
  return [{
    tw: `break-after-[${normalized}]`,
    reason: 'custom break-after value',
  }];
}
