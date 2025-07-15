export function extractPseudoPrefix(property: string): string | null {
    if (property.startsWith('hover:')) return 'hover';
    if (property.startsWith('focus:')) return 'focus';
    return null;
}

export function stripPseudo(property: string): string {
    return property.replace(/^(hover|focus):/, '');
}
export function matchPseudo(property: string): string | null {
    const prefix = extractPseudoPrefix(property);
    if (!prefix) return null;
    const stripped = stripPseudo(property);
    if (stripped === 'font-size') return `${prefix}:text-sm`;
    if (stripped === 'font-weight') return `${prefix}:font-bold`;
    return null;
}

export function matchPseudoProperty(property: string): string | null {
    const prefix = extractPseudoPrefix(property);
    if (!prefix) return null;
    const stripped = stripPseudo(property);

    if (stripped.startsWith('bg-')) return `${prefix}:${stripped}`;
    if (stripped.startsWith('text-')) return `${prefix}:${stripped}`;
    if (stripped.startsWith('border-')) return `${prefix}:${stripped}`;
    if (stripped.startsWith('padding-')) return `${prefix}:${stripped}`;
    if (stripped.startsWith('margin-')) return `${prefix}:${stripped}`;

    return null;
}   