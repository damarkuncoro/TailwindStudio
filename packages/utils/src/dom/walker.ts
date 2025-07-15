/**
 * DOM Walker Utility
 * 
 * Fungsi ini melakukan traversal (penelusuran) tree DOM secara rekursif (depth-first).
 * Cocok untuk kebutuhan parser, analisis, atau transformasi node HTML.
 * 
 * @param root - Node awal yang ingin ditelusuri
 * @param visitor - Fungsi callback yang dipanggil untuk setiap node
 */
export function walkDOM(
  root: Node,
  visitor: (node: Node, parent: Node | null) => void,
  parent: Node | null = null
): void {
  visitor(root, parent);
  root.childNodes.forEach((child) => walkDOM(child, visitor, root));
}
