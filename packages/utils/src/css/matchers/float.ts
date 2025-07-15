import type { TailwindSuggestion } from '@tailwind-studio/types';
import { floatMap } from '../constants/floatMap';

export function matchFloat(prop: string, value: string): TailwindSuggestion[] {
    if (prop !== 'float') return [];

    const normalized = value.trim();

    if (floatMap[normalized]) {
        return [{
            tw: floatMap[normalized],
            reason: 'tailwind float utility',
        }];
    }

    return [{
        tw: `float-[${normalized}]`,
        reason: 'custom float value',
    }];
}
