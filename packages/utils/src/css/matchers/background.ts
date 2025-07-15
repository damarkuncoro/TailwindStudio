export function matchBackgroundColor(value: string): string | null {
    if (!value.startsWith('background-color')) return null;
    if (value.includes('blue')) return 'bg-blue-500';
    if (value.includes('gray')) return 'bg-gray-100';
    return null;
}
export function matchBackgroundImage(value: string): string | null {
    if (!value.startsWith('background-image')) return null;
    if (value.includes('gradient')) return 'bg-gradient-to-r from-blue-500 to-purple-500';
    if (value.includes('url')) return 'bg-cover bg-center';
    return null;
}
export function matchBackgroundSize(value: string): string | null {
    if (!value.startsWith('background-size')) return null;
    if (value.includes('cover')) return 'bg-cover';
    if (value.includes('contain')) return 'bg-contain';
    return null;
}
export function matchBackgroundPosition(value: string): string | null {
    if (!value.startsWith('background-position')) return null;
    if (value.includes('top')) return 'bg-top';
    if (value.includes('bottom')) return 'bg-bottom';
    return null;
}