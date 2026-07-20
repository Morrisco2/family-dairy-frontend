const NODE_GAP = 180;
const LEVEL_GAP = 220;

/**
 * Positions every node using the
 * subtree widths calculated earlier.
 */

export function positionTree(node, startX = 0, level = 0, positioned = []) {
  if (!node) return positioned;

  const totalWidth = node.subtreeWidth * NODE_GAP;

  const centerX = startX + totalWidth / 2;

  positioned.push({
    id: node.id,

    type: node.isRoot ? "root" : "family",

    position: {
      x: centerX,
      y: level * LEVEL_GAP,
    },

    data: node,
  });

  let currentX = startX;

  node.childrenNodes.forEach((child) => {
    positionTree(child, currentX, level + 1, positioned);

    currentX += child.subtreeWidth * NODE_GAP;
  });

  return positioned;
}
