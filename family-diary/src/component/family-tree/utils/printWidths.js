export function printWidths(node, level = 0) {
  if (!node) return;

  console.log(`${" ".repeat(level * 2)}${node.name} (${node.subtreeWidth})`);

  node.childrenNodes.forEach((child) => printWidths(child, level + 1));
}
