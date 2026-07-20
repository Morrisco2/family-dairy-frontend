import dagre from "@dagrejs/dagre";

const NODE_WIDTH = 120;
const NODE_HEIGHT = 150;

/**
 * Converts family relationship data into
 * positioned React Flow nodes.
 */
export function layoutTree(members) {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: "TB", // Top -> Bottom
    ranksep: 90, // Vertical spacing
    nodesep: 60, // Horizontal spacing
  });

  // Register every member as a node
  members.forEach((member) => {
    graph.setNode(member.id, {
      width: member.isRoot ? 160 : NODE_WIDTH,
      height: member.isRoot ? 190 : NODE_HEIGHT,
    });
  });

  // Register parent -> child relationships
  members.forEach((member) => {
    member.children.forEach((childId) => {
      graph.setEdge(member.id, childId);
    });
  });

  // Calculate the layout
  dagre.layout(graph);

  // Convert to React Flow nodes
  return members.map((member) => {
    const node = graph.node(member.id);

    return {
      id: member.id,
      type: member.isRoot ? "root" : "family",

      position: {
        x: node.x - (member.isRoot ? 80 : NODE_WIDTH / 2),
        y: node.y - (member.isRoot ? 95 : NODE_HEIGHT / 2),
      },

      data: member,
    };
  });
}
