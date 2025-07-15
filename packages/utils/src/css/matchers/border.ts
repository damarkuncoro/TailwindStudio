export function matchBorderWidth(value: string): string | null {
    if (!value.startsWith('border-width')) return null;
    const num = parseFloat(value.split(':')[1]);
    return isNaN(num) ? null : `border-${num}`;
}

export function matchBorderColor(value: string): string | null {
    if (!value.startsWith('border-color')) return null;
    if (value.includes('red')) return 'border-red-500';
    if (value.includes('gray')) return 'border-gray-400';
    return null;
}
export function matchBorderRadius(value: string): string | null {
    if (!value.startsWith('border-radius')) return null;
    const num = parseFloat(value.split(':')[1]);
    if (isNaN(num)) return null;

    if (num === 0) return 'rounded-none';
    if (num === 0.125) return 'rounded-sm';
    if (num === 0.25) return 'rounded';
    if (num === 0.5) return 'rounded-md';
    if (num === 1) return 'rounded-lg';
    if (num === 1.5) return 'rounded-xl';

    return `rounded-[${num}rem]`;
}