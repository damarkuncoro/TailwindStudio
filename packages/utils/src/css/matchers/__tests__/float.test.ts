import { describe, it, expect } from 'vitest';
import { matchFloat } from '../float';

describe('matchFloat', () => {
    it('should match tailwind float values', () => {
        expect(matchFloat('float', 'left')[0].tw).toBe('float-left');
        expect(matchFloat('float', 'right')[0].tw).toBe('float-right');
        expect(matchFloat('float', 'none')[0].tw).toBe('float-none');
        expect(matchFloat('float', 'inline-start')[0].tw).toBe('float-start');
        expect(matchFloat('float', 'inline-end')[0].tw).toBe('float-end');
    });

    it('should return custom utility for unknown float', () => {
        expect(matchFloat('float', 'revert')[0].tw).toBe('float-[revert]');
    });
    it('should normalize float values', () => {
        expect(matchFloat('float', ' left ')[0].tw).toBe('float-left');
        expect(matchFloat('float', 'inline-end')[0].tw).toBe('float-end');
    });
    it('should ignore non-float properties', () => {
        expect(matchFloat('display', 'inline')).toEqual([]);
    });
});
