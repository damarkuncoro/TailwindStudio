import { describe, it, expect } from 'vitest';
import { matchBreakBefore } from '../break-before';

describe('matchBreakBefore', () => {
    it('should match standard break-before utilities', () => {
        expect(matchBreakBefore('break-before', 'auto')[0].tw).toBe('break-before-auto');
        expect(matchBreakBefore('break-before', 'avoid-page')[0].tw).toBe('break-before-avoid-page');
        expect(matchBreakBefore('break-before', 'column')[0].tw).toBe('break-before-column');
    });

    it('should fallback to custom break-before value', () => {
        expect(matchBreakBefore('break-before', 'custom')[0].tw).toBe('break-before-[custom]');
    });

    it('should ignore non-break-before properties', () => {
        expect(matchBreakBefore('display', 'auto')).toEqual([]);
    });
});
