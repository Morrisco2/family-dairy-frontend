// /**
//  * Converts the hierarchy into
//  * React Flow nodes.
//  */

// export function buildReactFlowNodes(node, nodes = []) {
//   if (!node) return nodes;

//   nodes.push({
//     id: node.id,

//     type: node.isRoot ? "root" : "family",

//     position: {
//       x: node.x,
//       y: node.y,
//     },

//     data: {
//       ...node,
//     },
//   });

//   node.childrenNodes.forEach((child) => buildReactFlowNodes(child, nodes));

//   return nodes;
// }


// VERSION 2 (SPOUSE FEATURE)

/**
 * Converts the hierarchy into
 * React Flow nodes including spouses.
 */

export function buildReactFlowNodes(
  node,
  memberMap,
  nodes = [],
  visited = new Set(),
) {
  if (!node || visited.has(node.id)) return nodes;

  visited.add(node.id);

  // Main member node
  nodes.push({
    id: node.id,

    type: node.isRoot ? "root" : "family",

    position: {
      x: node.x,
      y: node.y,
    },

    data: {
      ...node,
    },
  });

  // Spouse node
  const spouseId = node.spouses?.[0];

  if (
    spouseId &&
    memberMap[spouseId] &&
    !visited.has(spouseId)
  ) {
    const spouse = memberMap[spouseId];

    visited.add(spouseId);

    nodes.push({
      id: spouse.id,

      type: spouse.isRoot ? "root" : "family",

      position: {
        x: node.spouseX,
        y: node.spouseY,
      },

      data: {
        ...spouse,
      },
    });
  }

  // Children
  node.childrenNodes.forEach((child) =>
    buildReactFlowNodes(
      child,
      memberMap,
      nodes,
      visited,
    ),
  );

  return nodes;
}