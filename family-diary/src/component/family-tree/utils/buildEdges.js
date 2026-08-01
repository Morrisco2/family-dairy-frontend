export function buildEdges(nodes) {
  const edges = [];

  nodes.forEach((child) => {
    const parents = child.data.parents || [];

    parents.forEach((parentId) => {
      edges.push({
        id: `${parentId}-${child.id}`,
        source: parentId,
        target: child.id,
        type: "family",
      });
    });
  });

  console.log("Generated edges:", edges);

  return edges;
}
