export function normalizePropertyName(prop: string): string {
  return prop.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}

export function normalizePropertyValue(value: string): string {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ")
    : value;
}

export function normalizeCSSDeclaration(decl: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in decl) {
    result[normalizePropertyName(key)] = normalizePropertyValue(decl[key]);
  }
  return result;
}
