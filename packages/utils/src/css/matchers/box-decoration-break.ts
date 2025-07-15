import type { TailwindSuggestion } from '@tailwind-studio/types';
import { boxDecorationBreakMap } from '../constants/boxBecorationBreakMap';

export function matchBoxDecorationBreak(prop: string, value: string): TailwindSuggestion[] {
    if (prop !== 'box-decoration-break') return [];

    const normalized = value.trim();

    if (boxDecorationBreakMap[normalized]) {
        return [{
            tw: boxDecorationBreakMap[normalized],
            reason: 'tailwind box-decoration-break utility',
        }];
    }

    return [{
        tw: `box-decoration-[${normalized}]`,
        reason: 'custom box-decoration-break value',
    }];
}
