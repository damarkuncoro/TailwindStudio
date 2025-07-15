export function parseCssDeclaration(decl: string): { property: string; value: string } | null {
  const [prop, val] = decl.split(':').map(s => s.trim());
  if (!prop || !val) return null;
  return { property: prop, value: val.replace(/;$/, '') };
}
