export function matchTextColor(value: string): string | null {
    if (!value.startsWith('color')) return null;
    if (value.includes('red')) return 'text-red-500';
    if (value.includes('black')) return 'text-black';
    return null;
}

export function matchBackgroundColor(value: string): string | null {
    if (!value.startsWith('bg-')) return null;
    if (value.includes('red')) return 'bg-red-500';
    if (value.includes('black')) return 'bg-black';
    return null;
}
export function matchBorderColor(value: string): string | null {
    if (!value.startsWith('border-')) return null;
    if (value.includes('red')) return 'border-red-500';
    if (value.includes('black')) return 'border-black';
    return null;
}   
export function matchBorderWidth(value: string): string | null {
    if (!value.startsWith('border-width')) return null;
    if (value.includes('1')) return 'border';
    if (value.includes('2')) return 'border-2';
    return null;
}