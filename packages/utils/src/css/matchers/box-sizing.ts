import type { TailwindSuggestion } from '@tailwind-studio/types';
import { boxSizingMap } from '../constants/boxSizingMap';

export function matchBoxSizing(prop: string, value: string): TailwindSuggestion[] {
    if (prop !== 'box-sizing') return [];

    const normalized = value.trim();

    if (boxSizingMap[normalized]) {
        return [{
            tw: boxSizingMap[normalized],
            reason: 'tailwind box-sizing utility',
        }];
    }

    return [{
        tw: `box-sizing-[${normalized}]`,
        reason: 'custom box-sizing value',
    }];
}
