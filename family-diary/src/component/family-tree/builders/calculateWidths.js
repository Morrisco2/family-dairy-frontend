/**
 * Calculates how much horizontal
 * space each branch occupies.
 */

export function calculateWidths(node) {
  if (!node) return 0;

  if (node.childrenNodes.length === 0) {
    node.subtreeWidth = 1;
    return 1;
  }

  let width = 0;

  node.childrenNodes.forEach((child) => {
    width += calculateWidths(child);
  });

  node.subtreeWidth = width;

  return width;
}
