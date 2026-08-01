// export function buildEdges(nodes) {
//   const edges = [];

//   nodes.forEach((child) => {
//     const parents = child.data.parents || [];

//     parents.forEach((parentId) => {
//       edges.push({
//         id: `${parentId}-${child.id}`,
//         source: parentId,
//         target: child.id,
//         type: "family",
//       });
//     });
//   });

//   console.log("Generated edges:", edges);

//   return edges;
// }

// VERSION 2

export function buildEdges(nodes) {
  const edges = [];

  nodes.forEach((parent) => {
    const children = nodes.filter((node) =>
      node.data.parents.includes(parent.id),
    );

    if (!children.length) return;

    edges.push({
      id: `family-${parent.id}`,

      source: parent.id,

      target: children[0].id, // React Flow requires one target

      type: "family",

      data: {
        children: children.map((child) => child.id),
      },
    });
  });

  return edges;
}