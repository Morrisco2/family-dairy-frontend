export function getChildren(parentId, nodes) {
  return nodes.filter((node) => node.data.parentId === parentId);
}
