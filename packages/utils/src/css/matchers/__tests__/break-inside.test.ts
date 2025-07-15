import { describe, it, expect } from 'vitest';
import { matchBreakInside } from '../break-inside';

describe('matchBreakInside', () => {
    it('should match standard break-inside values', () => {
        expect(matchBreakInside('break-inside', 'auto')[0].tw).toBe('break-inside-auto');
        expect(matchBreakInside('break-inside', 'avoid')[0].tw).toBe('break-inside-avoid');
        expect(matchBreakInside('break-inside', 'avoid-page')[0].tw).toBe('break-inside-avoid-page');
        expect(matchBreakInside('break-inside', 'avoid-column')[0].tw).toBe('break-inside-avoid-column');
    });

    it('should fallback to custom values', () => {
        const result = matchBreakInside('break-inside', 'custom-value');
        expect(result[0].tw).toBe('break-inside-[custom-value]');
    });

});
