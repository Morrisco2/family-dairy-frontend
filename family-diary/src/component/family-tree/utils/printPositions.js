export function printPositions(nodes) {
  console.table(
    nodes.map((node) => ({
      Name: node.data.name,
      X: node.position.x,
      Y: node.position.y,
    })),
  );
}
