export function printTree(node, level = 0) {
  if (!node) return;

  console.log(`${" ".repeat(level * 2)}${node.name}`);

  node.childrenNodes.forEach((child) => printTree(child, level + 1));
}
