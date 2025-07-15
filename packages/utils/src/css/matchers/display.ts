import type { TailwindSuggestion } from '@tailwind-studio/types';
import { displayMap } from '../constants/displayMap';

export function matchDisplay(prop: string, value: string): TailwindSuggestion[] {
    if (prop !== 'display') return [];

    const normalized = value.trim();

    if (displayMap[normalized]) {
        return [{
            tw: displayMap[normalized],
            reason: 'tailwind display utility',
        }];
    }

    return [{
        tw: `display-[${normalized}]`,
        reason: 'custom display value',
    }];
}
