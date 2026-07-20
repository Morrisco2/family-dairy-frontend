/**
 * Builds parent → child edges from the
 * family relationship data.
 */
export function buildEdges(members) {
  const edges = [];

  members.forEach((member) => {
    member.children.forEach((childId) => {
      edges.push({
        id: `${member.id}-${childId}`,
        source: member.id,
        target: childId,

        type: "smoothstep",

        animated: false,

        selectable: false,

        style: {
          strokeWidth: 2,
          stroke: "#000",
        },
      });
    });
  });

  return edges;
}
